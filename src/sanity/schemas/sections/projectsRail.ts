/**
 * Section: Projects rail / showcase — carousel of projects.
 *
 * Phase 5: data-bound. latest = most recent N, featured = tagged featured,
 * category = by category, manual = reference picks.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.projectsRail",
  title: "Projects carousel",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "Selected work" }),
    defineField({ name: "heading", type: "string", initialValue: "Twenty-eight thousand" }),
    defineField({ name: "headingItalic", type: "string", initialValue: "square feet of proof." }),
    defineField({ name: "ctaLabel", type: "string", initialValue: "Full portfolio →" }),
    defineField({ name: "ctaHref", type: "string", initialValue: "/portfolio" }),
    defineField({
      name: "source",
      type: "string",
      title: "Projects source",
      options: {
        list: [
          { value: "latest", title: "Automatic: latest N projects" },
          { value: "featured", title: "Automatic: featured projects" },
          { value: "category", title: "Automatic: by category" },
          { value: "manual", title: "Manual pick (choose specific projects)" },
        ],
      },
      initialValue: "latest",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { value: "Commercial", title: "Commercial" },
          { value: "Residential", title: "Residential" },
          { value: "Hospitality", title: "Hospitality" },
          { value: "Retail", title: "Retail" },
          { value: "Office", title: "Office" },
        ],
      },
      hidden: ({ parent }: any) => parent?.source !== "category",
    }),
    defineField({
      name: "count",
      type: "number",
      title: "Number of projects (automatic)",
      initialValue: 6,
      hidden: ({ parent }: any) => parent?.source === "manual",
    }),
    defineField({
      name: "picks",
      type: "array",
      title: "Manual picks",
      hidden: ({ parent }: any) => parent?.source !== "manual",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: {
    select: { source: "source" },
    prepare({ source }: any) {
      return { title: "Projects Rail", subtitle: `Source: ${source ?? "latest"}` };
    },
  },
});
