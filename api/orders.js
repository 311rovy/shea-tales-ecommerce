import { neon } from '@neondatabase/serverless';

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

  res.status(201).json({ orderId: order.id });
}
