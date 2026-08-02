import PortfolioHero from "@/components/portfolio/PortfolioHero";
import FlipGrid from "@/components/portfolio/FlipGrid";
import ProjectMap from "@/components/portfolio/ProjectMap";
import Button from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Woodex Interior",
  description:
    "Selected commercial, residential, corporate and retail interior projects delivered by Woodex Interior since 2014. 98% on the contract date.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <FlipGrid />
      <ProjectMap />

      {/* Featured case study band */}
      <section className="section-pad bg-[var(--bg-subtle)]">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Featured case study
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
              12 branches. 20 weeks.<br />
              <span className="italic-serif text-[var(--oak-600)]">One playbook.</span>
            </h2>
            <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-8 max-w-md">
              When HBL rolled out a new brand prototype across Punjab, we delivered all 12 branches
              inside the 20-week window — two early — with an average of fewer than 8 snag items per branch.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/portfolio/hbl-branch-network" variant="liquid" magnetic>
                Read the case study →
              </Button>
              <Link href="/contact" className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)]">
                Start your project →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-sm overflow-hidden"
               style={{ background: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg) center/cover" }}>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-2">Corporate · 2023-24</div>
              <div className="font-display text-3xl md:text-4xl italic-serif">HBL Branch Network</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
