// Shared order logic used by BOTH the client-confirm path (api/orders.js) and
// the Paystack webhook (api/payment-webhook.js). The leading underscore tells
// Vercel not to expose this file as its own HTTP endpoint.
import { neon } from '@neondatabase/serverless';

// Shipping policy — must match src/currency.ts so the amount we verify with
// Paystack equals what the customer saw and paid.
export const FREE_SHIPPING_THRESHOLD = 5000;
export const FLAT_SHIPPING = 500;
export const shippingFor = (subtotal) =>
  subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;

const formatKES = (amount) => `KSh ${Math.round(Number(amount)).toLocaleString('en-KE')}`;

// A business error whose `.code` maps to an HTTP status via statusForError().
class OrderError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export function statusForError(err) {
  switch (err?.code) {
    case 'BAD_REQUEST': return 400;
    case 'UNVERIFIED':
    case 'AMOUNT_MISMATCH': return 402;
    default: return 500;
  }
}

// True for errors that will never succeed on retry (so the webhook can ack them
// with 200 instead of triggering Paystack's retry storm).
export function isPermanent(err) {
  return ['BAD_REQUEST', 'UNVERIFIED', 'AMOUNT_MISMATCH'].includes(err?.code);
}

// Ask Paystack for the authoritative record of a transaction. Throws UNVERIFIED
// unless the charge actually succeeded. Returns the `data` object, which
// includes amount, currency, customer, and the metadata we attached client-side.
export async function verifyTransaction(reference) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
  );
  const json = await res.json();
  if (!json.status || json.data?.status !== 'success') {
    throw new OrderError('UNVERIFIED', 'Payment could not be verified');
  }
  return json.data;
}

// Create an order from an already-verified payment. Idempotent on `reference`:
// whichever caller (client confirm or webhook) wins the INSERT does the work;
// the other no-ops and returns the same order id.
export async function createPaidOrder({ email, name, address, cart, reference, paidAmount, paidCurrency }) {
  if (!email || !name || !cart?.length || !reference) {
    throw new OrderError('BAD_REQUEST', 'Missing required fields');
  }

  const sql = neon(process.env.DATABASE_URL);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + shippingFor(subtotal);

  // Paystack amounts are in the currency subunit (KES cents). Confirm the
  // customer paid at least the order total, in the expected currency.
  const expected = Math.round(total * 100);
  if (paidAmount < expected || paidCurrency !== 'KES') {
    throw new OrderError('AMOUNT_MISMATCH', 'Payment amount mismatch');
  }

  // The unique index on payment_ref makes this the single source of truth for
  // "was this payment already turned into an order?" — no lost or duplicate orders.
  const inserted = await sql`
    INSERT INTO orders (customer_email, customer_name, address, total, payment_ref)
    VALUES (${email}, ${name}, ${address || ''}, ${total}, ${reference})
    ON CONFLICT (payment_ref) DO NOTHING
    RETURNING id
  `;

  if (inserted.length === 0) {
    const [existing] = await sql`SELECT id FROM orders WHERE payment_ref = ${reference}`;
    return { orderId: existing?.id, created: false };
  }

  const orderId = inserted[0].id;

  // Payment already happened, so we always honour the order. Stock may go
  // negative — that's a deliberate "oversold" signal for the admin to reconcile.
  for (const item of cart) {
    await sql`
      INSERT INTO order_items (order_id, product_id, qty, price)
      VALUES (${orderId}, ${item.id}, ${item.qty}, ${item.price})
    `;
    await sql`
      UPDATE products SET stock_qty = stock_qty - ${item.qty} WHERE id = ${item.id}
    `;
  }

  try {
    await sendConfirmationEmail({ orderId, email, name, cart, total });
  } catch (err) {
    console.error('Email failed (order still created):', err);
  }

  return { orderId, created: true };
}

async function sendConfirmationEmail({ orderId, email, name, cart, total }) {
  const itemRows = cart.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d4;color:#111;font-size:14px;font-family:Georgia,serif;">
        ${item.name}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d4;color:#888;font-size:14px;text-align:center;font-family:Georgia,serif;">
        ×${item.qty}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e0d4;color:#111;font-size:14px;text-align:right;font-family:Georgia,serif;">
        ${formatKES(item.price * item.qty)}
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f3eee4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee4;padding:40px 16px;">
        <tr><td align="center">
          <table cellpadding="0" cellspacing="0" style="background:#ffffff;width:100%;max-width:540px;">

            <!-- Header -->
            <tr>
              <td style="background:#111111;padding:36px 40px;text-align:center;">
                <p style="margin:0;color:#f3eee4;font-family:Georgia,serif;font-size:26px;letter-spacing:0.12em;">SHEA TALES</p>
                <p style="margin:10px 0 0;color:#9d7428;font-family:Georgia,serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Ghanaian Shea Butter Skincare</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <h2 style="margin:0 0 6px;color:#111;font-family:Georgia,serif;font-size:22px;font-weight:normal;">Your ritual is on the way.</h2>
                <p style="margin:0 0 32px;color:#666;font-family:Georgia,serif;font-size:14px;line-height:1.6;">
                  Hi ${name}, thank you for your order. We'll send you tracking information once your package leaves the studio.
                </p>

                <p style="margin:0 0 20px;color:#9d7428;font-family:Georgia,serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;border-bottom:1px solid #e8e0d4;padding-bottom:14px;">
                  Order #${orderId}
                </p>

                <!-- Items -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <th style="text-align:left;font-family:Georgia,serif;font-size:11px;color:#888;font-weight:normal;letter-spacing:0.1em;text-transform:uppercase;padding-bottom:8px;">Product</th>
                    <th style="text-align:center;font-family:Georgia,serif;font-size:11px;color:#888;font-weight:normal;letter-spacing:0.1em;text-transform:uppercase;padding-bottom:8px;">Qty</th>
                    <th style="text-align:right;font-family:Georgia,serif;font-size:11px;color:#888;font-weight:normal;letter-spacing:0.1em;text-transform:uppercase;padding-bottom:8px;">Price</th>
                  </tr>
                  ${itemRows}
                </table>

                <!-- Total -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid #111;padding-top:16px;">
                  <tr>
                    <td style="font-family:Georgia,serif;font-size:14px;color:#111;padding-top:16px;">Total</td>
                    <td style="font-family:Georgia,serif;font-size:14px;color:#111;text-align:right;padding-top:16px;"><strong>${formatKES(total)}</strong></td>
                  </tr>
                </table>

                <p style="margin:32px 0 0;color:#666;font-family:Georgia,serif;font-size:13px;line-height:1.6;">
                  Processing takes 2–3 business days. Questions? Reply to this email and we'll take care of you.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3eee4;padding:24px 40px;text-align:center;border-top:1px solid #e8e0d4;">
                <p style="margin:0;color:#999;font-family:Georgia,serif;font-size:11px;letter-spacing:0.08em;">Raw shea · Women-led sourcing · Small-batch craft</p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Shea Tales <onboarding@resend.dev>',
      to: email,
      subject: `Order #${orderId} confirmed — Shea Tales`,
      html,
    }),
  });
}
