import CinematicHero from "@/components/home/CinematicHero";
import Marquee from "@/components/home/Marquee";
import Positioning from "@/components/home/Positioning";
import Capabilities from "@/components/home/Capabilities";
import ShowcaseRail from "@/components/home/ShowcaseRail";
import CoreFocus from "@/components/home/CoreFocus";
import IndustriesRail from "@/components/home/IndustriesRail";
import ProcessRail, { ProcessRailMobile } from "@/components/home/ProcessRail";
import WhyWoodex from "@/components/home/WhyWoodex";
import Furniture from "@/components/home/Furniture";
import InsightsTeaser from "@/components/home/InsightsTeaser";
import FAQ from "@/components/home/FAQ";
import CTAFinal from "@/components/home/CTAFinal";
import type { Metadata } from "next";
import { faqLd } from "@/lib/schema";
import { HOME_FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Woodex Interior — Spaces Designed to Work. Built to Last.",
  description:
    "Woodex Interior is a Lahore-based Design + Build studio for corporate workplaces, office fit-out, retail and hospitality. See the room before it exists. 98% on the contract date.",
};

const homeFaqSchema = faqLd(HOME_FAQS);

/**
 * Homepage — Relaunch Sprint 1 (PRD §8 sequence):
 * 1. Cine Hero           — H1 "Spaces Designed to Work. Built to Last."
 * 2. Marquee             — client proof strip
 * 3. Positioning         — Think / Design / Build
 * 4. Capabilities        — 10-service grid (5 groups)
 * 5. ShowcaseRail        — Featured Work
 * 6. CoreFocus           — Office Fit-Out / Corporate / Workplace Strategy (P1)
 * 7. IndustriesRail      — 8 sectors
 * 8. ProcessRail         — Understand → Plan → Design → Build → Deliver
 * 9. WhyWoodex           — 6 operational differentiators
 * 10. Furniture          — sister concern cross-sell
 * 11. InsightsTeaser     — editorial categories
 * 12. FAQ
 * 13. CTAFinal           — Start your project
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <CinematicHero />
      <Marquee />
      <Positioning />
      <Capabilities />
      <ShowcaseRail />
      <CoreFocus />
      <IndustriesRail />
      <ProcessRail />
      <ProcessRailMobile />
      <WhyWoodex />
      <Furniture />
      <InsightsTeaser />
      <FAQ />
      <CTAFinal />
    </>
  );
}
