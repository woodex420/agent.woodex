import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  SectionHero, SectionSplit, SectionStats, SectionTestimonial, SectionCTA,
} from "@/templates/sections";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import ProjectCard from "@/templates/blocks/ProjectCard";

export const metadata: Metadata = {
  title: "Portfolio — Woodex Interior",
  description:
    "Selected commercial, residential, corporate and retail interior projects delivered by Woodex Interior since 2014. 98% on the contract date.",
};

const PROJECTS = [
  { href: "/portfolio/nishat-hospitality-hq", image: "/images/svc-corporate.jpg", title: "Nishat Hospitality HQ", category: "Corporate", location: "Gulberg, Lahore", year: "2024" },
  { href: "/portfolio/systems-ltd-floor-12", image: "/images/svc-commercial.jpg", title: "Systems Ltd — Floor 12", accentWord: "12", category: "Commercial", location: "IT Heights, Lahore", year: "2023" },
  { href: "/portfolio/cafe-zouk-gulberg-reno", image: "/images/hero-turnkey.jpg", title: "Café Zouk Gulberg Reno", category: "Hospitality", location: "Gulberg, Lahore", year: "2024" },
  { href: "/portfolio/packages-mall-flagship", image: "/images/svc-retail.jpg", title: "Packages Mall Flagship", category: "Retail", location: "Lahore", year: "2024" },
  { href: "/portfolio/dha-residence", image: "/images/svc-residential.jpg", title: "DHA Phase 5 Residence", category: "Residential", location: "DHA Lahore", year: "2023" },
  { href: "/portfolio/hbl-branches", image: "/images/svc-office-fit-out.jpg", title: "HBL Branch Network", category: "Corporate", location: "12 branches, Punjab", year: "2024" },
];

const CATEGORIES = ["All", "Corporate", "Commercial", "Retail", "Hospitality", "Residential"];

export default function PortfolioPage() {
  return (
    <main>
      <SectionHero
        height="inner"
        kicker="Selected work"
        title={<>Projects we <em className="italic-serif text-[var(--wood)]">actually built.</em></>}
        subtitle="A curated selection of corporate offices, retail flagships, hospitality and residential work delivered across Pakistan since 2014."
        image="/images/portfolio-retail.jpg"
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <LinoxaButton variant="cream" size="lg" magnetic href="/contact">Start your project</LinoxaButton>
          <LinoxaButton variant="outline" size="lg" href="/services">Our services</LinoxaButton>
        </div>
      </SectionHero>

      {/* Project grid */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
            <div>
              <span className="kicker mb-6 inline-flex">Selected — 2022 / 2024</span>
              <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">Recent <em className="italic-serif text-[var(--wood)]">work.</em></h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c, i) => (
                <span key={c} className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full ${i === 0 ? "bg-[var(--navy)] text-[var(--cream)] border-[var(--navy)]" : "border-[var(--border)] text-[var(--muted)]"}`}>{c}</span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
            {PROJECTS.map((p) => <ProjectCard key={p.href} {...p} />)}
          </div>
        </div>
      </section>

      {/* Featured case study band */}
      <section className="bg-[var(--navy)] text-[var(--cream)] section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="kicker mb-6 inline-flex" data-kicker-invert>Featured case study</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
              12 branches. 20 weeks.<br />
              <em className="italic-serif text-[var(--wood)]">One playbook.</em>
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-md">
              When HBL rolled out a new brand prototype across Punjab, we delivered all 12 branches inside the 20-week window — two early — with an average of fewer than 8 snag items per branch.
            </p>
            <LinoxaButton variant="cream" magnetic href="/portfolio/hbl-branches">Read the case study</LinoxaButton>
          </div>
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-[var(--r-lg)] overflow-hidden">
            <Image src="/images/portfolio-hbl.jpg" alt="HBL Branch Network" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <SectionStats
        items={[
          { num: "240+", label: "Projects delivered" },
          { num: "98%", label: "On contract date" },
          { num: "12", label: "Branches in 20 weeks (HBL)" },
          { num: "<8", label: "Snags per branch, avg" },
        ]}
      />

      <SectionTestimonial
        quote="The Packages Mall flagship opened exactly on the date in the contract. The 3D renders matched the finished store down to the shelf detail — that was the first time that has ever happened for us."
        author="Retail Director"
        role="National Fashion Brand"
      />

      <SectionCTA
        kicker="Your project"
        heading={<>Like what you see?<br /><em className="italic-serif text-[var(--wood)]">Let us build yours.</em></>}
        body="Send us your brief, site or idea. We'll come back with a budget range and project structure within 48 hours."
        cta={{ label: "Start your project", href: "/contact" }}
      />
    </main>
  );
}
