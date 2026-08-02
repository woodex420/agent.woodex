# 🚀 Deploy Woodex to Vercel

One-click deploy or guided CLI — both paths documented below.

---

## Option A — One-Click Deploy (fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwoodex420%2Fagent.woodex&project-name=woodex&repository-name=agent.woodex&framework=nextjs&root-directory=&install-command=npm%20install%20--legacy-peer-deps&build-command=NODE_OPTIONS%3D--max-old-space-size%3D3072%20next%20build&output-directory=.next&env=NEXT_PUBLIC_SANITY_ENABLED,STUDIO_PASSWORD,PREVIEW_SECRET&envDescription=Studio+password+%26+preview+secret+are+REQUIRED+to+unlock%2Fstudio+and+draft+mode.+Set+Sanity+vars+when+ready+to+enable+the+Live+Builder+CMS.&envLink=https%3A%2F%2Fgithub.com%2Fwoodex420%2Fagent.woodex%2Fblob%2Fmain%2FDEPLOY.md)

Click the button above → Vercel will clone the repo, ask for env vars, and build. When prompted in the Vercel UI, set the env vars in the **Required** table below (Sanity vars can stay blank initially for a fully static deploy).

### Environment variables (paste into Vercel → Project → Settings → Environment Variables)

#### 🔴 Required (set these immediately)

| Key | Value (generate your own) |
|---|---|
| `STUDIO_PASSWORD` | A long random password for `/studio` — e.g. `openssl rand -base64 24` |
| `PREVIEW_SECRET` | Another long random string (can be the same password). |

#### 🟡 Initially leave as `false` / blank (enables static fallback)

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_ENABLED` | `false` (set to `true` only after Sanity project is provisioned) |

#### 🟢 Optional (add later when wiring leads + CMS)

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (Settings → Project) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | Server-only preview read token (API → Tokens) |
| `SANITY_REVALIDATE_SECRET` | Shared secret for Sanity webhooks (same as PREVIEW_SECRET is fine) |
| `RESEND_API_KEY`, `WOODEX_NOTIFICATION_EMAIL` | Lead notification emails |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Lead storage |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Spam defense |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Distributed rate limiting (only needed if scaling >1 Node instance) |
| `NEXT_PUBLIC_GA4_ID` | Analytics |

---

## Option B — CLI Deploy (uses the repo already on your machine)

```bash
# Install Vercel CLI (already installed locally in this workspace)
cd /home/user/woodex

# First-time login
npx vercel login

# Preview deploy (gives you a staging URL)
npx vercel --yes

# Promote to production
npx vercel --prod
```

Vercel auto-detects Next.js; `vercel.json` in the repo sets:
- Install command: `npm install --legacy-peer-deps`
- Build command: `NODE_OPTIONS=--max-old-space-size=3072 next build`
- Region: `bom1` (Mumbai — closest to Lahore for fastest TTFB to PK visitors)

---

## After Deploy — post-launch steps

1. **Visit `/studio`** → enter `STUDIO_PASSWORD` → you're in the Sanity Studio.
2. **Sanity provisioning (optional):**
   - Create project at https://sanity.io/manage → get project ID + dataset.
   - In Vercel, set `NEXT_PUBLIC_SANITY_ENABLED=true`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`.
   - Add two webhooks at Sanity → API → Webhooks:
     - `https://woodex.studio/api/revalidate` — on create/update/delete
     - `https://woodex.studio/api/audit` — on create/update/delete
     - Both: secret = `SANITY_REVALIDATE_SECRET`.
   - Hit `POST /api/seed-builder` with `Authorization: Bearer <PREVIEW_SECRET>` to seed 9 pages that mirror the static site.
3. **Shareable preview links:** Editors can `POST /api/draft/share` with the bearer secret to get 7-day client-safe preview URLs.
4. **Custom domain:** Vercel → Project → Settings → Domains → add `woodex.studio` + `www.woodex.studio`. Update DNS as instructed; Vercel issues SSL automatically.

---

## What's already wired for production

| Feature | Status |
|---|---|
| CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy | ✅ via `src/proxy.ts` |
| Rate limits (lead 5/min, subscribe 8/min, draft 10/min, share 30/min, seed 5/min, revalidate 30/min, audit 120/min) | ✅ via `src/lib/rate-limit.ts` |
| Cache-control: `s-maxage=60, stale-while-revalidate=3600` on content; no-store on API/draft/studio | ✅ |
| `X-Powered-By` stripped | ✅ next.config + proxy |
| Tree-shaken Sanity/VisualEditing/ThemePreview/DraftActivityBar (0 bytes to anon visitors) | ✅ |
| Blocking ThemeScript (zero FOUC) | ✅ |
| `prefers-reduced-motion` respected | ✅ |
| Responsive 360 → 2560px | ✅ |
| OG images (edge-rendered next/og) + sitemap + RSS + manifest + robots | ✅ |
| JSON-LD (Organization, Breadcrumb, FAQ, Article, Service, LocalBusiness) | ✅ |
| Lead validation, honeypot, Turnstile hook, size cap, JSON-parse guard | ✅ |
| Audit log webhook + NDJSON writer | ✅ |

---

## Build memory note

Next 16 builds sit around ~2.4GB peak RSS. The `NODE_OPTIONS=--max-old-space-size=3072` in `vercel.json` is required; Vercel's Pro plan gives 8GB and Hobby gives ~3GB so this fits either. The local sandbox (2GB) builds successfully with the same flag.
