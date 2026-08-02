import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["costs", "timelines", "materials", "case-studies", "process", "guides"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "deck", type: "text", rows: 2 }),
    defineField({ name: "readTime", type: "number", description: "Minutes" }),
    defineField({ name: "date", type: "date" }),
    defineField({
      name: "author",
      type: "object",
      fields: [
        { name: "initials", type: "string" },
        { name: "name", type: "string" },
        { name: "role", type: "string" },
      ],
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "capsule", type: "text", rows: 3, description: "40–60 word answer for AI overview / meta." }),
    defineField({ name: "portableBody", type: "blockContent" }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
  orderings: [{ title: "Date, new", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});
