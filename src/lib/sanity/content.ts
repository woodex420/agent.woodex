/**
 * Sprint E3 — unified content access layer.
 *
 * Pages/components import from here instead of reaching into `lib/content/*`.
 * - If NEXT_PUBLIC_SANITY_ENABLED !== "true" (default), this returns static data.
 * - If it IS "true", this calls `sanityFetch(...)` and maps Sanity docs to the
 *   exact same TS shapes the pages already expect.
 *
 * Every function is async so callers can `await` uniformly regardless of source.
 */
import { isSanityEnabled } from "./fetch";
import * as Static from "./static-adapter";
import { sanityFetch } from "./fetch";
import {
  ALL_SERVICES, SERVICE_BY_SLUG,
  ALL_PROJECTS, PROJECT_BY_SLUG, PROJECTS_BY_CATEGORY,
  ALL_POSTS, POST_BY_SLUG, POSTS_BY_CATEGORY,
  ALL_FITOUTS, FITOUT_BY_SLUG,
  ALL_LOCATIONS, LOCATION_BY_SLUG,
  PAGE_BY_SLUG, ALL_PAGES, NAV_PAGES,
} from "./groq";

export interface PageDoc {
  _id: string;
  title: string;
  slug: string;
  isNavRoot?: boolean;
  navOrder?: number;
  navLabel?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string; noIndex?: boolean };
  sections?: any[];
}

export interface NavPage { title: string; slug: string; navLabel?: string; navOrder?: number }

// ---- Pages (Builder) ------------------------------------------------------

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  if (!isSanityEnabled()) return null;
  const doc = await sanityFetch<any | null>({
    query: PAGE_BY_SLUG, params: { slug }, tags: ["page", `page:${slug}`],
  });
  return doc ? normalizePage(doc) : null;
}

export async function getAllPages(): Promise<{ slug: string }[]> {
  if (!isSanityEnabled()) return [];
  return await sanityFetch<{ slug: string }[]>({ query: ALL_PAGES, tags: ["page"] });
}

export async function getNavPages(): Promise<NavPage[]> {
  if (!isSanityEnabled()) return [];
  return await sanityFetch<NavPage[]>({ query: NAV_PAGES, tags: ["page"] });
}

function normalizePage(d: any): PageDoc {
  return {
    _id: d._id,
    title: d.title ?? "",
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    isNavRoot: !!d.isNavRoot,
    navOrder: d.navOrder ?? 0,
    navLabel: d.navLabel,
    seo: d.seo ? {
      metaTitle: d.seo.metaTitle,
      metaDescription: d.seo.metaDescription,
      ogImage: typeof d.seo.ogImage === "string" ? d.seo.ogImage : normalizeImgSrc(d.seo.ogImage),
      noIndex: !!d.seo.noIndex,
    } : undefined,
    sections: Array.isArray(d.sections) ? d.sections : [],
  };
}
import type { ServiceContent } from "@/lib/content/services";
import type { Project } from "@/lib/content/projects";
import type { Post, PostCategory } from "@/lib/content/posts";
import type { FitOutContent } from "@/lib/content/fitout";
import type { LocationContent } from "@/lib/content/locations";

// ---- Services -------------------------------------------------------------

export async function getAllServices(): Promise<ServiceContent[]> {
  if (!isSanityEnabled()) return Static.getAllServicesStatic();
  const docs = await sanityFetch<any[]>({ query: ALL_SERVICES, tags: ["service"] });
  return docs.map(normalizeService);
}

export async function getService(slug: string): Promise<ServiceContent | null> {
  if (!isSanityEnabled()) return Static.getServiceStatic(slug);
  const doc = await sanityFetch<any | null>({
    query: SERVICE_BY_SLUG, params: { slug }, tags: ["service", `service:${slug}`],
  });
  return doc ? normalizeService(doc) : null;
}

function normalizeService(d: any): ServiceContent {
  // Convert Sanity image refs to CSS-bg strings or URLs.
  const heroImg = typeof d.heroImg === "string"
    ? d.heroImg
    : typeof d.heroImg === "object" && d.heroImg?.asset?._ref
      ? normalizeCssBg(d.heroImg)
      : (typeof d.heroImg === "string" ? d.heroImg : "/images/svc-commercial.jpg");
  return {
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    eyebrow: d.eyebrow ?? "",
    title: d.title ?? "",
    italicLine: d.italicLine ?? "",
    heroSub: d.heroSub ?? "",
    heroImg,
    situation: d.situation ?? { heading: "", body: [] },
    scope: d.scope ?? { included: [], optional: [] },
    timeline: d.timeline ?? [],
    costBand: d.costBand ?? { label: "", range: "", notes: [] },
    proof: d.proof ?? { kind: "guarantee", heading: "", body: "", guarantee: "" },
    faqs: d.faqs ?? [],
    relatedProjects: (d.relatedProjects ?? []).map((rp: any) => ({
      slug: typeof rp.slug === "string" ? rp.slug : rp.slug?.current ?? "",
      title: rp.title ?? "",
      tag: rp.tag ?? "",
      img: typeof rp.img === "string" ? rp.img : normalizeCssBg(rp.img),
    })),
    team: d.team ?? { name: "", role: "", note: "" },
    cta: d.cta ?? { line: "", button: "", href: "/consultation" },
    answerCapsule: d.answerCapsule ?? { question: "", shortAnswer: "", facts: [] },
  };
}

