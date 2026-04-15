# HFD Courier Integration Runbook

Nes Hatamar dispatches every paid book order to HFD's ERP so the courier picks
up the package. The site owner tracks everything inside the HFD dashboard —
we do not build a local orders UI.

## How it works

1. `POST /api/create-order` builds the order and persists it to Upstash Redis
   via `lib/orders/store.ts` (90-day TTL).
2. The customer pays through PayMe's hosted page.
3. PayMe POSTs `/api/payme-webhook` with the `transaction_id` (our order ID).
4. The webhook reads the persisted order, maps it to HFD's payload
   (`lib/hfd/map-order.ts`), and calls `POST https://api.hfd.co.il/rest/v2/shipments/create`.
5. HFD returns a `shipmentNumber`; we save it on the order and include it in
   the admin confirmation email.

If the HFD call fails, the webhook still returns 200 and the admin email
carries the error message so the owner can ship manually.

## Credentials

Contact HFD support to receive:

| Env var | Meaning |
|---|---|
| `HFD_API_TOKEN` | Bearer token (valid 2 years, renewed by HFD) |
| `HFD_CLIENT_NUMBER` | Your customer number (numeric) |
| `HFD_SHIPMENT_TYPE_CODE` | Shipment type code that matches your contract |
| `HFD_CARGO_TYPE_HALOCH` | Outbound cargo type code |
| `HFD_ORDERER_NAME` | Company name on the label (<= 10 chars) |
| `HFD_API_URL` | Optional — defaults to `https://api.hfd.co.il/rest/v2` |

Set these in Vercel → Project → Settings → Environment Variables for
**Production** and **Preview**. Never commit them to git.

The API docs ship with the repo at `API/API documentation for HFD ERP system.pdf`.
Swagger is available at https://api.hfd.co.il/docs.

## Verifying a dispatch

1. Place a test book order through the site.
2. Pay through PayMe (sandbox or a small real order).
3. Watch Vercel function logs for `HFD dispatch for order ORD-...: status=created shipment=<number>`.
4. Open the HFD ERP dashboard and confirm the shipment appears with your
   order ID as `referenceNum1`.
5. The admin email (to `LEAD_RECIPIENT_EMAIL`) should contain the
   "משלוח HFD נוצר" block with the shipment number.

## Edge cases

- **Course orders** — no shipping address, webhook skips HFD.
- **International orders** — `shippingAddress.country !== 'IL'`, webhook skips
  HFD and flags the admin email so the owner ships manually.
- **Duplicate webhooks** — PayMe retries. The webhook checks
  `order.shipmentMeta.shipmentNumber` and exits early if already dispatched.
  HFD also returns errorCode 500/600 with `existingShipmentNumber` for a
  duplicate `referenceNum1`; we treat that as success.
- **Missing env vars** — the webhook logs a warning and skips HFD; payment
  still completes normally.
- **Missing Redis** — `saveOrder` fails silently at create-order time, so the
  webhook won't find the order and will skip HFD with a logged warning.

## Local smoke test

```bash
# 1. Start the dev server
pnpm dev  # or npm run dev

# 2. Create an order
curl -X POST http://localhost:3000/api/create-order \
  -H 'Content-Type: application/json' \
  -d '{
    "product": "book",
    "customerInfo": { "name": "Test", "email": "t@t.il", "phone": "0500000000" },
    "shippingAddress": {
      "street": "דיזנגוף 114",
      "apartmentFloor": "5",
      "city": "תל אביב",
      "postalCode": "6433223",
      "country": "IL"
    },
    "quantity": 1
  }'
# Expect: 200 + { orderId: "ORD-..." }

# 3. Simulate the PayMe success webhook
curl -X POST http://localhost:3000/api/payme-webhook \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'transaction_id=ORD-XXX&sale_status=success&payme_sale_id=T1&sale_price=59000&buyer_name=Test&buyer_email=t@t.il'
# Expect: 200; logs show HFD dispatch status; admin email lists the shipment number.
```

## Manual operations

The library also exposes `getShipment`, `getLabelPdf`, and `cancelShipment` in
`lib/hfd/client.ts`. There is no admin UI for these today — invoke them from a
Node REPL or build a small admin endpoint when needed.
