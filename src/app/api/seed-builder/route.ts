/**
 * Phase 3 — Seed API.
 *
 * Writes SEED_PAGES (home, services, portfolio, about, 3d-studio, blog, contact,
 * consultation, thank-you) into the Sanity dataset. Uses a transaction so pages
 * are created idempotently by slug (pages with the same slug are re-created with
 * a known _id so running seed twice is harmless).
 *
 * Auth: requires either PREVIEW_SECRET or STUDIO_PASSWORD as a bearer token or
 * ?secret= query parameter. Safe to call multiple times — uses createIfNotExists
 * + createOrReplace semantics.
 *
 * Only enabled when NEXT_PUBLIC_SANITY_ENABLED=true; otherwise returns 404 so the
 * route is inert on static/local builds without credentials.
 */
import { NextResponse } from "next/server";
import { isSanityEnabled, previewClient } from "@/sanity/client";
import { revalidateTag } from "next/cache";
import { SEED_PAGES } from "@/lib/sanity/seed";
import { rateLimit, clientIp } from "@/lib/rate-limit";

function isAuthorized(req: Request): boolean {
  const url = new URL(req.url);
  const qs = url.searchParams.get("secret");
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const secret = process.env.PREVIEW_SECRET || process.env.STUDIO_PASSWORD;
  if (!secret) return false;
  return qs === secret || auth === secret;
}

const SEED_RL = { max: 5, windowSec: 60 };

export async function POST(req: Request) {
  const rl = rateLimit(`seed:${clientIp(req)}`, SEED_RL);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many seed attempts. Try again in ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }
  if (!isSanityEnabled()) {
    return NextResponse.json(
      { error: "Sanity is not enabled. Set NEXT_PUBLIC_SANITY_ENABLED=true." },
      { status: 404 },
    );
  }
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transaction = previewClient.transaction();
  for (const page of SEED_PAGES) {
    // Create-or-replace by a predictable _id so seeding is idempotent.
    const _id = `page-${page.slug}`;
    transaction.createOrReplace({
      ...page,
      _id,
      _type: "page",
      slug: { _type: "slug", current: page.slug },
    });
  }

  try {
    const res = await transaction.commit();
    // Revalidate page + sitemap tags so the new builder pages surface.
    revalidateTag("page", "default");
    return NextResponse.json({
      ok: true,
      seeded: SEED_PAGES.length,
      transactionId: res.transactionId,
      pages: SEED_PAGES.map((p) => ({ slug: p.slug, title: p.title })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Seed failed", message: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    hint: "POST to this endpoint with the PREVIEW_SECRET or STUDIO_PASSWORD as bearer token or ?secret= to seed builder pages.",
    sanityEnabled: isSanityEnabled(),
    pageCount: SEED_PAGES.length,
  });
}
