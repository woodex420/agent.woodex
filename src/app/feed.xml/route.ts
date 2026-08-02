/**
 * Sprint F — RSS 2.0 feed for the Woodex Journal at /feed.xml.
 * Sorted by date desc. Item links resolve to the actual article URL.
 */
import { NextResponse } from "next/server";
import { SITE } from "@/lib/config";
import { POSTS, CATEGORY_META } from "@/lib/content/posts";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => {
      const url = `${SITE.url}/blog/${p.category}/${p.slug}`;
      const categoryLabel = CATEGORY_META[p.category]?.label ?? p.category;
      const description = p.deck;
      const pubDate = new Date(p.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(categoryLabel)}</category>
      <description>${escapeXml(description)}</description>
      ${p.image ? `<enclosure url="${SITE.url}${p.image}" type="image/jpeg"/>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} — Journal</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Real per-sqft costs, timelines, and case studies from Woodex Interior in Lahore.</description>
    <language>en-pk</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
