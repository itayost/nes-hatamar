import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { importCoupons } from '../lib/coupon-storage';
import type { Coupon } from '../types/coupon';

async function main() {
  const path = resolve(process.cwd(), 'data/coupons.json');
  const raw = readFileSync(path, 'utf8');
  const { coupons } = JSON.parse(raw) as { coupons: Coupon[] };

  if (!Array.isArray(coupons) || coupons.length === 0) {
    console.log('No coupons to seed.');
    return;
  }

  await importCoupons(coupons);
  console.log(`Seeded ${coupons.length} coupon(s): ${coupons.map(c => c.code).join(', ')}`);
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
