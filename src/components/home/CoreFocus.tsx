"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/**
 * Section 05 — Core Business Focus (PRD)
 * Three P1 cards: Office Fit-Out · Corporate Interiors · Workplace Strategy
 */
const CARDS = [
  {
    tag: "P1",
    title: "Office Fit-Out",
    body: "Complete workplace transformation from shell to working floor — design, joinery, MEP, furniture, handover. Single contract, single timeline.",
    href: "/services/office-fit-out",
    img: "/images/svc-commercial.jpg",
    metric: "Shell → Occupied in 10–14 weeks",
  },
  {
    tag: "P1",
    title: "Corporate Interiors",
    body: "Purpose-driven environments aligned with brand, culture and operating requirements — from HQ floors to multi-site rollouts.",
    href: "/services/corporate",
    img: "/images/svc-corporate.jpg",
    metric: "Multi-site program delivery",
  },
  {
    tag: "P1",
    title: "Workplace Strategy",
    body: "Spatial planning, capacity modelling and workflow analysis completed before the first concept sketch — so the design answers the right problem.",
    href: "/services/office-fit-out",
    img: "/images/hero-3d.jpg",
    metric: "Strategy before design",
  },
];

export default function CoreFocus() {
  return (
    <section className="section-pad bg-[var(--bg-subtle)] relative">
      <div className="container-x">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="kicker mb-6">Core business focus</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
            Built for the way
            <span className="italic-serif text-[var(--brass)]"> businesses work.</span>
          </h2>
          <p className="mt-6 text-[var(--fg-muted)] text-lg leading-relaxed max-w-2xl">
            Our commercial focus is deliberate: workplaces, corporate interiors and the
            strategic thinking that makes them perform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[var(--bg-elevated)] rounded-[var(--r-lg)] overflow-hidden border border-[var(--border)] hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              <Link href={c.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] bg-[var(--brass)] text-white px-2.5 py-1 font-medium">
                    {c.tag}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl md:text-[1.75rem] mb-3 tracking-tight leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-[var(--fg-muted)] text-[0.95rem] leading-relaxed mb-5">
                    {c.body}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <span className="text-[11px] uppercase tracking-widest text-[var(--brass)] tabular-nums">
                      {c.metric}
                    </span>
                    <span className="arrow text-[var(--fg-muted)] group-hover:text-[var(--brass)] transition-colors">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
