# 🪵 Woodex Interior — Frontend Design & Content Master Plan
**Date:** 2026-08-02 · **Audit of:** https://agent-woodex.vercel.app/
**Goal:** Polish the entire site to a premium, motion-rich, conversion-focused marketing frontend for Woodex Interior (Lahore-based design-and-build studio), with integrated brand-voice content, services mega-menu, category structure, dark/light parity, and full responsive coverage.

---

## 0. CURRENT STATE AUDIT

### What's already shipping (Sprints 0–G + Live Builder Phases 1–6)
- 61 routes building cleanly, TypeScript 0 errors
- Cinematic hero with Ken Burns, parallax, split-text, clip-wipe transitions
- Full service content system (12 services with unique copy, FAQ, case studies, team)
- Friday-Report / 3D-to-Build guarantee / PKR pricing differentiated voice
- Lenis smooth scroll, Framer Motion, Embla carousels
- Dark/light theme system with CSS variables
- CSP/HSTS/rate-limit headers, draft preview, Live Builder CMS hooks
- Footer with social dots, WhatsApp, legal bar, CTA block

### Issues found during live QA (this session)
| # | Area | Issue | Priority |
|---|------|-------|----------|
| 1 | **Nav desktop** | No services dropdown — users must click "Services" hub first, then scan. Desktop has no peek-preview of the 6 practices / 12 services. | P0 |
| 2 | **Nav mobile ≤360px** | Theme toggle + hamburger + logo squeeze; logo wordmark "Woodex." collides with toggles. | P0 |
| 3 | **Services page** | No category filter pills (All / Commercial / Residential / Retail / Corporate / 3D / Turnkey / Furniture / Renovation). Service list is one long scroll. | P0 |
| 4 | **Services tiles** | Hero/svc images use CSS `background-image` (no alt, no `next/image`, no focalPoint; hurts LCP). | P1 |
| 5 | **Dark/light color parity** | Dark mode surface-1/2 too close in value (graphite-900 vs graphite-950 contrast < 1.1:1). Accent terracotta #c85a3b doesn't show on oak-500 in dark. | P1 |
| 6 | **Buttons** | `liquid` variant fills oak-500 warm-brown on hover — text goes white but the bordered idle state on light bg has weak CTA presence. `dark` variant on dark-footer bg looks too similar to surface. Arrow drift inconsistent. | P1 |
| 7 | **Footer** | CTA heading OK, but contact column has no WhatsApp quick-reply label, hours are missing, Lahore address missing postcode/landmark, no "Get directions" link, no hours line. Legal bar missing "Pakistan" context. | P1 |
| 8 | **Hero content** | Slides 2-4 subcopy strong, but sub on slide 1 says "500 sqft cafés" which conflates F&B with commercial. Slide 3 "See it. Approve it. Get exactly that." could land harder with a proof number. | P1 |
| 9 | **Proof/testimonial sections** | Pure `text-white` on graphite-900 causes eye-strain for long paragraphs → softens to `white/85`. | P1 |
| 10 | **Kicker consistency** | `.kicker` class exists but many older sections use hand-rolled eyebrow markup. Standardize. | P2 |
| 11 | **Brand voice violations** | Grep reveals "bespoke" in residential scope ("Bespoke space planning"), "passion"/"world-class"/"seamless"/"leverage" must be hunted. | P1 |
| 12 | **Numbers above fold** | Some inner pages (3D Studio, about, contact, blog index, portfolio) don't show ≥3 concrete numbers in first viewport. | P1 |
| 13 | **Dark-mode accent** | `--accent` terracotta against oak-50 in dark theme is unreadable for links — need an `--accent-on-dark` token. | P2 |
| 14 | **Contact/Consultation CTAs** | Phone CTA doesn't show "WhatsApp quick reply" or "Replies in 15 min" micro-label under the number. | P2 |
| 15 | **Touch/mobile motion** | Clip-path wipes don't degrade on coarse pointers; ShowcaseRail snap not verified; BeforeAfter hit area. | P2 |
| 16 | **Service detail hero** | Subheading max-width too wide on tablet (12-word lines at 768px). | P2 |
| 17 | **Office furniture sub-brand** | User attached WoodEx Furniture (office furniture ecom) master plan. This site is "Woodex Interior" (studio); the "Office Furniture" and "Custom Furniture" services should acknowledge the furniture product line with a cross-link to the forthcoming shop subdomain. | P2 |

