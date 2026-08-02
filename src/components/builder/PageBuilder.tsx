/**
 * PageBuilder — renders a polymorphic sections[] array from a Sanity `page` document.
 *
 * Phase 2: emits `data-sanity` attributes on section wrappers AND on inner text
 * fields (via EditableText in adapter components) so @sanity/visual-editing can
 * draw click-to-edit outlines when draft mode is on.
 *
 * The document scope is passed down as a plain serializable object (no functions
 * cross the server→client boundary). Inner EditableText components compute the
 * data-sanity string client-side.
 */
import { SECTION_MAP } from "./SectionRegistry";
import { draftMode } from "next/headers";
import PlaceholderSection from "./sections/PlaceholderSection";
import { createDataAttribute } from "@/lib/sanity/attrs";
import type { SanityScope } from "./EditableText";

export default async function PageBuilder({
  sections,
  documentId,
  documentType = "page",
}: {
  sections?: any[] | null;
  documentId?: string;
  documentType?: string;
}) {
  const { isEnabled: draft } = await draftMode();
  if (!sections || !sections.length) return null;

  const hasScope = !!documentId;
  const rootAttr = hasScope
    ? createDataAttribute({ id: documentId!, type: documentType })
    : null;

  return (
    <>
      {sections.map((section, i) => {
        if (!section || !section._type) return null;
        const Comp = SECTION_MAP[section._type];

        // Plain serializable scope for inner EditableText components.
        const sanityScope: SanityScope | null = hasScope
          ? { id: documentId!, type: documentType, basePath: ["sections", i] }
          : null;

        if (!Comp) {
          return draft ? (
            <PlaceholderSection
              key={section._key ?? i}
              _type={section._type}
              _key={section._key}
            />
          ) : null;
        }

        // Section-level wrapper attr (points at the section entry itself so
        // clicking empty space around a section highlights that section in Studio).
        const wrapperAttr = rootAttr
          ? { "data-sanity": rootAttr(["sections", i, "_type"]) }
          : undefined;

        return (
          <div key={section._key ?? i} {...wrapperAttr}>
            <Comp {...section} sanityScope={sanityScope} />
          </div>
        );
      })}
    </>
  );
}
