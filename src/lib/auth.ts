import { SignJWT, jwtVerify } from "jose";

/**
 * CMS authentication helpers.
 *
 * Uses JWT (HS256) stored in an httpOnly cookie for stateless auth.
 * Credentials are read from env vars with fallback defaults so the CMS
 * works out-of-the-box (the .env documents them as commented lines).
 */

const COOKIE_NAME = "cms-token";

const ADMIN_EMAIL =
  process.env.CMS_ADMIN_EMAIL || "admin@atomfoundations.org";
const ADMIN_PASSWORD =
  process.env.CMS_ADMIN_PASSWORD || "Mr@1811321";

const JWT_SECRET = new TextEncoder().encode(
  process.env.CMS_JWT_SECRET || "atom-foundation-cms-jwt-secret-2025"
);

export type SessionPayload = {
  email: string;
  role: "admin";
};

/** Verify email + password against the configured admin credentials. */
export function verifyCredentials(
  email: string,
  password: string
): { valid: boolean; user?: SessionPayload } {
  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    return { valid: true, user: { email: ADMIN_EMAIL, role: "admin" } };
  }
  return { valid: false };
}

/** Sign a JWT for the given session payload (7-day expiry). */
export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .setSubject(payload.email)
    .sign(JWT_SECRET);
}

/** Verify a JWT and return the payload, or null if invalid/expired. */
export async function verifyToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (
      typeof payload.email === "string" &&
      payload.role === "admin"
    ) {
      return { email: payload.email, role: "admin" };
    }
    return null;
  } catch {
    return null;
  }
}

/** Read and verify the session from a Next.js Request's cookies. */
export async function getSessionFromRequest(
  request: Request
): Promise<SessionPayload | null> {
  // Works for both NextRequest (runtime) and standard Request
  const cookieHeader = request.headers.get("cookie") || "";
  const token = parseCookie(cookieHeader, COOKIE_NAME);
  return verifyToken(token);
}

function parseCookie(header: string, name: string): string | undefined {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export { COOKIE_NAME, ADMIN_EMAIL };
