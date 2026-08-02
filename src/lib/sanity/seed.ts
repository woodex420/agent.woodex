/**
 * Phase 3 — Seed documents for the page builder.
 *
 * Returns a list of Sanity `page` document stubs that mirror the current
 * hardcoded site (home, services, portfolio, blog, about, contact, consultation,
 * 3d-studio, thank-you) using the existing typed sections + static fallbacks.
 *
 * Intended usage: call the `/api/seed-builder` route (protected by PREVIEW_SECRET
 * or STUDIO_PASSWORD) to write these into a fresh Sanity dataset via the client
 * API. After seeding, every existing URL is backed by a builder document.
 *
 * Sections use both typed adapters (section.hero, section.ctaFinal, …) and
 * "static" sections that just render the hardcoded component (section.cinematicHero,
 * section.servicesGrid, …). That lets editors start editing headline/copy fields
 * immediately on typed sections while deferring deep migrations of the complex
 * interactive sections.
 */

export interface SeedPage {
  _type: "page";
  title: string;
  slug: string;
  isNavRoot: boolean;
  navOrder: number;
  navLabel?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
  sections: Array<{ _type: string; [key: string]: unknown }>;
}

/**
 * Build a _key for a section at a given index. Must be stable across runs so
 * seeding twice doesn't churn keys and break the Presentation Tool's overlays.
 */
function k(type: string, i: number) {
  return `${type.replace(/\./g, "-")}-${i}`;
}

function s(type: string, i: number, extra: Record<string, unknown> = {}) {
  return { _key: k(type, i), _type: type, ...extra };
}

// ===== Home =====
const HOME: SeedPage = {
  _type: "page",
  title: "Home",
  slug: "home",
  isNavRoot: false,
  navOrder: 0,
  seo: {
    metaTitle: "Woodex Interior — Approve it in 3D. Get exactly that.",
    metaDescription:
      "Design-and-build interior studio in Lahore. Commercial, residential, corporate and retail fit-outs with a 3D-first process. On the date we said.",
  },
  sections: [
    s("section.cinematicHero", 0),
    s("section.marquee", 1),
    s("section.aboutBrief", 2),
    s("section.servicesGrid", 3),
    s("section.projectsRail", 4),
    s("section.processRail", 5, {
      eyebrow: "How it works",
      heading: "From first call to handover",
    }),
    s("section.proofStack", 6),
    s("section.convoDiagram", 7),
    s("section.faq", 8),
    s("section.ctaFinal", 9),
  ],
};

// ===== Services hub =====
const SERVICES: SeedPage = {
  _type: "page",
  title: "Services",
  slug: "services",
  isNavRoot: true,
  navOrder: 10,
  sections: [
    s("section.hero", 0, {
      eyebrow: "What we do",
      heading: "Six specializations.",
      headingItalic: "One delivery system.",
      sub: "Commercial, residential, retail, corporate, turnkey and 3D design — all under one roof, all on one Gantt, all delivered by an in-house team.",
      ctaLabel: "Book a walkthrough",
      ctaHref: "/consultation",
    }),
    s("section.servicesGrid", 1),
    s("section.processRail", 2),
    s("section.proofStack", 3),
    s("section.ctaFinal", 4),
  ],
};

// ===== Portfolio =====
const PORTFOLIO: SeedPage = {
  _type: "page",
  title: "Portfolio",
  slug: "portfolio",
  isNavRoot: true,
  navOrder: 30,
  sections: [
    s("section.portfolioHero", 0),
    s("section.projectsRail", 1),
    s("section.flipGrid", 2),
    s("section.projectMap", 3),
    s("section.ctaFinal", 4),
  ],
};

// ===== Blog =====
const BLOG: SeedPage = {
  _type: "page",
  title: "Journal",
  slug: "blog",
  isNavRoot: true,
  navOrder: 50,
  navLabel: "Journal",
  sections: [
    s("section.hero", 0, {
      eyebrow: "The Journal",
      heading: "Costs, timelines",
      headingItalic: "and honest answers.",
      sub: "What interiors cost in Lahore, how long builds actually take, and what goes wrong when contractors cut corners.",
    }),
    s("section.categoryTabs", 1),
    s("section.dataStripBuiltIn", 2),
    s("section.blogCtaBuiltIn", 3),
  ],
};

// ===== About =====
const ABOUT: SeedPage = {
  _type: "page",
  title: "About",
  slug: "about",
  isNavRoot: true,
  navOrder: 40,
  sections: [
    s("section.hero", 0, {
      eyebrow: "About Woodex",
      heading: "Eleven years",
      headingItalic: "of building exactly what we drew.",
      sub: "Founded in Lahore in 2014. 240+ projects delivered. One principle: the finished space matches the render you signed off.",
    }),
    s("section.foundingProblem", 1),
    s("section.lineDraw", 2),
    s("section.scrollTimeline", 3),
    s("section.valuesBehaviors", 4),
    s("section.workshopEssay", 5),
    s("section.teamCredentials", 6),
    s("section.ctaFinal", 7),
  ],
};

// ===== Contact =====
const CONTACT: SeedPage = {
  _type: "page",
  title: "Contact",
  slug: "contact",
  isNavRoot: true,
  navOrder: 60,
  sections: [
    s("section.contactHero", 0),
    s("section.contactForm", 1),
    s("section.studioMap", 2),
    s("section.contactFaq", 3),
  ],
};

// ===== Consultation =====
const CONSULTATION: SeedPage = {
  _type: "page",
  title: "Book a walkthrough",
  slug: "consultation",
  isNavRoot: false,
  navOrder: 0,
  sections: [
    s("section.hero", 0, {
      eyebrow: "Free 45-minute site visit",
      heading: "We'll walk your space",
      headingItalic: "and send a budget range in 48 hours.",
      sub: "No pitch. No pressure. If we aren't the right fit we'll tell you in the first 10 minutes.",
    }),
    s("section.contactForm", 1, { source: "consultation-hero" }),
    s("section.faq", 2),
    s("section.ctaFinal", 3),
  ],
};

// ===== 3D Studio =====
const THREE_D: SeedPage = {
  _type: "page",
  title: "3D Studio",
  slug: "3d-studio",
  isNavRoot: true,
  navOrder: 20,
  navLabel: "3D Studio",
  sections: [
    s("section.hero", 0, {
      eyebrow: "In-house 3D studio",
      heading: "Renders so accurate",
      headingItalic: "we guarantee them.",
      sub: "Photoreal walkthroughs, 360° panoramas and 3D-faithful material libraries. We build what we render — guaranteed.",
    }),
    s("section.fitOutSplit", 1),
    s("section.orgChart", 2),
    s("section.ctaFinal", 3),
  ],
};

// ===== Thank-you =====
const THANK_YOU: SeedPage = {
  _type: "page",
  title: "Thank you",
  slug: "thank-you",
  isNavRoot: false,
  navOrder: 0,
  seo: { noIndex: true },
  sections: [
    s("section.hero", 0, {
      eyebrow: "Request received",
      heading: "We got your message.",
      headingItalic: "Talk shortly.",
      sub: "We'll reply within 12 hours by email or WhatsApp. If your project is urgent, call the studio directly.",
      ctaLabel: "Back to home",
      ctaHref: "/",
    }),
  ],
};

export const SEED_PAGES: SeedPage[] = [
  HOME,
  SERVICES,
  PORTFOLIO,
  ABOUT,
  THREE_D,
  BLOG,
  CONTACT,
  CONSULTATION,
  THANK_YOU,
];
