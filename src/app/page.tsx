import LinoxaCineHero from "@/components/linoxa/LinoxaCineHero";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import {
  SectionMarquee, SectionIntro, SectionSplit, SectionGrid,
  SectionStats, SectionGallery, SectionTestimonial, SectionProcess,
  SectionFAQ, SectionCTA
} from "@/templates/sections";
import ProjectCard from "@/templates/blocks/ProjectCard";
import ServiceCard from "@/templates/blocks/ServiceCard";
import Link from "next/link";
import type { Metadata } from "next";
import { SLA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Woodex Interior — Spaces Designed to Work. Built to Last.",
  description:
    "Woodex Interior is a Lahore-based Design + Build studio for corporate workplaces, commercial interiors and selected residential. See the room before it exists.",
};

const PARTNERS = ["Nishat Hospitality", "Packages Mall", "Systems Ltd", "HBL", "Defence Raya", "KFC Pakistan", "LUMS", "Café Zouk", "IT Heights", "Fauji Foundation"];

const SERVICES = [
  { num: "01", title: "Office Fit-Out", body: "Shell to working floor — design, joinery, MEP, furniture and handover.", href: "/services/office-fit-out" },
  { num: "02", title: "Corporate Interiors", body: "Purpose-driven HQ and multi-site environments aligned with brand.", href: "/services/corporate" },
  { num: "03", title: "Commercial", body: "Retail, hospitality, food & beverage — brand-led customer environments.", href: "/services/commercial" },
  { num: "04", title: "Turnkey Design+Build", body: "Keys in, keys out — single contract, single Gantt, Friday report.", href: "/services/turnkey" },
  { num: "05", title: "Open 3D Studio", body: "Photoreal walkthroughs you approve before anything is ordered.", href: "/3d-studio" },
  { num: "06", title: "Custom Furniture", body: "Workshop-built joinery — structural 2-year warranty.", href: "/services/custom-furniture" },
];

const STATS = [
  { num: `${SLA.onTimeRatePct}%`, label: "On contract date" },
  { num: `PKR ${SLA.delayCreditPerWeekPKR/1000}k`, label: "/ week delay credit" },
  { num: `${SLA.yearsOperating} yrs`, label: "Building in Lahore" },
  { num: `${SLA.budgetRangeHours} hrs`, label: "Budget range turnaround" },
];

const PROCESS = [
  { n: "01", title: "Understand", body: "Requirements, goals, users, site and budget. A 20-minute qualification call first." },
  { n: "02", title: "Plan", body: "Space planning, workplace strategy and project direction before a line is drawn." },
  { n: "03", title: "Design", body: "Concept, materials, 3D walkthroughs and technical documentation to sign-off." },
  { n: "04", title: "Build", body: "Fit-out, procurement, off-site joinery and coordinated execution. Friday report 4pm." },
  { n: "05", title: "Deliver", body: "Snags resolved in 14 days. 2-year joinery warranty. We don't vanish." },
];

const PROJECTS = [
  { href: "/portfolio/nishat-hospitality-hq", image: "/images/svc-corporate.jpg", title: "Nishat Hospitality HQ", category: "Corporate", location: "Gulberg, Lahore", year: "2024" },
  { href: "/portfolio/systems-ltd-floor-12", image: "/images/svc-commercial.jpg", title: "Systems Ltd — Floor 12", category: "Commercial", location: "IT Heights, Lahore", year: "2023" },
  { href: "/portfolio/cafe-zouk-gulberg-reno", image: "/images/hero-turnkey.jpg", title: "Café Zouk Gulberg Reno", category: "Hospitality", location: "Gulberg, Lahore", year: "2024" },
  { href: "/portfolio/packages-mall-flagship", image: "/images/svc-retail.jpg", title: "Packages Mall Flagship", category: "Retail", location: "Lahore", year: "2024" },
  { href: "/portfolio/dha-residence", image: "/images/svc-residential.jpg", title: "DHA Phase 5 Residence", category: "Residential", location: "DHA Lahore", year: "2023" },
  { href: "/portfolio/hbl-branches", image: "/images/svc-office-fit-out.jpg", title: "HBL Branch Network", category: "Corporate", location: "12 branches, Punjab", year: "2024" },
];

