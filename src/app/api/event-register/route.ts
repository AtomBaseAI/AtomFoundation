import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { eventId, name, email, phone, role } = body;
    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "Event, name and email are required." },
        { status: 400 }
      );
    }
    const entry = store.addEventRegistration({
      eventId: String(eventId).slice(0, 60),
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 160),
      phone: phone ? String(phone).slice(0, 20) : null,
      role: role ? String(role).slice(0, 60) : null,
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("Event registration error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
