/**
 * Section: About Brief — parallax image + copy + counter stats.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.aboutBrief",
  title: "About brief (image + copy + counters)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker",
      type: "string",
      initialValue: "The problem with interiors",
    }),
    defineField({
      name: "heading",
      title: "Heading (main line)",
      type: "string",
      initialValue: "You don't fear",
    }),
    defineField({
      name: "headingItalic",
      title: "Italic accent (inline)",
      type: "string",
      initialValue: "bad taste.",
    }),
    defineField({
      name: "headingLine2",
      title: "Heading (line 2)",
      type: "string",
      initialValue: "You fear",
    }),
    defineField({
      name: "headingLine2Italic",
      title: "Italic accent (line 2)",
      type: "string",
      initialValue: "the bill. The date. The surprise.",
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      initialValue: [
        "Most studios sell adjectives. Custom. Premium. Innovative. They show you a render, take a deposit, then start negotiating. The finish changes. The date moves. The bill grows.",
        "We sell certainty. You approve a photoreal 3D walkthrough. We lock the scope, the price, and the handover date — in writing. Then we build exactly that.",
      ],
    }),
    defineField({
      name: "image",
      title: "Parallax image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageEyebrowLeft",
      title: "Image annotation (top-left)",
      type: "string",
      initialValue: "Est. 2014",
    }),
    defineField({
      name: "imageEyebrowRight",
      title: "Image annotation (top-right)",
      type: "string",
      initialValue: "Lahore, PK",
    }),
    defineField({
      name: "imageCaption",
      title: "Image caption (bottom, italic)",
      type: "string",
      initialValue: "Craft before brand.",
    }),
    defineField({
      name: "floatingStatValue",
      title: "Floating card — value",
      type: "string",
      initialValue: "11",
    }),
    defineField({
      name: "floatingStatSuffix",
      title: "Floating card — suffix",
      type: "string",
      initialValue: "yrs",
    }),
    defineField({
      name: "floatingStatText",
      title: "Floating card — body",
      type: "string",
      initialValue: "Designing and building spaces that actually get built — as drawn.",
    }),
    defineField({
      name: "stats",
      title: "Bottom stats (3)",
      type: "array",
      validation: (r) => r.max(3).min(3),
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "number", title: "Numeric value" },
            { name: "suffix", type: "string", title: "Suffix (+, %, etc)" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
      initialValue: [
        { value: 240, suffix: "+", label: "Projects delivered" },
        { value: 98, suffix: "%", label: "On-time handover" },
        { value: 0, suffix: "", label: "Scope disputes, 2023-25" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Brief", subtitle: "Image + copy + counters" };
    },
  },
});
