# 🎛️ Live Builder — CMS Setup Guide

Woodex ships with a fully built no-code page builder (Live Builder Phases 1–6) that runs inside Sanity Studio mounted at **`/studio`**. This guide walks you from "Vercel deployed, Sanity project created" to "editors building pages live."

---

## 1. Create a Sanity project (5 minutes)

1. Sign up at **https://sanity.io/manage** → **Create new project**
   - Project name: `Woodex`
   - Free plan is fine (3 users, 10k docs, 10GB bandwidth — plenty for Woodex)
   - Dataset: `production` (default)
   - When asked "Choose a schema template" → **Clean project with no schema** (we ship our own schemas)

2. Copy these values from Sanity **Settings → Project Settings**:
   - **Project ID** (21-character string like `abc123de456f`)
   - **Dataset name** (usually `production`)

3. Go to **API → CORS origins** and add:
   - `http://localhost:3003` (local dev)
   - Your Vercel production URL (e.g. `https://woodex.vercel.app`)
   - Your custom domain (`https://woodex.studio`)
   - Tick **"Allow credentials"** for each

4. Go to **API → Tokens** → **Add API token**:
   - Name: `woodex-read-token`
   - Permissions: **Viewer** (read-only, for draft previews)
   - Copy the token (starts with `sk...`) — you can't view it again.

5. Go to **API → Webhooks** → **Create webhook** (create TWO):

   **Webhook #1 — Revalidation:**
   - Name: `Revalidate`
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: ✅ Create ✅ Update ✅ Delete
   - Secret: paste the same value as `PREVIEW_SECRET`
   - HTTP method: POST
   - Projection (under "Filter" → Advanced): leave default (`*[*]`)

   **Webhook #2 — Audit log:**
   - Name: `Audit`
   - URL: `https://<your-domain>/api/audit`
   - Trigger on: ✅ Create ✅ Update ✅ Delete
   - Secret: paste the same `PREVIEW_SECRET`
   - HTTP method: POST

---

## 2. Add environment variables in Vercel

Go to **Vercel → woodex project → Settings → Environment Variables** and add these.
Redeploy after adding (Deployments → ⋯ → Redeploy).

| Key | Value | Used for |
|---|---|---|
| `NEXT_PUBLIC_SANITY_ENABLED` | `true` | Turns CMS on (was `false` for static-only) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | from step 1.2 | Connects frontend to your dataset |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Dataset name |
| `SANITY_API_READ_TOKEN` | `sk...` from step 1.4 | Draft preview reads |
| `SANITY_REVALIDATE_SECRET` | same as `PREVIEW_SECRET` | Webhook verification |
| `STUDIO_PASSWORD` | *(set at first deploy)* | `/studio` login |
| `PREVIEW_SECRET` | *(set at first deploy)* | Preview links & share tokens |

The first three env vars must be set on **Preview, Production, and Development** environments. The token is **Production + Preview only** (dev uses public access).

---

## 3. Invite your team (optional)

In Sanity **Project Settings → Members → Invite members**:
- **Editors** (content writers): invite as **Editor** role — can create/edit/publish pages, can't change schemas
- **Admin** (you): **Administrator** role

Editors visit `https://<your-domain>/studio`, enter `STUDIO_PASSWORD`, and land in the CMS. They don't need Sanity accounts to view published content — they only need accounts if you want them to edit (Sanity free tier supports 3 admin/editor seats; add Viewer seats — free — for clients who only preview drafts).

---

## 4. Seed the initial content

Once the site is deployed with `NEXT_PUBLIC_SANITY_ENABLED=true`, hit:

```bash
curl -X POST https://<your-domain>/api/seed-builder \
  -H "Authorization: Bearer <PREVIEW_SECRET>" \
  -H "Content-Type: application/json"
```

This creates 9 pages in Sanity that mirror the static site:
- Home `/` (as `page-home`)
- Services, Portfolio, About, 3D Studio, Blog, Contact, Consultation, Thank-you

You can then edit any of these from `/studio` — changes appear live after the webhook revalidates.

---

## 5. Daily editor workflow

1. Open `/studio` and enter `STUDIO_PASSWORD`.
2. In the **Pages (Builder)** list on the left, click any page.
3. Click **"Open preview"** (top-right eye icon or the Presentation tab) → split-screen Studio + live site appears. Click any text/section on the live preview to jump to its field — inline editing!
4. Use the **+ Add item** button at the bottom of any section list to add new sections.
5. Hit **Publish** → SEO gate validates meta title/description/alt text/H1 count; if it passes, webhook revalidates and the page is live in ~1-2s. If errors block publish, a checklist shows exactly what to fix.
6. To share a draft with a client (no login needed): POST to `/api/draft/share` (Studio will get a UI button in Phase 7) or use the API:
   ```bash
   curl -X POST https://<your-domain>/api/draft/share \
     -H "Authorization: Bearer <PREVIEW_SECRET>" \
     -H "Content-Type: application/json" \
     -d '{"path":"/services/commercial","createdBy":"amna@woodex.studio"}'
   ```
   Response gives a `url` valid for 7 days that opens the latest draft.

