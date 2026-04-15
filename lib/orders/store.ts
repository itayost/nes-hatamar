import type { OrderData } from '@/types/order';
import { getRedis, isRedisConfigured } from '@/lib/redis';

const ORDER_KEY_PREFIX = 'order:';
const ORDER_TTL_SECONDS = 90 * 24 * 60 * 60;

export const isOrderStoreConfigured = isRedisConfigured;

/**
 * Metadata about the HFD shipment created (or attempted) for an order.
 * Persisted on the StoredOrder so duplicate webhooks can be detected
 * and the admin email can include the tracking number.
 */
export interface ShipmentMeta {
  shipmentNumber?: number;
  randomId?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface StoredOrder extends OrderData {
  shipmentMeta?: ShipmentMeta;
}

function key(orderId: string): string {
  return `${ORDER_KEY_PREFIX}${orderId}`;
}

/**
 * Persist a freshly created order with a 90-day TTL.
 */
export async function saveOrder(order: OrderData): Promise<void> {
  const r = getRedis();
  await r.set(key(order.id), order, { ex: ORDER_TTL_SECONDS });
}

/**
 * Fetch an order by ID. Returns null when not found (or expired).
 */
export async function getOrder(orderId: string): Promise<StoredOrder | null> {
  const r = getRedis();
  return r.get<StoredOrder>(key(orderId));
}

/**
 * Attach HFD shipment metadata to an existing order. Pass the already-loaded
 * order to skip a refetch. Returns false when the order is not in Redis
 * (e.g. expired) — callers should log and treat the HFD call as non-idempotent.
 */
export async function setShipmentMeta(
  orderId: string,
  meta: ShipmentMeta,
  current?: StoredOrder | null,
): Promise<boolean> {
  const r = getRedis();
  const base = current ?? (await getOrder(orderId));
  if (!base) return false;

  await r.set(key(orderId), { ...base, shipmentMeta: meta }, { ex: ORDER_TTL_SECONDS });
  return true;
}
