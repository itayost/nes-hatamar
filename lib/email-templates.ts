import { OrderData } from '@/types/order';

// HTML entity escaping to prevent injection
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateOrderEmailHTML(order: OrderData): string {
  const { customerInfo, product, originalPrice, discountAmount, finalPrice, couponCode, createdAt } = order;

  const safeEmail = escapeHtml(customerInfo.email);
  const safeName = escapeHtml(customerInfo.name);
  const safePhone = escapeHtml(customerInfo.phone);
  const safeCoupon = couponCode ? escapeHtml(couponCode) : null;

  const productName = product === 'course' ? 'קורס מבוא להומאופטיה' : 'ספר נס התמר';

  const formattedDate = new Date(createdAt).toLocaleString('he-IL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jerusalem',
  });

  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הזמנה חדשה - נס התמר</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FFFEF7;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(201, 169, 97, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #C9A961 0%, #E5D3A6 100%);
      padding: 30px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
      color: #2C2416;
    }
    .product-badge {
      display: inline-block;
      background: linear-gradient(135deg, #C9A961 0%, #E5D3A6 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 25px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(201, 169, 97, 0.2);
    }
    .field:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #C9A961;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      font-size: 16px;
      color: #2C2416;
      margin-top: 5px;
    }
    .price-section {
      background-color: #FFFEF7;
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 16px;
    }
    .price-row.total {
      border-top: 2px solid #C9A961;
      margin-top: 10px;
      padding-top: 15px;
      font-weight: bold;
      font-size: 20px;
      color: #C9A961;
    }
    .discount-tag {
      background-color: #22c55e;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 5px;
    }
    .footer {
      background-color: #FFFEF7;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: rgba(44, 36, 22, 0.7);
    }
    .ornament {
      color: #C9A961;
      font-size: 20px;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✦ נס התמר ✦</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">הזמנה חדשה התקבלה!</p>
    </div>

    <div class="content">
      <div style="text-align: center;">
        <span class="product-badge">${productName}</span>
      </div>

      <div class="field">
        <div class="label">פרטי הלקוח</div>
        <div class="value">
          <strong>${safeName}</strong><br>
          <a href="mailto:${safeEmail}" style="color: #C9A961; text-decoration: none;">${safeEmail}</a><br>
          <a href="tel:${safePhone}" style="color: #C9A961; text-decoration: none;">${safePhone}</a>
        </div>
      </div>

      <div class="price-section">
        <div class="price-row">
          <span>מחיר מקורי</span>
          <span>₪${originalPrice.toLocaleString()}</span>
        </div>
        ${discountAmount > 0 ? `
        <div class="price-row" style="color: #22c55e;">
          <span>
            <span class="discount-tag">קופון</span>
            ${safeCoupon || 'הנחה'}
          </span>
          <span>-₪${discountAmount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="price-row total">
          <span>סה"כ לתשלום</span>
          <span>₪${finalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div class="field" style="margin-top: 20px;">
        <div class="label">זמן הזמנה</div>
        <div class="value">${formattedDate}</div>
      </div>

      <div class="field">
        <div class="label">מספר הזמנה</div>
        <div class="value" style="font-family: monospace; font-size: 14px;">${order.id}</div>
      </div>

      <div class="field">
        <div class="label">סטטוס תשלום</div>
        <div class="value" style="color: #f59e0b; font-weight: 600;">⏳ ממתין לתשלום</div>
      </div>
    </div>

    <div class="footer">
      <span class="ornament">✦</span>
      הודעה זו נשלחה אוטומטית מאתר נס התמר
      <span class="ornament">✦</span>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateOrderSubject(order: OrderData): string {
  const productName = order.product === 'course' ? 'קורס מבוא להומאופטיה' : 'ספר נס התמר';
  return `הזמנה חדשה - ${productName} - ${order.customerInfo.name}`;
}
