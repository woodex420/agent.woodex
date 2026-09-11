import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, SERVICE_LIST } from "@/lib/content/services";
import { getFitOut } from "@/lib/content/fitout";
import SectionDots from "@/components/service/SectionDots";
import ServiceHero from "@/components/service/ServiceHero";
import AnswerCapsule from "@/components/service/AnswerCapsule";
import SituationBlock from "@/components/service/SituationBlock";
import ScopeMatrix from "@/components/service/ScopeMatrix";
import TimelineRail from "@/components/service/TimelineRail";
import CostBand from "@/components/service/CostBand";
import SignatureProof from "@/components/service/SignatureProof";
import FAQSection from "@/components/service/FAQSection";
import RelatedProjects from "@/components/service/RelatedProjects";
import TeamCredential from "@/components/service/TeamCredential";
// Fit-out-specific components
import ComparisonChecklist from "@/components/fitout/ComparisonChecklist";
import OrgChart from "@/components/fitout/OrgChart";
import OccupiedTabs from "@/components/fitout/OccupiedTabs";
import FridayArtifact from "@/components/fitout/FridayArtifact";

export function generateStaticParams() {
  return SERVICE_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return { title: "Service not found" };
  return {
    title: `${svc.eyebrow} — Woodex Interior`,
    description: svc.heroSub,
    openGraph: { title: `${svc.eyebrow} — Woodex Interior`, description: svc.heroSub },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();
  const fitout = getFitOut(slug);

  const idx = SERVICE_LIST.findIndex((s) => s.slug === slug);
  const related = [
    SERVICE_LIST[(idx + 1) % SERVICE_LIST.length],
    SERVICE_LIST[(idx + 2) % SERVICE_LIST.length],
  ].map((s) => ({ slug: s.slug, title: s.eyebrow.replace(/^.+\s/, "") }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.eyebrow,
    provider: { "@type": "Organization", name: "Woodex Interior", url: "https://woodex.com.pk" },
    areaServed: { "@type": "City", name: "Lahore" },
    description: svc.heroSub,
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: svc.costBand.range, priceCurrency: "PKR" } },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woodex.com.pk/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://woodex.com.pk/services" },
      { "@type": "ListItem", position: 3, name: svc.eyebrow },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SectionDots />
      <ServiceHero service={svc} related={related} />
      <AnswerCapsule service={svc} />
      <SituationBlock heading={svc.situation.heading} body={svc.situation.body} />

      {fitout ? (
        <>
          {/* Fit-out-specific section stack replaces generic ScopeMatrix for richer UX */}
          <ComparisonChecklist included={fitout.checklist.included} excluded={fitout.checklist.excluded} />
          <OccupiedTabs occupied={fitout.occupiedVsEmpty.occupied} empty={fitout.occupiedVsEmpty.empty} />
          <TimelineRail weeks={svc.timeline} />
          <FridayArtifact report={fitout.fridayReportSample} />
          <CostBand label={svc.costBand.label} range={svc.costBand.range} notes={svc.costBand.notes} />
          <OrgChart team={fitout.team} />
        </>
      ) : (
        <>
          <ScopeMatrix included={svc.scope.included} optional={svc.scope.optional} />
          <TimelineRail weeks={svc.timeline} />
          <CostBand label={svc.costBand.label} range={svc.costBand.range} notes={svc.costBand.notes} />
        </>
      )}

      <SignatureProof proof={svc.proof} />
      <FAQSection faqs={svc.faqs} />
      <RelatedProjects projects={svc.relatedProjects} />
      <TeamCredential team={svc.team} cta={svc.cta} />
    </>
  );
}
