/**
 * Builder preview — internal route for smoke-testing the PageBuilder +
 * typed section adapters without needing to provision Sanity. Renders a
 * page document with all 7 high-traffic typed sections.
 *
 * Not linked from public nav; remove or gate behind an env flag before launch.
 */
import PageBuilder from "@/components/builder/PageBuilder";
import { SLA } from "@/lib/config";

const demoSections = [
  {
    _key: "hero1",
    _type: "section.hero",
    eyebrow: "Live Builder · Phase 2",
    heading: "This page is rendered",
    headingItalic: "by the Page Builder.",
    sub: "Every block below is dropped in via a sections[] array. When Sanity is connected and draft mode is enabled, clicking text in the Presentation iframe opens the field in Studio.",
    ctaLabel: "Book a walkthrough",
    ctaHref: "/consultation",
    secondaryLabel: "See how it works →",
    secondaryHref: "/services",
    layout: "text-only",
  },
  {
    _key: "mq1",
    _type: "section.marquee",
    eyebrow: "Trusted by 120+ clients across Pakistan",
    speed: 50,
  },
  {
    _key: "cs1",
    _type: "section.proofStack",
  },
  {
    _key: "ds1",
    _type: "section.datastrip",
    eyebrow: "By the numbers",
    theme: "paper",
  },
  {
    _key: "tb1",
    _type: "section.textBlock",
    eyebrow: "How Phase 2 works",
    heading: "Click any text in this page",
    headingItalic: "when in Presentation Tool.",
    body: [
      {
        _type: "block",
        _key: "p1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text:
              "The VisualEditing component listens for postMessage from Sanity Studio, and every data-sanity attribute tells the overlay which document + field to jump to when clicked. Because the overlays only mount in draft mode, anonymous visitors see zero extra JS — this page is just as fast as a static route.",
          },
        ],
        markDefs: [],
      },
    ],
    width: "medium",
  },
  {
    _key: "faq1",
    _type: "section.faq",
  },
  {
    _key: "cta1",
    _type: "section.ctaFinal",
    eyebrow: "Start building",
    heading: "Ready to wire this",
    headingLine2: "to your own content?",
    body: `The catch-all /[slug] route lands in Phase 3. Once provisioned with a Sanity project ID, editors will be able to publish pages like this one in minutes.`,
    ctaLabel: `Get a budget range in ${SLA.budgetRangeHours} hours`,
    ctaHref: "/consultation",
  },
];

export const metadata = {
  title: "Builder preview",
  robots: { index: false, follow: false },
};

export default function BuilderPreviewPage() {
  return (
    <main className="pt-[var(--nav-h)]">
      <PageBuilder
        sections={demoSections}
        documentId="drafts.builderPreview-DO-NOT-USE"
        documentType="page"
      />
    </main>
  );
}
