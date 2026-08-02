/**
 * Section: Contact form — embed the standard lead form with optional context.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.contactForm",
  title: "Contact form",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Tell us about your space",
    }),
    defineField({
      name: "sub",
      title: "Subheading",
      type: "text",
      rows: 2,
      initialValue:
        "We reply to every form within 12 hours. If your project is urgent, WhatsApp is faster.",
    }),
    defineField({
      name: "source",
      title: "Lead source tag",
      type: "string",
      options: {
        list: [
          { title: "General (contact page)", value: "contact-form" },
          { title: "Service page", value: "service-page" },
          { title: "Blog CTA", value: "blog-cta" },
          { title: "Landing page", value: "landing" },
        ],
      },
      initialValue: "contact-form",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Form", subtitle: "Lead capture" };
    },
  },
});
