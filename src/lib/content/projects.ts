/**
 * Portfolio content (Sprint 4).
 * All projects carry category, location, area, year, the 4-beat story
 * (brief / hard part / build / quote), and a gallery.
 */

export type Project = {
  slug: string;
  title: string;
  category: "Commercial" | "Residential" | "Retail" | "F&B" | "Corporate" | "Fit-Out";
  location: string;
  area: string;
  year: string;
  heroImg: string;
  gallery: string[];
  brief: string;
  hardPart: string;
  build: string;
  quote: { text: string; name: string; role: string };
  stats: { label: string; value: string }[];
  tags: string[];
  beforeAfter?: { before: string; after: string; caption: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "nishat-hospitality-hq",
    title: "Nishat Hospitality HQ",
    category: "Corporate",
    location: "Gulberg, Lahore",
    area: "28,000 sqft",
    year: "2024",
    heroImg: "linear-gradient(135deg,rgba(20,20,20,0.5),rgba(60,40,25,0.55)),url(/images/svc-corporate.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(20,20,20,0.5),rgba(60,40,25,0.55)),url(/images/svc-corporate.jpg)",
      "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-commercial.jpg)",
      "linear-gradient(110deg,rgba(20,15,15,0.55),rgba(50,35,20,0.5)),url(/images/hero-commercial.jpg)",
    ],
    brief:
      "Nishat Hospitality needed a headquarters that signaled their arrival in boutique hotel management — warm enough to host investors, disciplined enough to run a 250-person team from.",
    hardPart:
      "The building's core sat dead centre of the floor plate, splitting circulation into awkward dead ends. We wrapped a curved oak wall around the core to turn the flaw into the building's feature — and soundproofed the executive wing without losing the open-plan feel staff wanted.",
    build:
      "Handed over in 112 days against a 120-day schedule. Zero change orders. 18-month defects retention instead of the usual 12, because we were that confident.",
    quote: {
      text: "The Friday Report is the reason we hired them. Three months in, my board knew exactly what was happening — including the awkward weeks.",
      name: "Omar Sheikh",
      role: "Director, Nishat Hospitality",
    },
    stats: [
      { label: "Area", value: "28,000 sqft" },
      { label: "Duration", value: "112 days" },
      { label: "Seats", value: "250" },
      { label: "Change orders", value: "0" },
    ],
    tags: ["Corporate HQ", "Hospitality", "Turnkey"],
    beforeAfter: {
      before: "url(/images/before-space.jpg)",
      after: "url(/images/after-space.jpg)",
      caption: "Raw shell → day-one office, 112 days.",
    },
  },
  {
    slug: "systems-ltd-floor-12",
    title: "Systems Ltd — Floor 12",
    category: "Commercial",
    location: "IT Heights, Lahore",
    area: "22,000 sqft",
    year: "2023",
    heroImg: "linear-gradient(135deg,rgba(15,15,15,0.5),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(15,15,15,0.5),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
      "linear-gradient(135deg,rgba(20,18,15,0.55),rgba(55,40,25,0.5)),url(/images/hero-commercial.jpg)",
      "linear-gradient(135deg,rgba(25,20,15,0.6),rgba(70,45,25,0.4)),url(/images/svc-residential.jpg)",
    ],
    brief:
      "180 engineers, one floor, acoustics that actually work for code review, and a hard date because the lease on the old floor was ending.",
    hardPart:
      "The floor had to be delivered in an occupied building. We ran after-hours and weekend crews with dust containment between floors, installed temporary hoardings with sound attenuation, and finished without a single complaint from the 11 other tenants — per the property manager's log.",
    build:
      "Handed over on day 91. Client moved 180 people in the next day. We kept a 7-day on-site presence post-handover for any teething issues.",
    quote: {
      text: "We moved 180 staff in the day after handover. Everything worked. I've never seen that before.",
      name: "Ayesha Malik",
      role: "COO, Systems Ltd",
    },
    stats: [
      { label: "Area", value: "22,000 sqft" },
      { label: "Duration", value: "91 days" },
      { label: "Engineers", value: "180" },
      { label: "Tenant complaints", value: "0" },
    ],
    tags: ["Tech Office", "Phased", "Acoustic Design"],
    beforeAfter: {
      before: "url(/images/before-space.jpg)",
      after: "url(/images/after-space.jpg)",
      caption: "Empty CAT-A floor → engineering home, 91 days.",
    },
  },
  {
    slug: "cafe-zouk-gulberg-reno",
    title: "Café Zouk Gulberg Renovation",
    category: "F&B",
    location: "Gulberg, Lahore",
    area: "3,100 sqft",
    year: "2024",
    heroImg: "linear-gradient(110deg,rgba(20,15,15,0.6),rgba(60,40,20,0.5)),url(/images/portfolio-cafe.jpg)",
    gallery: [
      "linear-gradient(110deg,rgba(20,15,15,0.6),rgba(60,40,20,0.5)),url(/images/portfolio-cafe.jpg)",
      "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(70,45,25,0.5)),url(/images/hero-turnkey.jpg)",
      "linear-gradient(135deg,rgba(20,15,10,0.6),rgba(55,35,20,0.5)),url(/images/svc-retail.jpg)",
    ],
    brief:
      "A refresh of a Lahore institution. The brief: respect what regulars love, but fix the kitchen, the lighting, and the queue that backs into the street.",
    hardPart:
      "They couldn't close. We phased the renovation over six weeks, working 10pm-6am, returning the restaurant to operating condition every morning. New kitchen, new bar, new lighting — while the restaurant served dinner every night.",
    build:
      "Finished three days ahead of schedule. Covers up 28% in the first quarter after reopening. The owner told us regulars haven't stopped complimenting the lighting.",
    quote: {
      text: "They rebuilt the kitchen while we served dinner. I didn't think it was possible.",
      name: "Owner",
      role: "Café Zouk",
    },
    stats: [
      { label: "Area", value: "3,100 sqft" },
      { label: "Duration", value: "6 weeks" },
      { label: "Downtime", value: "0 nights" },
      { label: "Covers uplift", value: "+28%" },
    ],
    tags: ["F&B", "Hospitality", "Night Work"],
  },
  {
    slug: "dha-phase-5-residence",
    title: "DHA Phase 5 Residence",
    category: "Residential",
    location: "DHA Phase 5, Lahore",
    area: "8,500 sqft",
    year: "2023",
    heroImg: "linear-gradient(135deg,rgba(25,20,15,0.5),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(25,20,15,0.5),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)",
      "linear-gradient(135deg,rgba(30,22,18,0.5),rgba(75,50,30,0.5)),url(/images/hero-residential.jpg)",
      "linear-gradient(135deg,rgba(20,15,10,0.55),rgba(55,35,20,0.5)),url(/images/about-craft.jpg)",
    ],
    brief:
      "A family home for a couple and two teenagers who had built three homes before this one. They wanted the first one that actually matched the pictures.",
    hardPart:
      "The client was overseas during construction. We ran a live site camera, weekly Loom walkthroughs, and a dedicated WhatsApp group. Every finish was sampled and shipped for video approval before installation.",
    build:
      "Handover was on the contracted date. The client flew in, walked through for two hours, signed the snag list of six items — all of which were cosmetic and resolved in five days.",
    quote: {
      text: "I built three homes before. Woodex was the first that actually looked like the pictures. Not close. Like the pictures.",
      name: "Fatima Riaz",
      role: "Homeowner",
    },
    stats: [
      { label: "Area", value: "8,500 sqft" },
      { label: "Duration", value: "20 weeks" },
      { label: "Site visits", value: "Remote" },
      { label: "Snag items", value: "6" },
    ],
    tags: ["Residential", "Full Home", "Overseas Client"],
    beforeAfter: {
      before: "url(/images/before-space.jpg)",
      after: "url(/images/hero-residential.jpg)",
      caption: "Structure complete → finished family home, 20 weeks.",
    },
  },
  {
    slug: "packages-mall-flagship",
    title: "Packages Mall Flagship",
    category: "Retail",
    location: "Packages Mall, Lahore",
    area: "4,200 sqft",
    year: "2024",
    heroImg: "linear-gradient(135deg,rgba(20,20,20,0.6),rgba(50,35,20,0.5)),url(/images/portfolio-retail.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(20,20,20,0.6),rgba(50,35,20,0.5)),url(/images/portfolio-retail.jpg)",
      "linear-gradient(135deg,rgba(20,18,15,0.55),rgba(50,35,20,0.5)),url(/images/svc-retail.jpg)",
      "linear-gradient(135deg,rgba(15,12,12,0.6),rgba(45,30,15,0.5)),url(/images/hero-turnkey.jpg)",
    ],
    brief:
      "A flagship store for a menswear brand launching in Packages Mall. Hard date: the mall's grand re-opening weekend.",
    hardPart:
      "Mall sites always hide surprises — the soffit was 300mm lower than drawings showed, the MEP riser was in the wrong place. We worked night shifts, had all joinery pre-cut in our workshop, and installed over the final 14 days.",
    build:
      "Opened on time for the launch. The brand's CEO told us the store did 140% of first-week targets.",
    quote: {
      text: "We opened to queueing customers on the date we agreed. That's rare in retail contracting.",
      name: "Brand Director",
      role: "Menswear label",
    },
    stats: [
      { label: "Area", value: "4,200 sqft" },
      { label: "On-site", value: "14 days" },
      { label: "Workshop prefab", value: "6 weeks" },
      { label: "Target (W1)", value: "140%" },
    ],
    tags: ["Retail", "Prefab Joinery", "Launch-Critical"],
  },
  {
    slug: "hbl-branch-network",
    title: "HBL Branch Network (Wave 3)",
    category: "Corporate",
    location: "12 branches, Punjab",
    area: "Multiple",
    year: "2023-24",
    heroImg: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)",
      "linear-gradient(135deg,rgba(30,25,20,0.55),rgba(60,40,25,0.5)),url(/images/svc-corporate.jpg)",
      "linear-gradient(135deg,rgba(20,15,10,0.6),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
    ],
    brief:
      "12 HBL branches across Punjab, rolled out to a new brand prototype. One design language, 12 sites, each with its own building quirks.",
    hardPart:
      "Coordinating 12 simultaneous sites without diluting quality. We templated joinery in our workshop, standardised finishes across batches, and deployed three site teams with a single project director coordinating.",
    build:
      "All 12 branches handed over within the agreed 20-week window. Two were early. The prototype has since been rolled out nationally.",
    quote: {
      text: "They made 12 different buildings feel like one brand. And they hit every date.",
      name: "Regional Facilities Lead",
      role: "HBL",
    },
    stats: [
      { label: "Branches", value: "12" },
      { label: "Window", value: "20 weeks" },
      { label: "On-time", value: "12/12" },
      { label: "Snags per branch", value: "<8 avg" },
    ],
    tags: ["Multi-site", "Banking", "Prototype Rollout"],
  },
  {
    slug: "defence-raya-brand-shop",
    title: "Defence Raya Brand Shop",
    category: "Retail",
    location: "Defence Raya, Lahore",
    area: "1,800 sqft",
    year: "2024",
    heroImg: "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(45,34,22,0.5)),url(/images/svc-retail.jpg)",
    gallery: [
      "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(45,34,22,0.5)),url(/images/svc-retail.jpg)",
      "linear-gradient(135deg,rgba(20,18,15,0.55),rgba(55,35,20,0.5)),url(/images/portfolio-retail.jpg)",
      "linear-gradient(135deg,rgba(20,15,10,0.6),rgba(50,30,15,0.5)),url(/images/svc-3d.jpg)",
    ],
    brief:
      "A compact brand shop inside Defence Raya Golf & Country Club. The space had to feel exclusive but welcoming, with product moments that reward closer inspection.",
    hardPart:
      "1,800 sqft with a structural column dead in the centre. We turned the column into a product display plinth wrapped in brass, making it the room's focal point rather than its flaw.",
    build:
      "Finished in 7 weeks. The client reported 3× conversion vs. their previous in-club location.",
    quote: {
      text: "The column was a mistake in the lease. Woodex made it the first thing people photograph.",
      name: "Founder",
      role: "Brand",
    },
    stats: [
      { label: "Area", value: "1,800 sqft" },
      { label: "Duration", value: "7 weeks" },
      { label: "Conversion", value: "3× prior" },
    ],
    tags: ["Retail", "Compact", "Joinery-led"],
  },
];

export const CATEGORIES = ["All", "Commercial", "Residential", "Retail", "F&B", "Corporate"] as const;
export type Category = (typeof CATEGORIES)[number];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
