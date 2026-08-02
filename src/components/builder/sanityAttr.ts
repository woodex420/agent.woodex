"use client";

/**
 * Client-side helper: build a data-sanity attribute string from a SanityScope
 * and sub-path. Returns undefined when no scope (i.e. on non-builder pages).
 *
 * <div data-sanity={sanityAttr(scope, ["items", i])}>
 */
import type { SanityScope } from "./EditableText";

function encodePath(segments: (string | number)[]): string {
  return segments
    .map((s, i) => {
      if (typeof s === "number") return `[${s}]`;
      return i === 0 ? s : `.${s}`;
    })
    .join("");
}

export function sanityAttr(
  scope: SanityScope | null | undefined,
  path: (string | number)[],
): string | undefined {
  if (!scope?.id) return undefined;
  const full = [...(scope.basePath ?? []), ...path];
  return `id=${scope.id};type=${scope.type};path=${encodePath(full)}`;
}
