/**
 * createDataAttribute (server-side) — produces the string value for a
 * `data-sanity` attribute, which @sanity/visual-editing uses to wire hover
 * outlines and click-to-edit.
 *
 * Mirrors the API of `createDataAttribute` from `@sanity/visual-editing/create-data-attribute`
 * so we can produce identical strings in server components without dragging
 * client-side dependencies into the SSR bundle.
 *
 * Usage:
 *   const attr = createDataAttribute({ id: page._id, type: page._type });
 *   <section data-sanity={attr(["sections", i, "_type"])}>
 *     <h2 data-sanity={attr(["sections", i, "heading"])}>{section.heading}</h2>
 *   </section>
 */
export interface DataAttrProps {
  id: string;
  type: string;
  /** Optional base path (prepended to every path()). */
  basePath?: (string | number)[];
}

/**
 * Path segments can be strings or numbers (array indexes). Encoding per Sanity:
 * path is joined with "." and numeric indexes are wrapped in [n].
 */
function encodePath(segments: (string | number)[]): string {
  return segments
    .map((s, i) => {
      if (typeof s === "number") return `[${s}]`;
      return i === 0 ? s : `.${s}`;
    })
    .join("");
}

export function createDataAttribute(
  { id, type, basePath = [] }: DataAttrProps,
): (path: (string | number)[]) => string {
  return (path) => {
    const full = [...basePath, ...path];
    return `id=${id};type=${type};path=${encodePath(full)}`;
  };
}
