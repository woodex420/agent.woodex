"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Section 06 — Industries (PRD)
 * 8 sectors as typographic rail (hover reveals underline + arrow).
 */
const INDUSTRIES = [
  { name: "Corporate & Offices", href: "/services/corporate" },
  { name: "IT & Technology", href: "/services/commercial" },
  { name: "Retail & Showrooms", href: "/services/retail" },
  { name: "Restaurants & Cafés", href: "/services/retail" },
  { name: "Healthcare", href: "/services/commercial" },
  { name: "Education", href: "/services/commercial" },
  { name: "Developers", href: "/services/turnkey" },
  { name: "Residential", href: "/services/residential" },
];

export default function IndustriesRail() {
  return (
    <section className="section-pad bg-[var(--bg)] relative">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="kicker mb-6">Industries</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Different businesses.
              <span className="block italic-serif text-[var(--brass)]">Different spaces.</span>
              <span className="block">One Design + Build approach.</span>
            </h2>
          </div>
          <Link
            href="/industries"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--brass)] transition-colors shrink-0"
          >
            All industries <span className="arrow">→</span>
          </Link>
        </div>

        <div className="border-t border-[var(--border)]">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={ind.href}
                className="group relative flex items-center justify-between py-5 md:py-6 border-b border-[var(--border)] hover:pl-4 transition-all duration-500"
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="font-mono text-xs text-[var(--fg-subtle)] tabular-nums hidden sm:block">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight transition-colors group-hover:text-[var(--brass)]">
                    {ind.name}
                  </h3>
                </div>
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)] group-hover:bg-[var(--brass)] group-hover:text-white group-hover:border-[var(--brass)] transition-all">
                  <span className="arrow group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
