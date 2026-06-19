import { neon } from '@neondatabase/serverless';

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
        $${(item.price * item.qty).toFixed(2)}
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
                    <td style="font-family:Georgia,serif;font-size:14px;color:#111;text-align:right;padding-top:16px;"><strong>$${Number(total).toFixed(2)}</strong></td>
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, address, cart } = req.body;

  if (!email || !name || !cart?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = neon(process.env.DATABASE_URL);

  for (const item of cart) {
    const [product] = await sql`SELECT stock_qty FROM products WHERE id = ${item.id}`;
    if (!product || product.stock_qty < item.qty) {
      return res.status(409).json({ error: `${item.name} is out of stock` });
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [order] = await sql`
    INSERT INTO orders (customer_email, customer_name, address, total)
    VALUES (${email}, ${name}, ${address || ''}, ${total})
    RETURNING id
  `;

  for (const item of cart) {
    await sql`
      INSERT INTO order_items (order_id, product_id, qty, price)
      VALUES (${order.id}, ${item.id}, ${item.qty}, ${item.price})
    `;
    await sql`
      UPDATE products SET stock_qty = stock_qty - ${item.qty} WHERE id = ${item.id}
    `;
  }

  try {
    await sendConfirmationEmail({ orderId: order.id, email, name, cart, total });
  } catch (err) {
    console.error('Email failed (order still created):', err);
  }

  res.status(201).json({ orderId: order.id });
}
