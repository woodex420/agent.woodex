/**
 * Section: Prose / Article body — standalone blockContent with a narrow readable measure.
 * Used for long-form content on builder-managed pages.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.prose",
  title: "Prose (article body)",
  type: "object",
  fields: [
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Prose", subtitle: "Long-form article body" };
    },
  },
});
