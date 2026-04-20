import { Coupon, CouponCreateInput, CouponUpdateInput } from '@/types/coupon';
import { getDb, isDbConfigured } from '@/lib/db';

export { isDbConfigured as isRedisConfigured };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === '23505';
}

export async function getAllCoupons(): Promise<Coupon[]> {
  const sql = getDb();
  const rows = await sql`SELECT data FROM coupons` as Array<{ data: Coupon }>;
  return rows.map(r => r.data);
}

export async function getCouponById(id: string): Promise<Coupon | null> {
  const sql = getDb();
  const rows = await sql`SELECT data FROM coupons WHERE id = ${id}` as Array<{ data: Coupon }>;
  return rows[0]?.data ?? null;
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const sql = getDb();
  const normalizedCode = code.trim().toUpperCase();
  const rows = await sql`SELECT data FROM coupons WHERE code = ${normalizedCode}` as Array<{ data: Coupon }>;
  return rows[0]?.data ?? null;
}

export async function createCoupon(input: CouponCreateInput): Promise<Coupon> {
  const sql = getDb();
  const normalizedCode = input.code.trim().toUpperCase();

  const newCoupon: Coupon = {
    id: generateId(),
    code: normalizedCode,
    discountType: input.discountType,
    discountValue: input.discountValue,
    expirationDate: input.expirationDate,
    maxUses: input.maxUses,
    currentUses: 0,
    active: true,
    createdAt: new Date().toISOString(),
    applicableProducts: input.applicableProducts,
  };

  try {
    await sql`
      INSERT INTO coupons (id, code, data)
      VALUES (${newCoupon.id}, ${newCoupon.code}, ${JSON.stringify(newCoupon)})
    `;
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new Error('Coupon code already exists');
    }
    throw err;
  }

  return newCoupon;
}

export async function updateCoupon(id: string, input: CouponUpdateInput): Promise<Coupon> {
  const sql = getDb();

  const currentCoupon = await getCouponById(id);
  if (!currentCoupon) {
    throw new Error('Coupon not found');
  }

  const nextCode =
    input.code && input.code.trim().toUpperCase() !== currentCoupon.code
      ? input.code.trim().toUpperCase()
      : currentCoupon.code;

  const updatedCoupon: Coupon = {
    ...currentCoupon,
    ...input,
    code: nextCode,
  };

  try {
    await sql`
      UPDATE coupons
      SET code = ${nextCode}, data = ${JSON.stringify(updatedCoupon)}
      WHERE id = ${id}
    `;
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new Error('Coupon code already exists');
    }
    throw err;
  }

  return updatedCoupon;
}

export async function deleteCoupon(id: string): Promise<void> {
  const sql = getDb();
  const rows = await sql`DELETE FROM coupons WHERE id = ${id} RETURNING id` as Array<{ id: string }>;
  if (rows.length === 0) {
    throw new Error('Coupon not found');
  }
}

export async function incrementCouponUsage(id: string): Promise<void> {
  const sql = getDb();
  const rows = await sql`
    UPDATE coupons
    SET data = jsonb_set(
      data,
      '{currentUses}',
      to_jsonb(COALESCE((data->>'currentUses')::int, 0) + 1)
    )
    WHERE id = ${id}
    RETURNING id
  ` as Array<{ id: string }>;
  if (rows.length === 0) {
    throw new Error('Coupon not found');
  }
}

export async function importCoupons(coupons: Coupon[]): Promise<void> {
  const sql = getDb();
  for (const coupon of coupons) {
    const normalizedCode = coupon.code.trim().toUpperCase();
    await sql`
      INSERT INTO coupons (id, code, data)
      VALUES (${coupon.id}, ${normalizedCode}, ${JSON.stringify({ ...coupon, code: normalizedCode })})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}
