import Link from "next/link";
import type { Metadata } from "next";
import { SERVICE_LIST } from "@/lib/content/services";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services — Woodex Interior",
  description:
    "Six interior services, one delivery system. Find the practice that matches your situation — not our org chart.",
};

/**
 * Situation-based routing cards (PRD §8).
 * Each card leads with the client's situation, not our service label.
 */
const SITUATIONS = [
  {
    situation: "I'm opening a new office or floor.",
    line: "We have 120 staff moving in on a date.",
    href: "/services/commercial",
    label: "Commercial Fit-Out",
  },
  {
    situation: "I'm building or redoing my home.",
    line: "I want it to look like the pictures.",
    href: "/services/residential",
    label: "Residential Interiors",
  },
  {
    situation: "I'm opening a shop, café or restaurant.",
    line: "The launch date is already announced.",
    href: "/services/retail",
    label: "Retail & F&B",
  },
  {
    situation: "I need 3D renders before I commit.",
    line: "I have a builder, I need certainty on what it will look like.",
    href: "/services/3d-design-planning",
    label: "3D Design Only",
  },
  {
    situation: "I want one throat to choke.",
    line: "Design, build, furniture — one contract, one date.",
    href: "/services/turnkey",
    label: "Turnkey",
  },
  {
    situation: "I need furniture for an existing space.",
    line: "Workstations or custom pieces, fast.",
    href: "/services/custom-furniture",
    label: "Custom & Office Furniture",
  },
];

export default function ServicesHub() {
  return (
    <main className="pt-[var(--nav-h)]">
      {/* Hero */}
      <section className="relative min-h-[72vh] bg-[var(--graphite-900)] text-white overflow-hidden noise">
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(135deg,rgba(15,15,15,0.75),rgba(60,42,26,0.55)),url(/images/svc-commercial.jpg) center/cover" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
        <div className="container-x relative min-h-[72vh] flex flex-col justify-end pb-14 md:pb-20 pt-[var(--nav-h)]">
          <div className="kicker text-[var(--oak-300)] mb-6" aria-hidden>
            <span className="w-8 md:w-10 h-px bg-[var(--oak-400)]" />
            <span>Services</span>
          </div>
          <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] max-w-4xl mb-5 md:mb-6">
            Don't pick a service.<br />
            <span className="italic-serif text-[var(--oak-200)]">Pick your situation.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-light">
            Six practices, one Friday-report delivery system. Start with whatever is true for you
            right now — we'll tell you which team handles it, how long it takes, and exactly what it costs.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/50">
            <span>PKR 2,200–9,000 / sqft</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>10-day formal quotes</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>98% on-time handover</span>
          </div>
        </div>
      </section>

      {/* Situation router */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Start here
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-2xl">
            What's true for you<br />
            <span className="italic-serif text-[var(--oak-600)]">right now?</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[var(--border)]">
            {SITUATIONS.map((s, i) => (
              <SituationCard key={s.href} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Full service list */}
      <section className="section-pad bg-[var(--bg-subtle)]">
        <div className="container-x">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            All twelve services
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-2xl">
            Every practice,<br />
            <span className="italic-serif text-[var(--oak-600)]">one delivery system.</span>
          </h2>

          <ul className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
            {SERVICE_LIST.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-12 gap-4 py-6 md:py-8 items-center hover:bg-[var(--bg)] transition-colors px-2 md:px-6 -mx-2 md:-mx-6 rounded-sm"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-xs text-[var(--oak-600)] tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 md:col-span-4 font-display text-xl md:text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">
                    {s.eyebrow}
                  </span>
                  <span className="col-span-12 md:col-span-6 text-[var(--fg-muted)] leading-relaxed md:pl-4">
                    {s.heroSub}
                  </span>
                  <span className="hidden md:flex col-span-1 justify-end text-[var(--fg-subtle)] group-hover:text-[var(--oak-600)] group-hover:translate-x-1 transition-all">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Button href="/consultation" variant="liquid" magnetic size="lg">
              Not sure? Book a site visit →
            </Button>
            <Link href="/3d-studio" className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)]">
              Or see the 3D Studio →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SituationCard({
  situation, line, href, label, index,
}: { situation: string; line: string; href: string; label: string; index: number }) {
  return (
    <Link
      href={href}
      className="group relative p-8 md:p-10 border-r border-b border-[var(--border)] min-h-[260px] flex flex-col justify-between transition-colors hover:bg-[var(--surface-1)]"
    >
      <span className="font-mono text-xs text-[var(--fg-subtle)] tracking-widest absolute top-5 right-5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="font-display text-xl md:text-2xl leading-tight mb-2 group-hover:text-[var(--oak-600)] transition-colors">
          {situation}
        </div>
        <p className="italic-serif text-[var(--fg-muted)] text-lg leading-snug">{line}</p>
      </div>
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--oak-600)]">{label}</span>
        <span className="w-9 h-9 rounded-full border border-[var(--border-strong)] flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--oak-500)] group-hover:text-white group-hover:border-[var(--oak-500)] group-hover:rotate-45">
          +
        </span>
      </div>
    </Link>
  );
}
