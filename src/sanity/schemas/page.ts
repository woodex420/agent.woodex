/**
 * Document: Page
 * Builder-managed page composed of a polymorphic `sections[]` array.
 *
 * The array of allowed section types is defined in code (SectionRegistry), not here —
 * we re-export a list of types so circular imports don't break Sanity schema loading.
 */
import { defineType, defineField } from "sanity";
import { seoFields } from "./objects/seo";

/**
 * All section _type values that a page can include.
 * Keep this list in sync with src/components/builder/SectionRegistry.tsx.
 */
export const PAGE_SECTION_TYPES = [
  "section.hero",
  "section.ctaFinal",
  "section.faq",
  "section.marquee",
  "section.proofStack",
  "section.aboutBrief",
  "section.textBlock",
  "section.datastrip",
  "section.prose",
  "section.contactForm",
  "section.divider",
  "section.image",
  "section.servicesGrid",
  "section.projectsRail",
  "section.processRail",
  "section.blogCta",
  "section.map",
  "section.freeform",
];

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        "Use 'home' for the root page. Other pages use their path (e.g. 'about', 'services/new-service').",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      description:
        "Drag sections here to build the page. Click a section to edit its fields.",
      of: PAGE_SECTION_TYPES.map((type) => ({ type })),
    }),
    defineField({
      name: "seo",
      title: "SEO & sharing",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: seoFields,
    }),
    defineField({
      name: "isNavRoot",
      title: "Show in main navigation",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "navOrder",
      title: "Navigation order (lower = left)",
      type: "number",
      initialValue: 0,
      hidden: ({ parent }) => !parent?.isNavRoot,
    }),
    defineField({
      name: "navLabel",
      title: "Navigation label (optional — defaults to title)",
      type: "string",
      hidden: ({ parent }) => !parent?.isNavRoot,
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }: any) {
      return { title: title ?? "Untitled page", subtitle: slug ? `/${slug}` : "no slug" };
    },
  },
});
