/**
 * Sprint E6 — enables Next.js Draft Mode for previewing Sanity drafts.
 *
 * GET /api/draft/enable?secret=<PREVIEW_SECRET>&slug=/services/commercial
 *
 * - Validates shared secret against PREVIEW_SECRET env.
 * - Enables draft mode (sets a signed, http-only cookie).
 * - Redirects to the requested slug so editors see draft content in-place.
 */
import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { previewSecret } from "@/sanity/env";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Phase 6: 10 draft-enable attempts per minute per IP (throttles secret brute-force).
const DRAFT_ENABLE_RL = { max: 10, windowSec: 60 };

export async function GET(req: NextRequest) {
  const rl = rateLimit(`draft-enable:${clientIp(req)}`, DRAFT_ENABLE_RL);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  if (!previewSecret) {
    return NextResponse.json(
      { error: "Preview secret not configured on server." },
      { status: 500 },
    );
  }
  if (secret !== previewSecret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  (await draftMode()).enable();

  // Redirect to the requested path; never allow open-redirect to external domains.
  const safe = slug.startsWith("/") && !slug.startsWith("//") ? slug : "/";
  return NextResponse.redirect(new URL(safe, req.url));
}
