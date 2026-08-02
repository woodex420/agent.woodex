# Sanity integration (Sprint E)

## Feature flag

`NEXT_PUBLIC_SANITY_ENABLED=true` switches content reads from the static TS files
(in `src/lib/content/*.ts`) to the live Sanity dataset. Default is `false` — the
site builds and runs with zero credentials.

## Structure

- **`env.ts`** — reads projectId/dataset/apiVersion/feature flag from env.
- **`client.ts`** — `@sanity/client` instances (published + preview).
- **`types.ts`** — document types shared between static and Sanity shapes.
- **`schemas/`** — Sanity Studio document schemas (service, project, post,
  fitoutService, location, teamMember, siteSettings, blockContent).
- **`fetch.ts`** — `sanityFetch()` helper with React `cache()` + `unstable_cache`
  and on-demand ISR tag support.

Consumers should import from `@/lib/sanity/content` (the unified layer) rather
than importing the helpers here directly.

## Revalidation

`POST /api/revalidate` with `x-webhook-secret: <SANITY_REVALIDATE_SECRET>` and a
Sanity webhook body clears tags and paths. A `GET /api/revalidate?secret=...`
sweeps all content tags.

## Lead pipeline

`POST /api/lead` accepts form submissions. See `src/lib/leads/` for validation,
destinations (Supabase / Resend / WhatsApp), and client helpers (`captureAttribution`,
`submitLead`). Destinations are silent no-ops when env vars are absent.

## Studio

`/studio` mounts Sanity Studio behind a password gate (`STUDIO_PASSWORD`). The
route is `dynamic = "force-dynamic"` and the Studio chunk is `next/dynamic`-imported
client-side only, so the heavy Sanity bundle never lands in the marketing site's
production JS.

## Preview

- `/api/draft/enable?secret=<PREVIEW_SECRET>&slug=/services/foo` → turns on draft mode
- `/api/draft/disable?slug=/` → turns it off
- A floating "Draft preview · Exit" pill appears when draft mode is active.