---

## 1. INFORMATION ARCHITECTURE — NAV MEGA MENU

### 1.1 Desktop mega menu (Services)
Hover/click "Services" → 2-column panel (420px wide, glass-blur surface):

**Left column — Practices (what to expect):**
- Commercial Interiors → /services/commercial
- Residential Interiors → /services/residential
- Corporate Interiors → /services/corporate
- Retail & F&B → /services/retail
- Turnkey Design+Build → /services/turnkey
- Renovation → /services/renovation

**Right column — Specialties (granular):**
- Office Fit-Out (CAT B) → /services/office-fit-out
- Office Furniture (workstations/chairs) → /services/office-furniture
- Custom Furniture (workshop) → /services/custom-furniture
- Brand Shops → /services/brand-shop
- Residential Fit-Out (apartments) → /services/residential-fit-out
- 3D Design Only → /services/3d-design-planning

**Footer of panel:** "Not sure which service? → Book a free 45-min site visit" with small CTA.

- Panel: `bg-[var(--bg)]/95 backdrop-blur-xl border border-[var(--border)]` rounded-sm, enters with `clip-path inset(0 0 100% 0)` → `inset(0)`, 300ms.
- Active link has oak underline + light oak-100 bg.
- Closes on Escape, on scroll > 80px, on mouse-leave (200ms delay).

### 1.2 Mobile nav
- Keep stacked links but group services under an expandable "Services" accordion (chevron) showing all 12 on open.
- Fix ≤360px: shrink logo wordmark on mobile (hide "Woodex." wordmark < 360px? No — just reduce to w-7 h-7 logo mark only < 340px; show wordmark ≥340px at `text-base`).
- Cluster: `gap-1`, ThemeToggle `!w-8 !h-8`, hamburger `w-9 h-9` at < 375px.

### 1.3 Top utility items
- Phone in nav: append micro "15-min reply" sub-label on hover (desktop) or under the number (mobile).
- Add "WhatsApp" entry to mobile panel only (wa.me link) — highest-conversion entry point for PK audience.

---

## 2. COLOR SYSTEM — DARK/LIGHT PARITY

### 2.1 New tokens to add
```css
/* Surface scale — fix dark-mode contrast */
--surface-1: light:#ffffff  dark:var(--graphite-900);
--surface-2: light:var(--oak-50)  dark:var(--graphite-800);
--surface-3: light:var(--graphite-900) dark:var(--oak-100);

/* Accent on dark surface */
--accent-on-dark: #e8764f;  /* lighter terracotta that hits 4.5:1 on graphite-900 */
--oak-400-on-dark: #d4b07a;  /* warmer light-oak for dark mode links */

/* Feedback */
--success-on-dark: #7ab08a;
--error-on-dark: #e06868;
```

### 2.2 Fix dark-mode specific issues
- Links in dark: hover uses `--oak-400-on-dark` (not oak-500 which is too muddy).
- Button `liquid` in dark: bg fill should be oak-400 not oak-500; text goes graphite-900.
- Button `glass`: border-white/20 → border-white/30 in dark; bg white/8 → white/12.
- Selection color in dark: oak-400 fg on graphite-900.
- Kicker `::before` dash in dark: var(--oak-400-on-dark).

### 2.3 Cross-theme card / tile baseline
- Every card/tile must pass 4.5:1 text contrast on its immediate background in BOTH themes.
- Add `data-theme-aware` visual regression list (check in post-build checklist).

---

## 3. BUTTON SYSTEM v3

### 3.1 Variant polish
| Variant | Idle | Hover | Disabled |
|---|---|---|---|
| **liquid** (primary) | 1px border fg, transparent bg, fg text | fill oak-500 (light) / oak-400 (dark), white text, arrow +2px drift | opacity 0.5, no fill |
| **dark** (on imagery/CTA) | 1px border white/30, white text, transparent | fill white, graphite-900 text | opacity 0.5 |
| **glass** (over hero imagery) | white/12 bg, white/30 border, backdrop-blur-md, white text | white/25 bg, white/60 border | — |
| **outline** (secondary) | 1px border border-strong, fg text | border oak-500, text oak-600 | — |
| **ghost** (tertiary/nav) | no border, underline on hover | — | — |
| **inline** (text links) | underline-offset-4, decoration oak-500 on hover | — | — |

