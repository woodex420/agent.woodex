import type { Metadata } from "next";
import {
  SectionHero, SectionSplit, SectionGrid,
  SectionStats, SectionTestimonial, SectionProcess, SectionFAQ, SectionCTA,
  GridCell, SectionImageText, SectionMarquee,
} from "@/templates/sections";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SLA } from "@/lib/config";

export const metadata: Metadata = {
  title: "About — Woodex Interior, Lahore",
  description:
    "Woodex Interior started in 2014 because a client cried at handover. Twelve years, 240+ projects, 98% on-time. Meet the team and see how we actually work.",
};

const STATS = [
  { num: "2014", label: "Founded in Lahore" },
  { num: SLA.projectsDelivered, label: "Projects delivered" },
  { num: `${SLA.onTimeRatePct}%`, label: "On contract date" },
  { num: `${SLA.yearsOperating} yrs`, label: "Operating" },
];

const VALUES = [
  { n: "01", title: "Say what we will do. Do it.", body: "We quote a handover date in the contract. PKR 25,000/week delay credit if we miss it. No excuses." },
  { n: "02", title: "Show, don't pitch.", body: "Photoreal 3D walkthroughs before anything is ordered. The render is the contract." },
  { n: "03", title: "One accountable team.", body: "Design, joinery, MEP, project management and furniture in one room. No finger-pointing." },
  { n: "04", title: "Build to outlast trends.", body: "Materials and joinery specified for the decade, not the quarter. 2-year joinery warranty." },
];

const PROCESS = [
  { n: "01", title: "Listen", body: "A 20-minute call. We learn how you work, who uses the space and what success looks like." },
  { n: "02", title: "Plan", body: "Space planning, workplace strategy, and a fixed budget band before a line is drawn." },
  { n: "03", title: "Visualize", body: "3D walkthroughs you iterate on until it feels right. You approve the room before it exists." },
  { n: "04", title: "Build", body: "In-house joinery, coordinated trades, Friday 4pm report every week of the build." },
  { n: "05", title: "Hand over", body: "Snags closed in 14 days. 2-year joinery warranty. We stay on call after you move in." },
];

const TIMELINE = [
  { year: "2014", title: "Founded in Lahore", body: "Started as a two-person joinery workshop making custom furniture for DHA and Gulberg homes." },
  { year: "2017", title: "First corporate fit-out", body: "Delivered a 12,000 sqft regional HQ in 11 weeks. We have not looked back." },
  { year: "2020", title: "In-house 3D studio", body: "Brought visualization internal. 'See the room before it exists' became our contract promise." },
  { year: "2022", title: "Flagship retail", body: "Delivered Packages Mall flagship, HBL branch network roll-out and multiple F&B openings." },
  { year: "2024", title: "240th project", body: "12 years in business, 98% on contract date, still headquartered in Model Town." },
];

