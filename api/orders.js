// Client-confirm path: the browser calls this right after a successful Paystack
// popup, sending the cart it charged plus the payment reference. We re-verify
// the reference with Paystack (never trust the client) and create the order.
// The webhook (api/payment-webhook.js) is the safety net if this call never
// lands — both funnel through the same idempotent createPaidOrder().
import { verifyTransaction, createPaidOrder, statusForError } from './_order.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, address, cart, reference } = req.body;

  if (!email || !name || !cart?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!reference) {
    return res.status(400).json({ error: 'Missing payment reference' });
  }

  try {
    const paid = await verifyTransaction(reference);
    const { orderId } = await createPaidOrder({
      email,
      name,
      address,
      cart,
      reference,
      paidAmount: paid.amount,
      paidCurrency: paid.currency,
    });
    return res.status(201).json({ orderId });
  } catch (err) {
    console.error('Order creation failed:', err);
    const status = statusForError(err);
    return res.status(status).json({
      error: status === 500 ? 'Something went wrong. Please try again.' : err.message,
    });
  }
}
