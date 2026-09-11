# Woodex Interior — Relaunch Execution Plan

**Prepared:** 11 September 2026
**Inputs:** PRD v1.0 · DESIGN.md · 90-Day Master Plan (New Text Document) · Phase 2+3 Blueprint (plan (2))
**Stack:** Next.js 16 · React 19 · Tailwind v4 · Framer Motion · Lenis · Sanity
**Deploy:** https://agent-woodex.vercel.app/ (main → Vercel auto-deploy) · local preview :3003

---

## 0. Executive Summary — What the four strategy docs agree on

All four documents converge on these decisions. Treat them as **locked unless you say otherwise**:

| Decision | Value |
|---|---|
| Category | Design + Build company (not interior-decor, not furniture catalogue) |
| Primary segment | Corporate workplaces / office fit-out (P1); retail & hospitality P2; residential selective P3 |
| Master tagline | **"Designed. Built. Made by Woodex."** (90-day plan) |
| Campaign line | **"See the room before it exists."** (3D-led) |
| PRD hero H1 | **"Spaces Designed to Work. Built to Last."** |
| Primary nav | **Work · Services · Industries · About · Insights** + "Start Your Project" CTA |
| Primary CTA copy | "Start Your Project" across the site |
| Phone / WhatsApp | **+92 322 4000768** (all four docs agree) |
| WhatsApp CTA | Always visible — float + sticky mobile bar |
| 3D Studio | Main-nav item — "Open 3D Studio" as differentiator |
| PCATP rule | No "architecture firm" claims; use "architectural coordination" until licensed |
| Proof policy | No unverified founding year / client count / awards / workshop claims until written evidence |

---

## 1. Decisions that need your sign-off (defaults proposed)

| # | Question | Option A (DESIGN.md) | Option B (90-day plan / PRD) | **Default I will use** |
|---|---|---|---|---|
| 1 | **Palette** | Navy `#0c1628` + Cream `#f4efe7` + Wood `#b8956a` (corporate-minimal) | Deep walnut `#443229` + Charcoal `#1E1E1C` + Warm ivory `#F3EFE7` + Muted brass `#A98252` + Sage `#687064` (warm-evolution of current oak) | **B** — walnut/brass/ivory. It evolves the existing warm oak premium aesthetic rather than ditching it for corporate navy; aligns with "craft-led / wood and making language" in brand voice. Navy is a bigger brand flip — recommend saving it for v2 once photography + case studies are Navy-grade. |
| 2 | **Typeface** | Plus Jakarta Sans 300–700 (single family) | (90-day is silent on type; PRD says "restrained") | **Plus Jakarta Sans 300–700**. Clean geometric sans works for either palette; kills the Fraunces decorative serif in favour of architectural confidence — matches PRD "Minimal Corporate + Premium Architectural". |
| 3 | **NAP — Phone** | +92 322 4000768 | +92 322 4000768 | **+92 322 4000768** (all docs agree). |
| 4 | **NAP — Address** | M-71 Zainab Tower, Model Town Link Rd, Lahore 54700 | M-71 Zainab Tower, Model Town (the 90-day plan flags that public listings disagree between M-71 and LG-89 and asks for canonical verification) | **M-71, Zainab Tower, Model Town Link Road, Lahore 54700** — matches DESIGN.md explicit address. Please correct if LG-89 is the real unit. |
| 5 | **NAP — Email** | (DESIGN.md not specified) | `woodexinterior.pk@gmail.com` (PRD); `hello@woodex.com.pk` / `warranty@woodex.com.pk` (90-day microcopy) | **woodexinterior.pk@gmail.com** as primary until `woodex.com.pk` domain email is live. Will add as TODO to swap to hello@woodex.com.pk later. |
| 6 | **Domain** | (DESIGN.md silent) | `woodex.com.pk` (90-day plan) | Keep current deploy URL for dev; when DNS is ready swap `SITE.url`. |
| 7 | **Existing content to preserve** | n/a | n/a | The current 13-section home, mega-menu Services nav, CinematicHero, 14 service detail pages, 6 portfolio case studies, kicker system, Button v3, Footer v2, MobileStickyCTA all stay as foundation. We re-skin, re-order, and re-write; we don't throw away working code. |

