import type { Metadata } from "next";
import Link from "next/link";
import {
  SectionHero, SectionSplit, SectionStats,
  SectionTestimonial, SectionFAQ, SectionCTA,
} from "@/templates/sections";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { COST_BANDS, SLA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services — Woodex Interior, Lahore",
  description:
    "12 interior practices, one Friday-report delivery system. PKR 2,200–9,000/sqft, 98% on-time handover, 48-hour budget ranges.",
};

const SERVICES = [
  { n: "01", title: "Office Fit-Out", body: "Shell to working floor — design, joinery, MEP, furniture, AV and handover.", href: "/services/office-fit-out", img: "/images/svc-office-fit-out.jpg", range: `${COST_BANDS.commercialOffice.low/1000}k–${COST_BANDS.commercialOffice.high/1000}k / sqft` },
  { n: "02", title: "Corporate Interiors", body: "HQ and multi-site environments aligned with brand, culture and workflow.", href: "/services/corporate", img: "/images/svc-corporate.jpg", range: `${COST_BANDS.commercialOffice.low/1000}k–${COST_BANDS.commercialOffice.high/1000}k / sqft` },
  { n: "03", title: "Commercial & Retail", body: "Retail, hospitality, food & beverage — brand-led customer environments that convert.", href: "/services/commercial", img: "/images/svc-commercial.jpg", range: `${COST_BANDS.retailFnB.low/1000}k–${COST_BANDS.retailFnB.high/1000}k / sqft` },
  { n: "04", title: "Residential", body: "Selected homes, designed and built end-to-end. Joinery and finishing in-house.", href: "/services/residential", img: "/images/svc-residential.jpg", range: `${COST_BANDS.residential.low/1000}k–${COST_BANDS.residential.high/1000}k / sqft` },
  { n: "05", title: "Turnkey Design+Build", body: "Keys in, keys out — single contract, single Gantt, Friday 4pm report.", href: "/services/turnkey", img: "/images/svc-turnkey.jpg", range: `${COST_BANDS.turnkey.low/1000}k–${COST_BANDS.turnkey.high/1000}k / sqft` },
  { n: "06", title: "Renovation", body: "Working within an occupied or tenanted space — phased delivery, clean handover.", href: "/services/renovation", img: "/images/svc-renovation.jpg", range: `${COST_BANDS.renovation.low/1000}k–${COST_BANDS.renovation.high/1000}k / sqft` },
  { n: "07", title: "Custom Furniture", body: "Workshop-built joinery for offices, restaurants and homes. 2-year structural warranty.", href: "/services/custom-furniture", img: "/images/svc-custom-furniture.jpg", range: `From PKR ${COST_BANDS.customFurniture.low/1000}k / sqft` },
  { n: "08", title: "Brand Shops & Kiosks", body: "Mall retail roll-outs — repeatable design, standardised details, on-site across Pakistan.", href: "/services/brand-shops", img: "/images/svc-brand-shop.jpg", range: `${COST_BANDS.retailFnB.low/1000}k–${COST_BANDS.retailFnB.high/1000}k / sqft` },
  { n: "09", title: "Open 3D Studio", body: "Photoreal walkthroughs you approve before anything is ordered — included on every project.", href: "/3d-studio", img: "/images/svc-3d.jpg", range: "Included with design" },
];

const STATS = [
  { num: `${COST_BANDS.renovation.low/1000}k–${COST_BANDS.retailFnB.high/1000}k`, label: "PKR / sqft range" },
  { num: `${SLA.onTimeRatePct}%`, label: "On contract date" },
  { num: `${SLA.budgetRangeHours} hrs`, label: "Budget turnaround" },
  { num: `PKR ${SLA.delayCreditPerWeekPKR/1000}k`, label: "/ week delay credit" },
];

const FAQS = [
  { q: "What does 'turnkey' actually mean?", a: "One contract, one number, one handover date. Design, approvals, joinery, MEP, furniture, AV, signage and deep-clean — all under Woodex. You collect the keys." },
  { q: "Can we hire you for design only?", a: "Yes. Many clients do — especially multi-site operators who want Woodex drawings for their own contractors. We prefer to build what we design, but we will happily hand over a coordinated drawing set." },
  { q: "Do you work outside Lahore?", a: "Regularly. Islamabad, Karachi and multi-city roll-outs across Punjab. Travel and logistics are quoted transparently in the budget band." },
  { q: "What is the minimum project size?", a: "We are set up for projects PKR 25 lakh and up. For smaller work we can recommend trusted partners." },
];

export default function ServicesPage() {
  return (
    <main>
      <SectionHero
        height="inner"
        kicker="Services"
        title={<>Interior services from<br /><em className="italic-serif text-[var(--wood)]">concept to handover.</em></>}
        subtitle="Nine core practices, one delivery system. Every project — design, joinery and project management in one accountable room."
        image="/images/hero-commercial.jpg"
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <LinoxaButton variant="cream" size="lg" magnetic href="/contact">Start your project</LinoxaButton>
          <LinoxaButton variant="outline" size="lg" href="/portfolio">See finished work</LinoxaButton>
        </div>
      </SectionHero>

      <SectionStats items={STATS} />

      {/* Services grid */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="kicker mb-6 inline-flex">What we do</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">Nine practices.<br /><em className="italic-serif text-[var(--wood)]">One delivery system.</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {SERVICES.map((s) => (
              <Link key={s.n} href={s.href} className="group bg-[var(--bg)] p-7 md:p-8 min-h-[260px] flex flex-col hover:bg-[var(--cream-2)] transition-colors duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="font-mono text-xs text-[var(--wood)] tracking-widest">{s.n}</div>
                  <span className="linoxa-circle opacity-60 group-hover:opacity-100" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-[1.35rem] leading-tight mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)] flex-1">{s.body}</p>
                <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs uppercase tracking-widest text-[var(--muted)]">{s.range}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery system split */}
      <SectionSplit
        kicker="The Friday-report system"
        heading={<>A Friday 4pm report.<br /><em className="italic-serif text-[var(--wood)]">Every week of the build.</em></>}
        image="/images/workshop-detail.jpg"
        dark
      >
        <p>Every build gets a shared Gantt, a named project lead, and a weekly status email sent at 4pm every Friday with photos, percentage complete and next week's plan.</p>
        <p>No radio silence. No surprises. You always know exactly where your project stands — and if something slips, you see it before it becomes a problem.</p>
        <p>The handover date is in the contract. We back it.</p>
      </SectionSplit>

      <SectionTestimonial
        quote="Woodex quoted a Friday report and delivered it every week for 12 weeks. Handover was two days early. Our team moved in on a Monday and worked normally from minute one."
        author="Sana K."
        role="Head of Admin, Packages Mall"
      />

      <SectionFAQ kicker="Services — FAQ" heading="Questions we get asked before kickoff." items={FAQS} />

      <SectionCTA
        kicker="Talk to us"
        heading={<>Not sure which service fits?<br /><em className="italic-serif text-[var(--wood)]">That is our job.</em></>}
        body="A 20-minute call is all we need to understand the brief and point you in the right direction. Budget range within 48 hours."
        cta={{ label: "Book a site visit", href: "/contact" }}
      />
    </main>
  );
}
