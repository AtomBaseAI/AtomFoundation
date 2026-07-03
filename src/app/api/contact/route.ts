import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject and message are required." },
        { status: 400 }
      );
    }
    const entry = store.addContactMessage({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      phone: phone ? String(phone).slice(0, 20) : null,
      subject: String(subject).slice(0, 160),
      message: String(message).slice(0, 4000),
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