> **If you want Option A (Navy + Plus Jakarta Sans hard corporate) on any of these, just say "go navy".** Otherwise I start with the defaults above.

---

## 2. Relaunch — Sitemap vs Current Routes

| New sitemap (PRD) | Existing route | Action |
|---|---|---|
| `/` (home) | `/` | **Rewrite** — new H1, new section sequence, new copy |
| `/work/` → `/work/[slug]` | `/portfolio/` → `/portfolio/[slug]` | **Rename + rebuild** hub; turn case studies into the PRD template (challenge/response/concept/result); keep 6 existing case studies as starting content |
| `/services/` | `/services/` | **Restructure hub** — split into Strategy/Design/Visualization/Execution/Delivery/Furniture groups; rewrite to commercial-problem-led cards |
| `/services/interior-design/` etc. (11 new URLs) | 14 existing `[slug]` pages | **Map + keep** — existing slugs become canonical per PRD list; add missing slugs (workplace-strategy, space-planning, architecture, bim, corporate-fit-out, procurement, project-management) |
| `/industries/` → 8 industries | ❌ does not exist | **Build new** hub + 8 pages (corporate-offices, technology, retail, hospitality, healthcare, education, developers, residential) |
| `/about/` | `/about/` | **Rewrite** per PRD + 90-day (story/approach/team/why-woodex/proof) |
| `/insights/` | `/blog/` | **Rename /blog → /insights**; keep existing posts; add editorial pillar structure |
| `/locations/` → 5 cities | `/locations/[city-slug]` (lahore) | **Extend** to Islamabad, Karachi, Faisalabad, Multan; use evidence-led template not thin SEO |
| `/process/` | ❌ does not exist | **New page** — Understand → Plan → Design → Build → Deliver (PRD) |
| `/team/` | ❌ does not exist | **New page** (behind About in nav; behind proof gate — only publish verifiable people) |
| `/woodex-furniture/` | ❌ does not exist | **New page** — sister concern; cross-sell, not primary nav |
| `/start-a-project/` | `/consultation/` + `/contact/` | **Merge into `/start-a-project/`** with PRD 13-field brief form; keep `/contact/` as fallback |
| `/3d-studio/` | `/3d-studio/` | **Keep + elevate** — main-nav "Open 3D Studio"; cine hero retained per DESIGN.md rule |
| `/warranty/` `/materials/` `/faq/` | ❌ / partial (FAQ exists on home) | **Build support pages** — 90-day plan copy already written |
| Tier-1/2/3 SEO landing pages | ❌ | **Sprint 4** — 18+ pages from PRD/90-day plan tier lists |

---

## 3. Design-system migration map (Option B — Walnut / Brass / Ivory / Plus Jakarta Sans)

### 3.1 New tokens (applied on top of existing v3.1 system — no component rewrites needed)

| Current token | New value | Source |
|---|---|---|
| `--oak-50` bg | `#F3EFE7` Warm ivory | 90-day |
| `--oak-100` | `#E8DFD2` (tinted ivory −1) | derived |
| `--oak-200` | `#C9BFB1` Natural stone | 90-day |
| `--oak-400` | `#b8956a` Wood | DESIGN.md |
| `--oak-500` primary warm | `#A98252` Muted brass | 90-day |
| `--oak-600` | `#86663f` (brass −1) | derived |
| `--oak-700` | `#624a2d` (brass −2) | derived |
| `--oak-800` | `#443229` Deep walnut | 90-day |
| `--oak-900` | `#2b1f19` (walnut −1) | derived |
| `--graphite-900` near-black | `#1E1E1C` Charcoal | 90-day |
| `--accent` terracotta | `#A98252` (replaced by brass — one warm metal, no competing accent) | 90-day "no extra accent" |
| `--sage` (new) | `#687064` | 90-day — used sparingly for success/secondary |
| `--ink` (new) | `#12151c` | DESIGN.md — used for body text on ivory |
| `--muted` (new) | `#6a6560` | DESIGN.md |
| heading font | `Plus Jakarta Sans` (replacing Fraunces) | DESIGN.md + PRD |
| body font | `Plus Jakarta Sans` (replacing Inter — single family) | DESIGN.md "No second typeface" |
| Radius scale | `24 / 16 / 12 / pill` (cards 24, inner 16, inputs 12, buttons pill) | DESIGN.md |
| Primary easing | `cubic-bezier(0.22, 1, 0.36, 1)` | DESIGN.md |

