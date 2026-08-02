/**
 * Section: Services Grid (bento).
 *
 * Phase 5: data-bound. Cards can come from:
 *  - "all"      — every published service, ordered by title
 *  - "category" — services tagged with a chosen category
 *  - "manual"   — hand-picked service references OR inline ad-hoc cards
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.servicesGrid",
  title: "Services grid (bento)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "What we do" }),
    defineField({ name: "heading", type: "string", initialValue: "Six specializations." }),
    defineField({
      name: "headingItalic",
      type: "string",
      initialValue: "One delivery system.",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 2,
      initialValue:
        "Not a jack-of-all-trades — six deep practices that share one 3D-first, Friday-report, fixed-date delivery engine.",
    }),
    defineField({
      name: "source",
      type: "string",
      title: "Cards source",
      options: {
        list: [
          { value: "all", title: "All published services" },
          { value: "category", title: "By category (commercial / residential)" },
          { value: "manual", title: "Manual pick (specific services)" },
          { value: "custom", title: "Inline custom cards (no service doc)" },
        ],
      },
      initialValue: "all",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category filter",
      options: {
        list: [
          { value: "commercial", title: "Commercial" },
          { value: "residential", title: "Residential" },
        ],
      },
      hidden: ({ parent }: any) => parent?.source !== "category",
    }),
    defineField({
      name: "picks",
      type: "array",
      title: "Hand-picked services",
      hidden: ({ parent }: any) => parent?.source !== "manual",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "cards",
      type: "array",
      title: "Inline custom cards",
      description: "Used when source = Inline custom cards, or as extras alongside manual picks.",
      hidden: ({ parent }: any) => parent?.source !== "custom",
      of: [
        {
          type: "object",
          name: "customCard",
          fields: [
            { name: "title", type: "string", validation: (r) => r.required() },
            { name: "tagline", type: "string" },
            { name: "href", type: "string" },
            { name: "image", type: "image", options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }] },
            {
              name: "size",
              type: "string",
              options: { list: ["wide", "tall", "square"] },
              initialValue: "square",
            },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  preview: {
    select: { source: "source" },
    prepare({ source }: any) {
      return { title: "Services Grid", subtitle: `Source: ${source ?? "all"}` };
    },
  },
});
