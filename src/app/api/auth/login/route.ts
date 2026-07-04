import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signToken, COOKIE_NAME, ADMIN_EMAIL } from "@/lib/auth";
import {
  getLockRemaining,
  recordFailedAttempt,
  clearAttempts,
  getClientIp,
} from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limit check — reject if IP is currently locked
    const lockRemaining = getLockRemaining(ip);
    if (lockRemaining > 0) {
      return NextResponse.json(
        {
          error: "Too many failed attempts. Please try again later.",
          retryAfterSeconds: Math.ceil(lockRemaining / 1000),
        },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(lockRemaining / 1000)) },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { valid, user } = verifyCredentials(email, password);
    if (!valid || !user) {
      const { locked, retryAfterMs } = recordFailedAttempt(ip);
      if (locked) {
        return NextResponse.json(
          {
            error: "Too many failed attempts. Account locked for 15 minutes.",
            retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
          },
          {
            status: 429,
            headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
          }
        );
      }
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Successful login — clear any failed attempts for this IP
    clearAttempts(ip);

    const token = await signToken(user);
    const res = NextResponse.json({
      ok: true,
      user: { email: ADMIN_EMAIL, role: "admin" },
    });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
