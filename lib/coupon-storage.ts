import { Coupon, CouponCreateInput, CouponUpdateInput } from '@/types/coupon';
import { getRedis, isRedisConfigured } from '@/lib/redis';

const COUPONS_LIST_KEY = 'coupons:list';
const COUPON_KEY_PREFIX = 'coupon:';
const COUPON_CODE_PREFIX = 'coupon:code:';

export { isRedisConfigured };

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get all coupons
export async function getAllCoupons(): Promise<Coupon[]> {
  const r = getRedis();

  // Get all coupon IDs from the set
  const couponIds = await r.smembers(COUPONS_LIST_KEY);

  if (!couponIds || couponIds.length === 0) {
    return [];
  }

  // Get all coupons in parallel
  const couponPromises = couponIds.map(id => r.get<Coupon>(`${COUPON_KEY_PREFIX}${id}`));
  const coupons = await Promise.all(couponPromises);

  // Filter out any null values and return
  return coupons.filter((c): c is Coupon => c !== null);
}

// Get coupon by ID
export async function getCouponById(id: string): Promise<Coupon | null> {
  const r = getRedis();
  return r.get<Coupon>(`${COUPON_KEY_PREFIX}${id}`);
}

// Get coupon by code (O(1) lookup)
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const r = getRedis();
  const normalizedCode = code.trim().toUpperCase();

  // Get the coupon ID from the code lookup
  const couponId = await r.get<string>(`${COUPON_CODE_PREFIX}${normalizedCode}`);

  if (!couponId) {
    return null;
  }

  return getCouponById(couponId);
}

// Create a new coupon
export async function createCoupon(input: CouponCreateInput): Promise<Coupon> {
  const r = getRedis();
  const normalizedCode = input.code.trim().toUpperCase();

  // Check for duplicate code
  const existingId = await r.get<string>(`${COUPON_CODE_PREFIX}${normalizedCode}`);
  if (existingId) {
    throw new Error('Coupon code already exists');
  }

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

  // Use pipeline for atomic operations
  const pipeline = r.pipeline();

  // Store the coupon
  pipeline.set(`${COUPON_KEY_PREFIX}${newCoupon.id}`, newCoupon);

  // Add to the coupons list
  pipeline.sadd(COUPONS_LIST_KEY, newCoupon.id);

  // Create code-to-ID mapping
  pipeline.set(`${COUPON_CODE_PREFIX}${normalizedCode}`, newCoupon.id);

  await pipeline.exec();

  return newCoupon;
}

// Update an existing coupon
export async function updateCoupon(id: string, input: CouponUpdateInput): Promise<Coupon> {
  const r = getRedis();

  // Get current coupon
  const currentCoupon = await getCouponById(id);
  if (!currentCoupon) {
    throw new Error('Coupon not found');
  }

  // If code is being changed, check for duplicates and update lookup
  if (input.code && input.code.trim().toUpperCase() !== currentCoupon.code) {
    const normalizedNewCode = input.code.trim().toUpperCase();
    const existingId = await r.get<string>(`${COUPON_CODE_PREFIX}${normalizedNewCode}`);

    if (existingId && existingId !== id) {
      throw new Error('Coupon code already exists');
    }

    // Update code lookup
    const pipeline = r.pipeline();
    pipeline.del(`${COUPON_CODE_PREFIX}${currentCoupon.code}`);
    pipeline.set(`${COUPON_CODE_PREFIX}${normalizedNewCode}`, id);
    await pipeline.exec();

    input.code = normalizedNewCode;
  }

  // Merge updates
  const updatedCoupon: Coupon = {
    ...currentCoupon,
    ...input,
  };

  await r.set(`${COUPON_KEY_PREFIX}${id}`, updatedCoupon);

  return updatedCoupon;
}

// Delete a coupon
export async function deleteCoupon(id: string): Promise<void> {
  const r = getRedis();

  // Get current coupon to get the code
  const coupon = await getCouponById(id);
  if (!coupon) {
    throw new Error('Coupon not found');
  }

  // Use pipeline for atomic deletion
  const pipeline = r.pipeline();
  pipeline.del(`${COUPON_KEY_PREFIX}${id}`);
  pipeline.srem(COUPONS_LIST_KEY, id);
  pipeline.del(`${COUPON_CODE_PREFIX}${coupon.code}`);
  await pipeline.exec();
}

// Increment coupon usage atomically
export async function incrementCouponUsage(id: string): Promise<void> {
  const r = getRedis();

  // Get current coupon
  const coupon = await getCouponById(id);
  if (!coupon) {
    throw new Error('Coupon not found');
  }

  // Update with incremented usage
  const updatedCoupon: Coupon = {
    ...coupon,
    currentUses: coupon.currentUses + 1,
  };

  await r.set(`${COUPON_KEY_PREFIX}${id}`, updatedCoupon);
}

// Migration helper: Import coupons from array
export async function importCoupons(coupons: Coupon[]): Promise<void> {
  const r = getRedis();

  for (const coupon of coupons) {
    const pipeline = r.pipeline();
    pipeline.set(`${COUPON_KEY_PREFIX}${coupon.id}`, coupon);
    pipeline.sadd(COUPONS_LIST_KEY, coupon.id);
    pipeline.set(`${COUPON_CODE_PREFIX}${coupon.code.toUpperCase()}`, coupon.id);
    await pipeline.exec();
  }
}
