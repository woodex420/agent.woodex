"use client";

import Button from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE, SLA } from "@/lib/config";

export default function CTAFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--walnut)] text-[var(--ivory)] noise">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(169,130,82,0.45), transparent 55%)",
          }}
        />
      </motion.div>
      <div className="container-x section-pad relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="kicker mb-6 md:mb-8 text-[var(--ivory)]/70" data-kicker-invert>
              Start your project
            </div>
            <h2 className="font-display text-[var(--fs-h1)] leading-[1.0] mb-6 md:mb-8 max-w-[15ch] md:max-w-none">
              Have a space
              <span className="italic-serif text-[var(--wood)]"> in mind?</span>
            </h2>
            <p className="text-lg md:text-xl leading-[1.55] max-w-2xl mb-8 md:mb-10 text-[var(--ivory)]/80">
              Tell us what you're planning. We'll help you turn the idea into a clear
              design and build direction — with a budget range within {SLA.budgetRangeHours} hours.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <Button
                variant="dark"
                size="lg"
                magnetic
                href="/consultation"
                iconRight={<span>→</span>}
                className="w-full sm:w-auto justify-center"
              >
                Start your project
              </Button>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                className="inline-flex items-center gap-3 text-[var(--ivory)]/90 hover:text-[var(--ivory)] transition-colors font-medium"
              >
                <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--ivory)]/30 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.2-.6.2s-.7.9-.9 1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.2.3-.4.1-.1 0-.3 0-.4s-.6-1.4-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.5-.3M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2z"/>
                  </svg>
                </span>
                <span className="text-sm md:text-base">Or WhatsApp · ~15 min reply</span>
              </a>
            </div>

            <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-[var(--ivory)]/20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { t: "15–20 min", s: "Discovery call" },
                { t: `${SLA.budgetRangeHours} hrs`, s: "Budget range" },
                { t: `${SLA.formalQuoteDays} days`, s: "Formal quote" },
                { t: `${SLA.onTimeRatePct}%`, s: "On contract date" },
              ].map((x) => (
                <div key={x.s}>
                  <div className="font-display text-2xl md:text-3xl tabular-nums">{x.t}</div>
                  <div className="text-[var(--ivory)]/70 text-[10px] md:text-xs uppercase tracking-widest mt-1">{x.s}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
