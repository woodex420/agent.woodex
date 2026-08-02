/**
 * Sanity environment config.
 *
 * We deliberately do NOT throw at import time when Sanity is disabled — this lets
 * static builds run without any env vars set. The guard lives in `client.ts`.
 */

export const apiVersion = "2025-01-15";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder-project";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Feature flag — read at runtime on both server and client. When false (default)
 * every helper in `src/lib/sanity/*` falls back to the static TS content files.
 */
export const sanityEnabled =
  process.env.NEXT_PUBLIC_SANITY_ENABLED === "true";

/** Studio password (for the shared-secret gate mounted at /studio). */
export const studioPassword = process.env.STUDIO_PASSWORD ?? "";

/** Preview secret for draft-mode endpoints. */
export const previewSecret = process.env.PREVIEW_SECRET ?? "";

/** Server-only read token — only referenced in server code paths. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

/** Webhook secret for revalidation. */
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET ?? "";