// ---- Projects -------------------------------------------------------------

export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityEnabled()) return Static.getAllProjectsStatic();
  const docs = await sanityFetch<any[]>({ query: ALL_PROJECTS, tags: ["project"] });
  return docs.map(normalizeProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityEnabled()) return Static.getProjectStatic(slug);
  const doc = await sanityFetch<any | null>({
    query: PROJECT_BY_SLUG, params: { slug }, tags: ["project", `project:${slug}`],
  });
  return doc ? normalizeProject(doc) : null;
}

export async function getProjectsByCategory(cat: Project["category"]): Promise<Project[]> {
  if (!isSanityEnabled()) return Static.getProjectsByCategoryStatic(cat);
  const docs = await sanityFetch<any[]>({
    query: PROJECTS_BY_CATEGORY, params: { category: cat }, tags: ["project"],
  });
  return docs.map(normalizeProject);
}

function normalizeProject(d: any): Project {
  return {
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    title: d.title ?? "",
    category: d.category ?? "Commercial",
    location: d.location ?? "",
    area: d.area ?? "",
    year: d.year ?? "",
    heroImg: normalizeCssBg(d.heroImg),
    gallery: Array.isArray(d.gallery) ? d.gallery.map((g: any) => normalizeCssBg(g)) : [],
    brief: d.brief ?? "",
    hardPart: d.hardPart ?? "",
    build: d.build ?? "",
    quote: d.quote ?? { text: "", name: "", role: "" },
    stats: d.stats ?? [],
    tags: d.tags ?? [],
    beforeAfter: d.beforeAfter ? {
      before: normalizeCssBg(d.beforeAfter.before, "before"),
      after: normalizeCssBg(d.beforeAfter.after, "after"),
      caption: d.beforeAfter.caption ?? "",
    } : undefined,
  };
}

// ---- Posts ----------------------------------------------------------------

export async function getAllPosts(): Promise<Post[]> {
  if (!isSanityEnabled()) return Static.getAllPostsStatic();
  const docs = await sanityFetch<any[]>({ query: ALL_POSTS, tags: ["post"] });
  return docs.map(normalizePost);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityEnabled()) return Static.getPostStatic(slug);
  const doc = await sanityFetch<any | null>({
    query: POST_BY_SLUG, params: { slug }, tags: ["post", `post:${slug}`],
  });
  return doc ? normalizePost(doc) : null;
}

export async function getPostsByCategory(cat: PostCategory): Promise<Post[]> {
  if (!isSanityEnabled()) return Static.getPostsByCategoryStatic(cat);
  const docs = await sanityFetch<any[]>({
    query: POSTS_BY_CATEGORY, params: { category: cat }, tags: ["post"],
  });
  return docs.map(normalizePost);
}

export function getCategoryMeta(cat: PostCategory) {
  return Static.getCategoryMetaStatic(cat);
}

function normalizePost(d: any): Post {
  // When coming from Sanity, portableBody is a PortableText array; we don't
  // convert it to bodyBlocks here because ArticleBody will switch renderers.
  return {
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    category: d.category ?? "process",
    title: d.title ?? "",
    deck: d.deck ?? "",
    readTime: d.readTime ?? 6,
    date: d.date ?? new Date().toISOString().slice(0, 10),
    author: d.author ?? { initials: "AK", name: "Ayesha Khan", role: "Project Director" },
    image: typeof d.image === "string" ? d.image : normalizeImgSrc(d.image),
    featured: !!d.featured,
    capsule: d.capsule ?? "",
    bodyBlocks: d.bodyBlocks,
    // NOTE: portableBody is not in the static Post type; we stash it on the
    // object via an untyped field so ArticleBody can opt in later.
    ...(d.portableBody ? { portableBody: d.portableBody } : {}),
  } as Post;
}

// ---- Fit-outs -------------------------------------------------------------

export async function getAllFitouts(): Promise<FitOutContent[]> {
  if (!isSanityEnabled()) return Static.getAllFitoutsStatic();
  const docs = await sanityFetch<any[]>({ query: ALL_FITOUTS, tags: ["fitout"] });
  return docs.map(normalizeFitout);
}

