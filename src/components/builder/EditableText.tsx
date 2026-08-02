"use client";

/**
 * EditableText — wraps a piece of text with a `data-sanity` attribute so
 * @sanity/visual-editing can draw click-to-edit outlines.
 *
 * Client component because the `data-sanity` value can be computed from the
 * simple serializable `sanityScope` prop (no function passing over the
 * server→client boundary).
 */
import { useMemo } from "react";

export interface SanityScope {
  id: string;
  type: string;
  /** Path prefix to prepend to every field path (typically ["sections", i]). */
  basePath?: (string | number)[];
}

function encodePath(segments: (string | number)[]): string {
  return segments
    .map((s, i) => {
      if (typeof s === "number") return `[${s}]`;
      return i === 0 ? s : `.${s}`;
    })
    .join("");
}

function buildAttr(
  scope: SanityScope,
  path: (string | number)[],
): string {
  const full = [...(scope.basePath ?? []), ...path];
  return `id=${scope.id};type=${scope.type};path=${encodePath(full)}`;
}

export default function EditableText<T extends keyof React.JSX.IntrinsicElements = "span">({
  as,
  path,
  sanityScope,
  children,
  className,
}: {
  as?: T;
  path: (string | number)[];
  sanityScope?: SanityScope | null;
  children?: React.ReactNode;
  className?: string;
}) {
  const Tag: any = as ?? "span";
  const attr = useMemo(
    () => (sanityScope?.id ? buildAttr(sanityScope, path) : undefined),
    [sanityScope, path],
  );
  return (
    <Tag className={className} data-sanity={attr}>
      {children}
    </Tag>
  );
}
