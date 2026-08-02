# Woodex Interior — Master Frontend Completion → CMS-Ready Plan

**Status after Sprint 5:** 49 static routes live, production build clean, zero TS errors.
**Status after Sprint G:** 54 routes (all static pages + OG per entity + RSS + manifest + error boundaries + schema.org JSON-LD), 0 TS errors, 200 OK across the board. Server on port 3003.
**Status after LIVE-BUILDER Phase 1 (2026-08-01):** Section registry + page schema + 18 typed section schemas + Presentation Tool mounted + page GROQ queries + content helpers. Studio now exposes a "Pages (Builder)" list.
**Status after LIVE-BUILDER Phase 3 (2026-08-01):** Catch-all `[...slug]` route rendering PageBuilder with SEO metadata + BreadcrumbList JSON-LD; server Nav wrapper merges builder `isNavRoot` pages with static links; sitemap includes builder pages; seed data for 9 pages (home/services/portfolio/about/3d-studio/blog/contact/consultation/thank-you); `/api/seed-builder` auth-gated POST endpoint writes pages idempotently. Feature-flagged. 56 routes, 0 TS errors.
**Status after LIVE-BUILDER Phase 4 (2026-08-02):** Theme customizer. `siteSettings` extended with `theme` group (5 hex colours + heading/body font + radius + container); palette engine derives full oak/graphite/semantic scales via linear colour mixing + emits CSS custom properties; WCAG contrast audit helper; blocking ThemeScript now inlines published CSS vars server-side (zero FOUC); `/api/theme/draft` endpoint (draft-only) returns draft theme; `<ThemePreview>` client polls every 1s in draft mode and injects a high-specificity `<style>` block for live updates (<1.5s); `ThemePreview.server.tsx`/`.client.tsx` split keeps the dynamic import SSR-safe; tree-shaken from production. Existing revalidate webhook clears tag `site` on siteSettings publish so anonymous visitors see new theme on next SSG. Pixel-identical defaults when Sanity disabled. See `src/components/builder/README.md` for DoD.
**Status after LIVE-BUILDER Phase 5 (2026-08-02):** Media/SEO Gate + Shareable Previews + Data-bound Sections. (1) `imageUrl()` helper + GROQ projections preserve hotspot/crop/alt; Hero/Image/TextBlock/Marquee adapters upgraded to `next/image` with focal points. (2) `previewToken` document type + `/api/draft/share` POST (auth-gated, 7-day TTL) + `/api/draft/share/[token]` GET (enables draft mode, bumps usage stats, 307-redirects) — stakeholders preview without Sanity logins. (3) SEO publish gate (`sanity/plugins/seoGate.tsx`) replaces default Publish on `page` docs: blocks on meta title length, meta description length, missing image alt, placeholder regex (`/Lorem ipsum|TODO|Add your/`), and non-singleton H1; popover checklist + coloured badge (✓/~ / ✗). (4) Data-bound sections: servicesGrid, projectsRail, proofStack, marquee now expose `source` (all/latest/featured/category/manual/custom) + `picks[]` references + `category` filters; typed ServicesGridSection + ProjectsRailSection adapters render resolved docs as bento/Embla carousel. (5) Builder pages get OG images via edge-rendered `/api/og?slug=…` (colocated opengraph-image not allowed with catch-all). Production build: 56 routes, 0 TS errors, all 200.
**Status after LIVE-BUILDER Phase 6 (2026-08-02):** Collaboration Hardening + Production Locks. (1) `src/middleware.ts` applies CSP (Sanity CDN + Studio iframe allowed; object-src none; form-action self), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options:SAMEORIGIN, CORP. Content routes served `Cache-Control: public, s-maxage=60, stale-while-revalidate=3600`; API/studio/draft routes `no-store`. (2) `lib/rate-limit.ts` sliding-window in-memory limiter with `clientIp()` helper; `/api/lead` (5/min/IP) and `/api/subscribe` (8/min/IP) return 429 + Retry-After. (3) `lib/revalidate-state.ts` monotonic per-tag counter + `/api/revalidate/state` endpoint bumped by `/api/revalidate`. (4) `/api/audit` webhook endpoint verifies `SANITY_REVALIDATE_SECRET`, writes structured NDJSON to `.logs/audit.ndjson` for create/update/delete on audited doctypes. (5) `DraftActivityBar` (client polling @ 8s, draft-only via server/client split) shows dismissible "New edits published — Reload preview" ribbon when another editor publishes; tree-shaken from production (verified 0 bytes to anonymous visitors). 61 routes, 0 TS errors, all 200. Tree-shake guarantees preserved (0 VisualEditing / woodex-theme-preview / DraftActivityBar strings in production HTML).
**Goal of this phase:** Master frontend polish (QA, responsive, content depth, imagery, design), then make every page/component data-driven so Sanity can plug in without frontend rewrites.

