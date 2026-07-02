// Paystack webhook — the safety net. If a customer pays but their browser dies
// before api/orders.js runs, Paystack still POSTs `charge.success` here and we
// create the order from the cart we stashed in the transaction metadata.
// Idempotent with the client path via createPaidOrder()'s unique payment_ref.
import crypto from 'node:crypto';
import { verifyTransaction, createPaidOrder, isPermanent } from './_order.js';

// We need the raw bytes to validate Paystack's signature, so opt out of Vercel's
// automatic body parsing.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function normalizeMetadata(metadata) {
  if (!metadata) return {};
  if (typeof metadata === 'string') {
    try { return JSON.parse(metadata); } catch { return {}; }
  }
  return metadata;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error('Webhook: PAYSTACK_SECRET_KEY is not set');
    return res.status(500).end();
  }

  let raw;
  try {
    raw = await readRawBody(req);
  } catch {
    return res.status(400).end();
  }

  // Verify the payload really came from Paystack (HMAC-SHA512 of the raw body).
  const expected = crypto.createHmac('sha512', secret).update(raw).digest('hex');
  const signature = req.headers['x-paystack-signature'];
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(String(signature || ''));
  if (
    expectedBuf.length !== signatureBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, signatureBuf)
  ) {
    return res.status(401).end();
  }

  let event;
  try {
    event = JSON.parse(raw.toString('utf8'));
  } catch {
    return res.status(400).end();
  }

  // Ack anything that isn't a completed charge so Paystack stops retrying it.
  if (event.event !== 'charge.success') {
    return res.status(200).json({ received: true });
  }

  const reference = event.data?.reference;
  if (!reference) {
    return res.status(200).json({ received: true });
  }

  try {
    // Re-fetch the authoritative record (amount, currency, metadata).
    const paid = await verifyTransaction(reference);
    const meta = normalizeMetadata(paid.metadata);
    const cart = meta.cart;

    if (!Array.isArray(cart) || cart.length === 0) {
      // No cart to rebuild from — nothing more the webhook can do. Ack so we
      // don't get retried forever; the client path may still have the order.
      console.error('Webhook: missing cart metadata for', reference);
      return res.status(200).json({ received: true });
    }

    const result = await createPaidOrder({
      email: paid.customer?.email,
      name: meta.customer_name || paid.customer?.email,
      address: meta.address || '',
      cart,
      reference,
      paidAmount: paid.amount,
      paidCurrency: paid.currency,
    });

    if (result.created) {
      console.log('Webhook created order', result.orderId, 'for', reference);
    }
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    // Permanent errors: ack (200) so Paystack stops retrying. Transient (e.g.
    // DB blip): 500 so Paystack retries the delivery for us.
    return isPermanent(err)
      ? res.status(200).json({ received: true })
      : res.status(500).json({ error: 'processing_failed' });
  }
}