### 3.2 Arrow micro-interaction
Standardize on a `<span class="arrow">` with:
```css
.arrow { display:inline-block; transition: transform .3s var(--ease-out-quart); }
.group:hover .arrow { transform: translateX(3px); }
```
All CTAs ending in "→" get the drift class (verified per-page).

### 3.3 Sizing
- `sm`: px-4 py-2 text-[0.8125rem] — used in nav, cards
- `md`: px-6 py-3 text-sm — default
- `lg`: px-8 py-4 text-[0.95rem] — hero/final CTA

### 3.4 Mobile
- Add sticky CTA bar on service detail + contact/consultation pages (mobile only): [Call · WhatsApp · Book]. Hidden on desktop.

---

## 4. HERO — CONTENT & LAYOUT POLISH

### 4.1 Copy edits (Woodex brand voice: specific, calm, PK/Lahore-grounded, proof-led)

**Slide 1 — Commercial:**
- Eyebrow: "Commercial Interiors"
- Line 1: "A boardroom"
- Line 2: *that closes deals*
- Line 3: "before the first slide."
- Sub (tightened): "From 2,000 sqft startup floors to 40,000 sqft HQs — 98% handed over on the contract date, every finish signed off in 3D before we drive a single nail."
- CTA: "See commercial work →"
- Meta strip add: "PKR 2,800–5,200/sqft · 240+ projects delivered"

**Slide 2 — Residential:**
- Keep copy (already strong). Add "11 years in Lahore" to sub tail.

**Slide 3 — 3D Studio:**
- Line 3: "Get exactly that."
- Sub: "Our in-house 3D studio produces renders so precise we contractually guarantee them against the finished build. We've honoured the guarantee twice in 11 years."

**Slide 4 — Turnkey:**
- Sub: "Design, build, furniture, MEP, lighting — single contract, single Gantt, single Friday report at 4pm, every week. 98% on the contract date or we pay PKR 25,000/week."

### 4.2 Hero visual polish
- First slide gradient: tighten bottom-black to 85% opacity (not 80%) for better CTA legibility on short mobile screens.
- Progress-bar dots: min hit-area 24×24px (touch). Already 28px wide but add invisible padding.
- "Free 45-min site visit" circle: pulsing dot animates 1.5s pulse (not default tailwind pulse which pulses opacity 0-1-0 in 2s; make it breathe 0.4→1→0.4).
- Bottom bar pb-4 sm:pb-5 → pb-6 sm:pb-8 on very small screens (320px) to lift above browser chrome.

### 4.3 Service detail hero
- ServiceHero: subheading max-width cap at `max-w-2xl` (tablet); adds `text-balance`.
- Migrate CSS background to next/image with fill (LCP win).
- Add eyebrow "service" before category kicker.

---

## 5. SERVICES PAGE — CATEGORY PILLS + MEGA GRID

### 5.1 Category pill row (scroll-snap on mobile)
```
[All]  [Commercial]  [Residential]  [Retail & F&B]  [Corporate]  [Turnkey]
[3D Design]  [Office Fit-Out]  [Furniture]  [Renovation]  [Brand Shops]
```
- Sticky under nav (desktop) on scroll.
- Client-side filter → smooth scroll to first matching service card (no route change).
- Active pill: oak-500 bg, oak-50 text, 2px oak underline.
- Inactive: border border-border, fg-muted, hover:bg-surface-1.
- Mobile: horizontal scroll-snap-x row with `.scrollbar-none`.

### 5.2 Service grid — image migration
- Replace `linear-gradient + url(...)` CSS bg with `<Image fill>` + overlay div.
- Each card: aspect ratio 4/3 mobile, 16/10 desktop; focal point at center-70% (lower third for room shots).
- Alt text format: `{service.eyebrow} interior in Lahore by Woodex — {1-line feature}`.

### 5.3 Hub page hero
- Keep stats strip. Add fourth stat: "11-year track record".
- Add "Featured project" mini-card under stats (SERVICE_LIST[0].relatedProjects[0]) for visual texture.

---

## 6. FOOTER v2

### 6.1 Structural additions
- **Contact column — add:**
  - Business hours line: "Mon–Sat, 10am–7pm" (SITE.hoursShort)
  - "Get directions →" link (opens Google Maps for Plot 42, Sundar Industrial Road, Lahore)
  - WhatsApp link with sub-label: "Quick reply · ~15 min response"
  - Email line kept
