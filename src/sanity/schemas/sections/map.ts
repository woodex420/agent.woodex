/**
 * Section: Studio map — embedded studio location block.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.map",
  title: "Studio map / location",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "Visit the studio" }),
    defineField({
      name: "heading",
      type: "string",
      initialValue: "Plot 42, Sundar Industrial Road, Lahore",
    }),
    defineField({
      name: "sub",
      type: "string",
      initialValue: "By appointment only — please WhatsApp ahead so we can have samples ready.",
    }),
    defineField({ name: "hours", type: "string", initialValue: "Mon–Sat, 10am–7pm" }),
    defineField({ name: "embedUrl", type: "url", title: "Google Maps embed URL (optional)" }),
  ],
  preview: {
    prepare() {
      return { title: "Map", subtitle: "Studio location" };
    },
  },
});
