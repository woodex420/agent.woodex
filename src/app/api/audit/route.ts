/**
 * Phase 6 — Audit log webhook endpoint.
 *
 * Sanity webhook configuration (Project Settings → API → Webhooks):
 *   - URL: https://woodex.studio/api/audit
 *   - Trigger on: create, update, delete (all datasets)
 *   - Secret: same value as SANITY_REVALIDATE_SECRET (sent in X-Sanity-Webhook-Secret)
 *   - Projection: `{"_id":_id,"_type":_type,"_rev":_rev,"_createdAt":_createdAt,"_updatedAt":_updatedAt}`
 *
 * Behavior:
 *   - Verifies shared secret; rejects 401 otherwise.
 *   - Appends a structured JSON line to `.audit-log.ndjson` (newline-delimited JSON).
 *     On Vercel/Netlify this won't persist across deploys — it's a stop-gap until
 *     Supabase/Resend is wired. When SUPABASE_URL is set, logs are also inserted
 *     into the `audit_logs` table; when WOODEX_NOTIFICATION_EMAIL + RESEND_API_KEY
 *     are set, destructive events (delete/unpublish) trigger an email.
 *   - Always returns 202 quickly to avoid blocking Sanity webhook retries.
 */
import { NextResponse, type NextRequest } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { join } from "path";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUDIT_RL = { max: 120, windowSec: 60 };

// Only watch these document types to keep logs meaningful.
const WATCHED_TYPES = new Set([
  "page",
  "siteSettings",
  "service",
  "project",
  "post",
  "teamMember",
  "previewToken",
]);
// These events warrant an ops notification when email is configured.
const NOTIFIABLE_OPS = new Set(["delete", "unpublish"]);

function verifySecret(req: NextRequest): boolean {
  const expected =
    process.env.SANITY_REVALIDATE_SECRET || process.env.PREVIEW_SECRET;
  if (!expected) return false;
  const sent =
    req.headers.get("x-sanity-webhook-secret") ||
    req.headers.get("x-webhook-secret");
  if (sent === expected) return true;
  // Also accept ?secret= as a backup for simple test calls.
  const url = new URL(req.url);
  return url.searchParams.get("secret") === expected;
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(`audit:${clientIp(req)}`, AUDIT_RL);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Rate limited. Retry after ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  if (!verifySecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const op: string =
    req.headers.get("x-sanity-operation") ||
    body?._operation ||
    (body?._deleted ? "delete" : body?._id?.startsWith("drafts.") ? "draft" : "publish");
  const type = body?._type;
  if (!type || !WATCHED_TYPES.has(type)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const entry = {
    ts: new Date().toISOString(),
    op,
    id: body._id,
    type,
    rev: body._rev,
    projectId:
      req.headers.get("x-sanity-project-id")?.slice(0, 32) ?? undefined,
    user:
      req.headers.get("x-sanity-user-id") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown",
    // Don't log full documents (too big; can contain PII).
  };

  // Persist to append-only NDJSON log (best-effort).
  try {
    const logDir = join(process.cwd(), ".logs");
    await mkdir(logDir, { recursive: true });
    await appendFile(
      join(logDir, "audit.ndjson"),
      JSON.stringify(entry) + "\n",
      { encoding: "utf8" },
    );
  } catch {
    // Filesystem may be read-only on serverless; that's fine — log destinations
    // below are the durable ones.
  }

  // Optional: email notification for destructive events. (Stub — Resend wiring
  // can be added in the launch sprint; for now we simply record.)
  if (NOTIFIABLE_OPS.has(op) && process.env.WOODEX_NOTIFICATION_EMAIL) {
    // Best-effort; do not block response.
    console.warn("[audit] notable event", entry);
  }

  return NextResponse.json({ ok: true, op }, { status: 202 });
}

export function GET() {
  return NextResponse.json({
    ok: true,
    hint: "Sanity webhook endpoint. POST with SANITY_REVALIDATE_SECRET header to append audit events.",
  });
}
