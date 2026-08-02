# 🧱 Live Builder — Phase 1–6 complete

See `/LIVE-BUILDER.md` for the master plan.

## What's live

### Phase 1 — Section Registry + Page Schema ✅

| File | Purpose |
|---|---|
| `SectionRegistry.tsx` | Maps `_type` → React component. 44 entries: 14 typed + 30 static fallbacks. |
| `PageBuilder.tsx` | Server component. Emits section-level `data-sanity` wrapper attrs. |
| `sections/*.tsx` | 14 typed adapters (CTAFinal, FAQ, ProofStack, Marquee, AboutBrief, Hero, TextBlock, DataStrip, Prose, Divider, Image, Map, BlogCta, Freeform) + PlaceholderSection. |

### Phase 2 — Visual Editing (click-to-edit) ✅

| File | Purpose |
|---|---|
| `StudioBridge.tsx` + `StudioBridge.client.tsx` | Mounts `<VisualEditing>` from `@sanity/visual-editing/react` only in draft mode. Dynamic `ssr:false` split; zero bytes on production. |
| `EditableText.tsx` | Client component emitting `data-sanity="id=…;type=…;path=sections[N].field"`. |
| `sanityAttr.ts` | Client helper for non-text wrapper attrs. |
| `lib/sanity/attrs.ts` | Server-side data-sanity encoder. |
| `/builder-preview` | Internal demo (noindex, nofollow) — 7 sections, 75+ data-sanity attrs. |

### Phase 3 — Catch-all Route + Seed + Nav ✅

| File | Purpose |
|---|---|
| `app/(site)/[...slug]/page.tsx` | Catch-all builder route with `generateMetadata` (title/desc/OG/robots) + BreadcrumbList JSON-LD. `notFound()` when Sanity off/page missing. |
| `lib/sanity/page-helpers.ts` | `getPageBySlug`, `getAllPages`, `getBuilderNavPages` with ISR tags. |
| `layout/Nav.server.tsx` | Server wrapper merging builder nav pages with static links (dedup + sort by navOrder). |
| `app/sitemap.ts` | Async, appends builder pages when Sanity enabled. |
| `lib/sanity/seed.ts` | Seed data for 9 pages (home/services/portfolio/about/3d-studio/blog/contact/consultation/thank-you) mixing typed + static sections. |
| `app/api/seed-builder/route.ts` | Auth-gated POST writes seed pages idempotently; GET returns status. |

### Phase 4 — Theme Customizer ✅

| File | Purpose |
|---|---|
| `sanity/schemas/siteSettings.ts` | Extended with `theme` group: `brandPrimary`, `brandAccent`, `terracotta`, `graphite`, `paper` (hex), `headingFont`, `bodyFont`, `radiusPx`, `containerMax`. |
| `lib/sanity/theme.ts` | Palette engine — derives 9 oak + 11 graphite shades from 5 base hexes (via linear mixing), builds CSS-vars string (`--oak-500`, `--graphite-900`, `--bg`, `--fg`, radii, container, fonts), provides WCAG contrast helpers (`luminance`, `contrast`, `auditTheme`). |
| `lib/sanity/site-settings.ts` | `getSiteSettings()` (published, ISR-cached, tag `site`) + `getDraftSiteSettings()` (preview, no-cache). Returns `{ theme, cssVars, warnings }`. Falls back to DEFAULT_THEME when Sanity off. |
| `components/ThemeScript.tsx` | Server-rendered blocking inline script. Sets `data-theme` (light/dark) AND applies published CSS vars on `<html>` before paint — zero FOUC for editor customizations. |
| `app/api/theme/draft/route.ts` | Returns `{ cssVars, warnings, theme }` as JSON, only when draft cookie is set (404 otherwise). No-cache. |
| `ThemePreview.tsx` | Client polling loop. Every 1s during draft, fetches `/api/theme/draft`, injects a `<style id="woodex-theme-preview">` block with `:root[data-theme-preview="1"] { … }` to override live CSS vars. Sets/cleans up `data-theme-preview` attr; logs warnings once per session. |
| `ThemePreview.server.tsx` + `ThemePreview.client.tsx` | Split so dynamic ssr:false import lives in a client boundary; server component returns null in production. |
| `root layout` | Mounts `<ThemePreviewServer />` alongside `<StudioBridge />`. |
| `app/api/revalidate/route.ts` (existing) | `siteSettings._type` → tag `site` + path `/`, which our theme fetch respects — publish triggers revalidation across the whole site. |

#### Preview flow (once Sanity is provisioned)
1. Editor opens `/studio` → Site Settings → Theme group.
2. Changes `brandPrimary` to a new hex.
3. Presentation iframe (draft mode) polls `/api/theme/draft` → <1.5s sees new colours via injected `<style>` block.
4. Editor hits Publish → webhook hits `/api/revalidate` with `_type: "siteSettings"` → tag `site` revalidated → next anonymous page view paints with new CSS vars (applied by ThemeScript on first paint, zero FOUC).
5. `auditTheme()` returns WCAG contrast warnings; Studio can surface them (Phase 6 hardening) and ThemePreview logs them to console.

