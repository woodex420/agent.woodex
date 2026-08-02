/**
 * Phase 3 — Catch-all builder route.
 *
 * Resolves URLs like /new-page, /parent/child from Sanity `page` documents when
 * NEXT_PUBLIC_SANITY_ENABLED=true. If a page exists for the joined slug, renders
 * <PageBuilder> with proper SEO metadata and breadcrumb JSON-LD. If not found
 * (or Sanity disabled), calls notFound() which falls through to the existing
 * 404 page.
 *
 * Existing static routes (/, /services, /contact, /blog, etc.) are defined in
 * their own folders so they take precedence over this catch-all — no migration
 * needed until we explicitly move them to builder documents.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageBuilder from "@/components/builder/PageBuilder";
import { getPageBySlug, getAllPages } from "@/lib/sanity/page-helpers";
import StructuredData from "@/components/JsonLd/StructuredData";
import { breadcrumbLd } from "@/lib/schema";
import { draftMode } from "next/headers";

type Params = Promise<{ slug?: string[] }>;

/**
 * When Sanity is enabled, pre-render all builder pages at build time and let
 * ISR handle updates. When disabled, generateStaticParams returns [] so the
 * catch-all always 404s (no routes exist in the CMS).
 */
export async function generateStaticParams() {
  const enabled = process.env.NEXT_PUBLIC_SANITY_ENABLED === "true";
  if (!enabled) return [];
  const pages = await getAllPages();
  return pages.map((p) => ({
    slug: p.slug.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const enabled = process.env.NEXT_PUBLIC_SANITY_ENABLED === "true";
  if (!enabled) return {};
  const { slug } = await params;
  const slugStr = (slug ?? []).join("/");
  const page = await getPageBySlug(slugStr || "home");
  if (!page) return {};
  const title = page.seo?.metaTitle ?? page.title;
  const description =
    page.seo?.metaDescription ??
    "Woodex Interior — design-and-build studio in Lahore.";
  // OG image: prefer explicit ogImage set by editor, otherwise fall back to
  // the dynamic /api/og route (edge-rendered via next/og) keyed to this slug.
  const ogImageUrl = page.seo?.ogImage
    ? page.seo.ogImage
    : `/api/og?slug=${encodeURIComponent(slugStr)}&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BuilderPage({ params }: { params: Params }) {
  const { isEnabled: draft } = await draftMode();
  const enabled = process.env.NEXT_PUBLIC_SANITY_ENABLED === "true";
  if (!enabled) notFound();

  const { slug } = await params;
  const segments = slug ?? [];
  const slugStr = segments.join("/");

  // "Home" as a builder page is mounted at / — but / is already a static route.
  // If someone visits this catch-all with no segments (which shouldn't happen
  // because / is static), we 404 so the static home wins.
  if (segments.length === 0) notFound();

  const page = await getPageBySlug(slugStr);
  if (!page) notFound();

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    ...segments.slice(0, -1).map((seg, i) => ({
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: "/" + segments.slice(0, i + 1).join("/"),
    })),
    { name: page.title },
  ];

  return (
    <main className="pt-[var(--nav-h)]">
      <StructuredData data={breadcrumbLd(breadcrumbItems)} />
      <PageBuilder
        sections={page.sections}
        documentId={draft ? `drafts.${page._id}` : page._id}
        documentType="page"
      />
    </main>
  );
}
