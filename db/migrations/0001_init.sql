CREATE TABLE IF NOT EXISTS coupons (
  id          TEXT PRIMARY KEY,
  code        TEXT UNIQUE NOT NULL,
  data        JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id          TEXT PRIMARY KEY,
  data        JSONB NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_expires_at_idx ON orders (expires_at);
