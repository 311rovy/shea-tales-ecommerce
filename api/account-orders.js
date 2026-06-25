import { neon } from '@neondatabase/serverless';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  // Verify the Clerk session token from Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorised' });

  let userId;
  try {
    const payload = await clerk.verifyToken(token);
    userId = payload.sub;
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }

  // Get the user's primary email from Clerk
  const user = await clerk.users.getUser(userId);
  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
  if (!email) return res.status(400).json({ error: 'No email on account' });

  const sql = neon(process.env.DATABASE_URL);

  const orders = await sql`
    SELECT
      o.id, o.total, o.status, o.created_at,
      json_agg(
        json_build_object('name', p.name, 'qty', oi.qty, 'price', oi.price)
        ORDER BY oi.id
      ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id
    WHERE LOWER(o.customer_email) = LOWER(${email})
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `;

  return res.status(200).json(orders);
}
