"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/config";
import type { ServiceContent } from "@/lib/content/services";
import { useMemo } from "react";

/** Parse url(...) out of a CSS background string like "linear-gradient(...),url(/images/x.jpg)" */
function extractImg(cssBg: string): string {
  const m = cssBg.match(/url\(([^)]+)\)/);
  return m ? m[1].replace(/['"]/g, "") : "/images/svc-commercial.jpg";
}

export default function ServiceHero({ service, related }: { service: ServiceContent; related: { slug: string; title: string }[] }) {
  const imgSrc = useMemo(() => extractImg(service.heroImg), [service.heroImg]);
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[90svh] text-white overflow-hidden noise">
      <motion.div
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
        aria-hidden
      >
        <Image
          src={imgSrc}
          alt={`${service.eyebrow} by Woodex Interior, Lahore`}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Warm light-leak for tonal depth */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(210,187,142,0.25), transparent 45%), radial-gradient(circle at 75% 75%, rgba(200,90,59,0.18), transparent 55%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

      {/* Breadcrumb */}
      <div className="container-x pt-[calc(var(--nav-h)+1.5rem)] relative z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <span aria-hidden>/</span>
          <span className="text-white">{service.eyebrow}</span>
        </nav>
      </div>

      <div className="container-x relative z-10 flex flex-col justify-end min-h-[70svh] pb-32 md:pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker text-[var(--oak-300)] mb-5 md:mb-6">
            <span className="w-6 md:w-10 h-px bg-[var(--oak-400)]" />
            {service.eyebrow}
          </div>
          <h1 className="font-display text-[var(--fs-display)] leading-[1.02] md:leading-[0.98] max-w-[13ch] md:max-w-5xl mb-5 md:mb-6 text-balance">
            {service.title}
            <span className="block italic-serif text-[var(--oak-200)]">{service.italicLine}</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/85 max-w-2xl leading-relaxed font-light mb-8 md:mb-10 text-balance">
            {service.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5">
            <Button variant="dark" size="lg" magnetic href={service.cta.href} className="w-full sm:w-auto justify-center">
              {service.cta.button}
            </Button>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-3 text-white/80 hover:text-white transition group"
            >
              <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs md:text-sm uppercase tracking-widest tabular-nums">{SITE.phoneDisplay}</span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/50 mt-0.5">
                  WhatsApp · ~15 min reply
                </span>
              </span>
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
