/**
 * Phase 6 — Revalidation heartbeat for the collaboration soft-lock ribbon.
 *
 * GET /api/revalidate/state?tag=page:<slug>
 *
 * Returns { rev: <monotonic-timestamp-ms> } which bumps every time a
 * revalidateTag("page" | "site" | ...) fires. The preview client polls this
 * every ~8s and, if the rev changes while the user is in draft mode, shows
 * a "New edits published — reload" toast.
 *
 * Implementation: we rely on an in-process counter incremented by
 * `revalidateTag()` calls. Because revalidateTag runs in the same Node process
 * (for a single-instance `next start`), this is sufficient. For multi-instance
 * deployments replace this with Redis/PubSub.
 */
import { NextResponse } from "next/server";
import { getTagRev } from "@/lib/revalidate-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag") ?? "*";
  return NextResponse.json({
    rev: getTagRev(tag),
    serverTime: Date.now(),
  });
}
