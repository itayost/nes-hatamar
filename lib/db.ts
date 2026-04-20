import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let client: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL not configured. Install Neon via the Vercel Marketplace.',
      );
    }
    client = neon(url);
  }
  return client;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
