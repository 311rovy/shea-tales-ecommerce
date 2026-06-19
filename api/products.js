import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT id, stock_qty FROM products`;
    res.status(200).json(rows);
  } catch (err) {
    console.error('Stock fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
}