---

## Sprint A — QA & Bug Fixes ✅ FIRST PASS COMPLETE

### A1. Mobile/responsive breakage audit
- [x] **Nav mobile menu** — rewritten: CTA, theme toggle, phone link in drawer; hamburger → X; body-scroll lock; aria-controls/expanded/label proper
- [ ] **CinematicHero** — content layout on 360px (pending visual QA on real device; uses `clamp()` type which scales)
- [x] **AboutBrief floating stat card** — repositioned to bottom-left on mobile (`left-6 bottom-6`, full-width card with `calc(100%-3rem)`)
- [ ] **ProcessRail** — verify iOS drag
- [x] **ShowcaseRail** Embla — added `data-lenis-prevent`
- [ ] **BeforeAfter slider** — touch drag Lenis conflict (pending B pass)
- [x] **ServicesGrid bento** — Tilt disables on touch via `pointer: coarse` media query
- [ ] **ContactForm** — mobile chevron check
- [ ] **StudioMap** — narrow-screen pin placement
- [ ] **TeamCredentials** — mobile grid check (currently `md:grid-cols-2 lg:grid-cols-3`, mobile is 1-col already)
- [ ] **Footer** — collapse check

### A2. Cross-browser / interaction bugs ✅
- [ ] Reduced-motion global hook (uses CSS media query already; add Framer Motion `useReducedMotion` in B pass)
- [x] Magnetic hover on Button — auto-disables on `pointer: coarse`
- [x] ServicesGrid 3D tilt — auto-disables on touch
- [x] ChatWidget session-aware — hides if `woodex_booked` flag set; dismissible (×); outside-click + Escape to close
- [x] Theme flash fixed — inline blocking `<ThemeScript>` reads localStorage/prefers-color-scheme before paint; no FOUC
- [ ] `next/image` conversion for hero/portfolio (next A pass — biggest LCP win)
- [x] Single source of truth `src/lib/config.ts` created with SITE/COST_BANDS/WARRANTY/SLA; Nav, ChatWidget, ThankYou, Consultation, Article page all consume from it

### A3. SEO / schema / a11y fixes ✅
- [x] `robots.ts` + `sitemap.ts` — 46 URLs (static + 13 services + 7 projects + 9 posts + 6 categories + 1 location), blocks /studio and /api/
- [x] Article pages have `Article` + `BreadcrumbList` JSON-LD (BlogPosting schema noted for next pass)
- [x] Skip-to-content link visible on first Tab press; links to `#main-content`
- [x] Consultation form: labels associated (`htmlFor`/`id`), `required`, `autoComplete`, `aria-invalid`/`aria-describedby` errors, inline validation (name ≥2 chars, phone valid, email if given), submit disabled while sending, focus moves to first error
- [x] Contact form: same a11y/validation treatment; progress bar; disabled submit state
- [x] Thank-you page rewritten to 3-step timeline with WhatsApp/call CTAs; sets `woodex_booked` flag
- [ ] Color contrast audit (pending visual QA pass)
- [ ] Footer focus rings (pending — oak ring already set globally on :focus-visible)

### A4. Lighthouse targets (pending `next/image` conversion pass)
- [x] Preload `<link rel="preload">` for first hero image (`/images/hero-commercial.jpg`)
- [x] `text-wrap: balance` on all h1–h5; `text-wrap: pretty` on paragraphs (widow/orphan control)
- [x] `fetchPriority="high"` on hero preload
- [ ] Full `next/image` migration (next sub-pass)
- [ ] GA4 / consent banner (Sprint F)

---

## Sprint B — Responsive Mastery Polish ✅ FIRST PASS COMPLETE

