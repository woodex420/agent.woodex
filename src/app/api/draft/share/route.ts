/**
 * Phase 5 — Shareable preview link generator.
 *
 * POST /api/draft/share
 *   Auth: PREVIEW_SECRET or STUDIO_PASSWORD (bearer or ?secret=).
 *   Body: { path: "/page-slug", createdBy?: "editor@studio" }
 *   Creates a short random token stored as a `previewToken` document in Sanity,
 *   TTL 7 days. Returns { url, token, expiresAt }.
 *
 * Clients/stakeholders can open the returned URL without logging in; the
 * companion route /api/draft/share/[token] enables draft mode and redirects.
 *
 * Only functional when Sanity is enabled.
 */
import { NextResponse, type NextRequest } from "next/server";
import { isSanityEnabled, previewClient } from "@/sanity/client";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_BYTES = 18; // ~24 chars of url-safe base64 → ~144 bits entropy
const TTL_DAYS = 7;
// Phase 6: throttle share-link creation (30/min/IP is generous but slows abuse).
const SHARE_RL = { max: 30, windowSec: 60 };

function isAuthorized(req: NextRequest): boolean {
  const url = new URL(req.url);
  const qs = url.searchParams.get("secret");
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const secret = process.env.PREVIEW_SECRET || process.env.STUDIO_PASSWORD;
  if (!secret) return false;
  return qs === secret || auth === secret;
}

function generateToken(): string {
  // crypto.randomUUID gives 36 chars but we want shorter URLs; randomBytes
  // gives us a compact token. Fallback to UUID if crypto is missing (dev).
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require("crypto") as typeof import("crypto");
    return crypto.randomBytes(TOKEN_BYTES).toString("base64url");
  } catch {
    return crypto.randomUUID().replace(/-/g, "");
  }
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(`draft-share:${clientIp(req)}`, SHARE_RL);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many share links created. Try again in ${rl.retryAfterSec}s.` },
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

  let body: { path?: string; createdBy?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const rawPath = body.path || "/";
  // Open-redirect protection: same-origin paths only, no protocol-relative URLs.
  const path =
    typeof rawPath === "string" && rawPath.startsWith("/") && !rawPath.startsWith("//")
      ? rawPath
      : "/";

  const token = generateToken();
  const expiresAt = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const _id = `previewToken.${token}`;

  try {
    await previewClient.createOrReplace({
      _id,
      _type: "previewToken",
      token,
      path,
      expiresAt,
      createdBy: body.createdBy || "studio",
      useCount: 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Could not write preview token", message: err?.message ?? String(err) },
      { status: 500 },
    );
  }

  const url = new URL(`/api/draft/share/${token}`, req.url).toString();
  return NextResponse.json({ url, token, expiresAt, path });
}

export function GET() {
  return NextResponse.json({
    hint: "POST with path and secret to generate a shareable preview link valid for 7 days.",
  });
}
