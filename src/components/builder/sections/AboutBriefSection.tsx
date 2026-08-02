"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import EditableText from "@/components/builder/EditableText";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 40, stiffness: 120, mass: 0.8 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) value.set(target); }, [inView, target, value]);
  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return unsub;
  }, [spring]);
  return <span ref={ref}>{Math.round(display).toLocaleString()}{suffix}</span>;
}

type Stat = { value: number; suffix?: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: 240, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "On-time handover" },
  { value: 0, suffix: "", label: "Scope disputes, 2023-25" },
];

export default function AboutBriefSection({
  eyebrow = "The problem with interiors",
  heading = "You don't fear",
  headingItalic = "bad taste.",
  headingLine2 = "You fear",
  headingLine2Italic = "the bill. The date. The surprise.",
  paragraphs,
  imageEyebrowLeft = "Est. 2014",
  imageEyebrowRight = "Lahore, PK",
  imageCaption = "Craft before brand.",
  floatingStatValue = "11",
  floatingStatSuffix = "yrs",
  floatingStatText = "Designing and building spaces that actually get built — as drawn.",
  stats,
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  headingLine2?: string;
  headingLine2Italic?: string;
  paragraphs?: string[];
  image?: any;
  imageEyebrowLeft?: string;
  imageEyebrowRight?: string;
  imageCaption?: string;
  floatingStatValue?: string;
  floatingStatSuffix?: string;
  floatingStatText?: string;
  stats?: Stat[];
  sanityScope?: import("../EditableText").SanityScope | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const bodyParas = paragraphs && paragraphs.length
    ? paragraphs
    : [
        "Most studios sell adjectives. Custom. Premium. Innovative. They show you a render, take a deposit, then start negotiating. The finish changes. The date moves. The bill grows.",
        "We sell certainty. You approve a photoreal 3D walkthrough. We lock the scope, the price, and the handover date — in writing. Then we build exactly that.",
      ];
  const statsList = stats && stats.length === 3 ? stats : DEFAULT_STATS;
  const E = EditableText;

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)] relative">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div style={{ y: imgY }} className="lg:col-span-6 relative aspect-[4/5] overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/about-craft.jpg)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute top-6 left-6 right-6 flex justify-between text-white/90 text-xs uppercase tracking-[0.25em]">
            <span>{imageEyebrowLeft}</span>
            <span>{imageEyebrowRight}</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="font-display text-4xl italic-serif">{imageCaption}</div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-6 bottom-6 md:left-auto md:-right-4 md:bottom-10 bg-[var(--surface-1)] border border-[var(--border)] p-5 md:p-6 shadow-[var(--shadow-lg)] w-[calc(100%-3rem)] md:w-[230px]"
          >
            <div className="font-display text-5xl text-[var(--oak-600)] leading-none">{floatingStatValue}<span className="text-[var(--fg)]">{floatingStatSuffix}</span></div>
            <div className="text-sm text-[var(--fg-muted)] mt-2">{floatingStatText}</div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: textY }} className="lg:col-span-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-6">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
            <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>{" "}
            <E as="span" path={["headingItalic"]} sanityScope={sanityScope} className="italic-serif text-[var(--oak-600)]">{headingItalic}</E>
            <br />
            <E as="span" path={["headingLine2"]} sanityScope={sanityScope}>{headingLine2}</E>{" "}
            <E as="span" path={["headingLine2Italic"]} sanityScope={sanityScope} className="italic-serif">{headingLine2Italic}</E>
          </h2>
          <div className="space-y-5 text-lg text-[var(--fg-muted)] leading-relaxed max-w-xl">
            {bodyParas.map((p, i) => (
              <p key={i}>
                <E as="span" path={["paragraphs", i]} sanityScope={sanityScope}>{p}</E>
              </p>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[var(--border)]">
            {statsList.map((s, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl text-[var(--oak-600)] leading-none">
                  <Counter target={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--fg-muted)] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
