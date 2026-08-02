/**
 * Phase 4 — Draft theme API.
 *
 * Returns the CURRENT (possibly unsaved) theme values from the Sanity preview
 * dataset as JSON: { cssVars: "--oak-500:#...;...", warnings: [...] }.
 *
 * Only responds when draft mode is enabled (i.e. the request carries the
 * __prerender_bypass/draft cookie set by /api/draft/enable). Otherwise 404
 * so production visitors never hit this.
 *
 * The ThemePreview client component polls this every 1s during draft to
 * live-refresh CSS vars as the editor changes theme fields.
 */
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getDraftSiteSettings } from "@/lib/sanity/site-settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) {
    return new NextResponse("Not in draft mode", { status: 404 });
  }
  const { cssVars, warnings, theme } = await getDraftSiteSettings();
  return NextResponse.json(
    { cssVars, warnings, theme },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
