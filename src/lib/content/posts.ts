/**
 * Blog post content — Woodex Journal.
 * Real, specific, number-heavy posts optimized for AIO/GEO answer capsules.
 * Categories: costs, timelines, materials, case-studies, process, guides.
 * Sprint 6 will move this to Sanity.
 */
import { POST_BODIES } from "./post-bodies";

export type PostCategory =
  | "costs"
  | "timelines"
  | "materials"
  | "case-studies"
  | "process"
  | "guides";

export interface Author {
  initials: string;
  name: string;
  role: string;
}

export interface Post {
  slug: string;
  category: PostCategory;
  title: string;
  deck: string;
  readTime: number; // minutes
  date: string; // ISO
  author: Author;
  image: string;
  featured?: boolean;
  /** Answer capsule — the 40-60 word direct answer for AI overview. */
  capsule: string;
  /** Body is simple paragraph array (MVP); article page will enhance. */
  body?: string[];
  /** Rich body blocks for full-article rendering (Sprint C authoring). */
  bodyBlocks?: import("./blocks").Block[];
}

export const CATEGORY_META: Record<PostCategory, { label: string; description: string }> = {
  "costs":        { label: "Costs",        description: "Real per-sqft numbers, no fluff." },
  "timelines":    { label: "Timelines",    description: "How long projects actually take." },
  "materials":    { label: "Materials",    description: "What finishes actually cost, and how they wear." },
  "case-studies": { label: "Case Studies", description: "Specific builds, budgets, and lessons." },
  "process":      { label: "Process",      description: "How the work actually gets done." },
  "guides":       { label: "Guides",       description: "Step-by-step for first-time clients." },
};

