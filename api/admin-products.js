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
    const products = await sql`SELECT id, name, price, stock_qty FROM products ORDER BY name`;
    return res.status(200).json(products);
  }

  if (req.method === 'PATCH') {
    const { id, stock_qty, price } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing product id' });

    if (stock_qty !== undefined) {
      await sql`UPDATE products SET stock_qty = ${Number(stock_qty)} WHERE id = ${id}`;
    }
    if (price !== undefined) {
      await sql`UPDATE products SET price = ${Number(price)} WHERE id = ${id}`;
    }

    const [updated] = await sql`SELECT id, name, price, stock_qty FROM products WHERE id = ${id}`;
    return res.status(200).json(updated);
  }

  return res.status(405).end();
}
