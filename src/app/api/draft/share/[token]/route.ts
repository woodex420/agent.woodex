/**
 * Phase 5 — Shareable preview link resolver.
 *
 * GET /api/draft/share/[token]
 *   Looks up the `previewToken` doc in Sanity. If valid (exists, not expired),
 *   enables Next.js draft mode, bumps useCount/usedAt, then 307-redirects to
 *   the stored path. Stakeholders don't need a Sanity login — just the link.
 *
 * The link is single-click (no secrets in the URL after redirect). Draft-mode
 * cookie is a signed http-only cookie from Next.js, so closing the browser
 * ends the session.
 */
import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isSanityEnabled, previewClient } from "@/sanity/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_RE = /^[A-Za-z0-9_-]{16,64}$/;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  if (!isSanityEnabled()) {
    return NextResponse.json({ error: "Preview links unavailable." }, { status: 404 });
  }

  const { token } = await params;
  if (!token || !TOKEN_RE.test(token)) {
    return NextResponse.json({ error: "Invalid preview link." }, { status: 400 });
  }

  let doc: any;
  try {
    doc = await previewClient.fetch(
      /* groq */ `*[_type == "previewToken" && token == $t][0]{ _id, token, path, expiresAt }`,
      { t: token },
      { cache: "no-store" },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Lookup failed", message: err?.message ?? String(err) },
      { status: 500 },
    );
  }

  if (!doc) {
    return NextResponse.json({ error: "Preview link not found." }, { status: 404 });
  }
  if (!doc.path || doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) {
    return NextResponse.json(
      { error: "This preview link has expired. Ask the editor for a new one." },
      { status: 410 },
    );
  }

  // Enable draft mode (sets the signed __prerender_bypass + __next_preview_data cookies).
  (await draftMode()).enable();

  // Bump stats best-effort (don't block redirect).
  previewClient
    .patch(doc._id)
    .set({ usedAt: new Date().toISOString() })
    .inc({ useCount: 1 })
    .commit()
    .catch(() => {});

  // Same-origin redirect guard (belt-and-suspenders).
  const safe = doc.path.startsWith("/") && !doc.path.startsWith("//") ? doc.path : "/";
  return NextResponse.redirect(new URL(safe, req.url), { status: 307 });
}
