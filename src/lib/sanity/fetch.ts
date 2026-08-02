/**
 * Sprint E2 — typed fetch helper for Sanity with `unstable_cache` ISR and tag
 * revalidation. When Sanity is disabled (NEXT_PUBLIC_SANITY_ENABLED !== "true"),
 * callers are expected to use the static fallback helpers in `static-content.ts`.
 */
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { client, isSanityEnabled, previewClient } from "@/sanity/client";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Server-side GROQ fetch with ISR tag caching.
 * - Uses React's `cache()` to dedupe within a single request.
 * - Wraps in `unstable_cache` for cross-request caching keyed by (query, params, tags).
 * - In preview/draft mode, bypasses the cache and uses previewClient.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600, // 1hr default
  preview = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
  preview?: boolean;
}): Promise<T> {
  if (!isSanityEnabled()) {
    throw new Error(
      "sanityFetch called but Sanity is disabled. Call the static fallback helper instead.",
    );
  }

  const c = preview ? previewClient : client;

  // Always dedupe within a request:
  const cachedFn = cache((q: string, p: QueryParams) => c.fetch<T>(q, p));

  if (preview) {
    // Preview/draft: never cache across requests
    return cachedFn(query, params);
  }

  // Cross-request cache tagged for on-demand revalidation:
  const unstableFn = unstable_cache(
    async (q: string, p: QueryParams) => cachedFn(q, p),
    [query, JSON.stringify(params)],
    { tags, revalidate },
  );
  return unstableFn(query, params);
}

/**
 * Convenience: is the CMS live? Used by pages to decide whether to call
 * `sanityFetch(...)` or read the static files.
 */
export { isSanityEnabled } from "@/sanity/client";
