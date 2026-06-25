import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id, email } = req.query;
  if (!id || !email) return res.status(400).json({ error: 'Missing id or email' });

  const sql = neon(process.env.DATABASE_URL);

  const [order] = await sql`
    SELECT
      o.id, o.customer_name, o.customer_email, o.address, o.total, o.status, o.created_at,
      json_agg(
        json_build_object('name', p.name, 'qty', oi.qty, 'price', oi.price)
        ORDER BY oi.id
      ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id
    WHERE o.id = ${parseInt(id)} AND LOWER(o.customer_email) = LOWER(${email})
    GROUP BY o.id
  `;

  if (!order) return res.status(404).json({ error: 'Order not found' });
  return res.status(200).json(order);
}
