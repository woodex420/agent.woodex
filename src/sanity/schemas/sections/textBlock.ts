/**
 * Section: Rich text block — multi-paragraph PortableText with optional image and eyebrow.
 * The generic "long copy" section editors can drop anywhere.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.textBlock",
  title: "Text block (long copy)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", title: "Kicker" }),
    defineField({ name: "heading", type: "string", title: "Heading" }),
    defineField({ name: "headingItalic", type: "string", title: "Italic accent" }),
    defineField({ name: "width", type: "string", title: "Width", options: { list: ["narrow", "medium", "wide"] }, initialValue: "medium" }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Optional image (right or above)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required().min(4).warning("Add descriptive alt text."),
        }),
      ],
    }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      type: "string",
      options: { list: ["right", "left", "above", "below"] },
      initialValue: "right",
      hidden: ({ parent }: any) => !parent?.image,
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }: any) {
      return { title: "Text Block", subtitle: title ?? "—" };
    },
  },
});
