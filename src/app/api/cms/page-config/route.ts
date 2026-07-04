import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/cms/page-config
 * Body: { key: string, visible?: boolean, formsVisible?: boolean }
 *
 * Toggles the visibility of a single page and/or its forms. When a group
 * parent is hidden, its children are automatically hidden too (cascade).
 */
export async function PATCH(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { key, visible, formsVisible } = body;

    if (typeof key !== "string") {
      return NextResponse.json(
        { error: "Expected { key: string, visible?: boolean, formsVisible?: boolean }" },
        { status: 400 }
      );
    }

    if (visible === undefined && formsVisible === undefined) {
      return NextResponse.json(
        { error: "Provide at least one of: visible, formsVisible" },
        { status: 400 }
      );
    }

    const existing = await db.pageConfig.findUnique({ where: { key } });
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Build update data (only update fields that are provided)
    const updateData: { visible?: boolean; formsVisible?: boolean } = {};
    if (typeof visible === "boolean") updateData.visible = visible;
    if (typeof formsVisible === "boolean") updateData.formsVisible = formsVisible;

    // Update the page itself
    await db.pageConfig.update({
      where: { key },
      data: updateData,
    });

    // Cascade: if this is a group parent being hidden, hide all children too.
    if (typeof visible === "boolean" && existing.group === null && !visible) {
      const children = await db.pageConfig.findMany({
        where: { group: key },
      });
      if (children.length > 0) {
        await db.pageConfig.updateMany({
          where: { group: key },
          data: { visible: false },
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Page config update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cms/page-config
 * Returns all page config entries (same as /api/content?types=page-config
 * but requires auth and includes all fields).
 */
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db.pageConfig.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({
    data: rows.map((r) => ({
      key: r.key,
      label: r.label,
      route: r.route,
      group: r.group,
      visible: r.visible,
      formsVisible: r.formsVisible,
    })),
  });
}
