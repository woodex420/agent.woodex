/**
 * Section: Blog CTA — inline newsletter / consult card.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.blogCta",
  title: "Blog / newsletter CTA",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "Free guide" }),
    defineField({
      name: "heading",
      type: "string",
      initialValue: "Want the 2025 cost guide as a PDF?",
    }),
    defineField({
      name: "sub",
      type: "text",
      rows: 2,
      initialValue:
        "Get the per-sqft cost bands for residential, commercial, retail, and turnkey — plus a 12-point checklist for hiring a contractor in Lahore.",
    }),
    defineField({ name: "ctaLabel", type: "string", initialValue: "Send me the guide" }),
    defineField({
      name: "theme",
      type: "string",
      options: { list: ["oak", "graphite", "paper"] },
      initialValue: "oak",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Blog CTA", subtitle: "Lead magnet / newsletter" };
    },
  },
});
