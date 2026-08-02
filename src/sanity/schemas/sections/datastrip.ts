/**
 * Section: Data strip — big numbers in a row (e.g. "11 yrs · 240+ projects · 98% on time").
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.datastrip",
  title: "Data strip (big numbers)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", title: "Kicker" }),
    defineField({
      name: "items",
      title: "Numbers (3-6)",
      type: "array",
      validation: (r) => r.min(3).max(6),
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value (e.g. 240+)", validation: (r) => r.required() },
            { name: "label", type: "string", title: "Label", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "theme",
      title: "Background",
      type: "string",
      options: { list: ["paper", "graphite", "oak"] },
      initialValue: "paper",
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }: any) {
      return { title: "Data Strip", subtitle: `${items?.length ?? 0} numbers` };
    },
  },
});
