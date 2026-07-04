/**
 * Simple in-memory rate limiter for the login endpoint.
 *
 * Limits failed login attempts per IP to mitigate brute-force attacks.
 * Tracks attempts in a Map that auto-expires entries after the window.
 * In a multi-instance production deployment this should be replaced with
 * a Redis-backed limiter, but for a single-process server it is sufficient.
 */

type AttemptRecord = {
  count: number;
  firstAttempt: number;
  lockedUntil: number;
};

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000; // lock for 15 minutes after threshold

const attempts = new Map<string, AttemptRecord>();

// Periodically purge expired entries to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of attempts) {
    if (now - rec.firstAttempt > WINDOW_MS && now > rec.lockedUntil) {
      attempts.delete(ip);
    }
  }
}, 60 * 1000);

/** Returns the remaining lock time in ms, or 0 if not locked. */
export function getLockRemaining(ip: string): number {
  const rec = attempts.get(ip);
  if (!rec) return 0;
  const now = Date.now();
  if (now < rec.lockedUntil) return rec.lockedUntil - now;
  return 0;
}

/** Record a failed attempt and return whether the IP is now locked. */
export function recordFailedAttempt(ip: string): { locked: boolean; retryAfterMs: number } {
  const now = Date.now();
  let rec = attempts.get(ip);

  if (!rec || now - rec.firstAttempt > WINDOW_MS) {
    rec = { count: 0, firstAttempt: now, lockedUntil: 0 };
    attempts.set(ip, rec);
  }

  rec.count += 1;

  if (rec.count >= MAX_ATTEMPTS) {
    rec.lockedUntil = now + LOCK_MS;
    return { locked: true, retryAfterMs: LOCK_MS };
  }

  return { locked: false, retryAfterMs: 0 };
}

/** Clear attempts for an IP (called on successful login). */
export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

/** Extract client IP from a NextRequest, accounting for proxies. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
