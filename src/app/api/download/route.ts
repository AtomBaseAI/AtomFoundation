import { NextResponse } from "next/server";
import { ZipArchive, type Archiver } from "archiver";
import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Root directory of the project (where package.json lives).
const PROJECT_ROOT = process.cwd();

// Directories and files to exclude from the archive.
// Build artifacts, dependencies, version control, logs and caches are skipped
// so the zip contains only the source code.
const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".zscripts",
  "skills",
  "upload",
  "tool-results",
  "agent-ctx",
]);

const EXCLUDE_FILES = new Set([
  "dev.log",
  "server.log",
  "tsconfig.tsbuildinfo",
  "bun.lock",
]);

function shouldExcludeDir(name: string) {
  return EXCLUDE_DIRS.has(name);
}

function shouldExcludeFile(name: string) {
  if (EXCLUDE_FILES.has(name)) return true;
  // Skip any other log files that may appear.
  if (name.endsWith(".log")) return true;
  return false;
}

type Dirent = import("node:fs").Dirent;

/**
 * Recursively walk the project tree and add every included file to the archive
 * under a top-level folder named after the project.
 */
async function addDirectoryToArchive(
  archive: Archiver,
  dirPath: string,
  archiveBase: string
) {
  let entries: Dirent[];
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const archivePath = path.join(archiveBase, entry.name);

    if (entry.isDirectory()) {
      if (shouldExcludeDir(entry.name)) continue;
      await addDirectoryToArchive(archive, fullPath, archivePath);
    } else if (entry.isFile()) {
      if (shouldExcludeFile(entry.name)) continue;
      archive.file(fullPath, { name: archivePath });
    }
    // Symlinks and other types are skipped for safety.
  }
}

export async function GET() {
  // Disable the source-code archive endpoint in production for security.
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    await fs.access(PROJECT_ROOT);

    const archive: Archiver = new ZipArchive({ zlib: { level: 6 } });
    const projectName = "atom-arc-foundation";
    const fileName = `${projectName}-source.zip`;

    // Use a PassThrough stream so we never write the zip to disk — it streams
    // straight into the HTTP response.
    const { PassThrough } = await import("node:stream");
    const passthrough = new PassThrough();

    archive.on("error", (err) => {
      // If archiving fails mid-stream, surface it to the client.
      passthrough.destroy(err);
    });

    archive.pipe(passthrough);

    // Convert the Node readable stream into a Web ReadableStream for the Response.
    const webStream = new ReadableStream<Uint8Array>({
      start(controller) {
        passthrough.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        passthrough.on("end", () => {
          controller.close();
        });
        passthrough.on("error", (err: unknown) => {
          controller.error(err);
        });
      },
      cancel() {
        passthrough.destroy();
        archive.abort();
      },
    });

    // Add all source files under a single top-level folder so unzipping is clean.
    await addDirectoryToArchive(archive, PROJECT_ROOT, projectName);

    // Signal that we are done adding files — archiver will finalize the stream.
    archive.finalize();

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Download archive error:", err);
    return NextResponse.json(
      { error: "Failed to generate source archive." },
      { status: 500 }
    );
  }
}
