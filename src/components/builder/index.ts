/**
 * Live Builder — public barrel.
 *
 * Phase 1: Section registry + PageBuilder server component.
 * Phase 2: EditableText wires inline fields to @sanity/visual-editing overlays.
 *          StudioBridge mounts the VisualEditing client bundle only when
 *          draftMode() is enabled (zero bytes on production pages).
 */
export { SECTION_REGISTRY, SECTION_MAP, getSectionDef } from "./SectionRegistry";
export { default as PageBuilder } from "./PageBuilder";
export { default as EditableText } from "./EditableText";
export type { SanityScope } from "./EditableText";
export { default as StudioBridge } from "./StudioBridge";