### B1. Per-section mobile passes
- [x] **Home:** CinematicHero subhead/eyebrow spacing & sizing tightened at 360px, CTA row stacks vertically on mobile, progress dots shrink, "free 45-min site visit" wraps cleanly, content gets bottom padding so it doesn't collide with counter bar; Marquee gaps/type scale smaller + slower (50s/65s); ServicesGrid already 1-col→md→lg with fixed auto-rows; ProcessRail replaced by vertical stacked timeline on mobile (`ProcessRailMobile` added; horizontal version hidden on <md); ShowcaseRail: arrows visible on mobile, Full-portfolio link reflowed, peek padding uses gutter; ProofStack metrics grid already 2-col→4-col; FAQ accordion buttons min 48px hit target, type smaller on mobile, answer padding reduced; CTAFinal stat grid 2-col, CTA stacks, phone uses SITE config, all copy pulls from SLA constants
- [x] **Services hub:** routing cards already 1-col → 2 → 3 grid; 3D tilt disabled on touch via matchMedia
- [x] **Service detail:** SectionDots already hidden below xl (shows at xl only); ServiceHero tightened for mobile (eyebrow, headline max-width, CTA stacks, related chips smaller, phone uses SITE config); no sticky sidebar exists
- [x] **Portfolio hub:** counters already 2-col → 4-col grid; FlipGrid checked below
- [x] **Project detail:** ClipGallery now supports swipe (touch handlers) + prev/next buttons always visible on mobile, dots have 48px+ hit area, type/counter scaled down; BeforeAfter: `data-lenis-prevent`, larger labels/handle, 48px handle size; prev/next already stacked on mobile; StoryBeat stacks inline on mobile with label beside number
- [x] **3D Studio:** MaterialSwap tabs horizontally scrollable on mobile (pill chips) + active-material note card below; pricing tier already 1-col → 3-col grid
- [x] **Fit-out:** ComparisonChecklist already stacks 1-col; OrgChart simplified gradient fix (no dynamic Tailwind vars) + mobile 1-col grid, smaller avatars; FridayArtifact uses md: padding already
- [x] **About:** Team cards 1-col→2→3 already; Founding timeline uses left-aligned dot + year with mobile fallback line hidden <sm
- [x] **Contact:** Channel cards 1→3 grid already (collapses on small); ContactForm inputs full-width (grid 1-col → 2 on md); StudioMap InfoRow stacks on mobile, pin/caption/Open-in-Maps reflowed; ContactHero uses SITE+SLA config, channel cards stack
- [x] **Blog hub:** Category tabs horizontally scrollable with hidden scrollbar + `data-lenis-prevent` + touch-pan-x, smaller type; article cards already 1→2→3
- [x] **Locations:** Areas list 2-col; project cards 1-col grid already; buttons stack vertically on mobile
- [x] **Footer:** CTA block stacks, grid 1→2→4 cols, phone/email/address pulled from SITE config, social links use real URLs, focus rings added to all interactive links, legal bar wraps
- [x] **Legal pages:** narrow margins via container-x already

### B2. Touch/tablet polish
- [x] All magnetic hover disabled at `pointer: coarse` (Button)
- [x] 3D tilt cards (ServicesGrid) disabled on touch, replaced with flat card + shadow hover
- [x] Horizontal carousels (ShowcaseRail, ClipGallery, CategoryTabs, MaterialSwap, BeforeAfter) all have `data-lenis-prevent` for proper iOS drag
- [x] ClipGallery adds native touch swipe; BeforeAfter uses pointer events natively
- [x] Global `AppMotionConfig` wraps tree with MotionConfig (reduced-motion shortcut); Lenis already disabled on reduced-motion
- [ ] Clip-path wipes become simple fade on touch (deferred, minor jank acceptable for B1)
- [ ] Double-tap zoom prevented where not needed (browsers handle this well with touch-action on sliders; skip for now to preserve pinch-zoom accessibility)

---

## Sprint C — Content & Image Deepening ✅ FIRST PASS COMPLETE

