import { defineType, defineField } from "sanity";

export default defineType({
  name: "fitoutService",
  title: "Fit-out sub-service",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "italicLine", type: "string" }),
    defineField({ name: "heroSub", type: "text", rows: 3 }),
    defineField({ name: "heroImg", type: "image", options: { hotspot: true } }),
    defineField({ name: "included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "timeline", type: "string" }),
    defineField({ name: "cost", type: "string" }),
    defineField({
      name: "cta",
      type: "object",
      fields: [
        { name: "line", type: "string" },
        { name: "button", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
  ],
});