Key rules from DESIGN.md applied across the migration:

- **Linoxa pill button** — already pill; add circular-arrow icon hover (extend Button v3).
- **Header** — fixed, white-on-transparent-hero / cream-on-light pages (we have `glass` variant already; add `light-page` navy bar for cream pages). Desktop hide-on-scroll (already partial). Keep mega-menu.
- **Cine hero stays full-viewport** only on Home + 3D Studio (already true).
- **All inner heroes = 520px** tall (currently several inner pages use taller backgrounds; standardize).
- **Footer** — "Stay connected" + giant INTERIORS wordmark.
- **WhatsApp float** — `wa.me/923224000768` globally.
- **No emoji** in UI — use line icons (current SVG Icon system extended).

### 3.2 Components that will change visually but keep their API

These components are already built and just need token + minor markup adjustments, not rewrites:

| Component | Change |
|---|---|
| `Nav.tsx` v2 | Reorder nav items to Work / Services / Industries / About / Insights; rename Portfolio→Work, Blog→Insights; add 3D Studio link; add light-page bar variant; phone number swap |
| `Button.tsx` v3 | Add circular-arrow hover (Linoxa variant); use new oak-500 brass as liquid fill; drop terracotta accent fill |
| `Footer.tsx` v2 | Swap NAP; add giant INTERIORS wordmark; "Stay connected" heading; hours/directions/WhatsApp reply label already done |
| `CinematicHero.tsx` | Swap H1 to "Spaces Designed to Work. Built to Last."; write new 3-slide copy aligned with P1 office focus; keep Ken Burns + contractual-guarantee proof slide |
| `MobileStickyCTA.tsx` | Phone/WhatsApp numbers swap; already correct architecture (Call/WhatsApp/Book) |
| `ChatWidget.tsx` | Already WhatsApp-targeted; retarget new number |
| `ServiceHero.tsx` | Constrain height to 520px on inner pages; already next/image LCP-optimized |
| `.kicker` class | Already standardized; just confirm color tokens |

---

## 4. Sprint Plan (aligned to PRD priority build sequence + 90-day schedule)

I will start work immediately in this order. Each sprint ends with `tsc` clean → `next build` clean → port 3003 restart → `git push` → Vercel HIT verify.

### Sprint 0 — Foundation & NAP (today, immediate)
1. Update `src/lib/config.ts` with new NAP (0322-4000768 / M-71 Zainab Tower / woodexinterior.pk@gmail.com / woodex.com.pk URL / tagline swap)
2. Swap phone/WhatsApp/email in every component that hardcodes (grep + replace)
3. Update `globals.css` tokens to walnut/brass/ivory palette + Plus Jakarta Sans font face + new radius scale + DESIGN.md ease
4. Swap Fraunces → Plus Jakarta Sans in font loader (layout.tsx / next/font)
5. Reorder Nav: Work / Services / Industries / About / Insights + Start Your Project CTA + Open 3D Studio
6. Rename `/blog` → `/insights` route (keep content)
7. Extend Linoxa pill button (circular arrow hover, dual-label)
8. Set all inner hero heights to 520px via a shared `.inner-hero` class
9. Add global floating WhatsApp button (`wa.me/923224000768`) per DESIGN.md
10. Build + push + verify

### Sprint 1 — Homepage Rewrite (PRD §8, plan (2) Section 1-11 copy)
New section order per PRD (replaces current 13-section layout):
1. **Cine Hero** — H1 "Spaces Designed to Work. Built to Last." eyebrow "DESIGN + BUILD COMPANY" + dual CTA (Start Your Project / View Our Work)
2. **Positioning strip** — "More than interior design" — Think / Design / Build triad
3. **Capabilities grid** — 6 strategic capabilities (Strategy · Design · Visualization · Fit-Out · Delivery · Furniture)
4. **Featured Work** — 3-4 best case studies, editorial layout (not gallery dump)
5. **Core Business Focus** — Office Fit-Out / Corporate Interiors / Workplace Strategy (P1 triple)
6. **Industries rail** — Corporate, Tech, Retail, Hospitality, Healthcare, Education, Developers, Residential
7. **Process rail** — Understand → Plan → Design → Build → Deliver (reuse existing ProcessRail, re-skin)
8. **Why Woodex** — proof/numbers block (rebuild ProofStack with verified numbers only)
9. **Woodex Furniture** — sister-concern cross-sell
10. **Insights teaser** — 3 latest articles
11. **Final CTA** — Start Your Project (reuse CTAFinal, re-skin)

