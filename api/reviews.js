import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'Missing productId' });

    const reviews = await sql`
      SELECT id, product_id, reviewer_name, rating, body, created_at
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY created_at DESC
    `;
    return res.status(200).json(reviews);
  }

  if (req.method === 'POST') {
    const { productId, name, email, rating, body } = req.body;
    if (!productId || !name || !email || !rating || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be 1–5' });
    if (body.trim().length < 10) return res.status(400).json({ error: 'Review too short' });

    const [review] = await sql`
      INSERT INTO reviews (product_id, reviewer_name, reviewer_email, rating, body)
      VALUES (${productId}, ${name.trim()}, ${email.trim().toLowerCase()}, ${rating}, ${body.trim()})
      RETURNING id, product_id, reviewer_name, rating, body, created_at
    `;
    return res.status(201).json(review);
  }

  return res.status(405).end();
}