- **Studio column — add:**
  - "3D Studio →" link
  - "Live Builder →" (for clients, password-protected)
- **Services column — add:**
  - "Renovation" → already there
  - "Custom & Office Furniture →" (consolidated link)

### 6.2 CTA block
- H2 kept; add micro-kicker "Start your project" above.
- CTA button: add arrowRight icon with drift.
- Secondary: "Or WhatsApp us →" under primary button.

### 6.3 Legal bar
- Keep "© 2026 Woodex Interior. Lahore, Pakistan."
- Add "Built in Lahore" small makers mark (right-aligned on desktop, below on mobile).

### 6.4 Dark-mode noise/overlay
- Reduce noise opacity in dark mode 0.035 → 0.04 (adds warmth).
- Footer bg: keep graphite-900, add 1px top border oak-900 for section separation.

---

## 7. CONTENT — BRAND VOICE SWEEP & SEO MASTER PLAN

### 7.1 Banned-word audit (grep & replace)
| Banned | Replacement (contextual) |
|---|---|
| bespoke | custom / made-to-measure / built-to-order |
| seamless | one-contract / coordinated / single-threaded |
| world-class | no-adjective; cite the metric (98% on-time, 3800 seats, 240+ projects) |
| passion | (remove adjective; show the work) |
| leverage | use / apply / build with |
| elevate | improve / raise / finish |
| synergy | (never used) |
| solutions | services / work / answers |

(Scrub all content files, blog seed, service content, meta descriptions.)

### 7.2 Numbers-above-fold rule
Every page must show ≥3 concrete facts in first viewport:
- Home (hero strip): PKR ranges, 98% on-time, 240+ projects, 11 years ✓
- Services hub: PKR 2,200–9,000, 10-day quotes, 98% ✓
- About: 11 years, 240+ projects, 34 full-time staff — **verify/add**
- Portfolio: 240+ projects, 14 retail openings, 98% on-time — **verify/add**
- Contact: phone, email, hours, WhatsApp reply time (15 min) — **add**
- Consultation: 45-min visit, 48-hour budget range, free — **add**
- 3D Studio: PKR 45k/room, 100% deductible, 48h corrections — **add**
- Blog: 240+ projects, 11 years, Friday-report cadence — **add**

### 7.3 SEO — target keyword map for Woodex Interior (studio)
(Note: this is the **Interior design studio**, not the furniture shop — keywords differ.)

#### Tier 1 — money keywords
- interior designer Lahore
- interior design Pakistan
- office interior design Lahore
- home interior Lahore
- turnkey interior Pakistan
- commercial interior design Pakistan
- fit-out contractor Lahore
- 3D interior renders Lahore

#### Tier 2 — service commercial
- office fit-out company Lahore
- commercial fit-out Pakistan
- corporate interior design Lahore
- retail interior design Pakistan
- café interior designer Lahore
- restaurant fit-out Lahore

#### Tier 3 — residential
- home interior designer Lahore
- DHA interior designer
- Gulberg interior design
- apartment interior Pakistan
- custom furniture Lahore
- renovation contractor Lahore

#### Tier 4 — AI/GEO / informational
- How much does interior design cost in Pakistan?
- Per sqft interior rate Lahore 2026
- How long does an office fit-out take in Pakistan?
- Best interior designer in Lahore
- Turnkey interior vs design-only Pakistan

### 7.4 Metadata title/description rewrite
Every page gets:
- **Title:** `{Page} — Woodex Interior, Lahore` (≤60 chars)
- **Description:** Lead with PKR range or concrete metric, include "Lahore", include CTA. (≤155 chars)
- **og:image:** /api/og?slug={slug} (edge route, already built)

### 7.5 JSON-LD schema
- Homepage: Organization + LocalBusiness + WebSite
- Service pages: Service + FAQPage + BreadcrumbList
- Portfolio project pages: CreativeWork + ImageObject
- Blog posts: Article + Author + BreadcrumbList
- Contact: LocalBusiness + PostalAddress + ContactPoint (WhatsApp phone)

---

## 8. CONTENT SECTIONS — PER-PAGE POLISH

