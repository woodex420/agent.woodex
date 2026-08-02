/**
 * Section: Process rail — "how we work" numbered horizontal steps.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.processRail",
  title: "Process rail (how we work)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "How it works" }),
    defineField({ name: "heading", type: "string", initialValue: "From first call to handover" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({
      name: "steps",
      type: "array",
      validation: (r) => r.min(4).max(6),
      of: [
        {
          type: "object",
          fields: [
            { name: "num", type: "string", title: "Number (01, 02…)" },
            { name: "title", type: "string", validation: (r) => r.required() },
            { name: "duration", type: "string", title: "Duration (e.g. Week 1)" },
            { name: "body", type: "text", rows: 2, validation: (r) => r.required() },
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        },
      ],
    }),
  ],
  preview: {
    select: { steps: "steps" },
    prepare({ steps }: any) {
      return { title: "Process Rail", subtitle: `${steps?.length ?? 0} steps` };
    },
  },
});
