"use client";

import Button from "@/components/ui/Button";
import EditableText from "@/components/builder/EditableText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE, SLA } from "@/lib/config";

type Stat = { value: string; label: string };

export default function CTAFinalSection({
  eyebrow = "The ask",
  heading = "Stop guessing what your",
  headingLine2 = "space will look like.",
  body,
  ctaLabel,
  ctaHref = "/consultation",
  secondaryLabel,
  secondaryHref,
  stats,
  theme = "oak",
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingLine2?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: Stat[];
  theme?: "oak" | "graphite" | "paper";
  /** Injected by PageBuilder when rendered inside a Sanity-managed page. */
  sanityScope?: import("../EditableText").SanityScope | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const themeClasses =
    theme === "graphite"
      ? "bg-[var(--graphite-900)] text-white"
      : theme === "paper"
      ? "bg-[var(--surface-1)] text-[var(--graphite-900)]"
      : "bg-[var(--oak-500)] text-[var(--graphite-900)]";

  const defaultStats: Stat[] = [
    { value: "45 min", label: "Site visit" },
    { value: `${SLA.budgetRangeHours} hrs`, label: "Budget range" },
    { value: "Free", label: "No obligation" },
    { value: `${SLA.yearsOperating} yrs`, label: "Track record" },
  ];
  const displayStats = stats && stats.length ? stats : defaultStats;
  const bodyText =
    body ??
    `Book a free 45-minute site visit. We'll walk the space, ask about how you work or live, and send you a budget range within ${SLA.budgetRangeHours} hours. No pitch deck. No follow-up spam.`;
  const primaryLabel = ctaLabel ?? `Get my budget range in ${SLA.budgetRangeHours} hours`;
  const secLabel = secondaryLabel ?? `Or call ${SITE.phoneDisplay}`;
  const secHref = secondaryHref ?? `tel:${SITE.phoneTel}`;
  const accentMuted = theme === "graphite" ? "text-white/70" : "text-[var(--graphite-900)]/70";
  const borderMuted = theme === "graphite" ? "border-white/20" : "border-[var(--graphite-900)]/20";
  const E = EditableText;

  return (
    <section ref={ref} className={`relative overflow-hidden ${themeClasses} noise`}>
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "graphite"
                ? "radial-gradient(ellipse at 20% 20%, rgba(166,128,74,0.25), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(200,90,59,0.25), transparent 55%)"
                : "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.25), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(200,90,59,0.35), transparent 55%)",
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
            <div className={`flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.25em] mb-6 md:mb-8 ${accentMuted}`}>
              <span className={`w-6 md:w-8 h-px ${theme === "graphite" ? "bg-[var(--oak-400)]" : "bg-[var(--graphite-900)]"}`} />
              <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
            </div>
            <h2 className="font-display text-[var(--fs-h1)] leading-[0.98] mb-6 md:mb-8 max-w-[15ch] md:max-w-none">
              <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
              <br className="hidden md:block" />
              <E as="span" path={["headingLine2"]} sanityScope={sanityScope} className="italic-serif">{headingLine2}</E>
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-10 ${accentMuted}`}>
              <E as="span" path={["body"]} sanityScope={sanityScope}>{bodyText}</E>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <Button
                variant="dark"
                size="lg"
                magnetic
                href={ctaHref}
                iconRight={<span>→</span>}
                className="w-full sm:w-auto justify-center"
              >
                <E as="span" path={["ctaLabel"]} sanityScope={sanityScope}>{primaryLabel}</E>
              </Button>
              <a href={secHref} className="inline-flex items-center gap-3 font-medium">
                <span className={`w-11 h-11 md:w-12 md:h-12 rounded-full border ${borderMuted} flex items-center justify-center flex-shrink-0`}>
                  <span>📞</span>
                </span>
                <span className="text-sm md:text-base">
                  <E as="span" path={["secondaryLabel"]} sanityScope={sanityScope}>{secLabel}</E>
                </span>
              </a>
            </div>

            <div className={`mt-10 md:mt-14 pt-6 md:pt-8 border-t ${borderMuted} grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`}>
              {displayStats.slice(0, 4).map((x, i) => (
                <div key={i}>
                  <div className="font-display text-2xl md:text-3xl">
                    <E as="span" path={["stats", i, "value"]} sanityScope={sanityScope}>{x.value}</E>
                  </div>
                  <div className={`${accentMuted} text-[10px] md:text-xs uppercase tracking-widest mt-1`}>
                    <E as="span" path={["stats", i, "label"]} sanityScope={sanityScope}>{x.label}</E>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
