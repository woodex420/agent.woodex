# 🪵 Woodex LIVE-BUILDER.md
## No-Code Live Page Builder — Revised, Codebase-Aligned Plan
*(replaces the generic iframe/postMessage spec with a version that leverages what's already built: Sanity Studio at `/studio`, Draft Mode, Presentation Tool visual editing, revalidate webhooks, theme tokens, and 45+ existing section components)*

---

## 🔥 Key Architectural Changes From The Original Spec

| Original spec said | What we actually do | Why |
|---|---|---|
| Custom iframe + postMessage bridge + shell UI | **Sanity Presentation Tool** (`@sanity/presentation`) — it IS the iframe, does the postMessage, gives us hover outlines, click-to-edit, selection, and shows the live production frontend | 80% of Module 1/2/3 is a solved problem; writing our own would be ~6 weeks of bugs |
| Custom backend tables (pages, page_revisions, audit_logs, media_assets) | **Sanity documents + native history + asset pipeline** | Versions/auth/media are free, ship today. Audit log via `sanity-plugin-document-actions` or transaction log API. |
| Custom CMS CRUD UI | **Sanity Studio** mounted at `/studio` (already done in Sprint E) | 0 lines of admin UI to build; editors already know the shape |
| Custom undo/redo + 30-day trash | Sanity's native History + `sanity-plugin-trash-bin` | 0 lines |
| Custom presence / soft-lock | Sanity's realtime presence | Already in Studio v3 |
| Custom preview-token URLs | Next.js Draft Mode + Sanity preview URLs (already exists in `/api/draft/enable`) | Already done in Sprint E |
| Custom theme draft/publish pipeline | Sanity singleton `siteSettings` (already exists) + CSS-var injector client component | ~60 lines of code vs a bespoke theme engine |

What IS still custom (the real work):

1. **Section Registry** — register every existing React section component with its props schema + Sanity `_type` name.
2. **Page Builder** — polymorphic `sections[]` array on a new `page` document in Sanity, plus a `<PageBuilder>` React component that maps `_type` → component.
3. **Editable overlays** — use `@sanity/visual-editing` + `createDataAttribute` to wire the existing production React tree to Studio so clicking a headline/text/image in the live preview opens that field in Studio forms automatically (no custom contentEditable, no custom inspector panels — Studio IS the inspector).
4. **Theme customizer fields** on the existing `siteSettings` singleton + a small client component that reads draft theme values and injects them into CSS variables.
5. **Migrating the 10 hand-coded routes** (home, services hub, each static page) to be page-builder driven behind the `NEXT_PUBLIC_SANITY_ENABLED` feature flag (which already exists — we just flip it and ship seed data).
6. **Static safe fallbacks** — keep every page working from static TS content until editors are ready (already built into `src/lib/sanity/content.ts`).

---

## 📁 File Map (what we create vs what already exists)

```
EXISTS ALREADY:
├─ /studio                          Sanity Studio (embedded, password-gated)    [E5]
├─ /api/draft/enable|disable        Draft mode on/off                            [E6]
├─ /api/revalidate                  Tag/path revalidation on publish             [E3]
├─ /api/lead  /api/subscribe        Lead + newsletter endpoints                 [E4]
├─ src/sanity/client.ts             Sanity clients (published + preview)         [E2]
├─ src/sanity/schemas/              service, project, post, siteSettings, …      [E2]
├─ src/lib/sanity/fetch.ts          Cached GROQ fetch with tags                  [E2]
├─ src/lib/sanity/content.ts        Static ↔ Sanity unified access layer          [E3]
├─ src/components/**/               All 45+ production section components        [S0–5]
├─ src/app/globals.css              @theme inline CSS vars (colors, type, space) [S0]
└─ src/app/(site)/**/*              All static routes + per-page SEO metadata    [S0–5]

WE BUILD IN THIS PLAN (P = Phase):
├─ src/sanity/schemas/page.ts                [P1] page document (sections array, seo, slug)
├─ src/sanity/schemas/objects/section-*.ts   [P1] per-section schema objects (25+ files)
├─ src/sanity/schemas/siteSettings.ts        [P4] extend with theme fields
├─ src/components/builder/SectionRegistry.tsx [P1] _type → component map + default props
├─ src/components/builder/PageBuilder.tsx    [P2] renders sections[] array + adds visual-editing attrs
├─ src/components/builder/EditableField.tsx  [P2] wraps text/image for click-to-edit
├─ src/components/builder/ThemePreview.tsx   [P4] client-side CSS-var injector for draft theme
├─ src/components/providers/StudioBridge.tsx [P2] loads @sanity/visual-editing when draft
├─ src/app/(site)/[slug]/page.tsx            [P3] catch-all for builder-managed pages
├─ sanity.config.ts                          [P2] add presentationTool + desk config for pages
├─ src/lib/sanity/groq.ts                    [P1] add PAGE_BY_SLUG, SETTINGS_WITH_THEME queries
├─ src/lib/sanity/seed.ts                    [P3] one-time seed: convert current static pages → Sanity docs
└─ src/app/api/draft/share/route.ts          [P5] tokenized shareable preview links
```

---

## 🧱 PHASE 1 — Section Registry + Page Schema

**Goal:** Every existing section has a name + props schema + a default export so a page document can compose them.

### 1.1 Section Registry (`src/components/builder/SectionRegistry.tsx`)

```ts
import type { ComponentType } from "react";
import CinematicHero from "@/components/home/CinematicHero";
import Marquee from "@/components/home/Marquee";
import AboutBrief from "@/components/home/AboutBrief";
import ServicesGrid from "@/components/home/ServicesGrid";
import StudioScrub from "@/components/home/StudioScrub";
import FitOutSplit from "@/components/home/FitOutSplit";
import ProcessRail from "@/components/home/ProcessRail";
import ShowcaseRail from "@/components/home/ShowcaseRail";
import ProofStack from "@/components/home/ProofStack";
import ConvoDiagram from "@/components/home/ConvoDiagram";
import FAQ from "@/components/home/FAQ";
import CTAFinal from "@/components/home/CTAFinal";
// … service/portfolio/studio/fitout/about/contact/blog sections; 35–45 total

export interface SectionDef {
  type: string;
  component: ComponentType<any>;
  label: string;
  category: "Hero" | "Content" | "Proof" | "Conversion" | "Layout" | "Media" | "List";
  defaultProps: Record<string, unknown>;
}

export const SECTION_REGISTRY: SectionDef[] = [
  {
    type: "hero.cinematic",
    component: CinematicHero,
    label: "Cinematic Hero",
    category: "Hero",
    defaultProps: { slides: [/* placeholder */] },
  },
  // … one entry per component
];

export const SECTION_MAP: Record<string, ComponentType<any>> = Object.fromEntries(
  SECTION_REGISTRY.map((s) => [s.type, s.component])
);
```

### 1.2 Sanity schemas for sections

Each entry in the registry gets a matching Sanity object schema under `src/sanity/schemas/objects/`. E.g. `section-ctaFinal.ts`:

```ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "section.ctaFinal",
  title: "Final CTA",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "italicAccent", type: "string" }),
    defineField({ name: "sub", type: "text", rows: 2 }),
    defineField({ name: "primaryCtaLabel", type: "string" }),
    defineField({ name: "primaryCtaHref", type: "string" }),
    defineField({ name: "secondaryText", type: "string" }),
    defineField({ name: "secondaryHref", type: "string" }),
  ],
});
```

**We don't write 40+ files by hand.** Instead we add a generic `section.object.ts` factory plus a "freeform" section for anything we haven't typed yet that wraps children with visual-editing overlays. High-traffic sections (Hero, ServicesGrid, FAQ, CTAFinal, ProjectShowcase, ContactForm) get hand-authored schemas (20 in Phase 1 — covers 100% of sections currently used on live routes). The rest are ported in a second pass.

### 1.3 `page` document schema (`src/sanity/schemas/page.ts`)

```ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      of: SECTION_REGISTRY.map((s) => ({ type: s.type })), // array of polymorphic section objects
    }),
    defineField({ name: "seo", type: "seo" }), // reuse from BlogPosting schema
    defineField({ name: "isNavRoot", type: "boolean", initialValue: false }),
    defineField({ name: "navOrder", type: "number", initialValue: 0 }),
  ],
});
```

**DoD Phase 1:**
- `SECTION_REGISTRY` has 20+ entries covering 100% of sections currently rendered on live routes.
- Sanity Studio lets an editor add a `page`, drop sections into the array, and edit all props for CTAFinal/FAQ/ProofStack/Marquee end-to-end.
- Typecheck passes; production build 0 TS errors.

---

## 🧱 PHASE 2 — Visual Editing (the "WYSIWYG" part, no custom iframe needed)

### 2.1 Install Presentation Tool

```
npm i @sanity/presentation @sanity/visual-editing
```

Add it to `src/sanity.config.ts`:

```ts
import { presentationTool } from "@sanity/presentation";
plugins: [
  structureTool({ … }),
  presentationTool({
    previewUrl: {
      previewMode: { enable: "/api/draft/enable", disable: "/api/draft/disable" },
    },
  }),
],
```

Studio now has a "Presentation" tab (top-right of `/studio`) that loads an iframe of our live site with draft mode on. Out of the box it gives:
- Hover outlines on sections that render Sanity data.
- Click → jumps to that field in the Studio form.
- Device-width preview (375/768/1440/desktop).
- Shareable preview URLs.

We do **not** build a separate `/admin` shell; Studio IS the builder. Editors open `/studio` and click the "Presentation" icon to enter WYSIWYG mode.

### 2.2 `<PageBuilder>` + visual-editing bindings

In production renders of builder-managed pages, wrap every field with `createDataAttribute` from `@sanity/visual-editing`. The Sanity Presentation iframe listens for these attrs and wires up hover/click automatically.

```tsx
// src/components/builder/PageBuilder.tsx
import { SECTION_MAP } from "./SectionRegistry";
import { useDataAttribute } from "./useDataAttribute";

export function PageBuilder({ sections, draft = false }: { sections: any[]; draft?: boolean }) {
  const attr = useDataAttribute(); // returns createDataAttribute({ id, type }) scoped to this doc
  return (
    <>
      {sections?.map((section, i) => {
        const Comp = SECTION_MAP[section._type];
        if (!Comp) return null;
        return (
          <section
            key={section._key}
            data-sanity={attr(["sections", i, "_type"])}
          >
            <Comp {...section} editable={draft} />
          </section>
        );
      })}
    </>
  );
}
```

**Key insight from the original spec we KEEP:** the real production component tree is what renders. We never build a "preview version" of components. The `editable` prop only toggles whether inner text nodes/imgs get data attrs; it never changes layout.

### 2.3 `<EditableField>` for inline text

```tsx
// src/components/builder/EditableField.tsx
"use client";
import { useDataAttribute } from "./useDataAttribute";
export function EditableField<T extends React.ElementType = "span">({
  as,
  path,
  children,
  className,
}: {
  as?: T;
  path: (string | number)[];
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = (as ?? "span") as any;
  const attr = useDataAttribute();
  return <Tag className={className} data-sanity={attr(path)}>{children}</Tag>;
}
```

Component authors opt text into click-to-edit by wrapping it:

```tsx
<h1>
  <EditableField as="span" path={["heading"]}>{heading}</EditableField>
  {" "}
  <span className="italic-serif text-[var(--oak-300)]">
    <EditableField as="span" path={["italicAccent"]}>{italicAccent}</EditableField>
  </span>
</h1>
```

This replaces the spec's Module 3 "contentEditable" approach. We do NOT make the DOM contentEditable — Sanity's Presentation Tool shows a small popover that lets editors type in a form field OR via double-click opens a simple input bound to the field. The page never enters a "broken" intermediate state, which avoids the whole class of contentEditable bugs (IME, cursor jumps, formatting hacks).

### 2.4 Studio Bridge

```tsx
// src/components/providers/StudioBridge.tsx — mounted in root layout when draft
"use client";
import { VisualEditing } from "@sanity/visual-editing/react";
import { draftMode } from "next/headers";
// Render VisualEditing only server-side when draft
export default async function StudioBridge() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return <VisualEditing />;
}
```

Mount in `src/app/layout.tsx` (server-rendered, so it never ships JS to production visitors).

**DoD Phase 2:**
- Opening `/studio`, clicking "Presentation", loads the homepage in iframe.
- Hovering the CTAFinal heading shows a blue outline; clicking it opens the Studio form for that heading.
- Typing a new heading in Studio → iframe updates in <500ms (via tag revalidation / live listen).
- No extra JS ships to anonymous visitors (tree-shaken because `draftMode()` is false).

---

## 🧱 PHASE 3 — Catch-All Page Route + Static Migration

### 3.1 Catch-all route `src/app/(site)/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPages } from "@/lib/sanity/content";
import { PageBuilder } from "@/components/builder/PageBuilder";
import { breadcrumbLd } from "@/lib/schema";
import StructuredData from "@/components/JsonLd/StructuredData";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  if (!(await import("@/sanity/env")).sanityEnabled) return [];
  const pages = await getAllPages();
  return pages.map((p) => ({ slug: p.slug.current.split("/") }));
}

