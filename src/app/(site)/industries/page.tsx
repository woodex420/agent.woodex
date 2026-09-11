import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries · Woodex Interior",
  description:
    "Sectors Woodex designs and builds for — corporate offices, technology, retail, hospitality, healthcare, education, developers and residential.",
};

const INDUSTRIES = [
  { name: "Corporate & Offices", href: "/services/corporate", status: "Live", desc: "Workplaces designed around people, operations and brand." },
  { name: "IT & Technology", href: "/services/commercial", status: "Sprint 3", desc: "Agile, collaborative and scalable workspaces." },
  { name: "Retail & Showrooms", href: "/services/retail", status: "Live", desc: "Brand-led customer environments." },
  { name: "Restaurants & Cafés", href: "/services/retail", status: "Sprint 3", desc: "Customer flow, identity and operational efficiency." },
  { name: "Healthcare", href: "/services/commercial", status: "Sprint 3", desc: "Functional, durable, user-focused environments." },
  { name: "Education", href: "/services/commercial", status: "Sprint 3", desc: "Purposeful learning and institutional environments." },
  { name: "Developers", href: "/services/turnkey", status: "Sprint 3", desc: "Commercial and residential design coordination and delivery." },
  { name: "Residential", href: "/services/residential", status: "Live", desc: "Selected high-value residential interiors." },
];

export default function IndustriesHubPage() {
  return (
    <main id="main-content" className="bg-[var(--bg)]">
      {/* Inner hero — 520px per DESIGN.md */}
      <section className="inner-hero flex items-end bg-[var(--charcoal)] text-[var(--ivory)] relative overflow-hidden noise">
        <div className="container-x relative z-10 pb-16 pt-32">
          <span className="kicker text-[var(--oak-300)] mb-6" data-kicker-invert>
            Industries we build in
          </span>
          <h1 className="font-display max-w-3xl">
            Sector expertise,<br />
            <span className="italic-serif text-[var(--oak-300)]">delivered consistently.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--ivory)]/70 text-lg leading-relaxed">
            From a 12,000 sqft corporate HQ to a 900 sqft café, the same Woodex process applies —
            but every sector has its own operational logic. We design to that logic first.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="group bg-[var(--bg)] p-8 hover:bg-[var(--bg-subtle)] transition-colors flex flex-col min-h-[220px]"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--oak-600)] mb-5">
                  {ind.status}
                </div>
                <h3 className="font-display text-2xl mb-3">{ind.name}</h3>
                <p className="text-[var(--fg-muted)] leading-relaxed text-[0.95rem] flex-1">{ind.desc}</p>
                <span className="mt-6 text-sm uppercase tracking-widest text-[var(--fg-subtle)] group-hover:text-[var(--oak-600)] transition-colors inline-flex items-center gap-2">
                  Explore <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[var(--fg-muted)] mb-6 max-w-xl mx-auto">
              Don't see your sector? We work across most commercial and residential project types.
              Tell us what you're building.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[var(--charcoal)] text-[var(--ivory)] rounded-full uppercase tracking-widest text-xs font-medium hover:bg-[var(--walnut)] transition-colors"
            >
              Start your project <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
