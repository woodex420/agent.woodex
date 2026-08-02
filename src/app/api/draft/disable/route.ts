/**
 * Sprint E6 — disables draft mode and redirects to "/" (or given slug).
 */
import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "/";
  const safe = slug.startsWith("/") && !slug.startsWith("//") ? slug : "/";
  return NextResponse.redirect(new URL(safe, req.url));
}
