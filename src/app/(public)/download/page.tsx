import { notFound } from "next/navigation";
import DownloadClient from "./download-client";

/**
 * Download page.
 *
 * Disabled in production for security — the source-code archive endpoint is
 * only available during development. In production this route returns 404.
 */
export const dynamic = "force-dynamic";

export default function DownloadPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <DownloadClient />;
}
