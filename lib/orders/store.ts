import type { OrderData } from '@/types/order';
import { getDb, isDbConfigured } from '@/lib/db';

export const isOrderStoreConfigured = isDbConfigured;

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

export async function saveOrder(order: OrderData): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO orders (id, data, expires_at)
    VALUES (${order.id}, ${JSON.stringify(order)}, now() + interval '90 days')
    ON CONFLICT (id) DO UPDATE
      SET data = EXCLUDED.data,
          expires_at = EXCLUDED.expires_at
  `;
}

export async function getOrder(orderId: string): Promise<StoredOrder | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT data FROM orders
    WHERE id = ${orderId} AND expires_at > now()
  ` as Array<{ data: StoredOrder }>;
  return rows[0]?.data ?? null;
}

export async function setShipmentMeta(
  orderId: string,
  meta: ShipmentMeta,
  current?: StoredOrder | null,
): Promise<boolean> {
  const sql = getDb();
  const base = current ?? (await getOrder(orderId));
  if (!base) return false;

  const rows = await sql`
    UPDATE orders
    SET data = ${JSON.stringify({ ...base, shipmentMeta: meta })}
    WHERE id = ${orderId} AND expires_at > now()
    RETURNING id
  ` as Array<{ id: string }>;

  return rows.length > 0;
}