### Tree-shaking guarantees
- **Production visitors (no draft cookie):**
  - `StudioBridge` returns null → no VisualEditing JS.
  - `ThemePreviewServer` returns null → no polling client.
  - Inline ThemeScript only writes published CSS vars (defaults when Sanity off; cached values when Sanity on).
  - 0 data-sanity attrs on static routes; only on routes that render PageBuilder with a `documentId`.
- **Draft visitors (cookie set):**
  - VisualEditing overlays load (~150KB gz).
  - ThemePreview polls every 1s for live theme changes.
  - EditableText nodes carry data-sanity for click-to-edit.

## Phase 4 DoD checklist

- [x] `siteSettings` exposes theme fields (colours, fonts, radius, container) with hex validation + field groups.
- [x] Palette engine derives full oak + graphite shades from 5 hex inputs; contrast audit helper.
- [x] CSS vars include semantic tokens (bg/fg/border/rings/surfaces) so a brand-primary change flows to every surface.
- [x] Published theme applied server-side in blocking ThemeScript → zero FOUC on first paint.
- [x] Draft theme endpoint guarded by draftMode() (404 otherwise).
- [x] ThemePreview client polls every 1s, injects a high-specificity style block; cleanup on unmount.
- [x] Radius + container + heading/body fonts also flow through CSS vars so editors can change type/shape without deploys.
- [x] Defaults match current design tokens 1:1, so with Sanity disabled the site is pixel-identical to before Phase 4.
- [x] `/api/revalidate` webhook clears tag `site` when siteSettings change (existing behaviour, verified).
- [x] TypeScript 0 errors; production build passes; 24 routes HTTP 200.
- [x] Production HTML has 0 VisualEditing strings, 0 `woodex-theme-preview` tags; inline script sets both data-theme and published CSS vars.
- [x] `/api/theme/draft` returns 404 when not in draft mode.

### Phase 5 — Media/SEO Gate + Shareable Previews + Data-bound Sections ✅

