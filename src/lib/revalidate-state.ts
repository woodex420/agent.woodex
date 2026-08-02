/**
 * Phase 6 — Collaboration soft-lock: per-tag monotonic revision counter.
 *
 * Next.js's `revalidateTag()` doesn't expose a hook, so we maintain an
 * in-process counter that /api/revalidate bumps manually every time it
 * revalidates tags. Preview clients poll /api/revalidate/state?tag=… to
 * detect when a published change lands while they're editing.
 */
const REV = new Map<string, number>();

export function bumpTag(tag: string) {
  const now = Date.now();
  const cur = REV.get(tag) ?? 0;
  REV.set(tag, Math.max(cur + 1, now));
  REV.set("*", Math.max((REV.get("*") ?? 0) + 1, now));
}

export function getTagRev(tag: string): number {
  return REV.get(tag) ?? REV.get("*") ?? 0;
}
