import { NextRequest, NextResponse } from "next/server";
import { contentFetchers, type ContentType } from "@/lib/queries";

// Always fetch fresh data from the database (dynamic, never static/cached).
export const dynamic = "force-dynamic";

/**
 * GET /api/content?types=site,programs,events,...
 *
 * Returns a JSON object keyed by content type. Each value is the data fetched
 * live from PostgreSQL.
 *
 * Example response:
 *   { "data": { "site": {...}, "programs": [...], "events": [...] }, "errors": {} }
 */
export async function GET(request: NextRequest) {
  const typesParam = request.nextUrl.searchParams.get("types") ?? "";
  const requested = typesParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean) as ContentType[];

  if (requested.length === 0) {
    return NextResponse.json(
      { error: "Missing 'types' query parameter, e.g. ?types=site,programs" },
      { status: 400 }
    );
  }

  const result: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  await Promise.all(
    requested.map(async (type) => {
      const fetcher = contentFetchers[type];
      if (!fetcher) {
        errors[type] = "Unknown content type";
        return;
      }
      try {
        result[type] = await fetcher();
      } catch (err) {
        errors[type] = err instanceof Error ? err.message : "Fetch failed";
      }
    })
  );

  return NextResponse.json({ data: result, errors });
}
