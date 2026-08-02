/**
 * Section: Hero / Intro — a flexible text+image hero with eyebrow / heading / sub / CTA.
 * Used on non-home pages where CinematicHero carousel is overkill (Contact, About, 3D Studio, etc.).
 * Accepts an optional image for side-by-side layouts; otherwise text-only.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.hero",
  title: "Hero (text / text+image)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading (main)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headingItalic",
      title: "Italic accent (inline after heading)",
      type: "string",
    }),
    defineField({
      name: "sub",
      title: "Subheading / body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaLabel",
      title: "Primary CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Primary CTA link",
      type: "string",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary label (text link)",
      type: "string",
    }),
    defineField({
      name: "secondaryHref",
      title: "Secondary link",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Optional side image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text (describe the image for screen readers & SEO)",
          type: "string",
          validation: (r) => r.required().min(4).warning("Add descriptive alt text."),
        }),
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["text-only", "two-column", "centered"] },
      initialValue: "text-only",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }: any) {
      return { title: "Hero", subtitle: title };
    },
  },
});
