import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { getModelDef, type Field } from "@/lib/cms-models";

export const dynamic = "force-dynamic";

/**
 * GET    /api/cms/[model]/[id]   → get a single record
 * PUT    /api/cms/[model]/[id]   → update a record
 * DELETE /api/cms/[model]/[id]   → delete a record
 */

function getModelDelegate(prismaModel: string): any {
  const delegate = (db as any)[prismaModel];
  if (!delegate) {
    throw new Error(`Unknown Prisma model: ${prismaModel}`);
  }
  return delegate;
}

function serialize(row: any, fields: Field[]): Record<string, unknown> {
  if (!row) return row;
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const val = row[f.name];
    if (val instanceof Date) {
      out[f.name] = val.toISOString();
    } else {
      out[f.name] = val;
    }
  }
  out.id = row.id;
  return out;
}

function deserialize(body: Record<string, unknown>, fields: Field[]): Record<string, any> {
  const data: Record<string, any> = {};
  for (const f of fields) {
    if (!(f.name in body)) continue;
    const raw = body[f.name];
    switch (f.type) {
      case "number":
        data[f.name] = raw === "" || raw === null || raw === undefined ? null : Number(raw);
        break;
      case "boolean":
        data[f.name] = raw === true || raw === "true" || raw === 1 || raw === "1";
        break;
      case "date":
      case "datetime":
        data[f.name] = raw ? new Date(raw as string) : null;
        break;
      case "json":
        if (raw === "" || raw === null || raw === undefined) {
          data[f.name] = null;
        } else if (typeof raw === "string") {
          try {
            data[f.name] = JSON.parse(raw);
          } catch {
            data[f.name] = raw;
          }
        } else {
          data[f.name] = raw;
        }
        break;
      case "array":
        if (Array.isArray(raw)) {
          data[f.name] = raw;
        } else if (typeof raw === "string") {
          data[f.name] = raw
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        } else {
          data[f.name] = [];
        }
        break;
      default:
        data[f.name] = raw === "" ? null : raw;
    }
  }
  return data;
}

function parseId(id: string, idType: "string" | "number") {
  return idType === "number" ? Number(id) : id;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug, id } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }

  const delegate = getModelDelegate(def.prismaModel);
  try {
    const row = await delegate.findUnique({
      where: { [def.idField]: parseId(id, def.idType) },
    });
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: serialize(row, def.fields) });
  } catch (err) {
    console.error(`CMS GET /${slug}/${id} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug, id } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }
  if (def.readOnly) {
    return NextResponse.json(
      { error: "This model is read-only." },
      { status: 403 }
    );
  }

  const delegate = getModelDelegate(def.prismaModel);
  try {
    const body = await req.json().catch(() => ({}));
    const data = deserialize(body, def.fields);
    const row = await delegate.update({
      where: { [def.idField]: parseId(id, def.idType) },
      data,
    });
    return NextResponse.json({ data: serialize(row, def.fields) });
  } catch (err) {
    console.error(`CMS PUT /${slug}/${id} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug, id } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }
  if (def.readOnly || def.singleton) {
    return NextResponse.json(
      { error: "This model does not support deletion." },
      { status: 403 }
    );
  }

  const delegate = getModelDelegate(def.prismaModel);
  try {
    await delegate.delete({
      where: { [def.idField]: parseId(id, def.idType) },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`CMS DELETE /${slug}/${id} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete" },
      { status: 500 }
    );
  }
}
