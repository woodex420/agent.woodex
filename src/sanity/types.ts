/**
 * Sprint E2 — TypeScript document types shared between static fallbacks and Sanity.
 *
 * These shapes mirror both the existing static TS content (in src/lib/content/*)
 * and the Sanity document schemas (in /sanity/schemas/*). Fields that are
 * Sanity-specific (like _id, _createdAt, PortableText body) are optional so the
 * static content satisfies the same types.
 */

import type { Block as StaticBlock } from "@/lib/content/blocks";

/**
 * PortableText is treated as `unknown` here so we don't force @portabletext/react
 * to be a hard type dependency at the edges; renderers that need it will import
 * from @portabletext/react directly and narrow.
 */
export type PortableText = unknown;

/** An image reference from Sanity; for static fallbacks we use plain src URLs. */
export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

/** Image union the components actually render at runtime: either a string src or a Sanity ref. */
export type ImageSource = string | SanityImage;

// ---------------------------------------------------------------------------
// Author / Team
// ---------------------------------------------------------------------------

export interface TeamMemberDocument {
  _id?: string;
  _type: "teamMember";
  slug: { current: string };
  name: string;
  role: string;
  initials: string;
  bio?: string;
  avatar?: ImageSource;
  order?: number;
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export interface ServiceDocScope { included: string[]; optional: string[]; }
export interface ServiceDocWeek { week: string; label: string; desc: string; }
export interface ServiceDocFaq { q: string; a: string; }
export interface ServiceDocCostBand { label: string; range: string; notes: string[]; }
export interface ServiceDocAnswerCapsule {
  question: string;
  shortAnswer: string;
  facts: { label: string; value: string }[];
}
export interface ServiceDocStatsProof {
  kind: "stats";
  heading: string;
  body: string;
  stats: { n: string; l: string }[];
}
export interface ServiceDocCaseStudyProof {
  kind: "caseStudy";
  heading: string;
  body: string;
  caseStudy: { title: string; tag: string; img: ImageSource; body: string; metric: string };
}
export interface ServiceDocGuaranteeProof {
  kind: "guarantee";
  heading: string;
  body: string;
  guarantee: string;
}
export type ServiceDocProof =
  | ServiceDocStatsProof
  | ServiceDocCaseStudyProof
  | ServiceDocGuaranteeProof;

export interface ServiceDocument {
  _id?: string;
  _type: "service";
  slug: { current: string };
  eyebrow: string;
  title: string;
  italicLine: string;
  heroSub: string;
  heroImg: ImageSource;
  situation: { heading: string; body: string[] };
  scope: ServiceDocScope;
  timeline: ServiceDocWeek[];
  costBand: ServiceDocCostBand;
  proof: ServiceDocProof;
  faqs: ServiceDocFaq[];
  relatedProjects: { slug: string; title: string; tag: string; img: ImageSource }[];
  team: { name: string; role: string; note: string };
  cta: { line: string; button: string; href: string };
  answerCapsule: ServiceDocAnswerCapsule;
  /** Populated only on Sanity; static fallback uses the rich block array below. */
  body?: PortableText;
}

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export type ProjectCategory =
  | "Commercial" | "Residential" | "Retail" | "F&B" | "Corporate" | "Fit-Out";

export interface ProjectDocument {
  _id?: string;
  _type: "project";
  slug: { current: string };
  title: string;
  category: ProjectCategory;
  location: string;
  area: string;
  year: string;
  heroImg: ImageSource;
  gallery: ImageSource[];
  brief: string;
  hardPart: string;
  build: string;
  quote: { text: string; name: string; role: string };
  stats: { label: string; value: string }[];
  tags: string[];
  beforeAfter?: { before: ImageSource; after: ImageSource; caption: string };
}

// ---------------------------------------------------------------------------
// Post (Blog)
// ---------------------------------------------------------------------------

export type PostCategory =
  | "costs" | "timelines" | "materials" | "case-studies" | "process" | "guides";

export interface AuthorDoc {
  initials: string;
  name: string;
  role: string;
}

export interface PostDocument {
  _id?: string;
  _type: "post";
  slug: { current: string };
  category: PostCategory;
  title: string;
  deck: string;
  readTime: number;
  date: string;
  author: AuthorDoc;
  image: ImageSource;
  featured?: boolean;
  capsule: string;
  /** Legacy static body (paragraph array) — kept for fallbacks. */
  body?: string[];
  /** Rich body blocks (Sprint C static format). */
  bodyBlocks?: StaticBlock[];
  /** PortableText body (Sanity). Rendered via @portabletext/react when present. */
  portableBody?: PortableText;
}

// ---------------------------------------------------------------------------
// Fit-out sub-services
// ---------------------------------------------------------------------------

export interface FitoutDocument {
  _id?: string;
  _type: "fitoutService";
  slug: { current: string };
  eyebrow: string;
  title: string;
  italicLine: string;
  heroSub: string;
  heroImg: ImageSource;
  included: string[];
  timeline: string;
  cost: string;
  cta: { line: string; button: string; href: string };
}

// ---------------------------------------------------------------------------
// Location pages
// ---------------------------------------------------------------------------

export interface LocationDocument {
  _id?: string;
  _type: "location";
  slug: { current: string };
  city: string;
  region: string;
  heroHeading: string;
  heroSub: string;
  heroImg: ImageSource;
  areasServed: string[];
  stats: { label: string; value: string }[];
  body: string[];
}

// ---------------------------------------------------------------------------
// Site settings singleton (SEO, phone, etc — editable in Studio)
// ---------------------------------------------------------------------------

export interface SiteSettingsDocument {
  _id?: string;
  _type: "siteSettings";
  title: string;
  tagline: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  addressLine1: string;
  addressCity: string;
  hoursShort: string;
  socialInstagram?: string;
  socialLinkedIn?: string;
  socialBehance?: string;
  ogImage?: ImageSource;
}
