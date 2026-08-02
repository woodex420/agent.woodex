/**
 * Section: Divider — simple horizontal rule, optionally with label or logo.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.divider",
  title: "Divider / spacer",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: { list: ["line", "space", "eyebrow"] },
      initialValue: "line",
    }),
    defineField({
      name: "label",
      title: "Label (if eyebrow style)",
      type: "string",
    }),
    defineField({
      name: "size",
      title: "Vertical spacing",
      type: "string",
      options: { list: ["sm", "md", "lg"] },
      initialValue: "md",
    }),
  ],
  preview: {
    select: { s: "style", label: "label" },
    prepare({ s, label }: any) {
      return { title: "Divider", subtitle: label ?? s };
    },
  },
});
