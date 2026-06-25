import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

// Load DATABASE_URL from .env.local if present
try {
  const env = readFileSync('.env.local', 'utf8');
  for (const line of env.split('\n')) {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  }
} catch {}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS reviews (
    id              SERIAL PRIMARY KEY,
    product_id      TEXT NOT NULL,
    reviewer_name   TEXT NOT NULL,
    reviewer_email  TEXT NOT NULL,
    rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    body            TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews (product_id)`;

console.log('✓ reviews table ready');
