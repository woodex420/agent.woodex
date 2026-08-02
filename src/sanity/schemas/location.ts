import { defineType, defineField } from "sanity";

export default defineType({
  name: "location",
  title: "Location page",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "city" }, validation: (r) => r.required() }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "heroHeading", type: "string" }),
    defineField({ name: "heroSub", type: "text", rows: 3 }),
    defineField({ name: "heroImg", type: "image", options: { hotspot: true } }),
    defineField({ name: "areasServed", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string" },
        { name: "value", type: "string" },
      ]}],
    }),
    defineField({ name: "body", type: "array", of: [{ type: "text", rows: 3 }] }),
  ],
});
