/**
 * Section: FAQ — accordion, two-column.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.faq",
  title: "FAQ (accordion)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker",
      type: "string",
      initialValue: "Straight answers",
    }),
    defineField({
      name: "heading",
      title: "Heading (line 1)",
      type: "string",
      initialValue: "The questions",
    }),
    defineField({
      name: "headingLine2",
      title: "Heading (line 2, italic)",
      type: "string",
      initialValue: "you're Googling.",
    }),
    defineField({
      name: "intro",
      title: "Intro copy (left column)",
      type: "text",
      rows: 3,
      initialValue:
        "Other studios hide pricing and timelines behind discovery calls. Here's what clients actually ask before they sign — and what we actually tell them.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Bottom CTA label",
      type: "string",
      initialValue: "Ask us anything →",
    }),
    defineField({
      name: "ctaHref",
      title: "Bottom CTA link",
      type: "string",
      initialValue: "/consultation",
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      validation: (r) => r.min(3),
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        { question: "How much does a full interior cost in Lahore?", answer: "Residential work typically lands PKR 3,500–6,500/sqft; commercial office PKR 2,800–5,200/sqft; turnkey PKR 4,500–8,000/sqft. We will send you a range within 48 hours of a 45-minute site visit." },
        { question: "How long does a build take?", answer: "A 5,000 sqft office typically takes 10–14 weeks. A 1-kanal home 14–20 weeks. We put the handover date in the contract and pay PKR 25,000 per week of delay." },
        { question: "Do you do design-only, or do you build too?", answer: "Both. Our 3D studio does photoreal renders as a standalone service, but 90% of clients ask us to build what we designed because that is where the guarantee is strongest." },
        { question: "Do you match renders to the finished build?", answer: "Yes. We guarantee the finished space matches the approved 3D walkthrough — that is the core of our contract." },
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }: any) {
      return { title: "FAQ", subtitle: `${items?.length ?? 0} questions` };
    },
  },
});