export default async function BuilderPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { isEnabled: draft } = await draftMode();
  const segments = (await params).slug;
  const slug = segments?.join("/") ?? "home";
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return (
    <main className="pt-[var(--nav-h)]">
      <StructuredData data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: page.title },
      ])} />
      <PageBuilder sections={page.sections} draft={draft} />
    </main>
  );
}
```

### 3.2 Static migration (seed script)

`src/lib/sanity/seed.ts` is a one-time script you run against a fresh Sanity dataset:

- Reads each static route's component tree and emits a `page` document with hardcoded `sections[]` matching the current live look.
- Home → sections list mirrors what `src/app/page.tsx` imports today.
- Services hub → sections from ServiceHero down to CTAFinal.
- The static routes continue to render via their existing `page.tsx` until we flip them over; one by one we replace the static file with a redirect to the builder route (or keep them static for high-traffic / LCP-critical pages like home/services — builder pages SSG via tags, so performance parity).

**Rollback is free:** turn `NEXT_PUBLIC_SANITY_ENABLED=false` and the site falls back to static files (already built into `src/lib/sanity/content.ts` from Sprint E).

**DoD Phase 3:**
- `/studio` → create a new page "Test" with a CTAFinal section → publish → `/test` renders live in <60s (webhook → /api/revalidate → ISR tag sweep).
- Existing routes (/, /services, /contact, …) still work unchanged; seed script run locally produces matching pages in Sanity.

---

## 🧱 PHASE 4 — Theme Customizer

### 4.1 Extend `siteSettings` schema

Add fields to `src/sanity/schemas/siteSettings.ts`:

```ts
// Colors
defineField({ name: "brandPrimary", type: "string", description: "Hex, e.g. #a6804a" }),
defineField({ name: "brandAccent",  type: "string" }),
defineField({ name: "graphite",     type: "string" }),
defineField({ name: "bgPaper",      type: "string" }),
// Typography
defineField({ name: "headingFont",  type: "string", options: { list: ["Fraunces","Inter","Manrope","Playfair Display"] } }),
defineField({ name: "bodyFont",     type: "string", options: { list: ["Inter","Manrope","Source Sans"] } }),
defineField({ name: "typeScale",    type: "number", options: { list: [1.2, 1.25, 1.33] } }),
// Buttons
defineField({ name: "buttonStyle",  type: "string", options: { list: ["solid","outline","liquid"] } }),
defineField({ name: "radius",       type: "number" }),
// Layout
defineField({ name: "containerMax", type: "number" }),
```

### 4.2 `<ThemePreview>` client component

```tsx
// src/components/builder/ThemePreview.tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Subscribes to the Presentation Tool's preview state (a small client store Sanity exposes).
// For MVP we do the simpler thing: <meta name="x-sanity-theme-draft"> is injected by an
// API route during draft; here we read it and apply CSS vars. For v1 we just poll
// /api/theme/draft every second while draft is on.
export function ThemePreview() {
  useEffect(() => {
    let active = true;
    async function tick() {
      try {
        const r = await fetch("/api/theme/draft", { cache: "no-store" });
        if (!r.ok) return;
        const t = await r.json();
        const root = document.documentElement;
        if (t.brandPrimary) root.style.setProperty("--oak-500", t.brandPrimary);
        if (t.brandAccent)  root.style.setProperty("--oak-400", t.brandAccent);
        if (t.graphite)     root.style.setProperty("--graphite-900", t.graphite);
        if (t.radius)       root.style.setProperty("--r-pill", `${t.radius}px`);
      } catch { /* offline */ }
      if (active) setTimeout(tick, 1000);
    }
    tick();
    return () => { active = false; };
  }, []);
  return null;
}
```

A tiny `route.ts` at `/api/theme/draft/route.ts` returns the **draft** `siteSettings` when draft mode is on (uses `previewClient`), otherwise 404. No API call ever happens for production visitors.

**Publish** saves to the published `siteSettings` document; `?revalidateTag=site` in our existing `/api/revalidate` purges the cached theme and every page reads the new values from `SITE`-shaped config on next SSG.

**DoD Phase 4:**
- From Studio, change brand primary → canvas iframe turns oak accents to new color in <1.5s.
- Publish → theme goes live in <60s across all routes.
- Contrast warning is shown in the Studio form (custom validation: use `tinycolor2`-like logic to flag <4.5:1 on body, <3:1 on large text).
- Production visitors don't load any of this code.

---

## 🧱 PHASE 5 — Media Library, SEO Gate, Shareable Previews

### 5.1 Media swap-in-place
Sanity's native asset source + hotspot already handles uploads, alt text, focal point. We just make sure every `<Image>` field in schemas has `options: { hotspot: true }` and that components pass through `hotspot`/`crop` to next/image. **Module 7 from the original spec is 100% covered.**

### 5.2 SEO publish gate
Add a document action (`sanity-plugin-document-actions-api`) to the `page` document type that blocks publish if:

- No meta title, or title < 30 or > 60 chars
- No meta description, or < 70 or > 160 chars
- Any images in sections[] missing `alt` text (recursive scan)
- Any text fields matching placeholder regex (`/Lorem ipsum|TODO|Add your/i`)
- Exactly one H1-equivalent section on the page (sections with `role: "heading"`)

Display a checklist panel in Studio with jump-links to failing fields (Sanity's `setSelectedPaths` does this).

### 5.3 Shareable preview links

`/api/draft/share/route.ts` — authenticated endpoint (Studio-only, POST) that:
- Creates a short random token (stored KV-style in Sanity `previewToken` doc with TTL 7 days).
- Returns a URL like `/api/draft/share/[token]` that enables draft mode for that specific page and redirects.
- Clients/stakeholders don't need Sanity logins — they get a pixel-perfect draft preview.

This replaces the custom token system in Module 9 with ~50 lines of code (Draft Mode is already there).

### 5.4 Data-bound sections (Module 8)

Sections that currently read from hardcoded lists (ServicesGrid, ShowcaseRail, ProofStack, Marquee) get a "Data source" field:

```ts
defineField({
  name: "source",
  type: "string",
  options: { list: ["Automatic (latest 6)", "Manual pick", "By category"] },
}),
defineField({
  name: "picks",
  type: "array",
  of: [{ type: "reference", to: [{ type: "project" }, { type: "post" }, { type: "service" }] }],
  hidden: ({ parent }) => parent?.source !== "Manual pick",
}),
```

If "Manual pick", render those specific items. If "Automatic", pull most recent from GROQ. Collection editors stay in their own Studio lists (Services/Projects/Posts already exist from Sprint E). This satisfies the original "don't let editors edit project content inside the Home page" guardrail.

**DoD Phase 5:**
- Media swap with hotspot + alt text works end-to-end in visual editing.
- Publish blocked on an SEO-invalid page with jump-links to the bad field.
- Shareable preview URL generated from Studio opens the draft without login, expires in 7 days.
- A ServicesGrid dropped on a new page can switch between all-services/manual/category-filtered.

---

## 🧱 PHASE 6 — History, Collaboration, RBAC, Hardening

Sanity already provides:
- **Version history** (diff + restore for every document) — Module 10 covered.
- **Presence** (avatars of editors currently in the doc) — Module 11 covered.
- **Roles** (viewer/editor/admin via Sanity project members) — replaces custom RBAC table.

Things we still add:

1. **Soft-lock banner** — listen to `@sanity/client` listening for `document.received` events (client-side in Presentation iframe) and if another user edited the same section since last render, show a non-blocking "This section was just edited by X — reload?" ribbon (uses existing notification Toast system).
2. **Audit log webhook** — add a second deploy-time Sanity webhook posting all mutations to an internal audit endpoint (append-only log in Supabase or Resend notification to ops inbox).
3. **Production hardening:**
   - Set `studioPassword` + `PREVIEW_SECRET` in production env.
   - Add rate-limiting to `/api/lead` (we already have size cap; add 5/min/IP via edge helper or Upstash).
   - CSP header allowing `cdn.sanity.io` + `wa.me` only.
   - `Cache-Control` on builder pages: `s-maxage=60, stale-while-revalidate=3600` (matches our revalidateTag cadence).

---

## 🚦 Launch Checklist (Definition of Done)

Before declaring the builder "on" for editors:

- [ ] Studio `/studio` password-protected in production (`STUDIO_PASSWORD` env).
- [ ] Sanity project created; `NEXT_PUBLIC_SANITY_ENABLED=true`; dataset populated via seed script so existing pages look identical to current static site.
- [ ] Top 10 highest-traffic sections (CinematicHero, CTAFinal, FAQ, ServicesGrid, ServiceHero, ProjectShowcase, PortfolioHero, BlogHero, ContactHero, ProofStack) registered in SECTION_REGISTRY with full Sanity schemas + EditableField bindings.
- [ ] Non-tech editor test: create a new page, add CTAFinal, edit heading, upload image, publish, confirm live at `/new-slug` in <60s → under 15 minutes unassisted.
- [ ] Theme change (brand primary) reflects in canvas in <1.5s client-side; publishes live in <60s.
- [ ] SEO gate blocks publish on a page without meta description; checklist links jump to correct field.
- [ ] Production build: `npm run build` 0 TS errors; Lighthouse mobile LCP <2.5s on home (presently ~1.9s after CinematicHero next/image migration in Sprint F).
- [ ] No `@sanity/*` JS loads on production pages outside draft mode (verify via Network tab on anonymous visit).
- [ ] Rollback test: turn `NEXT_PUBLIC_SANITY_ENABLED=false`; site serves static fallback unchanged (already tested in Sprint E).

---

## 🎯 Bottom Line vs Original Spec

- **Original modules KEEP:** the core insight (real production tree, not a fake preview), section registry model, theme-as-CSS-vars, publish validation gate, manual data-source picker for collection sections.
- **Original modules REPLACED by Sanity features:** iframe shell, postMessage bridge, inspector panel, version history, undo/redo, soft-delete, presence/conflict, media library, auth, preview-token URLs. ~6 weeks of custom code deleted.
- **Original modules ADDED:** seed script from existing static pages, tree-shaken draft-only JS, theme client injector, SEO document action, EditableField opt-in at field granularity.
- **Total estimated build:** ~4 developer weeks (vs ~10-12 weeks for the original custom iframe plan), because the hard parts (Studio, schemas, draft mode, revalidate, cache) shipped in Sprints E and F.

**Next step: kick off Phase 1 — generate the first object schemas for the top-traffic sections (CTAFinal, FAQ, ProofStack) and the `page` document type. Once those 3 register end-to-end through Presentation Tool visual editing, the rest of the registry is mechanical work.**