Each section carries ≥3 concrete numbers above the fold (per existing anti-repetition rule). Copy is already drafted in `plan (2).md`.

### Sprint 2 — Work hub + Case study template
1. Rename `/portfolio` → `/work` hub (list view with filters: Office / Corporate / Retail / Hospitality / Residential / Furniture)
2. Rewrite case-study `[slug]` template to PRD §10.1: Title + category + location → Snapshot (area/sector/services/timeline) → Client challenge → Strategic response → Space planning → Design concept → Material direction → Technical coordination → Execution → Result → Gallery → Related services → CTA
3. Convert 6 existing case studies to new template using available photography (mark unverified claims as placeholders per proof policy)

### Sprint 3 — Services restructuring + Industries hub
1. Rebuild `/services` hub around 6 service groups (Strategy/Design/Visualization/Execution/Delivery/Furniture)
2. Create missing service pages (workplace-strategy, space-planning, architecture-coordination, bim-services, corporate-fit-out, procurement, project-management) using PRD 5.3 URL list
3. Build `/industries/` hub + 8 industry pages (corporate-offices, technology, retail, hospitality, healthcare, education, developers, residential) using plan (2).md copy blocks

### Sprint 4 — About / Process / Start-a-Project / 3D Studio elevate
1. Rewrite `/about` (Story / Approach / Team gate / Why Woodex)
2. Build `/process/` page
3. Merge `/consultation` + `/contact` into `/start-a-project/` with 13-field PRD brief form (Name · Company · Phone/WA · Email · Project Type · City · Approx Area · Current Stage · Services Required · Timeline · Budget · Description · Source)
4. Elevate `/3d-studio` to cine hero + live 3D studio booking CTA per DESIGN.md
5. Build `/woodex-furniture/` sister-concern page
6. Build `/warranty/` and `/materials/` support pages (90-day copy ready)

### Sprint 5 — Locations + SEO + Schema + Polish
1. Extend `/locations/` to Islamabad / Karachi / Faisalabad / Multan (evidence-led)
2. JSON-LD schema across routes (LocalBusiness, Service, FAQ, Breadcrumbs, Organization)
3. Tier-1 SEO landing pages (5: interior-designer-lahore, office-interior-design-lahore, office-furniture-lahore, cafe-interior-design-lahore, restaurant-interior-design-lahore)
4. Title/description rewrite for every route
5. LCP/INP/CLS pass; a11y WCAG 2.2 AA pass; reduced-motion + coarse-pointer audit
6. 404 page copy per 90-day microcopy

---

## 5. Items I will NOT change without explicit evidence (per 90-day §2.3 proof policy)

- Founding year (currently 2014 / 12 years — keep but flag for verification)
- "240+ projects delivered" — keep but label internally as unverified
- "98% on-time" and "PKR 25,000/week delay credit" — keep (this is contractual promise copy, not a historical claim)
- In-house manufacturing / workshop ownership claims (remove if found on any page; replace with "coordinated joinery delivery" until verified)
- Client logos, awards, PCATP licensure, team headcount, cities served

---

## 6. Current status → Next action

- ✅ node_modules installed, `next build` clean, port 3003 live (HTTP 200)
- ✅ RELAUNCH-PLAN.md written (this file)
- ⏭️ **Starting now**: Sprint 0 — NAP swap + new design tokens + Plus Jakarta Sans + reordered Nav + global WhatsApp float → commit → push → Vercel deploy
- ⏭️ Then Sprint 1 — Homepage rewrite to PRD section order with new H1 "Spaces Designed to Work. Built to Last."

If you want to override any default in §1 (especially palette A navy vs B walnut, or address unit M-71 vs LG-89), send one message and I'll switch before touching tokens. Otherwise Sprint 0 is underway.
