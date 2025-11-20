import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error('RESEND_API_KEY environment variable is not configured');
}
const resend = new Resend(apiKey);

// Simple in-memory rate limiting (5 submissions per IP per hour)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // No limit or expired - reset counter
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return { allowed: true };
  }

  if (limit.count >= 5) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((limit.resetTime - now) / 1000); // seconds
    return { allowed: false, retryAfter };
  }

  // Increment counter
  limit.count += 1;
  return { allowed: true };
}

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, limit] of rateLimitMap.entries()) {
    if (now > limit.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);

interface LeadData {
  email: string;
  phone: string;
  bookInterest: boolean;
  courseInterest: boolean;
}

// HTML entity escaping to prevent injection
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Server-side validation functions
function isValidEmail(email: string): boolean {
  if (!email) return false;
  if (email.length > 254) return false; // RFC 5321 max email length
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidIsraeliPhone(phone: string): boolean {
  if (!phone) return false;
  if (phone.length > 20) return false;
  const phoneRegex = /^05[0-9](\d{7}|\d{3}-\d{4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Generate email subject based on interests
function generateSubject(data: LeadData): string {
  const interests = [];
  if (data.bookInterest) interests.push('Book Content');
  if (data.courseInterest) interests.push('Course Info');

  if (interests.length === 0) return 'New Lead from Nes HaTamar Website';

  return `New Lead - ${interests.join(' & ')} Interest`;
}

// Generate HTML email template with brand styling
function generateEmailHTML(data: LeadData): string {
  const { email, phone, bookInterest, courseInterest } = data;

  // Escape user inputs to prevent HTML injection
  const safeEmail = email ? escapeHtml(email) : '';
  const safePhone = phone ? escapeHtml(phone) : '';

  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
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
    .checkmark {
      display: inline-block;
      background-color: #C9A961;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
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
      <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">הודעה על ליד חדש</p>
    </div>

    <div class="content">
      ${safeEmail ? `
      <div class="field">
        <div class="label">דוא"ל</div>
        <div class="value"><a href="mailto:${safeEmail}" style="color: #C9A961; text-decoration: none;">${safeEmail}</a></div>
      </div>
      ` : ''}

      ${safePhone ? `
      <div class="field">
        <div class="label">טלפון</div>
        <div class="value"><a href="tel:${safePhone}" style="color: #C9A961; text-decoration: none;">${safePhone}</a></div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">תחומי עניין</div>
        <div class="value" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
          ${bookInterest ? '<span class="checkmark">✓ תוכן על הספר</span>' : ''}
          ${courseInterest ? '<span class="checkmark">✓ מידע על הקורס</span>' : ''}
        </div>
      </div>

      <div class="field">
        <div class="label">זמן הגשה</div>
        <div class="value">${new Date().toLocaleString('he-IL', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Jerusalem'
        })}</div>
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

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter || 3600)
          }
        }
      );
    }

    const body = await request.json();

    // Runtime type validation
    if (body.email !== undefined && typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }
    if (body.phone !== undefined && typeof body.phone !== 'string') {
      return NextResponse.json(
        { error: 'Invalid phone type' },
        { status: 400 }
      );
    }
    if (typeof body.bookInterest !== 'boolean' || typeof body.courseInterest !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid interest type' },
        { status: 400 }
      );
    }

    const leadData = body as LeadData;

    // Validate at least email OR phone required
    if (!leadData.email && !leadData.phone) {
      return NextResponse.json(
        { error: 'Email or phone number is required' },
        { status: 400 }
      );
    }

    // Validate at least one interest
    if (!leadData.bookInterest && !leadData.courseInterest) {
      return NextResponse.json(
        { error: 'At least one interest must be selected' },
        { status: 400 }
      );
    }

    // Server-side format validation
    if (leadData.email && !isValidEmail(leadData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (leadData.phone && !isValidIsraeliPhone(leadData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Get recipient email from environment or fallback
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || 'Nissimkrispiltamar@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Nes HaTamar Website <onboarding@resend.dev>';

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: generateSubject(leadData),
      html: generateEmailHTML(leadData),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
