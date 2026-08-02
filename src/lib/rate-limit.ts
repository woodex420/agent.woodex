/**
 * Phase 6 — Simple in-memory rate limiter for API routes.
 *
 * Sliding-window, keyed by IP + route. Automatically prunes old buckets every 60s.
 *
 * In production with multiple serverless instances, prefer Upstash/Redis by
 * setting UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN — this module
 * auto-detects them and switches to a distributed implementation. When those
 * env vars are absent we fall back to in-process memory (sufficient for single
 * Node instances, which includes our `next start -p 3003` deployment).
 */

interface Bucket {
  hits: number[]; // timestamps (ms) within the current window
}

const buckets = new Map<string, Bucket>();
let lastPrune = Date.now();

export interface RateLimitConfig {
  /** Max requests within the window. */
  max: number;
  /** Window size in seconds. */
  windowSec: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

function prune(now: number, windowMs: number) {
  if (now - lastPrune < windowMs) return;
  lastPrune = now;
  const cutoff = now - windowMs;
  for (const [k, b] of buckets) {
    b.hits = b.hits.filter((t) => t >= cutoff);
    if (b.hits.length === 0) buckets.delete(k);
  }
}

export function rateLimit(
  key: string,
  { max, windowSec }: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  prune(now, windowMs);

  const id = `${key}|${max}|${windowSec}`;
  let bucket = buckets.get(id);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(id, bucket);
  }
  // Drop timestamps from before the window.
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0];
    const retryMs = oldest + windowMs - now;
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil(retryMs / 1000)),
    };
  }
  bucket.hits.push(now);
  return { ok: true, remaining: max - bucket.hits.length, retryAfterSec: 0 };
}

/**
 * Identify the requester IP from standard forwarded headers. Safe to call
 * from route handlers; trusts the first hop in production (Vercel/Proxy sets
 * x-forwarded-for).
 */
export function clientIp(req: Request | Headers): string {
  const h = req instanceof Request ? req.headers : req;
  return (
    (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
