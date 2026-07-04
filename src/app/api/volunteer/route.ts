import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, role, location, skills, availability, motivation } = body;
    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { error: "Name, email, phone and role are required." },
        { status: 400 }
      );
    }
    const entry = await db.volunteerSignup.create({
      data: {
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        phone: String(phone).slice(0, 20),
        role: String(role).slice(0, 120),
        location: location ? String(location).slice(0, 120) : null,
        skills: skills ? String(skills).slice(0, 400) : null,
        availability: availability ? String(availability).slice(0, 120) : null,
        motivation: motivation ? String(motivation).slice(0, 2000) : null,
      },
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("Volunteer error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
