/**
 * Sanity client factory.
 *
 * - Uses `@sanity/client` for server-side GROQ queries (with fetch: { next: { tags } } for ISR).
 * - Uses `next-sanity` createClient for client/preview paths.
 * - When NEXT_PUBLIC_SANITY_ENABLED !== "true", all query functions in
 *   `src/lib/sanity/fetch.ts` short-circuit to the static TS content, so the
 *   build doesn't require any credentials.
 */
import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
// Default export deprecated — use named export. Fall back to default for older installs.
const _makeBuilder: typeof createImageUrlBuilder =
  (createImageUrlBuilder as any) ??
  (require("@sanity/image-url") as any).default;
type SanityImageSource = Parameters<ReturnType<typeof _makeBuilder>["image"]>[0];
import { apiVersion, dataset, projectId, sanityEnabled } from "./env";

export const clientConfig = { projectId, dataset, apiVersion };

/**
 * Server-side client. Used from Route Handlers, Server Components, and
 * Server Actions. If Sanity isn't enabled, queries never reach this.
 */
export const client = createClient({
  ...clientConfig,
  useCdn: true,
  perspective: "published",
  stega: false,
});

/**
 * Preview client — uses the read token and `previewDrafts` perspective.
 * Only constructed server-side; never import this from client components.
 */
import { readToken } from "./env";
export const previewClient = createClient({
  ...clientConfig,
  useCdn: false,
  perspective: "previewDrafts",
  token: readToken || undefined,
});

/**
 * URL builder for Sanity images. Usage: urlFor(source).width(800).focal().url()
 *
 * `.focal()` applies the editor's hotspot/crop (if present) so images frame
 * correctly after an in-place swap in the Studio.
 */
const _builder = _makeBuilder(client as any);

export interface HotspotCrop {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
}

export interface SanityImageLike {
  asset?: { _ref?: string; url?: string; [k: string]: any } | { url: string } | null;
  hotspot?: HotspotCrop | null;
  crop?: HotspotCrop | null;
  alt?: string | null;
  [k: string]: any;
}

export function urlFor(source: SanityImageSource) {
  const b = _builder.image(source);
  // Attach a convenience .focal() that applies hotspot + crop from the
  // source object if present.
  (b as any).focal = function focal(this: any) {
    const src: any =
      typeof source === "object" && source !== null && !Array.isArray(source)
        ? source
        : null;
    if (src?.hotspot && typeof src.hotspot.x === "number") {
      const hx = Math.min(1, Math.max(0, src.hotspot.x));
      const hy = Math.min(1, Math.max(0, src.hotspot.y));
      // image-url-builder uses {x,y} as fractions from top-left.
      this.focalPoint(hx, hy);
      if (src.crop) {
        // Crop rect fractions: left/top/right/bottom
        const c = src.crop;
        const left = typeof c.left === "number" ? c.left : 0;
        const top = typeof c.top === "number" ? c.top : 0;
        const right = typeof c.right === "number" ? c.right : 0;
        const bottom = typeof c.bottom === "number" ? c.bottom : 0;
        const rectW = Math.max(0.01, 1 - left - right);
        const rectH = Math.max(0.01, 1 - top - bottom);
        // @sanity/image-url exposes .rect(x,y,w,h) in normalized fractions
        if (this.rect) this.rect(left, top, rectW, rectH);
      }
    }
    return this;
  };
  return b as ReturnType<typeof _builder.image> & { focal(): any };
}

/**
 * Normalize a Sanity image field into a signed URL string, applying hotspot/crop
 * if present and sizing to a requested width. Falls back to asset.url when
 * the ref isn't yet resolved.
 */
export function imageUrl(
  source: SanityImageLike | string | null | undefined,
  opts: { width?: number; height?: number; fit?: "crop" | "fill" | "max" } = {},
): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  const { width = 1600, height, fit = "crop" } = opts;
  if (source.asset && "_ref" in (source.asset as any) && (source.asset as any)._ref) {
    let b = urlFor(source).width(width).fit(fit) as any;
    if (height) b = b.height(height);
    if (typeof (b as any).focal === "function") b = b.focal();
    try {
      return b.auto("format").url();
    } catch {
      return (source.asset as any).url ?? null;
    }
  }
  if ((source.asset as any)?.url && typeof (source.asset as any).url === "string") {
    return (source.asset as any).url;
  }
  return null;
}

export function isSanityEnabled(): boolean {
  return sanityEnabled;
}
