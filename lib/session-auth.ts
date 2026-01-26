import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const SESSION_COOKIE_NAME = 'nes_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Admin secret path
export const ADMIN_SECRET_PATH = 'admin';

// Get the admin password from environment variable
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'Tamar@1974';
}

// Get the session secret for signing cookies
function getSessionSecret(): string {
  return process.env.SESSION_SECRET || 'nes-hatamar-admin-secret-key-2024';
}

// Sign a value with HMAC
function signValue(value: string): string {
  const secret = getSessionSecret();
  const hmac = createHmac('sha256', secret);
  hmac.update(value);
  return hmac.digest('hex');
}

// Create a signed session token
function createSessionToken(): string {
  const expiry = Date.now() + SESSION_EXPIRY;
  const data = `admin:${expiry}`;
  const signature = signValue(data);
  return `${data}:${signature}`;
}

// Verify and parse a session token
function verifySessionToken(token: string): { valid: boolean; expiry?: number } {
  try {
    const parts = token.split(':');
    if (parts.length !== 3) {
      return { valid: false };
    }

    const [role, expiryStr, signature] = parts;
    const data = `${role}:${expiryStr}`;
    const expectedSignature = signValue(data);

    // Use timing-safe comparison to prevent timing attacks
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
      return { valid: false };
    }

    if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
      return { valid: false };
    }

    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || expiry < Date.now()) {
      return { valid: false };
    }

    return { valid: true, expiry };
  } catch {
    return { valid: false };
  }
}

// Verify password and create session
export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  if (!password || typeof password !== 'string') {
    return { success: false, error: 'Password is required' };
  }

  const adminPassword = getAdminPassword();

  // Simple password comparison (use timing-safe for security)
  const passwordBuffer = Buffer.from(password);
  const adminBuffer = Buffer.from(adminPassword);

  let isValid = false;
  if (passwordBuffer.length === adminBuffer.length) {
    isValid = timingSafeEqual(passwordBuffer, adminBuffer);
  }

  if (!isValid) {
    return { success: false, error: 'Invalid password' };
  }

  // Generate signed session token
  const token = createSessionToken();

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_EXPIRY / 1000, // in seconds
    path: '/',
  });

  return { success: true };
}

// Logout - clear session
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Check if current request has valid session
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return false;
    }

    const { valid } = verifySessionToken(token);
    return valid;
  } catch {
    return false;
  }
}

// Change admin password - not supported without database
// Password should be changed via environment variable
export async function changePassword(
  _currentPassword: string,
  _newPassword: string
): Promise<{ success: boolean; error?: string }> {
  return {
    success: false,
    error: 'Password change not supported. Update ADMIN_PASSWORD environment variable in Vercel.',
  };
}