const FAQS = [
  { q: "How long does a typical office fit-out take?", a: "Shell-to-working-floor for a 10,000 sqft office is typically 10–14 weeks from design sign-off. We quote a fixed handover date in the contract and back it with PKR 25,000/week delay credit." },
  { q: "Do you offer a free site visit?", a: "Yes. A 45-minute walkthrough of your space — measurements, photos, a conversation about how you work, and a budget range within 48 hours. No pitch deck. No obligation." },
  { q: "How early should we engage you?", a: "As early as possible. Workplace strategy and space planning before you sign a lease can save a lot of pain. We've been brought in two weeks before handover too — but 8–12 weeks ahead is ideal." },
  { q: "Can we see the design in 3D before construction?", a: "Yes — 'See the room before it exists' is our campaign promise. You approve photoreal 3D walkthroughs before a single material is ordered. We contractually guarantee the render against the finished build." },
];

export default function HomePage() {
  return (
    <>
      <LinoxaCineHero />

      {/* 01 — Marquee / partners */}
      <SectionMarquee items={PARTNERS} />

      {/* 02 — About / Positioning */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <SectionIntro kicker="Who we are" heading={<>Design + Build studio,<br /><em className="italic-serif text-[var(--wood)]">based in Lahore.</em></>}>
              <p>We bring design, workplace strategy, visualization, joinery and fit-out together under one accountable team — so the space you approve in 3D is the space that gets built.</p>
            </SectionIntro>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 grid sm:grid-cols-2 gap-10 pt-4">
            <div>
              <div className="font-display text-5xl md:text-6xl text-[var(--wood)] mb-3">01</div>
              <h3 className="font-display text-xl mb-3">Think</h3>
              <p className="text-[var(--muted)] leading-relaxed">Workplace strategy, brief development and space planning before we draw a single line.</p>
            </div>
            <div>
              <div className="font-display text-5xl md:text-6xl text-[var(--wood)] mb-3">02</div>
              <h3 className="font-display text-xl mb-3">Design</h3>
              <p className="text-[var(--muted)] leading-relaxed">Concept, 3D visualization, technical drawings, material schedules — all signed off.</p>
            </div>
            <div>
              <div className="font-display text-5xl md:text-6xl text-[var(--wood)] mb-3">03</div>
              <h3 className="font-display text-xl mb-3">Build</h3>
              <p className="text-[var(--muted)] leading-relaxed">Off-site joinery, fit-out, procurement and project management. Friday report at 4pm.</p>
            </div>
            <div>
              <LinoxaButton variant="dark" href="/about" className="mt-2">About the studio</LinoxaButton>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Stats */}
      <SectionStats items={STATS} />

      {/* 04 — Services grid */}
      <SectionGrid kicker="What we do" heading="Spaces shaped by purpose and identity." cols={3}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.num} {...s} index={i} />
        ))}
      </SectionGrid>

      {/* 05 — Featured work */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionIntro kicker="Selected work" heading={<>Designed around people.<br /><em className="italic-serif text-[var(--wood)]">Built around purpose.</em></>} />
            <LinoxaButton variant="outline-navy" href="/work">View all work</LinoxaButton>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0,6).map((p, i) => <ProjectCard key={p.href} {...p} index={i} />)}
          </div>
        </div>
      </section>

      {/* 06 — Split (3D studio) */}
      <SectionSplit
        kicker="Open 3D Studio"
        heading={<>See the room<br /><em className="italic-serif text-[var(--wood)]">before it exists.</em></>}
        image="/images/hero-3d.jpg"
      >
        <p>Our in-house 3D studio produces photoreal walkthroughs you approve before anything is ordered or built. So precise we contractually guarantee the render against the finished build.</p>
        <p>Book a live 3D session and walk through your space before a single nail is driven.</p>
        <div className="pt-4"><LinoxaButton variant="dark" href="/3d-studio">Open 3D Studio</LinoxaButton></div>
      </SectionSplit>

      {/* 07 — Process */}
      <SectionProcess steps={PROCESS} />

      {/* 08 — Gallery */}
      <SectionGallery images={[
        { src: "/images/svc-corporate.jpg" },
        { src: "/images/svc-commercial.jpg" },
        { src: "/images/svc-custom-furniture.jpg" },
        { src: "/images/svc-retail.jpg" },
        { src: "/images/svc-office-fit-out.jpg" },
        { src: "/images/workshop-detail.jpg" },
      ]} />

      {/* 09 — Testimonial */}
      <SectionTestimonial
        quote="What you approved in 3D is exactly what we walked into. And they hit the date by a day. We've used three interior firms in Lahore — Woodex is the first that behaved like a project-management company that happens to design."
        author="Director of Operations"
        role="Corporate client · IT sector, Lahore"
      />

      {/* 10 — FAQ */}
      <SectionFAQ items={FAQS} />

      {/* 11 — CTA */}
      <SectionCTA />
    </>
  );
}
