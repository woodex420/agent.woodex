import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Commercial", "Residential", "Retail", "F&B", "Corporate", "Fit-Out"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "area", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "heroImg", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "brief", type: "text", rows: 3 }),
    defineField({ name: "hardPart", type: "text", rows: 4 }),
    defineField({ name: "build", type: "text", rows: 3 }),
    defineField({
      name: "quote",
      type: "object",
      fields: [
        { name: "text", type: "text", rows: 3 },
        { name: "name", type: "string" },
        { name: "role", type: "string" },
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string" },
        { name: "value", type: "string" },
      ]}],
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "beforeAfter",
      type: "object",
      fields: [
        { name: "before", type: "image", options: { hotspot: true } },
        { name: "after", type: "image", options: { hotspot: true } },
        { name: "caption", type: "string" },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
