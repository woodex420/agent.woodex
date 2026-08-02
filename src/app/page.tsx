import CinematicHero from "@/components/home/CinematicHero";
import Marquee from "@/components/home/Marquee";
import AboutBrief from "@/components/home/AboutBrief";
import ServicesGrid from "@/components/home/ServicesGrid";
import FitOutSplit from "@/components/home/FitOutSplit";
import StudioScrub from "@/components/home/StudioScrub";
import ProcessRail, { ProcessRailMobile } from "@/components/home/ProcessRail";
import ShowcaseRail from "@/components/home/ShowcaseRail";
import ProofStack from "@/components/home/ProofStack";
import ConvoDiagram from "@/components/home/ConvoDiagram";
import FAQ from "@/components/home/FAQ";
import CTAFinal from "@/components/home/CTAFinal";
import type { Metadata } from "next";
import { faqLd } from "@/lib/schema";
import { HOME_FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Woodex Interior — Approve it in 3D. Get exactly that.",
  description:
    "Design-and-build interior studio in Lahore. Commercial, residential, corporate and retail fit-outs. Approve it in 3D. Get exactly that. On the date we said.",
};

const homeFaqSchema = faqLd(HOME_FAQS);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <CinematicHero />
      <Marquee />
      <AboutBrief />
      <ServicesGrid />
      <StudioScrub />
      <FitOutSplit />
      <ProcessRail />
      <ProcessRailMobile />
      <ShowcaseRail />
      <ProofStack />
      <ConvoDiagram />
      <FAQ />
      <CTAFinal />
    </>
  );
}
