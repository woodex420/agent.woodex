/**
 * Sprint E1 — numeric & domain constants used across content + booking flow.
 * Values kept in PKR; sqft thresholds mirror PRD §4/§6 cost bands.
 *
 * These exist independently from Sanity so they can be referenced by both
 * static-content fallbacks and live Sanity fetches.
 */

import { COST_BANDS } from "./config";

/** Minimum project size (sqft) below which we decline a turnkey quote. */
export const SQFT_THRESHOLDS = {
  /** Smallest single-room refresh we'll take on. */
  minSingleRoomSqft: 180,
  /** Office fit-outs under this size use our "small office" package. */
  smallOfficeCapSqft: 1200,
  /** Medium office bracket. Above this → enterprise workflow. */
  mediumOfficeCapSqft: 8000,
  /** Residential apartments under this size = compact tier. */
  compactApartmentCapSqft: 900,
  /** Retail / F&B above this size triggers MEP/sprinkler review. */
  retailFnBMepTriggerSqft: 1500,
  /** Floor plate where Friday Reports start (every project, really). */
  fridayReportMinSqft: 0,
} as const;

/** Warranty durations (months) — typed mirrors of config.WARRANTY in months for arithmetic. */
export const WARRANTY_MONTHS = {
  joinery: 24,
  finishing: 12,
  mepLabour: 12,
  freeAdjustment: 11,
} as const;

/** Form-budget options shown on consultation / contact forms (PKR, rupees). */
export const BUDGET_OPTIONS = [
  { id: "under-1m",   label: "Under PKR 10 lakh",   min: 0,         max: 1_000_000 },
  { id: "1m-3m",      label: "PKR 10–30 lakh",      min: 1_000_000, max: 3_000_000 },
  { id: "3m-7m",      label: "PKR 30–70 lakh",      min: 3_000_000, max: 7_000_000 },
  { id: "7m-15m",     label: "PKR 70 lakh – 1.5 Cr",min: 7_000_000, max: 15_000_000 },
  { id: "15m-plus",   label: "PKR 1.5 Cr +",        min: 15_000_000,max: null },
  { id: "not-sure",   label: "Not sure yet",        min: null,      max: null },
] as const;

export type BudgetId = typeof BUDGET_OPTIONS[number]["id"];

/** Lead sources we attribute. */
export const LEAD_SOURCES = [
  "organic-search",
  "instagram",
  "linkedin",
  "behance",
  "referral",
  "word-of-mouth",
  "whatsapp-direct",
  "walk-in",
  "return-client",
  "other",
] as const;

export type LeadSource = typeof LEAD_SOURCES[number];

/** Lead lifecycle stages (internal). */
export const LEAD_STAGES = {
  NEW: "new",
  CONTACTED: "contacted",
  SITE_VISIT_BOOKED: "site_visit_booked",
  BUDGET_SENT: "budget_sent",
  QUOTE_SENT: "quote_sent",
  WON: "won",
  LOST: "lost",
  SPAM: "spam",
} as const;

/** Project categories — single source of truth. */
export const PROJECT_CATEGORIES = [
  "Commercial",
  "Residential",
  "Retail",
  "F&B",
  "Corporate",
  "Fit-Out",
] as const;
export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

/** Blog categories — must match PostCategory in posts.ts. */
export const BLOG_CATEGORIES = [
  "costs",
  "timelines",
  "materials",
  "case-studies",
  "process",
  "guides",
] as const;
export type BlogCategory = typeof BLOG_CATEGORIES[number];

/** Service slugs — must match keys of SERVICES in services.ts. */
export const SERVICE_SLUGS = [
  "commercial",
  "corporate",
  "retail",
  "brand-shop",
  "office-fit-out",
  "commercial-fit-out",
  "residential-fit-out",
  "custom-furniture",
  "office-furniture",
  "renovation",
  "turnkey",
  "3d-design-planning",
  "residential",
] as const;
export type ServiceSlug = typeof SERVICE_SLUGS[number];

/** Fit-out sub-service slugs. */
export const FITOUT_SLUGS = ["occupied-fit-out", "after-hours", "phased-delivery"] as const;
export type FitoutSlug = typeof FITOUT_SLUGS[number];

/** City slugs we publish location pages for. */
export const LOCATION_SLUGS = ["lahore"] as const;
export type LocationSlug = typeof LOCATION_SLUGS[number];

/** Re-export cost bands as PKR/sqft ranges for convenience. */
export const PKR_PER_SQFT = COST_BANDS;

/** Validation constants used by /api/lead. */
export const LEAD_VALIDATION = {
  nameMinLen: 2,
  nameMaxLen: 80,
  phoneMinLen: 7,
  phoneMaxLen: 20,
  emailMaxLen: 120,
  briefMaxLen: 2000,
} as const;

/** Cookie name used to persist UTM + leadSource attribution. */
export const LEAD_COOKIE_NAME = "woodex_lead_attribution";
export const LEAD_COOKIE_MAX_AGE_DAYS = 90;

/** Google reCAPTCHA / Turnstile — token header name when enabled. */
export const TURNSTILE_TOKEN_HEADER = "x-turnstile-token";

/** Preview/draft mode constants. */
export const PREVIEW_COOKIE_NAME = "woodex_preview";
export const PREVIEW_SEARCH_PARAM = "secret";
