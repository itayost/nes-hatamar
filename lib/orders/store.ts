import { Redis } from '@upstash/redis';
import type { OrderData } from '@/types/order';

/**
 * Order persistence backed by Upstash Redis.
 *
 * We need this because the PayMe webhook only carries transaction_id +
 * a small subset of fields — but the HFD shipment requires the full
 * customer + shipping address. Stash the OrderData at create time and
 * read it back when payment completes.
 *
 * Same client pattern as lib/coupons-store.ts.
 */

const ORDER_KEY_PREFIX = 'order:';
const ORDER_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error(
        'Upstash Redis credentials not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
      );
    }

    redis = new Redis({ url, token });
  }
  return redis;
}

export function isOrderStoreConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

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
 * Attach HFD shipment metadata to an existing order.
 * Refreshes the TTL so paid orders stay around for the full window
 * after the webhook fires (which may be days after creation).
 */
export async function setShipmentMeta(orderId: string, meta: ShipmentMeta): Promise<void> {
  const r = getRedis();
  const current = await getOrder(orderId);
  if (!current) return;

  const updated: StoredOrder = {
    ...current,
    shipmentMeta: meta,
  };
  await r.set(key(orderId), updated, { ex: ORDER_TTL_SECONDS });
}
