/**
 * Structured data (JSON-LD) for SEO + AI Overviews + GEO citations.
 * Per-page schema (Service, FAQPage, BreadcrumbList, Article) is inlined
 * in the relevant page/server components.
 *
 * Sprint G: localBusinessLd pulled from SITE config so NAP stays consistent.
 */
import { SITE, SLA, WARRANTY } from "@/lib/config";

const BASE = SITE.url;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: BASE,
  logo: `${BASE}/images/og-woodex.jpg`,
  slogan: SITE.tagline,
  email: SITE.email,
  telephone: SITE.phoneTel,
  sameAs: [SITE.socials.instagram, SITE.socials.linkedin, SITE.socials.behance].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phoneTel,
    email: SITE.email,
    contactType: "sales",
    areaServed: "PK",
    availableLanguage: ["English", "Urdu"],
  },
  knowsAbout: [
    "Interior design",
    "Commercial fit-out",
    "Office fit-out",
    "Residential interior design",
    "Turnkey construction",
    "3D rendering",
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: BASE,
  inLanguage: "en-PK",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["InteriorDesignBusiness", "GeneralContractor"],
  "@id": `${BASE}/#business`,
  name: SITE.name,
  image: `${BASE}/images/og-woodex.jpg`,
  url: BASE,
  telephone: SITE.phoneTel,
  email: SITE.email,
  priceRange: "PKR 2,200–9,000 / sqft",
  currenciesAccepted: "PKR",
  paymentAccepted: "Bank Transfer, Cheque, Cash",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.4707, longitude: 74.2488 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Lahore" },
    { "@type": "AdministrativeArea", name: "Punjab" },
  ],
  foundingDate: String(SLA.founded),
  slogan: SITE.tagline,
  sameAs: [SITE.socials.instagram, SITE.socials.linkedin, SITE.socials.behance].filter(Boolean),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "137",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior design & build services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial interiors" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate HQ fit-out" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office fit-out" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential fit-out" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retail & F&B fit-out" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom furniture" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Turnkey design-and-build" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D design & rendering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation" } },
    ],
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "12-month joinery warranty",
      warranty: { "@type": "WarrantyPromise", durationOfWarranty: `P${WARRANTY.joinery*12}M` },
    },
    {
      "@type": "Offer",
      name: "Free 45-minute site visit",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "0", priceCurrency: "PKR" },
    },
    {
      "@type": "Offer",
      name: `Budget range in ${SLA.budgetRangeHours} hours`,
      description: "Itemised PKR range after a single walkthrough.",
    },
  ],
};

/** Helper to build a FAQPage JSON-LD block from an array of {q, a}. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Helper to build a BreadcrumbList JSON-LD block. */
export function breadcrumbLd(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url.startsWith("http") ? it.url : `${BASE}${it.url}` } : {}),
    })),
  };
}

/** Article / BlogPosting schema. */
export function articleLd(args: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorRole?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url.startsWith("http") ? args.url : `${BASE}${args.url}` },
    headline: args.title,
    description: args.description,
    image: [args.image.startsWith("http") ? args.image : `${BASE}${args.image}`],
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: {
      "@type": "Person",
      name: args.authorName,
      jobTitle: args.authorRole,
      worksFor: { "@type": "Organization", name: SITE.name },
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${BASE}/images/og-woodex.jpg` },
    },
    inLanguage: "en-PK",
    wordCount: args.wordCount,
  };
}

/** Service schema for /services/[slug] pages. */
export function serviceLd(args: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    serviceType: args.serviceType,
    description: args.description,
    provider: { "@id": `${BASE}/#business` },
    areaServed: args.areaServed ?? ["Lahore"],
    url: args.url.startsWith("http") ? args.url : `${BASE}${args.url}`,
  };
}
