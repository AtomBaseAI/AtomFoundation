import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { getModelDef, type Field } from "@/lib/cms-models";

export const dynamic = "force-dynamic";

/**
 * GET  /api/cms/[model]          → list all records (or get singleton)
 * POST /api/cms/[model]          → create a new record
 */

function getModelDelegate(prismaModel: string): any {
  const delegate = (db as any)[prismaModel];
  if (!delegate) {
    throw new Error(`Unknown Prisma model: ${prismaModel}`);
  }
  return delegate;
}

/** Convert a raw DB row into a JSON-safe response (dates → ISO strings). */
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
  // always include the id
  out.id = row.id;
  return out;
}

/** Convert form-encoded string values into the types Prisma expects. */
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
            data[f.name] = raw; // store as-is if not valid JSON
          }
        } else {
          data[f.name] = raw; // already an object/array
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  // Auth check
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }

  const delegate = getModelDelegate(def.prismaModel);

  try {
    if (def.singleton) {
      const row = await delegate.findUnique({ where: { id: "default" } });
      return NextResponse.json({ data: serialize(row, def.fields) });
    }

    const orderBy = def.fields.some((f) => f.name === "order")
      ? { order: "asc" as const }
      : def.fields.some((f) => f.name === "createdAt")
      ? { createdAt: "desc" as const }
      : undefined;

    const rows = await delegate.findMany({ orderBy });
    return NextResponse.json({
      data: rows.map((r: unknown) => serialize(r, def.fields)),
    });
  } catch (err) {
    console.error(`CMS GET /${slug} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }
  if (def.readOnly || def.singleton) {
    return NextResponse.json(
      { error: "This model does not support creating new records." },
      { status: 403 }
    );
  }

  const delegate = getModelDelegate(def.prismaModel);

  try {
    const body = await req.json().catch(() => ({}));
    const data = deserialize(body, def.fields);

    // Auto-assign next order if not provided
    if (def.fields.some((f) => f.name === "order") && data.order == null) {
      const count = await delegate.count();
      data.order = count;
    }

    const row = await delegate.create({ data });
    return NextResponse.json({ data: serialize(row, def.fields) });
  } catch (err) {
    console.error(`CMS POST /${slug} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model: slug } = await params;
  const def = getModelDef(slug);
  if (!def) {
    return NextResponse.json({ error: "Unknown model" }, { status: 404 });
  }

  const delegate = getModelDelegate(def.prismaModel);

  try {
    const body = await req.json().catch(() => ({}));
    const data = deserialize(body, def.fields);

    if (def.singleton) {
      const row = await delegate.upsert({
        where: { id: "default" },
        update: data,
        create: { id: "default", ...data },
      });
      return NextResponse.json({ data: serialize(row, def.fields) });
    }

    return NextResponse.json(
      { error: "Use PUT /api/cms/[model]/[id] for non-singleton models." },
      { status: 400 }
    );
  } catch (err) {
    console.error(`CMS PUT /${slug} error:`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}
