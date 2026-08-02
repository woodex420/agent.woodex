"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SERVICE_LIST } from "@/lib/content/services";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Category =
  | "all"
  | "commercial"
  | "residential"
  | "retail"
  | "corporate"
  | "turnkey"
  | "furniture"
  | "renovation"
  | "3d"
  | "brand";

const CATEGORIES: { id: Category; label: string; match: (s: (typeof SERVICE_LIST)[number]) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  { id: "commercial", label: "Commercial", match: (s) => ["commercial", "office-fit-out", "commercial-fit-out"].includes(s.slug) },
  { id: "residential", label: "Residential", match: (s) => ["residential", "residential-fit-out"].includes(s.slug) },
  { id: "retail", label: "Retail & F&B", match: (s) => s.slug === "retail" },
  { id: "corporate", label: "Corporate", match: (s) => s.slug === "corporate" },
  { id: "turnkey", label: "Turnkey", match: (s) => s.slug === "turnkey" },
  { id: "furniture", label: "Furniture", match: (s) => ["custom-furniture", "office-furniture"].includes(s.slug) },
  { id: "renovation", label: "Renovation", match: (s) => s.slug === "renovation" },
  { id: "brand", label: "Brand Shops", match: (s) => s.slug === "brand-shop" },
  { id: "3d", label: "3D Design", match: (s) => s.slug === "3d-design-planning" },
];

const SITUATIONS = [
  {
    situation: "I'm opening a new office or floor.",
    line: "We have 120 staff moving in on a date.",
    href: "/services/commercial",
    label: "Commercial Fit-Out",
    img: "/images/svc-commercial.jpg",
  },
  {
    situation: "I'm building or redoing my home.",
    line: "I want it to look like the pictures.",
    href: "/services/residential",
    label: "Residential Interiors",
    img: "/images/svc-residential.jpg",
  },
  {
    situation: "I'm opening a shop, café or restaurant.",
    line: "The launch date is already announced.",
    href: "/services/retail",
    label: "Retail & F&B",
    img: "/images/svc-retail.jpg",
  },
  {
    situation: "I need 3D renders before I commit.",
    line: "I have a builder, I need certainty on what it will look like.",
    href: "/services/3d-design-planning",
    label: "3D Design Only",
    img: "/images/svc-3d.jpg",
  },
  {
    situation: "I want one throat to choke.",
    line: "Design, build, furniture — one contract, one date.",
    href: "/services/turnkey",
    label: "Turnkey",
    img: "/images/hero-turnkey.jpg",
  },
  {
    situation: "I need furniture for an existing space.",
    line: "Workstations or custom pieces, fast.",
    href: "/services/custom-furniture",
    label: "Custom & Office Furniture",
    img: "/images/svc-custom-furniture.jpg",
  },
];

