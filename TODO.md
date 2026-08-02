# 🎨 Frontend Design & UX Polish — Todo List

Found during live audit of https://agent-woodex.vercel.app. Ordered by impact (highest first).

## 🔴 P0 — Broken / blocking
- [x] Nav mobile: hamburger has 2 bars (missing middle bar) — only shows two lines, animates poorly. Need 3-bar hamburger → X. ✓ Fixed — added middle bar with independent opacity + scale transition.
- [ ] Nav mobile: theme toggle + hamburger overlapping with logo on ≤360px. Cluster is too wide.
- [x] Nav desktop: hover underline scale-x anim only plays forward, nav doesn't show which page is active (no `aria-current="page"` underline). ✓ Fixed — usePathname() + aria-current="page" + persistent oak underline on active.
- [x] CinematicHero: slide counter dots + CTA row collide on mobile (<375px).
- [x] `--nav-h: 5.5rem` doesn't update when nav becomes denser on scroll — content shifts on first scroll. ✓ 4.75rem, denser scroll state (py-2.5).
- [ ] Services page: service-tile grid on mobile is single-column but tiles have aspect mismatch; "tour 3D studio" CTA at bottom of hero gets cropped on small screens.

## 🟠 P1 — Typography & brand voice
- [x] Hero H1 line-height at large sizes is too tight (`0.98` causes ascender/descender clipping on "boardroom" / "exactly") — bump to 1.02. ✓ 1.02 / md 0.98
- [ ] Body copy in proof/testimonial sections uses pure white on dark graphite — soften to white/85 for eye comfort.
- [x] Mobile h1 clamp minimum `2.75rem` is too large on 320px (causes 2-word wraps) — lower floor to `2.2rem`. ✓ fs-display floor 2.3rem, fs-h1 2.0rem.
- [ ] Eyebrow/kicker text (uppercase tracked) has inconsistent spacing — standardize on `tracking-[0.22em]` across all sections. Added `.kicker` utility; need to migrate sections.
- [x] Italic serif accents: current `italic-serif` class doesn't set optical-sizing/salt; soften with `font-variation-settings: 'opsz' 144, 'SOFT' 100`. ✓ Added.

## 🟡 P2 — Buttons & CTAs
- [x] Button "Book a consultation" in nav on transparent hero is variant `dark` (white bg on dark bg images) — should be `glass` or `light` variant over hero imagery. ✓ Added `glass` variant, used on transparent hero pages.
- [ ] Button hover on light bgs: liquid variant doesn't give visible enough text contrast.
- [x] CTA buttons on mobile stretch 100% but inner text is left-aligned — center the text. ✓ `justify-center` already applied.
- [ ] Add a micro "arrow drift" on primary buttons: arrow translates +2px on hover (already done for iconRight variants — verify all).

## 🟢 P3 — Footer polish
- [ ] Footer big CTA heading breaks awkwardly at the word "certainty?" — add `text-wrap: balance`.
- [ ] Social links in footer are just plain text — add simple dot separators + hover underline.
- [ ] Legal bar links on mobile wrap into 3 lines — add a `.no-wrap` on policy/terms.

## 🔵 P4 — Services page category & images
- [ ] Services page top: add category pill row (All / Commercial / Residential / Retail / Corporate / 3D / Turnkey) that filter-scrolls to the relevant service card.
- [ ] Service tile bg images missing alt text + focalPoint. Already fixed in Phase 5 but static tiles (pre-CMS) use CSS backgrounds — migrate to `next/image` for LCP win.
- [ ] Service detail hero: subheading max-width too wide on tablet (causes 12-word lines).

## 🟣 P5 — Services hero content & brand-voice optimization
- [ ] Hero sub copy: tighten to match Woodex brand voice (calm, specific, Pakistani/Lahore-context, no fluff, no banned words: leverage, elevate, seamless, world-class, passion, solutions, bespoke).
- [ ] Replace any remaining "bespoke" → "custom" and "seamless" / "world-class" / "passion" with concrete alternatives.
- [ ] Ensure every page has ≥3 specific numbers (PKR/sqft, days, percent, count) within first scroll.
- [ ] Contact/consultation phone CTA should show WhatsApp quick-reply label under the phone number.

## ⚫ P6 — Cross-device responsiveness
- [ ] Add `snap` support to ShowcaseRail on touch (was previously done — verify).
- [ ] Clip-path shape-wipes on sections don't animate on touch (degrade to fade).
- [ ] BeforeAfter slider: verify 48px hit area on touch, Lenis prevent set.
- [ ] ProcessRail desktop horizontal scroll drag — verify iOS doesn't rubber-band.
- [ ] ChatWidget bottom-right doesn't overlap mobile-consent-banner (verify stacking).
- [ ] DataStrip counters animate-in on viewport entry (number-count-up).

## ✅ Acceptance
- Lighthouse mobile: LCP <2.5s, CLS <0.05, TBT <200ms (can't run in sandbox — verify in Vercel analytics after deploy)
- 320px → 1920px both look intentional
- Every section uses same kicker style, same heading rhythm, same CTA vocabulary
- No banned brand-voice words
- Nav active state works on all pages