### 8.1 Homepage (page.tsx) — 13 sections
Verify each uses `.kicker` class, consistent heading rhythm, proof numbers:
1. CinematicHero — (see §4)
2. Marquee — client names (Nishat, HBL, Systems, Café Zouk, Packages, Defence Raya) — verify dark/light contrast.
3. AboutBrief — "11 years, 240+ projects, 34 staff" — lead with those three numbers.
4. ServicesGrid — migrate to next/image; add category tag pill on each card.
5. StudioScrub (3D Studio showcase) — scrub interaction; verify touch.
6. FitOutSplit (process) — check kicker.
7. ProcessRail — desktop horizontal scroll + mobile stacked; iOS rubber-band fix.
8. ShowcaseRail — snap on touch verified.
9. ProofStack — soften white → white/85; add 3 rotating proof blocks.
10. ConvoDiagram (Friday Report visual) — keep, sharpen labels.
11. FAQ — expand/collapse; add "10-day formal quote" question.
12. CTAFinal — arrow drift; secondary WhatsApp link.
13. Footer (layout)

### 8.2 About page
- Add founding-year proof (2014 → 2026 = 12 years, note: SLA says founded 2014 = 12 years; reconcile with "11 years operating" — use "Founded 2014, 12 years in Lahore").
- Team section: monograms for Hamza, Aymen, Bilal, Ayesha, Zain, Saqib.
- Workshop section: Sundar Road workshop photo, "in-house joinery" proof point.

### 8.3 Portfolio page
- Category filter chips (Commercial, Residential, Retail, Corporate, Brand Shops, F&B).
- Project cards: next/image, lazy loading, tag chip with year.

### 8.4 Contact page
- 3-column contact strip above fold: **Phone + WhatsApp**, **Address (get directions)**, **Hours (Mon–Sat 10–7)**.
- Form adds "Expected timeline" dropdown (ASAP / 1-3 months / 3-6 months).
- Under form: WhatsApp tile — "Message us on WhatsApp. ~15 min reply, Mon–Sat 10am–7pm."

### 8.5 Consultation page
- Lead with three trust numbers: "45-min site visit · budget range in 48h · zero obligation."
- Form fields: Name, Phone (required), Email, Space type (dropdown), Approx sqft, Timeline, Message.
- WhatsApp CTA parallel card.

### 8.6 3D Studio page
- Hero: "See it. Approve it. Get exactly that." + scrub of before-render/after-build slider.
- Pricing block: Concept PKR 45k/room · Full Visualisation PKR 120k/room · Whole home from PKR 250k.
- 3D-to-Build Guarantee story block.

### 8.7 Blog / Journal index
- 3 featured posts at top with category tags.
- Post cards: kicker (category), date, read-time, next/image.

---

## 9. TYPOGRAPHY POLISH
- **Body line-height:** 1.6 → 1.65 for reading sections (blog/service copy >600px).
- **Paragraph measure:** max-w-prose (~65ch) on article copy.
- **Kicker class:** migrate all eyebrow instances — see grep list below.
- **Italic-serif accent:** only used for one phrase per section (signature rhythm) — never more than one italic hook per block.
- **Tabular numbers:** all numeric stats (PKR, %, counts) use `font-variant-numeric: tabular-nums`.
- **Drop caps:** first paragraph of service situation block has a subtle 2-line drop-cap on desktop.

### Kicker migration target list
- [x] CinematicHero — converted in pass 1
- [x] Services hub hero — converted
- [x] Footer — manual (no kicker needed for column labels at that size)
- [ ] AboutBrief eyebrow
- [ ] ServicesGrid eyebrow
- [ ] StudioScrub eyebrow
- [ ] FitOutSplit eyebrow
- [ ] ProcessRail eyebrow
- [ ] ShowcaseRail eyebrow
- [ ] ProofStack eyebrow
- [ ] ConvoDiagram eyebrow
- [ ] FAQ eyebrow
- [ ] CTAFinal eyebrow
- [ ] Service detail hero eyebrow
- [ ] Portfolio hub eyebrow
- [ ] About page section eyebrows
- [ ] Contact/Consultation hero eyebrows

---

## 10. RESPONSIVE — BREAKPOINT-BY-BREAKPOINT QA

