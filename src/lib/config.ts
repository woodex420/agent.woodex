/**
 * Site-wide config — single source of truth.
 * Sprint A refactor: all hardcoded phone/email/address/social pulled here.
 */
export const SITE = {
  name: "Woodex Interior",
  tagline: "Approve it in 3D. Get exactly that. On the date we said.",
  url: "https://woodex.studio",
  phoneDisplay: "+92 300 000 0000",
  phoneTel: "+923000000000",
  whatsapp: "923000000000",
  email: "hello@woodex.studio",
  address: {
    line1: "Plot 42, Sundar Industrial Road",
    city: "Lahore, Punjab",
    country: "Pakistan",
  },
  hoursShort: "Mon–Sat, 10am–7pm",
  socials: {
    instagram: "https://www.instagram.com/woodexstudio",
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

/** Warranty terms, in years. */
export const WARRANTY = {
  joinery: 2,
  finishing: 1,
  mepLabour: 1,
  freeAdjustmentMonths: 11,
} as const;

/** Response time SLA (hours) — referenced in contact/consultation copy. */
export const SLA = {
  whatsappReply: 0.25,   // 15 min
  formReply: 12,         // same business day
  budgetRangeHours: 48,
  formalQuoteDays: 10,
  delayCreditPerWeekPKR: 25000,
  onTimeRatePct: 98,
  projectsDelivered: "240+",
  yearsOperating: 11,
  founded: 2014,
} as const;
