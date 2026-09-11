/**
 * Site-wide config — single source of truth.
 * Sprint 0 (Relaunch): NAP + tagline + positioning aligned to PRD v1.0 / 90-day plan.
 */
export const SITE = {
  name: "Woodex Interior",
  tagline: "Designed. Built. Made by Woodex.",
  campaignLine: "See the room before it exists.",
  heroH1: "Spaces Designed to Work. Built to Last.",
  brandLine: "Beyond Design. We Build Experiences.",
  url: "https://woodex.com.pk",
  phoneDisplay: "+92 322 4000768",
  phoneTel: "+923224000768",
  whatsapp: "923224000768",
  email: "woodexinterior.pk@gmail.com",
  address: {
    line1: "M-71, Zainab Tower, Model Town Link Road",
    city: "Lahore, Punjab 54700",
    country: "Pakistan",
  },
  hoursShort: "Mon–Sat, 10am–7pm",
  socials: {
    instagram: "https://www.instagram.com/woodexinterior",
    linkedin: "https://www.linkedin.com/company/woodex",
    behance: "https://www.behance.net/woodex",
  },
  ogImage: "/og.jpg",
} as const;

/** Per-sqft cost bands (PKR) — used across services / locations / blog. */
export const COST_BANDS = {
  residential: { low: 3500, high: 6500 },
  commercialOffice: { low: 2800, high: 5200 },
  retailFnB: { low: 5000, high: 9000 },
  turnkey: { low: 4500, high: 8000 },
  renovation: { low: 2200, high: 4200 },
  customFurniture: { low: 1800, high: 3800 },
} as const;

/** Warranty terms, in years (pending formal verification per proof policy). */
export const WARRANTY = {
  joinery: 2,
  finishing: 1,
  mepLabour: 1,
  freeAdjustmentMonths: 11,
} as const;

/** Response time SLA (hours) — referenced in contact/consultation copy. */
export const SLA = {
  whatsappReply: 0.25,   // ~15 min
  formReply: 12,         // one working day
  budgetRangeHours: 48,
  formalQuoteDays: 10,
  delayCreditPerWeekPKR: 25000,
  onTimeRatePct: 98,
  projectsDelivered: "240+",
  yearsOperating: 12,
  founded: 2014,
} as const;
