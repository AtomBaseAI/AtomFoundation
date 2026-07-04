import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Resolve DATABASE_URL directly from the .env file.
 *
 * The sandbox shell may export a stale `DATABASE_URL` (e.g. an old SQLite
 * path) that would override the value in `.env`. To make the app robust we
 * parse `.env` ourselves and prefer its value, falling back to process.env.
 */
function loadDatabaseUrl(): string {
  const fromProcess = process.env.DATABASE_URL;
  if (fromProcess && fromProcess.startsWith("postgresql://")) {
    return fromProcess;
  }
  try {
    const envPath = resolve(process.cwd(), ".env");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (key !== "DATABASE_URL") continue;
      let value = trimmed.slice(eq + 1).trim();
      // strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (value) return value;
    }
  } catch {
    // ignore — fall through to process.env
  }
  return fromProcess ?? "";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  let url = loadDatabaseUrl();
  // Append connection-pool parameters for Neon Postgres stability.
  // connection_limit=5 keeps the pool small for dev/serverless; pool_timeout=10
  // prevents indefinite hangs when the pool is exhausted.
  if (url && url.startsWith("postgresql://") && !url.includes("connection_limit")) {
    const sep = url.includes("?") ? "&" : "?";
    url = `${url}${sep}connection_limit=5&pool_timeout=10`;
  }
  return new PrismaClient({
    datasourceUrl: url || undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
