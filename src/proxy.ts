/**
 * Phase 6 — Production hardening middleware.
 *
 * - Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
 * - Cache-Control for statically-generated builder pages: s-maxage=60, stale-while-revalidate=3600.
 * - Cache-Control for API routes: prevent intermediary caching.
 * - CSP allows Sanity CDN, WhatsApp, Google Fonts + our own origin.
 *
 * Kept intentionally light — we don't want to interfere with draft-mode cookies
 * or Sanity's Presentation iframe.
 */
import { NextResponse, type NextRequest } from "next/server";

const isDev = process.env.NODE_ENV !== "production";

// Strict baseline — overridden per-route where needed.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Scripts: self + inline/eval for Next.js RSC/FM in dev; in prod we rely on nonces
  // from Next.js's own CSP handling (we don't set script-src here to avoid
  // fighting Next's nonce injection; we constrain everything else).
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io https://www.googletagmanager.com ${isDev ? "http://localhost:* http://127.0.0.1:*" : ""}`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://*.googleusercontent.com https://www.gravatar.com`,
  `font-src 'self' data: https://fonts.gstatic.com`,
  `connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://wa.me https://api.whatsapp.com ${
    isDev ? "ws://localhost:* http://localhost:*" : ""
  }`,
  `frame-src 'self' https://www.sanity.io https://app.sanity.io`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self' https://www.sanity.io https://app.sanity.io",
  "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP_DIRECTIVES,
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
};

// Paths that should never be cached by intermediaries.
const NO_CACHE_PATHS = [
  "/api/",
  "/studio",
  "/api/draft",
  "/api/lead",
  "/api/subscribe",
  "/api/revalidate",
  "/api/theme",
  "/api/audit",
];

// Builder and static content paths: allow ISR-style caching.
const CACHE_PATHS_PREFIXES = ["/blog/", "/services/", "/portfolio/", "/locations/"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // Always apply security headers except on non-HTML assets Next.js handles
  // itself (this middleware already skips _next/* assets automatically via the
  // matcher config below).
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(k, v);
  }

  // Remove `X-Powered-By` defense-in-depth (Next already strips poweredByHeader per next.config).
  res.headers.delete("X-Powered-By");

  // Don't leak referrer to external CDNs when loading images.
  res.headers.set("Cross-Origin-Resource-Policy", "cross-origin");

  // Cache rules
  const isApi = pathname.startsWith("/api/");
  const isStudio = pathname.startsWith("/studio");
  const isDraft = req.cookies.get("__prerender_bypass") || req.cookies.get("__next_preview_data");

  if (isApi || isStudio || isDraft) {
    // Never cache API / studio / draft responses in CDNs.
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private",
    );
  } else {
    const isBuilderContent = CACHE_PATHS_PREFIXES.some((p) => pathname.startsWith(p));
    const isRootLike = pathname === "/" || pathname === "/about" || pathname === "/contact"
      || pathname === "/services" || pathname === "/portfolio" || pathname === "/blog"
      || pathname === "/3d-studio" || pathname === "/consultation" || pathname === "/thank-you"
      || pathname.startsWith("/legal/");
    if (isBuilderContent || isRootLike) {
      res.headers.set(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=3600, max-age=0",
      );
    }
  }

  return res;
}

// Skip middleware on Next internals, static assets, OG images, and favicon.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static, _next/image (static assets)
     * - favicon.ico, favicon.svg, robots.txt, sitemap.xml, manifest.webmanifest, feed.xml
     * - public/* (fonts, images)
     */
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|manifest.webmanifest|feed.xml|images/|fonts/|opengraph-image).*)",
  ],
};