---

## 6. Available section types (19 total)

| Section | Typed? | Editable inline? | What it does |
|---|---|---|---|
| Hero (text/image) | ✅ | ✅ | Text+image hero with eyebrow/heading/sub/CTA |
| CTA Final | ✅ | ✅ | Oak-colored conversion CTA with stat strip |
| FAQ accordion | ✅ | ✅ | Two-column expandable FAQ |
| Client logo marquee | ✅ | ✅ | Animated client-name/logo strip (data-bound) |
| Proof stack | ✅ | ✅ | Dark metrics grid + testimonials |
| About brief | ✅ | ✅ | Image + paragraphs + floating stat card |
| Text block (long copy) | ✅ | partial | Rich PortableText with optional image |
| Data strip | ✅ | partial | Big-number metrics row |
| Prose | ✅ | — | Raw PortableText body |
| Divider / spacer | ✅ | — | Layout separator |
| Single image | ✅ | — | Contained/wide/full-bleed image with alt + caption (hotspot/crop) |
| Studio map | ✅ | — | Location + hours + embed |
| Blog CTA | ✅ | partial | Newsletter sign-up CTA |
| Freeform rich content | ✅ | — | Arbitrary rich text catch-all |
| Services grid (bento) | ✅ | ✅ eyebrow/heading/intro | Data-bound cards (all/category/manual picks/inline) |
| Projects carousel | ✅ | ✅ eyebrow/heading/cta | Data-bound Embla carousel (latest/featured/category/manual) |
| Cinematic Hero (home) | ⚫ static | — | Home carousel hero |
| Process rail | ⚫ static | — | Horizontal/vertical timeline |
| Contact form | ⚫ static | — | Full contact form |

**Data-bound sections** automatically pull the latest services/projects/posts from their collections — editors pick the source (automatic / category / manual) and the cards populate themselves. To edit which services appear, edit the `service` documents directly.

---

## 7. Theme customization (live)

Open **Site Settings** (top of the Studio sidebar) → **Theme** group:

| Field | Effect | Live preview |
|---|---|---|
| Brand primary, accent, terracotta, graphite, paper hex | Entire palette (derives 9 oak + 11 graphite shades automatically) | <1.5s in draft |
| Heading font (Fraunces / Playfair / Manrope / Inter / Cormorant) | All display headings | <1.5s |
| Body font (Inter / Manrope / Source Sans 3 / IBM Plex) | Body copy | <1.5s |
| Border radius (0–32px) | Buttons, cards, inputs | <1.5s |
| Container max width (960–1600px) | Content width | <1.5s |

Publishing Site Settings clears the `site` cache tag and applies the new theme to the *entire site* (homepage, services, portfolio, blog, contact) with zero FOUC — the blocking `ThemeScript` inlines CSS vars server-side before first paint.

WCAG contrast is audited automatically — a warning prints to browser console if body text contrast drops below 4.5:1.

---

## 8. Content model reference

Documents editors can create:

- **Page** — the main builder document (slug, sections[], SEO, nav root flag)
- **Service** — service detail pages appear at `/services/<slug>`
- **Project** — portfolio case studies at `/portfolio/<slug>`
- **Blog Post** — journal articles at `/blog/<category>/<slug>`
- **Fit-out Service** — used by /services
- **Location** — city landing pages at `/locations/<slug>`
- **Team Member** — team cards on /about
- **Site Settings** (singleton) — site title, contact info, social links, theme
- **Preview Link** — auto-generated share tokens (7-day TTL, no manual editing needed)

---

## 9. Troubleshooting

| Issue | Fix |
|---|---|
| Changes not appearing live | Check the webhook delivered (Sanity → API → Webhooks → Logs). Hit `POST /api/revalidate?secret=<SECRET>` manually to force a full-site revalidation. |
| "Preview secret not configured" error | `PREVIEW_SECRET` env var missing — add in Vercel and redeploy. |
| Studio shows blank screen | Open DevTools → check CSP/network errors. Make sure your domain is in Sanity CORS origins. |
| OG images 404 on builder pages | `/api/og` is an edge function — Vercel Hobby plans sometimes cold-start slowly, wait 5s and refresh. |
| Rate limited on /api/lead | 5 submissions/min/IP — if legit, add `UPSTASH_REDIS_REST_URL` for higher limits or raise in `lib/rate-limit.ts`. |
| Can't publish page (SEO gate) | Checklist tells you exactly what's wrong — meta title 30–60 chars, meta description 70–160 chars, every image needs alt ≥4 chars, no placeholder text, exactly one Hero section. |

---

## 10. Turning the CMS on/off

- **ON:** Set `NEXT_PUBLIC_SANITY_ENABLED=true` in Vercel and redeploy.
- **OFF (static fallback):** Set to `false`. The site serves from the hardcoded TS content in `src/lib/content/*` exactly as it did before any CMS connection. No data loss — Sanity content stays in the dataset and will reappear when re-enabled.