const FAQS = [
  { q: "Do you take on projects outside Lahore?", a: "Yes. We regularly deliver in Islamabad and Karachi and have a standing team for multi-city roll-outs. Site visits and logistics are quoted per project." },
  { q: "Who owns the workshop?", a: "We do. Our 8,000 sqft joinery workshop on Multan Road is run by Woodex staff — no outsourcing of structural joinery. That is how we warranty it for 2 years." },
  { q: "How many people work at Woodex?", a: "A core team of 36 across design, project management, workshop and site. We scale with long-trusted subcontractors for MEP, civil and paint — but project management is always Woodex." },
  { q: "Will I work with the founder?", a: "For projects above PKR 2 crore, yes. For every project, a dedicated project lead and design lead are named at kickoff and are yours until handover." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Inner hero */}
      <SectionHero
        height="inner"
        kicker="About Woodex"
        title={<>A Lahore interior studio<br /><em className="italic-serif text-[var(--wood)]">that builds what it designs.</em></>}
        subtitle="Twelve years, 240+ projects, 98% on contract date. Design and joinery under one roof — so the room you approve in 3D is the room you move into."
        image="/images/about-craft.jpg"
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <LinoxaButton variant="cream" size="lg" magnetic href="/contact">Start your project</LinoxaButton>
          <LinoxaButton variant="outline" size="lg" href="/portfolio">See our work</LinoxaButton>
        </div>
      </SectionHero>

      {/* Stats band */}
      <SectionStats items={STATS} />

      {/* Founding story split */}
      <SectionSplit
        kicker="Founded 2014"
        heading={<>We started because a client cried<br /><em className="italic-serif text-[var(--wood)]">at handover.</em></>}
        image="/images/workshop-detail.jpg"
      >
        <p>The story is simple. In 2014 a restaurant owner walked into a finished fit-out done by someone else and cried — wrong counters, wrong lighting, three weeks late, nothing matched the drawings.</p>
        <p>That week we founded Woodex on one idea: the people who draw the space should be the people building it. A decade later we still run it that way.</p>
        <p>Design, 3D visualization, joinery and project management sit in one room in Model Town. We quote the handover date in the contract. And if we miss it, we pay.</p>
      </SectionSplit>

      {/* Marquee of clients */}
      <SectionMarquee items={["Nishat Hospitality", "Packages Mall", "Systems Ltd", "HBL", "Defence Raya", "KFC Pakistan", "LUMS", "Café Zouk"]} />

      {/* Values as behaviors */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <span className="kicker mb-6 inline-flex">How we work</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">Four <em className="italic-serif text-[var(--wood)]">behaviors</em>, not four values on a wall.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
            {VALUES.map((v, i) => (
              <GridCell key={v.n} className="bg-[var(--bg)]" >
                <div className="font-mono text-xs text-[var(--wood)] tracking-widest mb-5">{v.n}</div>
                <h3 className="font-display text-xl md:text-[1.35rem] leading-tight mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{v.body}</p>
              </GridCell>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <SectionImageText
        kicker="The story so far"
        heading={<>A short <em className="italic-serif text-[var(--wood)]">history</em>.</>}
        dark={false}
      >
        <div className="space-y-8">
          {TIMELINE.map((t) => (
            <div key={t.year} className="grid grid-cols-[80px_1fr] gap-6 border-t border-[var(--border)] pt-8 first:border-t-0 first:pt-0">
              <div className="font-display text-2xl text-[var(--wood)]">{t.year}</div>
              <div>
                <h4 className="font-display text-lg mb-2">{t.title}</h4>
                <p className="text-[var(--muted)] leading-relaxed">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionImageText>

      {/* Workshop split */}
      <SectionSplit
        kicker="In-house joinery"
        heading={<>We own the workshop.<br /><em className="italic-serif text-[var(--wood)]">That is how we warranty it.</em></>}
        image="/images/svc-custom-furniture.jpg"
        reverse
        dark
      >
        <p>Our 8,000 sqft joinery workshop on Multan Road is staffed by Woodex employees. Structural joinery never leaves our hands. That is the only way to stand behind a 2-year warranty.</p>
        <p>You are welcome to visit during production. Most clients do — there is nothing we hide.</p>
        <div className="pt-4">
          <LinoxaButton variant="cream" magnetic href="/contact">Book a workshop visit</LinoxaButton>
        </div>
      </SectionSplit>

      {/* Process */}
      <SectionProcess
        kicker="The process"
        heading="From first conversation to final handover."
        steps={PROCESS}
      />

      {/* Testimonial */}
      <SectionTestimonial
        quote="Woodex finished our HQ fit-out two days ahead of the contracted handover date. The 3D renders were exact — I walked in and it was the room I had approved on screen."
        author="Ahsan R."
        role="COO, Systems Ltd"
      />

      {/* FAQ */}
      <SectionFAQ kicker="About — FAQ" heading="Things people usually ask." items={FAQS} />

      {/* CTA */}
      <SectionCTA
        kicker="Start your project"
        heading={<>Have a space in <em className="italic-serif text-[var(--wood)]">mind?</em></>}
        body="Tell us what you're planning. We'll share a budget range within 48 hours and a clear picture of what happens next."
        cta={{ label: "Start your project", href: "/contact" }}
      />
    </main>
  );
}
