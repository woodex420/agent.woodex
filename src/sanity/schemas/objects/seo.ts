/**
 * Reusable SEO field group — used on page, post, project, service documents.
 */
import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "metaTitle",
    title: "Meta title",
    type: "string",
    validation: (r) => r.max(60).warning("Keep under 60 chars"),
  }),
  defineField({
    name: "metaDescription",
    title: "Meta description",
    type: "text",
    rows: 3,
    validation: (r) => r.max(160).warning("Keep under 160 chars"),
  }),
  defineField({
    name: "ogImage",
    title: "Social share image",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "noIndex",
    title: "Hide from search engines (noindex)",
    type: "boolean",
    initialValue: false,
  }),
];
