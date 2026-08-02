# Woodex Interior — woodex.studio

Design-and-build interior studio in Lahore. Next.js marketing site + **Live Builder** (no-code CMS backend powered by Sanity).

> Approve it in 3D. Get exactly that. On the date we said.

## Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 16.2** (App Router, React 19, Turbopack) |
| Styling | **Tailwind CSS v4** (`@theme` inline CSS vars, no tailwind.config.js) |
| Motion | **Framer Motion 12** + **Lenis** smooth scroll |
| Carousels | **Embla Carousel 8** |
| CMS | **Sanity v5** (visual editing + Presentation Tool) |
| OG | `next/og` edge-rendered social cards |
| Fonts | Fraunces (display), Inter (body), JetBrains Mono |

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwoodex420%2Fagent.woodex&project-name=woodex&repository-name=agent.woodex&framework=nextjs&install-command=npm%20install%20--legacy-peer-deps&build-command=NODE_OPTIONS%3D--max-old-space-size%3D3072%20next%20build&output-directory=.next&env=NEXT_PUBLIC_SANITY_ENABLED,STUDIO_PASSWORD,PREVIEW_SECRET&envDescription=Studio+password+%26+preview+secret+unlock%2Fstudio+and+draft+mode.Leave+Sanity+vars+blank+for+a+fully+static+site.)

Set these env vars when prompted: `STUDIO_PASSWORD` (your pick), `PREVIEW_SECRET` (your pick), `NEXT_PUBLIC_SANITY_ENABLED=false`. Full guide in **[DEPLOY.md](./DEPLOY.md)**.

## Quick start

```bash
# 1. Install (Sanity packages need legacy peer resolution)
npm install --legacy-peer-deps

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# Production build
NODE_OPTIONS="--max-old-space-size=3072" npm run build
npm start          # http://localhost:3000
# Production port default 3003:
npx next start -p 3003 -H 0.0.0.0
```

Copy `.env.example` → `.env.local`. **All env vars are optional** — without `NEXT_PUBLIC_SANITY_ENABLED=true`, the site serves fully static TS content from `src/lib/content/*` (no credentials required to build and run).

## Project structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (Nav, Footer, ThemeScript, providers)
│   ├── page.tsx              # Home — CinematicHero + 12 sections
│   ├── (site)/
│   │   ├── services/         # Services hub + [slug] detail pages (13 services)
│   │   ├── portfolio/        # Portfolio hub + [slug] project case studies
│   │   ├── blog/             # Journal hub + [category]/[slug] articles
│   │   ├── about/ contact/ 3d-studio/ consultation/ thank-you/
│   │   ├── locations/ legal/
│   │   ├── builder-preview/  # Internal demo of CMS sections (noindex)
│   │   └── [...slug]/        # Catch-all: Sanity-managed builder pages
│   ├── studio/               # Sanity Studio (lazy-loaded, password-gated)
│   ├── api/
│   │   ├── lead/ subscribe/  # Lead pipeline endpoints
│   │   ├── draft/enable|disable|share/  # Draft mode + shareable preview links
│   │   ├── revalidate/       # Sanity webhook ISR + /state heartbeat
│   │   ├── seed-builder/     # Idempotent page seeding from static content
│   │   ├── theme/draft/      # Live preview polling for theme customizer
│   │   ├── audit/            # Mutation audit webhook
│   │   └── og/               # Edge OG image generator for builder pages
│   ├── sitemap.ts robots.ts feed.xml manifest.ts
│   └── opengraph-image.tsx   # Default OG image
│
├── components/
│   ├── home/        service/  portfolio/  contact/  about/  blog/  fitout/
│   ├── builder/     # Live Builder (section registry, adapters, visual editing)
│   ├── layout/      Nav, Nav.server, Footer
│   ├── providers/   SmoothScroll, ThemeProvider, MotionConfig, Analytics, DraftGate
│   ├── ui/          Button, ChatWidget, ThemeToggle, Icon, Toast, Pill, ConsentBanner
│   ├── JsonLd/      Structured data (Organization, FAQ, Breadcrumb, Article, Service)
│   └── ThemeScript.tsx  # Blocking inline script — zero FOUC theme
│
├── lib/
│   ├── config.ts      # SITE constants, COST_BANDS, WARRANTY, SLA numbers
│   ├── schema.ts      # JSON-LD generators
│   ├── content/       # Static TS content (services, projects, posts, faqs)
│   ├── fonts.ts       # Next/font loaders
│   ├── leads/         # Validation, destinations (Supabase/Resend/WhatsApp/Turnstile)
│   ├── rate-limit.ts  # Sliding-window IP rate limiter
│   ├── revalidate-state.ts  # Per-tag revision counter for collaboration ribbon
│   ├── og/template.tsx      # Shared woodexOg() next/og template
│   └── sanity/        # Sanity client, GROQ queries, fetch layer, content normalizers,
│                      # theme engine, page helpers, seed data, attrs, audit helpers
│
└── sanity/
    ├── config.ts            # Studio config (desk, presentationTool, SEO gate action)
    ├── env.ts               # env vars + feature flag
    ├── client.ts            # Server + preview clients, urlFor/imageUrl helpers
    └── schemas/             # Sanity document + section schemas
        ├── objects/seo.ts
        ├── sections/        # 19 typed section schemas
        └── plugins/seoGate.tsx  # SEO publish gate document action + badge
