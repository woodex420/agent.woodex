/**
 * Phase 3 — builder-page content helpers.
 *
 * Small dedicated module so we don't churn the existing content.ts. Pulls
 * page documents by slug + lists all pages for generateStaticParams + nav.
 */
import { isSanityEnabled, sanityFetch } from "./fetch";
import { PAGE_BY_SLUG, ALL_PAGES, NAV_PAGES } from "./groq";

export interface PageDoc {
  _id: string;
  title: string;
  slug: string;
  isNavRoot?: boolean;
  navOrder?: number;
  navLabel?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  sections?: any[];
}

export interface NavItem {
  label: string;
  href: string;
  order: number;
}

/**
 * Resolve a builder page by URL slug. Returns null when Sanity is disabled
 * OR when no document matches.
 */
export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  if (!isSanityEnabled()) return null;
  try {
    const doc = await sanityFetch<any | null>({
      query: PAGE_BY_SLUG,
      params: { slug: slug || "home" },
      tags: ["page", `page:${slug || "home"}`],
    });
    return doc ? normalizePage(doc) : null;
  } catch {
    return null;
  }
}

/**
 * All builder pages (for generateStaticParams).
 */
export async function getAllPages(): Promise<{ slug: string }[]> {
  if (!isSanityEnabled()) return [];
  try {
    return await sanityFetch<{ slug: string }[]>({
      query: ALL_PAGES,
      tags: ["page"],
    });
  } catch {
    return [];
  }
}

/**
 * Pages marked `isNavRoot`, sorted by navOrder — used by Nav server component
 * to merge builder-managed links into the static navigation.
 */
export async function getBuilderNavPages(): Promise<NavItem[]> {
  if (!isSanityEnabled()) return [];
  try {
    const docs = await sanityFetch<
      { title: string; slug: string; navLabel?: string; navOrder?: number }[]
    >({
      query: NAV_PAGES,
      tags: ["page"],
    });
    return docs
      .filter((d) => d.slug && d.slug !== "home")
      .map((d) => ({
        label: d.navLabel ?? d.title,
        href: "/" + d.slug,
        order: d.navOrder ?? 100,
      }));
  } catch {
    return [];
  }
}

/**
 * Runtime guard — true if a given URL path matches a builder page.
 * Used by not-found.tsx to show a more helpful message, but routing itself is
 * handled by the catch-all page.
 */
export async function isSlugBuilderPage(
  segments: string[],
): Promise<boolean> {
  if (!isSanityEnabled()) return false;
  const p = await getPageBySlug(segments.join("/"));
  return !!p;
}

function normalizePage(d: any): PageDoc {
  return {
    _id: d._id,
    title: d.title ?? "",
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    isNavRoot: !!d.isNavRoot,
    navOrder: typeof d.navOrder === "number" ? d.navOrder : 0,
    navLabel: d.navLabel,
    seo: d.seo
      ? {
          metaTitle: d.seo.metaTitle,
          metaDescription: d.seo.metaDescription,
          ogImage: typeof d.seo.ogImage === "string" ? d.seo.ogImage : undefined,
          noIndex: !!d.seo.noIndex,
        }
      : undefined,
    sections: Array.isArray(d.sections) ? d.sections : [],
  };
}
