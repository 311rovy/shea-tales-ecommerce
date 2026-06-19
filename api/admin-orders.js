import { neon } from '@neondatabase/serverless';

function checkAuth(req, res) {
  if (!process.env.ADMIN_PASSWORD || req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (!checkAuth(req, res)) return;

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const orders = await sql`
      SELECT
        o.id,
        o.customer_name,
        o.customer_email,
        o.address,
        o.total,
        o.status,
        o.created_at,
        json_agg(
          json_build_object('name', p.name, 'qty', oi.qty, 'price', oi.price)
          ORDER BY oi.id
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    return res.status(200).json(orders);
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ error: 'Missing fields' });

    const valid = ['pending', 'paid', 'shipped', 'delivered'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
