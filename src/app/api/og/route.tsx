/**
 * Phase 5 — Generic OG image route for builder pages and other dynamic content.
 *
 * GET /api/og?slug=/some-path&title=Hello&italic=World&sub=...
 *
 * Colocating opengraph-image.tsx inside a [...slug] segment isn't supported by
 * the App Router (catch-all must be the terminal segment), so we surface OG
 * images through this query-driven route instead and reference it from
 * generateMetadata on builder pages.
 *
 * Edge-rendered via next/og.
 */
import { ImageResponse } from "next/og";
import { woodexOg, OG_SIZE } from "@/lib/og/template";
import { getPageBySlug } from "@/lib/sanity/page-helpers";
import { isSanityEnabled } from "@/sanity/client";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = (url.searchParams.get("slug") ?? "").replace(/^\/+/, "");
  const qTitle = url.searchParams.get("title");
  const qItalic = url.searchParams.get("italic");
  const qSub = url.searchParams.get("sub");

  let title = qTitle ?? "Woodex Interior";
  let italic = qItalic ?? "Lahore";
  let sub =
    qSub ??
    "Approve it in 3D. Get exactly that. On the date we said.";

  if (!qTitle && isSanityEnabled() && slug) {
    try {
      const page = await getPageBySlug(slug);
      if (page) {
        title = page.seo?.metaTitle ?? page.title ?? title;
        if (page.seo?.metaDescription) sub = page.seo.metaDescription;
        const hero = (page.sections ?? []).find(
          (s: any) =>
            s && (s._type === "section.hero" || s._type === "section.cinematicHero"),
        );
        if (hero?.headingItalic) italic = hero.headingItalic;
      }
    } catch {
      // fall through to defaults
    }
  }

  const [main, ...rest] = title.split("|");
  return woodexOg({
    eyebrow: "Woodex Interior",
    title: (main ?? title).trim().slice(0, 80),
    italicAccent: rest.length ? rest.join("|").trim() : italic,
    sub: sub.slice(0, 160),
  }) as unknown as ImageResponse;
}

export { OG_SIZE as size };
