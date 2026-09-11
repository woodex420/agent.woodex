/**
 * Location landing page content — for local pack / GEO targeting.
 * Each city has unique projects, local FAQs, and NAP variants.
 * Start with Lahore (our HQ); add Islamabad/Karachi for P1.
 */
export interface LocationContent {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  heroLine: string;
  servedSince: number;
  projectCount: number;
  /** Local neighborhoods served */
  areas: string[];
  /** Specific local projects (client / area / sqft / year) */
  projects: { client: string; area: string; sqft: number; year: number }[];
  /** Cost ranges adapted to this city */
  ranges: { label: string; low: number; high: number }[];
  /** Local FAQ */
  faqs: { q: string; a: string }[];
  /** Local meta */
  phone: string;
  address: string;
}

export const LOCATIONS: LocationContent[] = [
  {
    slug: "lahore",
    name: "Lahore",
    region: "Punjab",
    tagline: "HQ since 2014.",
    heroLine: "240+ interiors built across DHA, Gulberg, Bahria, Model Town, and the new corporate corridors.",
    servedSince: 2014,
    projectCount: 240,
    areas: [
      "DHA Phase 1–8",
      "Gulberg I–V",
      "Model Town",
      "Bahria Town",
      "Johar Town",
      "Cantonment",
      "Askari",
      "Wapda Town",
      "Sundar / Raiwind Road",
      "LDA Avenue",
      "Thokar / Canal",
      "MM Alam Road",
    ],
    projects: [
      { client: "HBL Model Town", area: "Model Town", sqft: 6400, year: 2023 },
      { client: "Café Zouk Gulberg", area: "Gulberg III", sqft: 2100, year: 2024 },
      { client: "Systems Ltd Floor 12", area: "Gulberg II", sqft: 17500, year: 2024 },
      { client: "Nishat Hospitality HQ", area: "Gulberg III", sqft: 22000, year: 2025 },
      { client: "DHA Raya Villa", area: "DHA Phase 6", sqft: 8200, year: 2024 },
      { client: "Packages Mall Retail", area: "Packages Mall", sqft: 920, year: 2025 },
    ],
    ranges: [
      { label: "Residential", low: 3500, high: 6500 },
      { label: "Commercial office", low: 2800, high: 5200 },
      { label: "Retail / F&B", low: 5000, high: 9000 },
      { label: "Turnkey (design+build+furniture)", low: 4500, high: 8000 },
    ],
    faqs: [
      {
        q: "Which parts of Lahore do you serve?",
        a: "All of them. Our workshop is on Sundar Industrial Road so we can hit DHA in 35 minutes, Gulberg in 25, Bahria Town in 40, and the new Thokar high-rises in 15. We don't charge extra for travel inside Lahore city.",
      },
      {
        q: "Do you handle LDA / MEP approvals?",
        a: "For corporate and retail fit-outs, yes — we coordinate with LDA building inspectors, WAPDA, and SNGPL where needed. Residential projects typically don't require structural MEP changes beyond what we do in-house, but we handle that too if needed.",
      },
      {
        q: "How soon can you start on a Lahore project?",
        a: "From signed SOW to site start is usually 2–3 weeks. That's the time for detailed drawings, material procurement, and workshop joinery prep. In a rush (e.g. F&B with a lease deadline) we've started as fast as 6 days, but the work is better at 3 weeks.",
      },
      {
        q: "Are your prices different in DHA vs. Gulberg vs. Bahria?",
        a: "Our per-square-foot bands are the same across Lahore. The bill difference comes from (a) building access (apartments above 10th floor cost 4–6% more in material handling), (b) society restrictions on work hours (adds 1–2 weeks), and (c) finishes you choose — not the neighbourhood.",
      },
    ],
    phone: "+92 322 4000768",
    address: "M-71, Zainab Tower, Model Town Link Road, Lahore 54700",
  },
];

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}
