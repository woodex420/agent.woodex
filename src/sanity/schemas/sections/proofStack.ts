/**
 * Section: Proof Stack — metrics grid + testimonials on dark bg.
 *
 * Phase 5: supports data-source selection — editor can either hand-craft
 * metrics/testimonials or pull from the live "recent projects / posts" pool
 * (rendered as stats by the adapter).
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.proofStack",
  title: "Proof stack (metrics + testimonials)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker",
      type: "string",
      initialValue: "Proof, not adjectives",
    }),
    defineField({
      name: "heading",
      title: "Heading (line 1)",
      type: "string",
      initialValue: "Don't read our",
    }),
    defineField({
      name: "headingLine2",
      title: "Heading (line 2, italic)",
      type: "string",
      initialValue: "marketing copy.",
    }),
    defineField({
      name: "headingLine3",
      title: "Heading (line 3)",
      type: "string",
      initialValue: "Read our clients.",
    }),
    defineField({
      name: "intro",
      title: "Intro copy",
      type: "text",
      rows: 3,
      initialValue:
        "We're not the cheapest studio in Lahore. We're the one that hands over on the date in the contract, matches the render you approved, and texts you back.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "See the full portfolio →",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
      initialValue: "/portfolio",
    }),
    defineField({
      name: "source",
      type: "string",
      title: "Source",
      description:
        "Manual: edit metrics + testimonials below. Automatic: use site-wide defaults (projects delivered, on-time rate, etc.).",
      options: { list: ["manual", "automatic"] },
      initialValue: "manual",
    }),
    defineField({
      name: "metrics",
      title: "Metrics (4 cards)",
      type: "array",
      hidden: ({ parent }: any) => parent?.source === "automatic",
      validation: (r) => r.max(4).min(3),
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value (e.g. 240+)" },
            { name: "label", type: "string", title: "Label" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { value: "240+", label: "Projects delivered since 2014" },
        { value: "98%", label: "Handover on contract date" },
        { value: "4.9/5", label: "Average client rating" },
        { value: "72%", label: "Revenue from repeat/referral" },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      hidden: ({ parent }: any) => parent?.source === "automatic",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", type: "text", rows: 3, validation: (r) => r.required() },
            { name: "name", type: "string", validation: (r) => r.required() },
            { name: "role", type: "string" },
            { name: "project", type: "string" },
          ],
          preview: { select: { title: "name", subtitle: "project" } },
        },
      ],
      initialValue: [
        { quote: "They handed over on a Tuesday. We moved 180 staff in on the Wednesday. Everything worked. I've never seen that before.", name: "Ayesha Malik", role: "COO, Systems Ltd", project: "22,000 sqft IT floor" },
        { quote: "The Friday Report is the reason we hired them. Three months in, my board knew exactly what was happening every week — including the bad weeks.", name: "Omar Sheikh", role: "Director, Nishat Hospitality", project: "HQ fit-out" },
        { quote: "I built three homes before. Woodex was the first one that actually looked like the pictures. Not close. Like the pictures.", name: "Fatima Riaz", role: "Homeowner", project: "DHA Phase 5 residence" },
      ],
    }),
    defineField({
      name: "ratingText",
      title: "Google rating footer",
      type: "string",
      initialValue: "4.9 from 137 Google reviews · 150+ target end-Q4",
    }),
  ],
  preview: {
    select: { testimonials: "testimonials" },
    prepare({ testimonials }: any) {
      return { title: "Proof Stack", subtitle: `${testimonials?.length ?? 0} testimonials` };
    },
  },
});