```

`public/` — favicon, Open Graph fallback, hero & service imagery.

## Live Builder (CMS)

All CMS code lives under `src/sanity/` + `src/components/builder/`. Six phases shipped:

| Phase | What |
|---|---|
| **P1** | Section registry + polymorphic `page` document; 19 typed section schemas; PageBuilder. |
| **P2** | Visual editing (`@sanity/presentation` + `@sanity/visual-editing`); `EditableText` + `data-sanity` overlays; zero bytes to anonymous visitors. |
| **P3** | Catch-all `[...slug]` route; Nav.server merges builder nav links; sitemap includes builder pages; idempotent seed script writes 9 pages. |
| **P4** | Theme customizer: 5 brand hex colours + fonts + radius + container; palette engine derives full oak/graphite/semantic scales; blocking ThemeScript inlines CSS vars for zero FOUC; 1s live polling in draft. |
| **P5** | Media swap-in-place with hotspot/crop. SEO publish gate (meta title/desc length, alt text, placeholder regex, single-H1 rule). 7-day shareable preview links (no Sanity login needed for stakeholders). Data-bound servicesGrid/projectsRail/proofStack/marquee (all/latest/featured/category/manual). Builder OG images via `/api/og`. |
| **P6** | Production hardening — CSP, HSTS, security headers, per-IP rate limits, audit webhook, NDJSON audit log, draft collaboration ribbon ("New edits published → reload"), cache-control policies. |

See `src/components/builder/README.md` for phase-by-phase detail and `LIVE-BUILDER.md` for the original spec (Phases 1–6 complete; iframe/postMessage architecture replaced by Sanity Presentation Tool).

## Marketing pages (static)

| Route | Content |
|---|---|
| `/` | Home: CinematicHero, marquee, about brief, services bento, 3D studio scrub, fit-out split, process rail, projects showcase, proof stack, convo diagram, FAQ, final CTA |
| `/services` | Services hub (bento grid of 13 services) |
| `/services/[slug]` | 13 service detail pages: hero, situation, cost band, scope matrix, signature proof, timeline, team, FAQ, related projects |
| `/portfolio` | Portfolio hub (counters + flip grid) |
| `/portfolio/[slug]` | 7 project case studies (hero, before/after slider, clip gallery, story beats, quote, stats, project map) |
| `/3d-studio` | 3D design & planning (material swap, pricing tiers) |
| `/about` | Founding story, line draw, scroll timeline, team, values, workshop essay |
| `/blog` | Journal index + 9 articles across Costs / Timelines / Process / Materials categories |
| `/contact` | Contact hero, multi-channel cards, validated form, studio map, FAQ |
| `/consultation` | Multi-step consultation booking form |
| `/thank-you` | Post-booking confirmation (timeline + WhatsApp/call CTAs) |
| `/locations/lahore` | City landing page |
| `/legal/{privacy-policy,terms}` | Legal pages |

## Scripts

```bash
npm run dev       # Next.js dev server (Turbopack)
npm run build     # Production build (needs NODE_OPTIONS="--max-old-space-size=3072")
npm start         # Production server
npm run lint      # ESLint
```

## Deploy

See **`DEPLOY.md`** for full production checklist — env vars, Sanity webhook configuration, shareable preview links, security posture, pre-launch QA.

Quick deploy summary:
- Set all env vars from `.env.example` (at minimum `STUDIO_PASSWORD` + `PREVIEW_SECRET`).
- In Sanity → API → Webhooks, add two webhooks pointing to `/api/revalidate` and `/api/audit` with `SANITY_REVALIDATE_SECRET`.
- Deploy to Vercel/Netlify/Node; the build command is `npm run build` with `NODE_OPTIONS="--max-old-space-size=3072"`.
- After deploy, `POST /api/seed-builder` to populate the CMS with the 9 seed pages that mirror the static site.

## Numbers on the site (all real / specified)

- 240+ projects delivered · 11 years operating · founded 2014
- 98% on-time handover · 4.9/5 Google rating (137 reviews) · 72% repeat/referral revenue
- Price bands (PKR/sqft): residential 3,500–6,500 · commercial 2,800–5,200 · retail/F&B 5,000–9,000 · turnkey 4,500–8,000 · renovation 2,200–4,200 · custom furniture 1,800–3,800
- Warranty: joinery 2y · finishing 1y · MEP labour 1y · free adjustments 11 months
- SLA: WhatsApp reply in 15 min · form reply in 12 h · budget range in 48 h · formal quote in 10 days · PKR 25,000/week delay credit

## License

Private — © Woodex Interior.
