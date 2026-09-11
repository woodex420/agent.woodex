/**
 * Section: CTA Final — bottom-of-page conversion block
 * (oak background, heading, sub, CTA buttons, stat strip)
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.ctaFinal",
  title: "CTA Final (conversion)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker / eyebrow",
      type: "string",
      initialValue: "The ask",
    }),
    defineField({
      name: "heading",
      title: "Heading (line 1)",
      type: "string",
      validation: (r) => r.required(),
      initialValue: "Stop guessing what your",
    }),
    defineField({
      name: "headingLine2",
      title: "Heading (line 2, italic accent)",
      type: "string",
      initialValue: "space will look like.",
    }),
    defineField({
      name: "body",
      title: "Body copy",
      type: "text",
      rows: 3,
      initialValue:
        "Book a free 45-minute site visit. We'll walk the space, ask about how you work or live, and send you a budget range within 48 hours. No pitch deck. No follow-up spam.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Primary CTA label",
      type: "string",
      initialValue: "Get my budget range in 48 hours",
    }),
    defineField({
      name: "ctaHref",
      title: "Primary CTA link",
      type: "string",
      initialValue: "/consultation",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary label",
      type: "string",
      initialValue: "Or call +92 322 4000768",
    }),
    defineField({
      name: "secondaryHref",
      title: "Secondary link (tel: / wa.me / ...)",
      type: "string",
      initialValue: "tel:+923224000768",
    }),
    defineField({
      name: "stats",
      title: "Stat strip (4 items)",
      type: "array",
      validation: (r) => r.max(4),
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value (e.g. 45 min)" },
            { name: "label", type: "string", title: "Label (e.g. Site visit)" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { value: "45 min", label: "Site visit" },
        { value: "48 hrs", label: "Budget range" },
        { value: "Free", label: "No obligation" },
        { value: "11 yrs", label: "Track record" },
      ],
    }),
    defineField({
      name: "theme",
      title: "Color theme",
      type: "string",
      options: { list: ["oak", "graphite", "paper"] },
      initialValue: "oak",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: "CTA Final", subtitle: title ?? "Conversion block" };
    },
  },
});
