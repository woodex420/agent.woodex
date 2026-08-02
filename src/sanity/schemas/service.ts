import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "italicLine", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroSub", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "heroImg", type: "image", options: { hotspot: true } }),
    defineField({
      name: "situation",
      type: "object",
      fields: [
        { name: "heading", type: "string", validation: (r) => r.required() },
        { name: "body", type: "array", of: [{ type: "text", rows: 3 }] },
      ],
    }),
    defineField({
      name: "scope",
      type: "object",
      fields: [
        { name: "included", type: "array", of: [{ type: "string" }] },
        { name: "optional", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "timeline",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "week", type: "string" },
          { name: "label", type: "string" },
          { name: "desc", type: "text", rows: 2 },
        ],
      }],
    }),
    defineField({
      name: "costBand",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "range", type: "string" },
        { name: "notes", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "proof",
      type: "object",
      fields: [
        {
          name: "kind",
          type: "string",
          options: { list: ["stats", "caseStudy", "guarantee"] },
          validation: (r) => r.required(),
        },
        { name: "heading", type: "string" },
        { name: "body", type: "text", rows: 3 },
        {
          name: "stats",
          type: "array",
          of: [{ type: "object", fields: [
            { name: "n", type: "string" },
            { name: "l", type: "string" },
          ]}],
        },
        {
          name: "caseStudy",
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "tag", type: "string" },
            { name: "img", type: "image", options: { hotspot: true } },
            { name: "body", type: "text", rows: 3 },
            { name: "metric", type: "string" },
          ],
        },
        { name: "guarantee", type: "string" },
      ],
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "q", type: "string" },
        { name: "a", type: "text", rows: 3 },
      ]}],
    }),
    defineField({
      name: "relatedProjects",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "slug", type: "string" },
        { name: "title", type: "string" },
        { name: "tag", type: "string" },
        { name: "img", type: "image", options: { hotspot: true } },
      ]}],
    }),
    defineField({
      name: "team",
      type: "object",
      fields: [
        { name: "name", type: "string" },
        { name: "role", type: "string" },
        { name: "note", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      fields: [
        { name: "line", type: "string" },
        { name: "button", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
    defineField({
      name: "answerCapsule",
      type: "object",
      fields: [
        { name: "question", type: "string" },
        { name: "shortAnswer", type: "text", rows: 2 },
        {
          name: "facts",
          type: "array",
          of: [{ type: "object", fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ]}],
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});