export async function getFitout(slug: string): Promise<FitOutContent | null> {
  if (!isSanityEnabled()) return Static.getFitoutStatic(slug);
  const doc = await sanityFetch<any | null>({
    query: FITOUT_BY_SLUG, params: { slug }, tags: ["fitout", `fitout:${slug}`],
  });
  return doc ? normalizeFitout(doc) : null;
}

function normalizeFitout(d: any): FitOutContent {
  // When live in Sanity, extra fields (situation/checklist/team/...) come from
  // the fitoutService document; MVP: return minimum to render the hero.
  const fallback = Static.getFitoutStatic(typeof d.slug === "string" ? d.slug : d.slug?.current ?? "");
  return {
    ...(fallback as FitOutContent),
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    eyebrow: d.eyebrow ?? fallback?.eyebrow ?? "",
    title: d.title ?? fallback?.title ?? "",
    italicLine: d.italicLine ?? fallback?.italicLine ?? "",
    heroSub: d.heroSub ?? fallback?.heroSub ?? "",
    heroImg: (d.heroImg ? normalizeCssBg(d.heroImg) : null) ?? fallback?.heroImg ?? "",
    // fitoutService schema has a flat `included` list; map into checklist.included
    checklist: {
      included: Array.isArray(d.included) && d.included.length
        ? d.included
        : (fallback?.checklist?.included ?? []),
      excluded: fallback?.checklist?.excluded ?? [],
    },
  };
}

// ---- Locations ------------------------------------------------------------

export async function getAllLocations(): Promise<LocationContent[]> {
  if (!isSanityEnabled()) return Static.getAllLocationsStatic();
  const docs = await sanityFetch<any[]>({ query: ALL_LOCATIONS, tags: ["location"] });
  return docs.map(normalizeLocation);
}

export async function getLocation(slug: string): Promise<LocationContent | null> {
  if (!isSanityEnabled()) return Static.getLocationStatic(slug);
  const doc = await sanityFetch<any | null>({
    query: LOCATION_BY_SLUG, params: { slug }, tags: ["location", `location:${slug}`],
  });
  return doc ? normalizeLocation(doc) : null;
}

function normalizeLocation(d: any): LocationContent {
  const fallback = Static.getLocationStatic(typeof d.slug === "string" ? d.slug : d.slug?.current ?? "");
  return {
    ...(fallback as object),
    slug: typeof d.slug === "string" ? d.slug : d.slug?.current ?? "",
    name: d.city ?? fallback?.name ?? "",
    region: d.region ?? fallback?.region ?? "Punjab",
    tagline: d.tagline ?? fallback?.tagline ?? "",
    heroLine: d.heroHeading ?? fallback?.heroLine ?? "",
    servedSince: d.servedSince ?? fallback?.servedSince ?? 2014,
    projectCount: d.projectCount ?? fallback?.projectCount ?? 0,
    areas: d.areasServed ?? fallback?.areas ?? [],
    projects: fallback?.projects ?? [],
    ranges: fallback?.ranges ?? [],
    faqs: fallback?.faqs ?? [],
    phone: fallback?.phone ?? "",
    address: fallback?.address ?? "",
  } as LocationContent;
}

// ---- Helpers --------------------------------------------------------------

/** Convert a Sanity image ref { asset: { _ref } } to a URL via the Sanity CDN. */
function imageRefToUrl(ref: any, w = 1600): string {
  if (!ref?.asset?._ref) return "/images/svc-commercial.jpg";
  // _ref like "image-<hash>-<width>x<height>-<ext>"
  const parts = ref.asset._ref.split("-");
  if (parts.length < 4) return "/images/svc-commercial.jpg";
  const [, hash, dims, ext] = parts;
  const format = ext === "jpg" ? "jpg" : ext;
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${hash}-${dims}.${format}?auto=format&fit=max&w=${w}`;
}

/** Convert a Sanity image (or CSS-bg string) to a CSS background-image value. */
function normalizeCssBg(v: any, kind: "before" | "after" | "hero" = "hero"): string {
  if (!v) return `linear-gradient(135deg,rgba(20,20,20,0.55),rgba(60,40,25,0.5)),url(/images/svc-commercial.jpg)`;
  if (typeof v === "string") {
    // Already a CSS-bg string or plain URL. If it starts with url( or linear-, return as-is;
    // otherwise wrap in url().
    if (v.startsWith("url(") || v.startsWith("linear-gradient") || v.startsWith("radial-gradient")) return v;
    return `url(${v})`;
  }
  if (v.asset?._ref) {
    return `linear-gradient(135deg,rgba(20,20,20,0.55),rgba(60,40,25,0.5)),url(${imageRefToUrl(v)})`;
  }
  return v;
}

function normalizeImgSrc(v: any): string {
  if (!v) return "/images/svc-commercial.jpg";
  if (typeof v === "string") return v.startsWith("url(") ? v.replace(/^url\(|\)$/g, "") : v;
  return imageRefToUrl(v);
}
