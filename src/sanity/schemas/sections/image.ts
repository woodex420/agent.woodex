/**
 * Section: Image — full-bleed or contained image with optional caption.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.image",
  title: "Image (single)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["contained", "full-bleed", "wide"] },
      initialValue: "contained",
    }),
    defineField({
      name: "aspect",
      title: "Aspect ratio",
      type: "string",
      options: { list: ["16/9", "4/3", "3/4", "1/1", "original"] },
      initialValue: "16/9",
    }),
  ],
  preview: {
    select: { alt: "alt" },
    prepare({ alt }: any) {
      return { title: "Image", subtitle: alt };
    },
  },
});
