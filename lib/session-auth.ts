import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

const AUTH_FILE = path.join(process.cwd(), 'data', 'admin-auth.json');
const SESSION_COOKIE_NAME = 'nes_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Admin secret path - change this to a random string in production
export const ADMIN_SECRET_PATH = 'admin-nes-hatamar-2025';

interface AuthData {
  passwordHash: string;
  sessions: { [token: string]: number }; // token -> expiry timestamp
}

async function readAuthData(): Promise<AuthData> {
  try {
    const data = await fs.readFile(AUTH_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Create default auth file if it doesn't exist
    const defaultHash = await bcrypt.hash('admin123', 10); // Default password - CHANGE IN PRODUCTION
    const defaultData: AuthData = {
      passwordHash: defaultHash,
      sessions: {},
    };
    await writeAuthData(defaultData);
    return defaultData;
  }
}

async function writeAuthData(data: AuthData): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2);
  const tempFile = `${AUTH_FILE}.tmp`;
  await fs.writeFile(tempFile, jsonData, 'utf-8');
  await fs.rename(tempFile, AUTH_FILE);
}

// Generate a secure random token
function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Clean expired sessions
async function cleanExpiredSessions(authData: AuthData): Promise<AuthData> {
  const now = Date.now();
  const validSessions: { [token: string]: number } = {};

  for (const [token, expiry] of Object.entries(authData.sessions)) {
    if (expiry > now) {
      validSessions[token] = expiry;
    }
  }

  authData.sessions = validSessions;
  return authData;
}

// Verify password and create session
export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  if (!password || typeof password !== 'string') {
    return { success: false, error: 'Password is required' };
  }

  const authData = await readAuthData();
  const isValid = await bcrypt.compare(password, authData.passwordHash);

  if (!isValid) {
    return { success: false, error: 'Invalid password' };
  }

  // Generate session token
  const token = generateToken();
  const expiry = Date.now() + SESSION_EXPIRY;

  // Clean expired sessions and add new one
  const cleanedData = await cleanExpiredSessions(authData);
  cleanedData.sessions[token] = expiry;
  await writeAuthData(cleanedData);

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
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    // Remove session from storage
    const authData = await readAuthData();
    delete authData.sessions[token];
    await writeAuthData(authData);

    // Clear cookie
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}

// Check if current request has valid session
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return false;
    }

    const authData = await readAuthData();
    const expiry = authData.sessions[token];

    if (!expiry || expiry < Date.now()) {
      // Session expired or doesn't exist
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Change admin password
export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters' };
  }

  const authData = await readAuthData();
  const isValid = await bcrypt.compare(currentPassword, authData.passwordHash);

  if (!isValid) {
    return { success: false, error: 'Current password is incorrect' };
  }

  // Hash new password and update
  authData.passwordHash = await bcrypt.hash(newPassword, 10);
  // Clear all sessions for security
  authData.sessions = {};
  await writeAuthData(authData);

  return { success: true };
}
