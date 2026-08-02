"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/config";
import type { ServiceContent } from "@/lib/content/services";

export default function ServiceHero({ service, related }: { service: ServiceContent; related: { slug: string; title: string }[] }) {
  return (
    <section className="relative min-h-[90vh] text-white overflow-hidden noise">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ background: service.heroImg }}
      />
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ background: service.heroImg }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Breadcrumb */}
      <div className="container-x pt-[calc(var(--nav-h)+1.5rem)] relative z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-white">Services</Link>
          <span>/</span>
          <span className="text-white">{service.eyebrow.replace(/^.+\s/, "")}</span>
        </nav>
      </div>

      <div className="container-x relative z-10 flex flex-col justify-end min-h-[70vh] pb-28 md:pb-20 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.3em] text-[var(--oak-300)] mb-5 md:mb-6">
            <span className="w-6 md:w-10 h-px bg-[var(--oak-400)]" />
            {service.eyebrow}
          </div>
          <h1 className="font-display text-[var(--fs-display)] leading-[0.98] md:leading-[0.96] max-w-[15ch] md:max-w-5xl mb-5 md:mb-6">
            {service.title}
            <span className="block italic-serif text-[var(--oak-200)]">{service.italicLine}</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-light mb-8 md:mb-10">
            {service.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5">
            <Button variant="dark" size="lg" magnetic href={service.cta.href} className="w-full sm:w-auto justify-center">
              {service.cta.button} →
            </Button>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-3 text-white/80 hover:text-white transition">
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-sm flex-shrink-0">📞</span>
              <span className="text-xs md:text-sm uppercase tracking-widest">{SITE.phoneDisplay}</span>
            </a>
          </div>
        </motion.div>

        {/* Related services chips */}
        {related.length > 0 && (
          <div className="absolute bottom-5 md:bottom-6 left-[var(--gutter)] right-[var(--gutter)] flex flex-wrap gap-1.5 md:gap-2">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 self-center mr-1 md:mr-2">See also:</span>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="text-[10px] md:text-xs uppercase tracking-widest px-2.5 py-1 md:px-3 md:py-1.5 border border-white/20 rounded-full text-white/70 hover:bg-white/10 hover:text-white hover:border-white/40 transition"
              >
                {r.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