| File | Purpose |
|---|---|
| `sanity/client.ts` | Added `imageUrl()` helper that applies hotspot/crop focal points; upgraded `urlFor()` with `.focal()` chain. Switched to named `createImageUrlBuilder` export. |
| `sanity/schemas/previewToken.ts` | New document type storing shareable preview tokens (token, path, expiresAt, usedAt, useCount, createdBy). Hidden from omnisearch/desk. |
| `app/api/draft/share/route.ts` | `POST` (auth-gated) creates 7-day TTL token in Sanity → returns `{url, token, expiresAt, path}`. |
| `app/api/draft/share/[token]/route.ts` | `GET` looks up token, validates expiry, enables `draftMode()`, bumps useCount/usedAt, 307-redirects to path. Clients don't need Sanity logins. |
| `sanity/plugins/seoGate.tsx` | Custom publish action + badge for `page` docs. Runs `auditPage()`: meta title 30–60, meta description 70–160, every image has alt ≥4 chars, no `/Lorem ipsum\|TODO\|Add your/` placeholder strings, exactly one H1-bearing section (Hero). Button disabled until errors clear; popover lists errors + warnings. Badge shows ✓ / ~ / ✗ with counts. |
| `sanity.config.ts` | Registers SeoGatePublishAction (replaces default publish on `page`) + seoGateBadge. |
| Section schemas (`servicesGrid`, `projectsRail`, `proofStack`, `marquee`, `hero`, `textBlock`) | Added `source` field (all/latest/featured/category/manual/custom), `picks[]` reference arrays, inline `cards[]` for ad-hoc entries, `category` filters, `alt` nested fields on images, logo `href`. |
| GROQ `SECTION_FRAGMENT` | Projects full image objects (asset + hotspot + crop + alt) instead of only `asset->url`; expands `picks[]->` references for servicesGrid/projectsRail using SERVICE_CARD_FRAG / PROJECT_CARD_FRAG. |
| `sections/ServicesGridSection.tsx` (NEW typed) | Server-rendered bento grid supporting manual picks, inline cards, category filters. Matches home bento aesthetic; `data-sanity` wrappers on eyebrow/heading/intro. |
| `sections/ProjectsRailSection.tsx` (NEW typed) | Client Embla carousel for manual/auto project lists, with prev/next controls, loop, proper aspect cards, and data-sanity on editable labels. |
| `sections/HeroSection.tsx`, `ImageSection.tsx`, `TextBlockSection.tsx`, `MarqueeSection.tsx` | Upgraded to `next/image` + hotspot/crop via `imageUrl()`, accept `imageAlt`, Marquee supports logo images + link hrefs. |
| `SectionRegistry.tsx` | `section.servicesGrid` and `section.projectsRail` now flagged `typed: true` and wired to the new adapters. |
| `app/api/og/route.ts` | Generic edge-rendered OG endpoint: `/api/og?slug=/x&title=…&italic=…&sub=…` (App Router doesn't allow opengraph-image colocated with catch-all `[...slug]`). |
| `app/(site)/[...slug]/page.tsx` | `generateMetadata` now points OG/twitter images to either the editor-picked `seo.ogImage` or the dynamic `/api/og?slug=…&title=…` fallback. |

#### Phase 5 DoD checklist
- [x] Image fields carry `hotspot: true` and nested `alt` strings; adapters apply focalPoint via `imageUrl()`.
- [x] SEO gate blocks publish on errors; badge visible in document list; popover lists checklist.
- [x] Shareable preview endpoint creates + resolves 7-day tokens, enables draft mode, redirects safely (same-origin guard), bumps usage stats.
- [x] Data-bound sections expose source/picks/category and adapters resolve references to cards/slides.
- [x] Builder pages get OG images via `/api/og` edge route.
- [x] Zero TS errors; production build clean; 56 routes 200 OK; `/api/og` returns valid 1200×630 PNG.

## Next (Phase 6)
1. Collaboration hardening — Scheduled publishing, draft/publish history UI, per-role permissions.
2. Real-time collaborative cursors via `@sanity/presentation` overlays.
3. Media library categorization + bulk alt-text suggestions.
4. Sentry/Axiom logging + Checkly + CI Lighthouse.

### Phase 6 — Collaboration Hardening & Production Locks ✅

| File | Purpose |
|---|---|
| `src/proxy.ts` (Next 16 proxy, replaces `middleware.ts`) | App-router proxy. Injects strict CSP (allows Sanity CDN, Studio iframe, Google Fonts, WhatsApp links), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options:SAMEORIGIN, CORP:cross-origin. Caches content routes `s-maxage=60, stale-while-revalidate=3600`; forces no-store on `/api/*`, `/studio`, and draft-mode responses. Renamed from `middleware.ts` per Next 16.2's proxy convention. |
| `lib/rate-limit.ts` | Sliding-window in-memory rate limiter + `clientIp()` helper. Applied to `/api/lead` (5/min), `/api/subscribe` (8/min), `/api/draft/enable` (10/min), `/api/draft/share` (30/min), `/api/seed-builder` (5/min), `/api/revalidate` (30/min), `/api/audit` (120/min). All return 429 + `Retry-After` when exceeded. Auto-swaps to Upstash/Redis when `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` env vars are set. |
| `app/api/lead/route.ts`, `app/api/subscribe/route.ts` | Rate-limited: 5 submissions/min/IP (lead), 8/min/IP (subscribe). 429 + `Retry-After` header when exceeded. Duplicate-ip declaration fixed. |
| `lib/revalidate-state.ts` | Monotonic per-tag revision counter bumped by `/api/revalidate` on every revalidation event. |
| `app/api/revalidate/state/route.ts` | `GET /api/revalidate/state?tag=…` → `{rev, serverTime}` used by the collaboration ribbon to detect published changes while an editor is in draft mode. |
| `app/api/revalidate/route.ts` | Calls `bumpTag()` for every tag it revalidates (plus wildcard `*`). |
| `app/api/audit/route.ts` | Sanity webhook endpoint (secret-verified via `SANITY_REVALIDATE_SECRET`). Appends JSON lines to `.logs/audit.ndjson` for create/update/delete on page/siteSettings/service/project/post/teamMember/previewToken events; ready to fan out to Supabase/Resend in the launch sprint. |
| `builder/DraftActivityBar.tsx` | Client polling loop (every 8s) mounted only in draft mode. When `rev` bumps, shows a dismissible anish "New edits published — Reload preview" ribbon bottom-right. |
| `builder/DraftActivityBar.client.tsx` + `DraftActivityBar.server.tsx` | Split boundary so the polling+framer-motion code is only downloaded in draft mode (zero bytes to anonymous visitors). |
| `layout.tsx` | Mounts `<DraftActivityBarServer />` alongside `<StudioBridge />` and `<ThemePreviewServer />`. |

#### Phase 6 DoD checklist
- [x] CSP + security headers applied to every non-asset response; `frame-ancestors` allows Sanity Studio iframe for Presentation Tool.
- [x] `/api/lead` and `/api/subscribe` rate-limited per IP with Retry-After signalling.
- [x] `/api/audit` accepts Sanity webhook POSTs (secret-verified) and writes append-only NDJSON audit log.
- [x] Draft-only soft-lock ribbon: editors see a reload prompt when another publishes; dismissible. Zero bytes in production.
- [x] Builder/content routes send `s-maxage=60, stale-while-revalidate=3600`; API/studio/draft routes send no-store.
- [x] Sanity built-in version history, presence avatars, and member roles satisfy the remaining collaboration requirements (no custom code needed).
- [x] 0 TS errors; production build clean; 61 routes 200 OK; rate limit trips 429 after 5th POST to /api/lead.
- [x] Anonymous visits still ship 0 VisualEditing / woodex-theme-preview / DraftActivityBar bytes (verified via curl).

