import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({}));
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    const entry = store.addNewsletterSubscriber(String(email).slice(0, 160));
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
