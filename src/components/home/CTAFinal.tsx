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
    <section ref={ref} className="relative overflow-hidden bg-[var(--oak-500)] text-[var(--graphite-900)] noise">
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.25), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(200,90,59,0.35), transparent 55%)",
          }}
        />
      </motion.div>
      <div className="container-x section-pad relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="kicker mb-6 md:mb-8 text-[var(--graphite-900)]/70">
              The ask
            </div>
            <h2 className="font-display text-[var(--fs-h1)] leading-[0.98] mb-6 md:mb-8 max-w-[15ch] md:max-w-none">
              Stop guessing what your<br className="hidden md:block" />
              <span className="italic-serif">space will look like.</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-10 text-[var(--graphite-900)]/85">
              Book a free 45-minute site visit. We'll walk the space, ask about how you work or live,
              and send you a budget range within {SLA.budgetRangeHours} hours. No pitch deck. No follow-up spam.
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
                Get my budget range in {SLA.budgetRangeHours} hours
              </Button>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-3 text-[var(--graphite-900)] font-medium"
              >
                <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--graphite-900)]/30 flex items-center justify-center flex-shrink-0">
                  <span>📞</span>
                </span>
                <span className="text-sm md:text-base">Or call {SITE.phoneDisplay}</span>
              </a>
            </div>

            <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-[var(--graphite-900)]/20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { t: "45 min", s: "Site visit" },
                { t: `${SLA.budgetRangeHours} hrs`, s: "Budget range" },
                { t: "Free", s: "No obligation" },
                { t: `${SLA.yearsOperating} yrs`, s: "Track record" },
              ].map((x) => (
                <div key={x.s}>
                  <div className="font-display text-2xl md:text-3xl">{x.t}</div>
                  <div className="text-[var(--graphite-900)]/70 text-[10px] md:text-xs uppercase tracking-widest mt-1">{x.s}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
