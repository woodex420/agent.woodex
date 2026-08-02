"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import EditableText from "@/components/builder/EditableText";
import { sanityAttr as attr } from "@/components/builder/sanityAttr";

type FaqItem = { question: string; answer: string };

const DEFAULT_FAQS: FaqItem[] = [
  { question: "How much does a full interior cost in Lahore?", answer: "Residential work typically lands PKR 3,500–6,500/sqft; commercial office PKR 2,800–5,200/sqft; turnkey PKR 4,500–8,000/sqft. We will send you a range within 48 hours of a 45-minute site visit." },
  { question: "How long does a build take?", answer: "A 5,000 sqft office typically takes 10–14 weeks. A 1-kanal home 14–20 weeks. We put the handover date in the contract and pay PKR 25,000 per week of delay." },
  { question: "Do you do design-only, or do you build too?", answer: "Both. Our 3D studio does photoreal renders as a standalone service, but 90% of clients ask us to build what we designed because that is where the guarantee is strongest." },
  { question: "Do you match renders to the finished build?", answer: "Yes. We guarantee the finished space matches the approved 3D walkthrough — that is the core of our contract." },
];

export default function FAQSection({
  eyebrow = "Straight answers",
  heading = "The questions",
  headingLine2 = "you're Googling.",
  intro,
  ctaLabel = "Ask us anything →",
  ctaHref = "/consultation",
  items,
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingLine2?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: FaqItem[];
  sanityScope?: import("../EditableText").SanityScope | null;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = items && items.length ? items : DEFAULT_FAQS;
  const introText = intro ?? "Other studios hide pricing and timelines behind discovery calls. Here's what clients actually ask before they sign — and what we actually tell them.";
  const E = EditableText;

  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
            <br />
            <E as="span" path={["headingLine2"]} sanityScope={sanityScope} className="italic-serif text-[var(--oak-600)]">{headingLine2}</E>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6 max-w-md">
            <E as="span" path={["intro"]} sanityScope={sanityScope}>{introText}</E>
          </p>
          <Link href={ctaHref} className="text-[var(--oak-600)] text-sm uppercase tracking-widest font-medium hover:underline">
            <E as="span" path={["ctaLabel"]} sanityScope={sanityScope}>{ctaLabel}</E>
          </Link>
        </div>

        <div className="lg:col-span-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} data-sanity={attr(sanityScope, ["items", i])}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-4 group min-h-[48px] touch-manipulation"
                >
                  <div className="flex gap-3 md:gap-5 items-start">
                    <span className="font-mono text-xs text-[var(--oak-500)] mt-2 tracking-widest flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">
                      <E as="span" path={["items", i, "question"]} sanityScope={sanityScope}>{f.question}</E>
                    </h3>
                  </div>
                  <span
                    className={`w-9 h-9 md:w-8 md:h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center flex-shrink-0 transition-transform duration-500 mt-1 ${isOpen ? "rotate-45 bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-7 pl-10 md:pl-[3.25rem] pr-0 md:pr-10 text-[var(--fg-muted)] text-base md:text-lg leading-relaxed max-w-2xl">
                        <E as="span" path={["items", i, "answer"]} sanityScope={sanityScope}>{f.answer}</E>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