### C1. Imagery gaps
- [x] **Service tiles (8 generated)** — `svc-brand-shop.jpg`, `svc-office-fit-out.jpg`, `svc-commercial-fit-out.jpg`, `svc-residential-fit-out.jpg`, `svc-custom-furniture.jpg`, `svc-office-furniture.jpg`, `svc-renovation.jpg`, `svc-turnkey.jpg` all generated and wired to services content + homepage grid. Turnkey now uses its own tile instead of reusing hero-turnkey.
- [x] **OG image** — `og-woodex.jpg` (1200x630) generated and wired to root `openGraph.images` metadata.
- [x] **Workshop detail shot** — `workshop-detail.jpg` generated (Ustad Saqib's hands planing a cabinet door); added to WorkshopEssay frame 02.
- [ ] **Project gallery (deferred to Sprint C2)** — Nishat/Systems/CafeZouk/DHA/DefenceRaya gallery images not generated (hit session image quota; projects still functional with hero images, BeforeAfter pairs exist for those that use it).
- [ ] **Team headshots (deferred — keep monograms on brand)**.
- [ ] **Wood-grain / generic header (deferred)**.

### C2. Content depth — all 13 services fully authored
- [x] Replaced all 10 `skeletonBase` entries with full unique authoring: corporate, retail, brand-shop, office-fit-out, commercial-fit-out, residential-fit-out, custom-furniture, office-furniture, renovation, 3d-design-planning.
- [x] Each service now has: unique situation copy (no shared copy), specific included/optional scope, week-by-week timeline, per-service cost band with notes, signature proof (caseStudy/stats/guarantee kind), 5 specific FAQs per service, 3 related projects with proper tags, named team lead with role + bio, specific CTA, answer capsule with 4 facts.
- [x] Banned word "bespoke" removed from services hub ("bespoke pieces" → "custom pieces"); parameterized services use "custom" not "bespoke".
- [x] "Bespoke space planning" → "Custom space planning" in parameterized scope.
- [ ] Remaining work: fit-out sub-page links verified to new service slugs.

### C3. Blog article bodies — all 9 authored
- [x] `ArticleBody.tsx` rewritten with rich block renderer supporting h2/h3/p/ul/ol/quote/pullout/table + inline **bold** and `[text](href)` links.
- [x] New `src/lib/content/blocks.ts` (shared Block type) and `src/lib/content/post-bodies.ts` with full bodies for all 9 posts:
  - **interior-cost-per-sqft-lahore-2025:** full cost table (residential/commercial/retail/turnkey/reno/custom-furniture), "where other quotes are wrong" section, rule-of-thumb pullout.
  - **12-week-cafe-fitout-timeline:** week-by-week breakdown, pre-construction, critical path, 3 planned delays, founder quote.
  - **why-we-publish-prices:** 4 stats from the March 2024 change, anti-pattern argument, trust-pull quote.
  - **marble-vs-vietnam-marble:** 7-row comparison table, where-we-use-what guidance, fake-Vietnamese warning.
  - **hbl-model-town-case-study:** scope, critical-path insight, two things that nearly slipped, handover numbers.
  - **9-mistakes-first-time-clients:** 9 numbered mistakes with cost figures.
  - **friday-report-explained:** 4-section breakdown, before/after metrics, Hamza quote.
  - **retail-fitout-footfall:** 3 design decisions, 8-week metrics (footfall +38%, dwell 1:40→4:12, conv 4.1→6.8), payback 14 weeks.
  - **3d-renders-match-build:** three rules (material library, Lahore light, re-render against CDs), 5% gap note.
- [x] Author card added to end of each article; related posts grid retained.
- [ ] FAQPage schema at end of each article (deferred — current content doesn't need structured FAQs yet; the capsule + body answers the question).

### C4. Location pages
- [ ] Islamabad & Karachi (deferred to Phase 2 / user demand)
- [ ] Google Maps iframe embed (deferred to Sprint E when we wire actual API / address)
- [ ] Named local reviews (deferred to post-launch when we have permission)

---

## Sprint D — Design Polish ✅ FIRST PASS COMPLETE

### D1. Micro-interactions
- [x] **Scroll progress bar** — fixed thin oak bar at top of every article page, animated via useScroll + useSpring (appears via `ArticleChrome`).
- [x] **Share intent** — floating right-rail on desktop (copy link + WhatsApp + back-to-top), sticky pill on mobile with "X min left", no social bloat. Copy-link uses Clipboard API.
- [x] **Reading time remaining** — live "X min left" indicator in the mobile share bar, updates on scroll.
- [x] Thank-you page already has 3-step timeline from Sprint A.
- [ ] "Related posts" on category pages (deferred — category page cards already serve as full list; can be added when blog content depth justifies).

### D2. Visual details
- [x] **Selection color** verified — `::selection` oak-400 on light, oak-500 on dark, with legible text colors.
- [x] **Typography widow control** — `text-wrap: balance` on h1-5 and `text-wrap: pretty` on p already applied globally (globals.css).
- [x] **Number counter animations** added to AboutBrief stats (240+, 98%, 0, 11 yrs) using the same useSpring/useMotionValue pattern from PortfolioHero; smoothly animates on scroll-into-view.
- [x] **Marquee infinite scroll** — rewritten using CSS `@keyframes` with duplicated content and `-50%` translation; seam eliminated via `max-content` width and identical second copy; respects `prefers-reduced-motion`.
- [x] Focus states on Buttons already include `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]`; footer links now have explicit focus ring styles.
- [x] Noise texture verified on all dark hero/section surfaces (CinematicHero, footer, ProofStack, studio sections, contact hero response panel, Consultation page).

### D3. New UI elements
- [x] **Toast system** (`src/components/ui/Toast.tsx`) — context-based `ToastProvider` + `useToast()` hook; bottom-center pill with success/default tone, auto-dismiss 3.2s, dismiss button, animated entrance/exit. Wired to copy-link action and BlogCTA subscribe. Mounted in root layout.
- [x] **Pill/tag component** (`src/components/ui/Pill.tsx`) — `default | oak | outline | dark` tones, sm/md sizes, rounded uppercase. Ready for category tags, service labels.
- [x] **Testimonial card** (`src/components/ui/Testimonial.tsx`) — extracted reusable variant with `invert` prop for dark sections, matching ProofStack typography and quote mark.
- [x] **Icon set** (`src/components/ui/Icon.tsx`) — 14 inline SVG icons: arrows (right/left/up-right), phone, WhatsApp, email, pin, copy, check, close, menu, sun, moon, Instagram, LinkedIn, Behance. Consistent 24px viewBox, 1.5 stroke, `currentColor`.
- [x] **ArticleChrome component** (`src/components/blog/ArticleChrome.tsx`) — combines progress bar, share rail, reading time remaining, copy-link toast.
- [x] **BlogCTA** newsletter subscribe now fires success toast on submit instead of just swapping state.

---

## Sprint E — CMS / API Integration Ready (Sanity.io) ✅ FIRST PASS COMPLETE

### E1. Single source of truth — config
- [x] Create `src/lib/config.ts` with site-wide constants (phone/email/address/socials/SLA/warranty/cost bands) — already done in Sprint A
- [x] Create `src/lib/constants.ts` with PKR ranges, sqft thresholds, warranty durations, BUDGET_OPTIONS, LEAD_SOURCES, categories, TURNSTILE/preview/lead cookie names

### E2. Type-safe content layer
- [x] Schemas in `/sanity/schemas/` (moved to `src/sanity/schemas/`): blockContent, service, project, post, fitoutService, location, teamMember, siteSettings
- [x] Document types in `src/sanity/types.ts`
- [x] Create `src/sanity/env.ts` reading projectId/dataset/apiVersion/feature flag
- [x] Create `src/sanity/client.ts` — server + preview clients
- [x] Create `src/lib/sanity/fetch.ts` — `sanityFetch()` with React `cache()` dedupe + `unstable_cache` ISR + tag support
- [x] Static-adapter layer (`src/lib/sanity/static-adapter.ts`) exposes legacy static accessors
- [x] Normalizer layer (`src/lib/sanity/content.ts`) maps Sanity GROQ results → the exact TS shapes pages already consume

### E3. Replace static imports with Sanity queries (feature-flagged)
- [x] `NEXT_PUBLIC_SANITY_ENABLED` env flag checked at runtime; default `false` = static data (fully backwards compatible)
- [x] GROQ queries in `src/lib/sanity/groq.ts` (ALL_* + BY_SLUG for each type + SITE_SETTINGS)
- [x] Unified async content API in `src/lib/sanity/content.ts` — `getAllServices`, `getService(slug)`, projects, posts, fitouts, locations, categories. Pages can switch to these on their own schedule (Sprint E follow-up)
- [x] Revalidation tags: `service`, `project`, `post`, `fitout`, `location`, `team`, `site`, plus type:slug granular tags
- [x] `/api/revalidate` webhook endpoint (shared-secret protected) clears tags + paths on publish
- [x] `.env.example` added with all Sanity/Resend/Supabase/WhatsApp/Turnstile/preview vars

### E4. Lead capture pipeline
- [x] `/api/lead` route — accepts POST (name/phone/email/space/budget/brief/source/page/utm/token), validates server-side, size-guards to 32KB, verifies Turnstile (when configured)
- [x] Destinations are resilient no-ops when env vars are missing:
  - In-memory dev buffer + console log (always on)
  - Supabase REST insert (if SUPABASE_URL+KEY)
  - Resend notification email to studio inbox (if RESEND_API_KEY)
  - WhatsApp Cloud API template ack (if WHATSAPP_* config)
- [x] Honeypot field `company` silently marks bots as spam (drops WhatsApp/email)
- [x] Client helpers in `src/lib/leads/client.ts`: `captureAttribution()` (UTM cookies, gclid/fbclid capture, first-touch persistence), `submitLead()` attaches UTM + page, returns typed result
- [x] `/api/subscribe` route for newsletter (email + honeypot, posts to Resend audience when configured)
- [x] Consultation form + ContactForm wired to `/api/lead` (async, toasts errors, sets `woodex_booked`, redirects to /thank-you)
- [x] BlogCTA subscribe wired to `/api/subscribe` with submit state + toast
- [x] Thank-you page already existed from Sprint A (3-step timeline)
- [ ] Supabase schema + HubSpot integration — blocked on credentials
- [ ] Live WhatsApp template — blocked on Meta Business approval
- [ ] Turnstile site key wiring in forms — blocked on Cloudflare account
- [ ] Calendar invite link (Cal.com/Google) — add once booking URL confirmed

### E5. Sanity Studio (embedded route)
- [x] Studio mounted at `/studio` via `next-sanity`'s `NextStudio`
- [x] Shared-secret password gate (sessionStorage remembers within tab; no password = skip for local dev)
- [x] Studio lazy-loaded via `next/dynamic` + `ssr:false` so its ~5MB bundle doesn't ship in the production client build
- [x] `/studio` is `dynamic = "force-dynamic"` (ƒ in build output) — Turbopack treats it as a server entry, no static prerender
- [x] Bare HTML layout at `/studio` so Nav/Footer/ChatWidget don't mount over the CMS
- [x] Desk structure: Site Settings singleton + Services/Projects/Posts/Fit-out/Locations/Team lists
- [x] Schema: singleton actions limited (no duplicate/delete on siteSettings); templates filtered
- [x] Vision plugin intentionally omitted (cuts bundle weight; can be added locally if needed)
- [ ] Final STUDIO_PASSWORD set in Vercel/host env at deploy time

### E6. Preview mode
- [x] `/api/draft/enable?secret=...&slug=...` — validates PREVIEW_SECRET, enables draft mode, redirects to slug
- [x] `/api/draft/disable?slug=...` — exits draft mode
- [x] `PreviewToolbar` ("Draft preview · Exit") fixed bottom-right when draftMode is enabled
- [x] `DraftGate` pass-through in root layout (placeholder for future visual-editing overlays)
- [ ] Live preview URLs inside Studio documents (add once Sanity project is provisioned)

---

## Sprint F — Performance & Launch Hardening ✅ FIRST PASS COMPLETE

### F1. Launch-ready metadata & discoverability
- [x] Dynamic OpenGraph images via `next/og` — `src/lib/og/template.tsx` (Woodex-branded 1200×630 PNG, graphite bg, oak accent, Fraunces-style italic headline, woodex.studio wordmark)
- [x] `/opengraph-image` (default), `/services/[slug]/opengraph-image`, `/portfolio/[slug]/opengraph-image`, `/blog/[category]/[slug]/opengraph-image` auto-generated; Next metadata API picks them up automatically with cache-busting hashes
- [x] `twitter:card` summary_large_image added site-wide
- [x] `src/app/manifest.ts` — `manifest.webmanifest` with name, start_url, standalone display, theme colors
- [x] `/feed.xml` RSS 2.0 with all 9 posts sorted by date; linked via `<link rel="alternate" type="application/rss+xml">` in root `<head>`
- [x] `src/app/robots.txt` already exists from Sprint A; sitemap.xml includes all live routes

### F2. Error handling & fallbacks
- [x] `src/app/(site)/error.tsx` — app-level error boundary with "Try again" (router.refresh()) + back-home CTA
- [x] `src/app/global-error.tsx` — root error boundary (catches root-layout errors where the normal boundary can't render)
- [x] 404 page reworked to show 4 suggested popular pages (Services, Portfolio, 3D Studio, Book walkthrough) + WhatsApp CTA panel (no dead end)
- [x] Lead API + subscribe API return JSON error envelopes + HTTP status codes; no unhandled throws crash the server

### F3. Performance — LCP win
- [x] CinematicHero backgrounds converted from CSS `background-image` to `next/image` with `fill` + `priority` + `fetchPriority="high"` + `sizes="100vw"` + `quality={82}` for the first slide (biggest LCP win)
- [x] Non-hero slides lazy-load (no priority) to avoid wasting bandwidth
- [x] `<link rel="preload">` manual hero preload removed (next/image with priority handles preloading via React's preload mechanism)
- [x] `next.config.ts` images config: `formats: ['image/avif','image/webp']`, remote patterns for `cdn.sanity.io` (future CMS), reactStrictMode + compress + poweredByHeader off
- [ ] `next/image` migration for remaining CSS background images (service heroes, project gallery) — follow-up pass

### F4. Analytics & consent
- [x] `src/components/providers/Analytics.tsx` — GA4 loaded via `next/script` afterInteractive; Consent Mode v2 defaults denied; listens for `woodex_consent` event to update analytics_storage; NOOP when `NEXT_PUBLIC_GA_ID` is unset (local dev default)
- [x] `src/components/ui/ConsentBanner.tsx` — minimal, non-blocking bottom-left card; "Accept" / "Only necessary" two-button; persists choice in localStorage 365 days; dispatches CustomEvent consumed by Analytics; links to privacy policy; respects reduced-motion
- [x] Banner mounted in root layout; doesn't block content or scroll

### F5. Print & polish
- [x] Global print stylesheet in `globals.css` (hides nav/footer/widgets, shows URLs after links, avoids page breaks inside headings/images/tables, sets serif fallback)
- [x] `.no-print` wrapper on Nav/Footer/ChatWidget/ConsentBanner/Analytics/PreviewToolbar so they don't print
- [x] RSS alternate link in `<head>`

### F6. External/ops items (blocked on vendor creds / deploy)
- [ ] Sentry + Axiom — add at deploy (NEXT_PUBLIC_SENTRY_DSN, AXIOM_TOKEN)
- [ ] Checkly uptime — external monitor top 10 routes post-deploy
- [ ] GA4 measurement ID — set NEXT_PUBLIC_GA_ID in Vercel env
- [ ] CI: `npm run build` + Lighthouse CI budget on PR (in repo CI config)
- [ ] Deploy to Vercel production; wire /api/revalidate webhook + preview URLs to Sanity Studio

---

## Sprint G — Final Launch Pass (SEO Schema / a11y / Data polish) ✅ FIRST PASS COMPLETE

### G1. Structured-data cleanup
- [x] Rewrote `src/lib/schema.ts` to pull LocalBusiness/Organization data from SITE config (replaced hardcoded "Studio 14, Gulberg III" with SITE.address "Plot 42, Sundar Industrial Road")
- [x] Added schema helpers: `faqLd()`, `breadcrumbLd()`, `articleLd()`, `serviceLd()` (reusable across pages)
- [x] LocalBusiness now dual-typed `[InteriorDesignBusiness, GeneralContractor]` with correct NAP, geo, opening hours, areaServed, offers, warranty promise, free-walkthrough offer
- [x] Organization schema added email/telephone + knowsAbout tags
- [x] FAQPage schema on home (`HOME_FAQS` — 4 Qs)
- [x] FAQPage + BreadcrumbList schema on contact page
- [x] Service + FAQPage + BreadcrumbList already existed on /services/[slug]; verified
- [x] Article (BlogPosting) + BreadcrumbList already existed on /blog/[category]/[slug]; BlogPosting type aligned with schema helper
- [x] FAQ data extracted to plain module `src/lib/content/faqs.ts` (so server pages can import for JSON-LD without pulling client-only component deps into the SSR bundle)

### G2. Brand & metadata polish
- [x] Favicon: `public/favicon.svg` (woodex "W" mark, oak-on-graphite), linked in root `<head>`
- [x] Twitter card metadata (summary_large_image) set site-wide
- [x] RSS alternate link already in <head> from Sprint F
- [x] Removed stale `/images/og-woodex.jpg` reference in metadata; OG auto-resolved to `/opengraph-image` route
- [x] Manifest theme color and icons verified

### G3. a11y / contrast / robustness
- [x] Verified oak accent usage: oak-400 (#bc9a63) and oak-500 (#a6804a) on light bg used exclusively for xs mono labels, icons, and large display typography (≥24px bold passes 3:1 AA large-text); body text uses oak-600 (#8a6639) which hits 6.4:1
- [x] All interactive elements in Footer have explicit focus-visible rings (verified in Sprint D)
- [x] Skip-to-content link works and points to #main-content
- [x] Honeypot + Turnstile hook in /api/lead protect forms
- [x] Error boundaries: app error.tsx + global-error.tsx added in Sprint F
- [x] Global print stylesheet + .no-print added in Sprint F
- [ ] Device-level iOS/Android QA (requires real device)
- [ ] axe-core automated scan (would need headless Chromium; environment has no Chrome)

### G4. Server-side safeguards
- [x] /api/lead payload size capped at 32KB, JSON parse guarded, honeypot marks spam
- [x] /api/revalidate + /api/draft/* check shared secret
- [x] /studio is dynamic + password-gated; dynamic import prevents Sanity bundle from leaking into the marketing build
- [x] Static route-generation uses `params: Promise<...>` await throughout (Next 16 compliant)

---

## Launch Checklist (one-time ops, deploy-time)

- [ ] Create Sanity project, set env vars (NEXT_PUBLIC_SANITY_PROJECT_ID, DATASET, API_READ_TOKEN, REVALIDATE_SECRET, PREVIEW_SECRET, STUDIO_PASSWORD)
- [ ] Flip NEXT_PUBLIC_SANITY_ENABLED=true when ready to source live
- [ ] Set NEXT_PUBLIC_GA_ID to GA4 measurement ID
- [ ] Provision Resend + add RESEND_API_KEY + WOODEX_NOTIFICATION_EMAIL for lead notifications
- [ ] Optional: Supabase or HubSpot keys for lead persistence
- [ ] Optional: Cloudflare Turnstile keys for spam defense
- [ ] Point woodex.studio DNS to Vercel; enable production HTTPS
- [ ] Run Lighthouse CI on deploy preview; target LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Add site to Google Search Console; submit /sitemap.xml
- [ ] Add site to Bing Webmaster Tools
- [ ] Set up Checkly/uptime check for /, /services, /consultation, /api/lead (GET)
- [ ] Add 301 redirects for any old URLs from previous site

---

## Priority order (recommended sequence)

1. **A1–A3 (QA + bugs + SEO basics)** — makes what's there solid; no new pages
2. **B1–B2 (responsive)** — critical for mobile users (60%+ of Lahore interior traffic is mobile)
3. **D1–D3 (design polish)** — quick wins before images are finalized
4. **C1 (images) + C2/C3 (content depth)** — biggest visual + SEO impact
5. **E1–E2 (config + schemas)** — refactor to be data-driven
6. **E4 (lead capture)** — because it's the #1 business need after traffic
7. **E3/E5/E6 (Sanity client + Studio + preview)** — the actual CMS connection
8. **A4 (Lighthouse) + F (launch hardening)** — final pass before public launch

---

## Definition of Done for each sprint
- Build: `npm run build` = 0 TS errors, 0 hook violations
- Lighthouse on mobile: LCP <2.5, INP <200ms, CLS <0.1, a11y 95+, SEO 100
- 0 console errors on Chrome/Safari iOS/Firefox
- All interactive elements reachable by keyboard; 0 axe-core violations
- Real images load; no alt-text is missing
- Every section has ≥3 specific numbers; banned words remain scrubbed
- Pages work with JS disabled (nav falls back to anchor links, forms show submit URL)
- Prefers-reduced-motion respected
- 404 page handles mistyped routes; back-link works
