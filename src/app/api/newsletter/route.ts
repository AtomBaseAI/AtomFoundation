import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({}));
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    const entry = await db.newsletterSubscriber.upsert({
      where: { email: String(email).slice(0, 160) },
      update: {},
      create: { email: String(email).slice(0, 160) },
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
