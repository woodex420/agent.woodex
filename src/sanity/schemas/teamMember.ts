import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "initials", type: "string", description: "2-letter monogram fallback" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
