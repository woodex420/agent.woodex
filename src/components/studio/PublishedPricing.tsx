"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

const TIERS = [
  {
    name: "Concept",
    price: "PKR 45k",
    unit: "per room",
    tag: "Starts at",
    body: "Mood board, 2D layout, 2 angles of photoreal 3D, one revision round.",
    features: [
      "Mood board + material palette",
      "2D furniture layout",
      "2 hero 3D angles",
      "1 round of revisions",
      "Digital delivery",
    ],
    cta: "Book a studio consult",
    href: "/consultation",
    featured: false,
  },
  {
    name: "Full Visualisation",
    price: "PKR 120k",
    unit: "per room",
    tag: "Most popular",
    body: "Full room rendering, multiple angles, 360° panorama, material swap variants, construction-ready drawing set.",
    features: [
      "Everything in Concept",
      "All angles rendered at 4K",
      "360° interactive panorama",
      "3 material-swap variants",
      "Joinery/setting-out drawings",
      "2 rounds of revisions",
      "3D-to-build guarantee if built with us",
    ],
    cta: "Start a visualisation",
    href: "/consultation",
    featured: true,
  },
  {
    name: "Project Rendering",
    price: "From PKR 250k",
    unit: "whole-home / floor",
    tag: "For builders & developers",
    body: "Full-home or full-floor visualisation, branded presentation deck, sales/marketing renders, source files.",
    features: [
      "Every room rendered",
      "Fly-through animation",
      "Sales/marketing renders",
      "Unlimited revisions during concept",
      "Print + digital source files",
      "Branded presentation deck",
      "Dedicated 3D lead",
    ],
    cta: "Talk to the studio",
    href: "/consultation",
    featured: false,
  },
];

export default function PublishedPricing() {
  return (
    <section id="pricing" className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Published pricing
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-4 max-w-2xl">
          Fixed pricing.<br />
          <span className="italic-serif text-[var(--oak-600)]">No surprises in the invoice.</span>
        </h2>
        <p className="text-[var(--fg-muted)] text-lg leading-relaxed max-w-2xl mb-12">
          3D work is quoted up front. If we've scoped it, that's the price. If you want extra rounds or extra
          angles, we quote them in writing before we do the work.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-sm p-8 flex flex-col ${
                t.featured
                  ? "bg-[var(--graphite-900)] text-white shadow-[var(--shadow-lg)] md:-translate-y-4"
                  : "bg-[var(--surface-1)] border border-[var(--border)]"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-8 bg-[var(--oak-500)] text-[var(--graphite-900)] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                  {t.tag}
                </div>
              )}
              {!t.featured && (
                <div className="text-[10px] uppercase tracking-widest text-[var(--fg-subtle)] mb-4">{t.tag}</div>
              )}
              <div className="font-display text-2xl mb-2">{t.name}</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`font-display text-4xl ${t.featured ? "text-[var(--oak-300)]" : "text-[var(--oak-600)]"}`}>{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/60" : "text-[var(--fg-muted)]"}`}>{t.unit}</span>
              </div>
              <p className={`leading-relaxed mb-6 ${t.featured ? "text-white/75" : "text-[var(--fg-muted)]"}`}>{t.body}</p>
              <ul className={`space-y-3 mb-8 text-sm ${t.featured ? "text-white/85" : "text-[var(--fg)]"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start">
                    <svg className={`w-4 h-4 mt-1 flex-shrink-0 ${t.featured ? "text-[var(--oak-300)]" : "text-[var(--oak-500)]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href={t.href}
                  variant={t.featured ? "dark" : "liquid"}
                  magnetic
                  className="w-full"
                >{t.cta} →</Button>
                {!t.featured && <p className="text-xs text-[var(--fg-subtle)] mt-3 text-center">Design fee 100% deductible if built with Woodex.</p>}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--fg-muted)] mt-10">
          Not sure which you need?{" "}
          <Link href="/consultation" className="underline underline-offset-4 text-[var(--oak-600)]">Book a studio consult</Link>
          {" "}— 30 minutes, free, with one of our 3D leads.
        </p>
      </div>
    </section>
  );
}
