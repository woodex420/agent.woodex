# 🎨 Frontend Design & UX Polish — Todo List (Pass 2)

Found during live QA of https://agent-woodex.vercel.app. Ordered by impact.

See **FRONTEND-MASTER-PLAN.md** for the full 13-section master plan.

## ✅ Completed in Pass 2 (commit 1a71698)
- [x] Desktop nav: Services mega-menu (Practices + Specialties, two-column panel, enter/leave scheduling, Escape, CTA strip)
- [x] Mobile nav: Services accordion submenu listing all 12 services
- [x] Mobile nav ≤360px: logo/button clusters scaled down (w-8/w-9), WhatsApp quick-entry added
- [x] Phone in nav (xl) now shows "Quick reply · 15 min" sub-label
- [x] Dark-mode color tokens: added `--accent-on-dark`, `--oak-400-on-dark`; dark selection color fixed
- [x] Dark-mode link/button contrast: liquid variant fills oak-400 in dark, glass border stronger
- [x] Button v3: idle border uses border-strong (stronger CTA presence), arrow-drift via `.arrow` class, trailing `→` auto-drifts, `dark` variant fills white on hover
- [x] Services page: category pill row with sticky behavior, count badges, client-side smooth-scroll filter
- [x] Services page: Situation cards now use next/image for hover-reveal background
- [x] Services page: split into Server Page (metadata) + Client Component (interactivity) — Next 16 compatible
- [x] Service detail hero (ServiceHero): migrated CSS bg to next/image, max-w-2xl sub cap, kicker class, breadcrumb clean, phone CTA with WhatsApp label, warm light-leak overlay
- [x] CinematicHero copy tightened: slide 1 ("From 2,000 sqft… 98% on date"), slide 2 (11 years in Lahore), slide 3 (contractual guarantee, honored twice), slide 4 (PKR 25,000/week delay credit)
- [x] Footer v2: hours line, "Get directions" Google Maps link, WhatsApp "~15 min reply" label, "Founded 2014" blurb, "Designed & built in Lahore" mark, 12-service list (was 6), CTA "Start your project" kicker, Or-WhatsApp secondary CTA, border-t oak-900
- [x] ProofStack: kicker migrated, blockquote softened to white/90
- [x] Brand voice: "bespoke" → "custom" in residential scope + portfolio tag; grep-sweep confirmed zero remaining banned words (seamless/world-class/leverage/passion/solutions/synergy/elevate used only as CSS vars/comments)
- [x] Homepage metadata: title leads with proof (240+ · 98% · 3D-first), description includes PKR band and concrete numbers, OG locale en_PK
- [x] CSS utilities: `.tabnum`, `.arrow`, `.sticky-pills`, `.mobile-sticky-cta`, coarse-pointer magnetic-disable, min 44px tap targets
- [x] TypeScript 0 errors; clean build (61 routes + Proxy); Vercel deployed & verified (HTTP 200, HIT)

## 🔴 P0 — Still to do
- [ ] (none remaining)

## 🟠 P1 — Next up
- [ ] Migrate all home-section eyebrows to `.kicker` class (ServicesGrid, StudioScrub, FitOutSplit, ProcessRail, ShowcaseRail, ConvoDiagram, FAQ, AboutBrief, CTAFinal)
- [ ] Sticky mobile CTA bar on service detail + contact + consultation pages (Call/WhatsApp/Book)
- [ ] About page: reconcile founding year (2014 = 12 years; update copy from "11 years"), add team monograms, Sundar workshop proof
- [ ] Portfolio hub: add category filter chips
- [ ] Contact/Consultation pages: 3-column above-fold contact strip (Phone+WhatsApp · Address+Directions · Hours); WhatsApp reply micro-label; form adds "Expected timeline" dropdown
- [ ] 3D Studio page: pricing block (PKR 45k/room concept, 120k/room full viz), 3D-to-Build Guarantee block
- [ ] JSON-LD schema: Service + FAQPage on service pages, Article on posts, LocalBusiness on contact
- [ ] Title/description rewrite pass for every route (unique metadata per page with metric + CTA)
- [ ] Numbers-above-fold audit on About/Portfolio/Contact/Consultation/3D-Studio/Blog (≥3 concrete stats in first viewport)

## 🟡 P2
- [ ] ShowcaseRail snap touch verify; BeforeAfter 48px hit area; ProcessRail iOS rubber-band
- [ ] Dark-mode card/button audit across all pages (4.5:1 AA)
- [ ] Service detail: migrate all CSS backgrounds across sub-components (CostBand, SignatureProof case study bg, RelatedProjects) to next/image
- [ ] DataStrip count-up animation on viewport entry
- [ ] Skip-link already present in layout — verify visible on focus
- [ ] Real favicon .ico + 192/512 PNGs (currently SVG only)
- [ ] Nishat/Systems/CafeZouk/DHA/DefenceRaya real project photos (currently gradients)
- [ ] Team headshots (monograms for now)

## 🟢 P3
- [ ] City landing pages (Karachi, Islamabad, Faisalabad)
- [ ] Google Maps embed on contact
- [ ] Named local reviews (Google schema)
- [ ] Blog articles per master plan (office furniture costs, chair guide, etc.)
- [ ] Calendar invite link on consultation confirmation
- [ ] Sentry/Axiom logging, Checkly uptime, CI Lighthouse

## ✅ Acceptance
- Build clean, tsc 0 errors, Vercel deploy 200
- 320px → 1920px looks intentional
- Every section uses same kicker, heading rhythm, CTA vocabulary
- Zero banned brand-voice words
- Nav mega-menu + mobile accordion work
- Footer has directions/hours/WhatsApp label
- Services hub has category pills