export default function ServicesHubClient() {
  const [active, setActive] = useState<Category>("all");

  useEffect(() => {
    const el = document.getElementById("service-list");
    if (el && active !== "all") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  const filtered = SERVICE_LIST.filter((s) =>
    CATEGORIES.find((c) => c.id === active)?.match(s) ?? true
  );

  return (
    <main id="main-content" className="pt-[var(--nav-h)]">
      <section className="relative min-h-[72vh] bg-[var(--graphite-900)] text-white overflow-hidden noise">
        <Image
          src="/images/svc-commercial.jpg"
          alt="Commercial interior by Woodex — modern boardroom in Lahore"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
        <div className="container-x relative min-h-[72vh] flex flex-col justify-end pb-14 md:pb-20 pt-[var(--nav-h)]">
          <div className="kicker text-[var(--oak-300)] mb-6" aria-hidden>
            <span className="w-8 md:w-10 h-px bg-[var(--oak-400)]" />
            <span>Services</span>
          </div>
          <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] max-w-4xl mb-5 md:mb-6 text-balance">
            Don't pick a service.<br />
            <span className="italic-serif text-[var(--oak-200)]">Pick your situation.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-light">
            12 practices, one Friday-report delivery system. Start with whatever is true
            for you right now — we'll tell you which team handles it, how long it takes,
            and exactly what it costs per sqft.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/60 tabular-nums">
            <span>PKR 2,200–9,000 / sqft</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>10-day formal quotes</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>98% on-time handover</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>240+ projects since 2014</span>
          </div>
        </div>
      </section>

      <div className="sticky-pills py-3">
        <div className="container-x">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                className={cn(
                  "shrink-0 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium px-4 py-2 rounded-full border transition-all whitespace-nowrap tabular-nums",
                  active === c.id
                    ? "bg-[var(--oak-500)] border-[var(--oak-500)] text-white"
                    : "border-[var(--border-strong)] text-[var(--fg-muted)] hover:border-[var(--oak-500)] hover:text-[var(--oak-600)]"
                )}
              >
                {c.label}
                <span className="ml-2 text-[10px] opacity-60 tabular-nums">
                  {SERVICE_LIST.filter(c.match).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <div className="kicker mb-4">Start here</div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-2xl text-balance">
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

      <section id="service-list" className="section-pad bg-[var(--bg-subtle)] scroll-mt-[calc(var(--nav-h)+60px)]">
        <div className="container-x">
          <div className="kicker mb-4">
            {active === "all" ? "All twelve services" : `${CATEGORIES.find(c=>c.id===active)?.label} services`}
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-2xl text-balance">
            Every practice,<br />
            <span className="italic-serif text-[var(--oak-600)]">one delivery system.</span>
          </h2>

          <ul className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
            {filtered.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-12 gap-4 py-6 md:py-8 items-center hover:bg-[var(--bg)] transition-colors px-2 md:px-6 -mx-2 md:-mx-6 rounded-sm"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-xs text-[var(--oak-600)] tracking-widest tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 md:col-span-4 font-display text-xl md:text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">
                    {s.eyebrow}
                  </span>
                  <span className="col-span-12 md:col-span-6 text-[var(--fg-muted)] leading-relaxed md:pl-4">
                    {s.heroSub}
                  </span>
                  <span className="hidden md:flex col-span-1 justify-end text-[var(--fg-subtle)] group-hover:text-[var(--oak-600)] group-hover:translate-x-1 transition-all arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="text-[var(--fg-muted)] py-12 text-center">
              No services match this category yet — <button onClick={() => setActive("all")} className="underline text-[var(--oak-600)]">view all</button>.
            </p>
          )}

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Button href="/consultation" variant="liquid" magnetic size="lg">
              Not sure? Book a site visit
            </Button>
            <Link href="/3d-studio" className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)] group inline-flex items-center gap-2">
              Or see the 3D Studio <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SituationCard({
  situation, line, href, label, index, img,
}: { situation: string; line: string; href: string; label: string; index: number; img: string }) {
  return (
    <Link
      href={href}
      className="group relative p-8 md:p-10 border-r border-b border-[var(--border)] min-h-[280px] flex flex-col justify-between overflow-hidden transition-colors hover:bg-[var(--surface-1)]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden>
        <Image
          src={img}
          alt=""
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" />
      </div>

      <span className="font-mono text-xs text-[var(--fg-subtle)] tracking-widest absolute top-5 right-5 tabular-nums relative z-[1]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-[1]">
        <div className="font-display text-xl md:text-2xl leading-tight mb-2 group-hover:text-[var(--oak-700)] transition-colors text-balance">
          {situation}
        </div>
        <p className="italic-serif text-[var(--fg-muted)] text-lg leading-snug">{line}</p>
      </div>
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)] relative z-[1]">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--oak-600)]">{label}</span>
        <span className="w-9 h-9 rounded-full border border-[var(--border-strong)] flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--oak-500)] group-hover:text-white group-hover:border-[var(--oak-500)] group-hover:rotate-45">
          +
        </span>
      </div>
    </Link>
  );
}
