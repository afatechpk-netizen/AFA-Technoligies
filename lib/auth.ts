import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "afa_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "afa-technologies-enterprise-admin-secret-key-2026"
  );
}

export interface AdminSession {
  username: string;
  role: "admin";
  issuedAt: number;
  expiresAt: number;
}

export function createSessionToken(username: string): string {
  const secret = getSecretKey();
  const now = Date.now();
  const payload: AdminSession = {
    username,
    role: "admin",
    issuedAt: now,
    expiresAt: now + SESSION_MAX_AGE * 1000,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const secret = getSecretKey();

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");

  try {
    const isMatch = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!isMatch) return null;

    const payloadStr = Buffer.from(payloadB64, "base64url").toString("utf8");
    const payload: AdminSession = JSON.parse(payloadStr);

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function setAdminSession(username: string): Promise<void> {
  const token = createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function validateCredentials(user: string, pass: string): boolean {
  const inputUser = user.trim().toLowerCase();
  const validUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const validEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const validPass = (process.env.ADMIN_PASSWORD || "admin123").trim();

  const userMatches =
    inputUser === validUser || (validEmail !== "" && inputUser === validEmail);

  return userMatches && pass.trim() === validPass;
}