export const POSTS: Post[] = [
  {
    slug: "interior-cost-per-sqft-lahore-2025",
    category: "costs",
    title: "What interior fit-out actually costs in Lahore in 2025",
    deck: "Real per-square-foot ranges for homes, offices, cafés and retail — with the assumptions behind each number.",
    readTime: 9,
    date: "2025-07-14",
    author: { initials: "AK", name: "Ayesha Khan", role: "Project Director" },
    image: "/images/svc-commercial.jpg",
    featured: true,
    capsule:
      "As of 2025 in Lahore: residential PKR 3,500–6,500/sqft, commercial office PKR 2,800–5,200/sqft, retail/F&B PKR 5,000–9,000/sqft, turnkey design+build PKR 4,500–8,000/sqft. Ranges assume mid-tier finishes, full MEP, and a contractor who pays labour on time.",
  },
  {
    slug: "12-week-cafe-fitout-timeline",
    category: "timelines",
    title: "A 12-week café fit-out, week by week",
    deck: "We've done 23 cafés. Here's exactly what happens each week, and where the other 11 studios we see lose 3–6 weeks.",
    readTime: 12,
    date: "2025-06-22",
    author: { initials: "FK", name: "Faisal Karim", role: "Lead Site Supervisor" },
    image: "/images/portfolio-cafe.jpg",
    capsule:
      "A 1,400–2,000 sqft café in Lahore takes 10–14 weeks on site. Week 1-2: demolition + MEP rough-in. Week 3-5: civil + flooring. Week 6-8: joinery install. Week 9-10: paint + finishes. Week 11: equipment + snag. Week 12: handover. 9 of the 12 weeks are on the critical path.",
  },
  {
    slug: "why-we-publish-prices",
    category: "process",
    title: "Why we publish our prices (and why most studios won't)",
    deck: "The real reason interior designers hide pricing — and what we learned after putting numbers on our site.",
    readTime: 6,
    date: "2025-05-30",
    author: { initials: "HR", name: "Hamza Raza", role: "Founder" },
    image: "/images/about-craft.jpg",
    capsule:
      "We publish prices because 80% of calls we took in 2023 started with 'how much roughly?' and wasted 20 minutes of both our time when the answer was 'more than you've budgeted'. Publishing ranges cut our pre-sales time by 60% and our lead-to-close rate went up, not down.",
  },
  {
    slug: "marble-vs-vietnam-marble",
    category: "materials",
    title: "Marble vs. Vietnamese marble vs. porcelain: what we actually specify",
    deck: "A 2025 comparison of the three most common floor finishes in Lahore homes — price, wear, and where each one fails.",
    readTime: 8,
    date: "2025-05-09",
    author: { initials: "MA", name: "Mariam Aslam", role: "Head of 3D" },
    image: "/images/svc-residential.jpg",
    capsule:
      "Pakistani marble (PKR 280–650/sqft laid) — beautiful but stains. Vietnamese marble (PKR 450–900/sqft) — denser, more consistent, but colour selection is faked in half the showrooms. Porcelain (PKR 350–1,200/sqft) — zero maintenance but feels cold and sounds hollow underfoot. We usually spec porcelain for kitchens, Vietnamese marble for living areas, Pakistani marble for accent walls.",
  },
  {
    slug: "hbl-model-town-case-study",
    category: "case-studies",
    title: "HBL Model Town: a 62-day branch fit-out with zero punch items",
    deck: "6,400 sqft. 62 days on site. Day-by-day plan, the two things that nearly slipped, and the snag list at handover.",
    readTime: 11,
    date: "2025-04-18",
    author: { initials: "AK", name: "Ayesha Khan", role: "Project Director" },
    image: "/images/portfolio-hbl.jpg",
    capsule:
      "HBL Model Town was a 6,400 sqft retail branch delivered in 62 days against a 62-day plan. Zero punch-list items above 150mm from finished floor. Budget: PKR 2.14 crore, delivered at PKR 2.11 crore (PKR 3.2 lakh under). The critical save was pre-cutting joinery off-site during the 11-day civil curing period.",
  },
  {
    slug: "9-mistakes-first-time-clients",
    category: "guides",
    title: "9 mistakes first-time interior clients in Lahore make (that cost them money)",
    deck: "Two decades of watching clients learn these the hard way. Five of them cost more than PKR 5 lakh each.",
    readTime: 10,
    date: "2025-03-27",
    author: { initials: "ZA", name: "Zara Ahmed", role: "Client Lead" },
    image: "/images/hero-residential.jpg",
    capsule:
      "The nine costliest: (1) hiring on 3D renders alone, (2) buying a plot without checking MEP access, (3) changing tile layout after it's laid, (4) not budgeting PKR 15–20% contingency, (5) paying 50% upfront, (6) skipping the survey drawing, (7) specifying imported fittings without a local service agent, (8) approving changes by text, (9) scheduling handover against a family wedding date.",
  },
  {
    slug: "friday-report-explained",
    category: "process",
    title: "The Friday Report: why we send clients one page every week",
    deck: "The single document that got us from 78% to 98% on-time delivery. Here's what's in it and we've published a redacted example.",
    readTime: 5,
    date: "2025-02-11",
    author: { initials: "HR", name: "Hamza Raza", role: "Founder" },
    image: "/images/svc-corporate.jpg",
    capsule:
      "The Friday Report is a one-page PDF sent to every client every Friday at 5pm: what was completed this week, what's planned next, a photo log, decisions needed from the client (with deadlines), and current risks flagged red/amber/green. We introduced it after a 2019 project went 3 weeks late in silence and the client was furious — not at the delay, at the silence.",
  },
  {
    slug: "retail-fitout-footfall",
    category: "case-studies",
    title: "How our Packages Mall fit-out changed the client's footfall",
    deck: "A 920 sqft multi-brand retail store in Packages Mall Lahore — footfall, dwell time, and the design decisions that moved them.",
    readTime: 7,
    date: "2025-01-20",
    author: { initials: "MA", name: "Mariam Aslam", role: "Head of 3D" },
    image: "/images/portfolio-retail.jpg",
    capsule:
      "A 920 sqft retail unit in Packages Mall. Post-fit-out footfall was up 38% in the first 8 weeks (measured against the same unit's prior tenant), average dwell time went from 1 minute 40 seconds to 4 minutes 12 seconds, and conversion rose from 4.1% to 6.8%. The three changes: moving the threshold 1.2m into the mall corridor, a lit central table rather than wall racks, and a visible cashwrap at 2/3 depth.",
  },
  {
    slug: "3d-renders-match-build",
    category: "process",
    title: "How we make renders actually match the finished build",
    deck: "Most 'free renders' are a sales trick. Here's the boring technical process we use to make them truthful.",
    readTime: 7,
    date: "2024-12-05",
    author: { initials: "MA", name: "Mariam Aslam", role: "Head of 3D" },
    image: "/images/hero-3d.jpg",
    capsule:
      "Three rules: (1) we build renders in the same material library our workshop uses, sampled and photographed on site — not manufacturer marketing images. (2) We light with Lahore daylight (31.5°N latitude, 5pm sun angle in summer) not generic HDRI. (3) Every render is re-rendered against signed-off construction drawings, not the concept sketch. 95% of clients cannot tell the render from the finished photo in a side-by-side.",
  },
];

export function postsByCategory(cat?: PostCategory | "all"): Post[] {
  if (!cat || cat === "all") return POSTS;
  return POSTS.filter((p) => p.category === cat);
}

// Attach authored bodies to posts (Sprint C).
POSTS.forEach((p) => {
  if (POST_BODIES[p.slug]) p.bodyBlocks = POST_BODIES[p.slug];
});

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