| Viewport | Must verify |
|---|---|
| 320px (iPhone SE) | Nav logo fits (mark-only); hero h1 wraps ≤13ch; CTA buttons stack; footer contact column readable |
| 360px | Nav cluster no overlap; category pills scroll horizontally; service cards single-col |
| 390px (iPhone 14) | Hero sub wraps to 4 lines max; sticky CTA bar doesn't cover content |
| 480px | Contact form full width; service cards 1-col |
| 768px (iPad mini) | Service detail hero sub max-w-2xl; footer 2-col grid; hero h1 ~50px |
| 1024px | Nav mega-menu active; service grid 2-col; hero h1 ~64px |
| 1280px | Container maxed; footer 4-col; process rail horizontal scroll |
| 1440px+ | Hero content max-w-5xl, doesn't stretch; showcase rail 4-col |
| Landscape mobile (844×390) | Hero min-h adjusted for shorter viewport |
| Touch coarse (all) | Clip-path wipes → fade; hover states off; buttons 44px min tap area |

---

## 11. ACCESSIBILITY
- Skip-to-content link (first tab stop, fixed top-left, slides in on focus).
- All buttons `aria-label` or inner text; icon-only CTAs get labels.
- Reduced-motion: already respected globally.
- Form labels linked to inputs (not placeholder-only).
- Focus rings visible in both themes.
- Color contrast: all text 4.5:1 AA; large text 3:1 AAA.

---

## 12. EXECUTION ROADMAP (order of work)

**Batch 1 — Nav + core color (P0)**
1. Add Services mega-menu (desktop) with 12 links + panel motion
2. Mobile nav accordion for Services + ≤360px cluster fix
3. Add dark-theme accent/contrast tokens and fix dark-mode parity
4. Fix Button v3 (liquid fill dark, arrow drift, glass)

**Batch 2 — Services page + hero (P0/P1)**
5. Category pill row with smooth-scroll filter + sticky behavior
6. Service tile migration to next/image
7. Service detail hero max-width cap + next/image
8. CinematicHero copy polish (slides 1/3/4 subcopy); gradient tighten

**Batch 3 — Footer + proof/CTA (P1)**
9. Footer v2 (hours, directions, WhatsApp label, noise/border)
10. Proof/testimonial softening (white/85)
11. Kicker class migration across all sections
12. Add sticky mobile CTA bar to service/contact/consultation
13. DataStrip count-up animation

**Batch 4 — Content/SEO/brand voice (P1)**
14. Banned-word sweep (grep + replace)
15. Numbers-above-fold audit on every route
16. Title/description rewrite for all pages
17. JSON-LD schema on service/portfolio/post/contact
18. Contact/Consultation WhatsApp reply label
19. About page team + founding proof

**Batch 5 — Touch/motion/responsive QA (P2)**
20. Clip-path → fade on coarse pointer
21. ShowcaseRail snap + BeforeAfter touch
22. ProcessRail iOS rubber-band fix
23. Skip-to-content link
24. Cross-theme contrast audit (both themes, every page)
25. 320px→1920px QA pass

**Batch 6 — Build, deploy, verify**
26. `NODE_OPTIONS=--max-old-space-size=3072 npx next build`
27. Start port 3003 production server
28. `chmod 600 ~/.ssh/id_ed25519 && git push origin main --force`
29. `curl -sI https://agent-woodex.vercel.app/` verify x-vercel-cache:HIT
30. Live QA against Vercel deployment

---

## 13. DEFINITION OF DONE
- ✅ Build passes, tsc 0 errors
- ✅ Services mega-menu works desktop; mobile accordion works
- ✅ ≤360px nav cluster doesn't collide
- ✅ Services hub has sticky category pill row
- ✅ All service tiles use next/image
- ✅ Dark/light both pass 4.5:1 text contrast
- ✅ Button hover fill + arrow drift consistent
- ✅ Footer shows hours, directions, WhatsApp reply label
- ✅ Banned words: 0 occurrences
- ✅ Every page has ≥3 concrete numbers above fold
- ✅ Proof/testimonial sections white/85
- ✅ Kicker class used in ≥90% of section eyebrows
- ✅ Sticky mobile CTA bar on high-intent pages
- ✅ CinematicHero copy tightened with PKR/%/count proof
- ✅ 320px→1920px no horizontal overflow, no content crop
- ✅ Touch devices have degraded animation (fade not clip-path)
- ✅ Skip link present
- ✅ Vercel deploy HIT, all routes 200
