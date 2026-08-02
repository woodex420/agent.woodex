/**
 * Section: Freeform — renders arbitrary Portable Text + images + callouts.
 * Used as a catch-all for sections we haven't registered as typed components.
 * In Phase 2 this gets basic visual-editing overlays so editors can edit it in the canvas.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.freeform",
  title: "Freeform (rich content)",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", title: "Internal label (for editor)" }),
    defineField({
      name: "content",
      type: "blockContent",
      title: "Content",
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }: any) {
      return { title: "Freeform", subtitle: title ?? "Custom rich content" };
    },
  },
});
