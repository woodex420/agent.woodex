"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EditableText from "@/components/builder/EditableText";
import { sanityAttr as attr } from "@/components/builder/sanityAttr";

type Metric = { value: string; label: string };
type Testimonial = { quote: string; name: string; role?: string; project?: string };

const DEFAULT_METRICS: Metric[] = [
  { value: "240+", label: "Projects delivered since 2014" },
  { value: "98%", label: "Handover on contract date" },
  { value: "4.9/5", label: "Average client rating" },
  { value: "72%", label: "Revenue from repeat/referral" },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: "They handed over on a Tuesday. We moved 180 staff in on the Wednesday. Everything worked. I've never seen that before.", name: "Ayesha Malik", role: "COO, Systems Ltd", project: "22,000 sqft IT floor" },
  { quote: "The Friday Report is the reason we hired them. Three months in, my board knew exactly what was happening every week — including the bad weeks.", name: "Omar Sheikh", role: "Director, Nishat Hospitality", project: "HQ fit-out" },
  { quote: "I built three homes before. Woodex was the first one that actually looked like the pictures. Not close. Like the pictures.", name: "Fatima Riaz", role: "Homeowner", project: "DHA Phase 5 residence" },
];

export default function ProofStackSection({
  eyebrow = "Proof, not adjectives",
  heading = "Don't read our",
  headingLine2 = "marketing copy.",
  headingLine3 = "Read our clients.",
  intro,
  ctaLabel = "See the full portfolio →",
  ctaHref = "/portfolio",
  metrics,
  testimonials,
  ratingText = "4.9 from 137 Google reviews · 150+ target end-Q4",
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingLine2?: string;
  headingLine3?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  metrics?: Metric[];
  testimonials?: Testimonial[];
  ratingText?: string;
  sanityScope?: import("../EditableText").SanityScope | null;
}) {
  const E = EditableText;
  const m = metrics && metrics.length ? metrics : DEFAULT_METRICS;
  const t = testimonials && testimonials.length ? testimonials : DEFAULT_TESTIMONIALS;
  const introText = intro ?? "We're not the cheapest studio in Lahore. We're the one that hands over on the date in the contract, matches the render you approved, and texts you back.";

  return (
    <section className="section-pad bg-[var(--graphite-900)] text-white relative noise overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
              <br />
              <E as="span" path={["headingLine2"]} sanityScope={sanityScope} className="italic-serif text-[var(--oak-300)]">{headingLine2}</E>
              <br />
              <E as="span" path={["headingLine3"]} sanityScope={sanityScope}>{headingLine3}</E>
            </h2>
            <p className="text-white/70 text-lg max-w-md leading-relaxed mb-8">
              <E as="span" path={["intro"]} sanityScope={sanityScope}>{introText}</E>
            </p>
            <Link href={ctaHref} className="text-[var(--oak-300)] text-sm uppercase tracking-widest font-medium hover:underline">
              <E as="span" path={["ctaLabel"]} sanityScope={sanityScope}>{ctaLabel}</E>
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 rounded-sm">
              {m.slice(0, 4).map((x, i) => (
                <motion.div
                  key={i}
                  data-sanity={attr(sanityScope, ["metrics", i])}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 border-r border-b md:border-b-0 border-white/10 last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="font-display text-4xl md:text-5xl text-[var(--oak-300)] leading-none mb-2">
                    <E as="span" path={["metrics", i, "value"]} sanityScope={sanityScope}>{x.value}</E>
                  </div>
                  <div className="text-xs text-white/60 leading-relaxed">
                    <E as="span" path={["metrics", i, "label"]} sanityScope={sanityScope}>{x.label}</E>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5">
              {t.map((r, i) => (
                <motion.figure
                  key={i}
                  data-sanity={attr(sanityScope, ["testimonials", i])}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/10 p-7 md:p-9 rounded-sm bg-white/[0.02] relative"
                >
                  <span className="absolute -top-4 left-6 text-[var(--oak-400)] font-display text-7xl leading-none" aria-hidden>&ldquo;</span>
                  <blockquote className="font-display text-xl md:text-2xl leading-snug mb-6 text-white/95">
                    <E as="span" path={["testimonials", i, "quote"]} sanityScope={sanityScope}>{r.quote}</E>
                  </blockquote>
                  <figcaption className="flex items-end justify-between gap-4 flex-wrap pt-4 border-t border-white/10">
                    <div>
                      <div className="font-medium">
                        <E as="span" path={["testimonials", i, "name"]} sanityScope={sanityScope}>{r.name}</E>
                      </div>
                      {r.role && <div className="text-sm text-white/60">
                        <E as="span" path={["testimonials", i, "role"]} sanityScope={sanityScope}>{r.role}</E>
                      </div>}
                    </div>
                    {r.project && <div className="text-xs uppercase tracking-widest text-[var(--oak-300)]">
                      <E as="span" path={["testimonials", i, "project"]} sanityScope={sanityScope}>{r.project}</E>
                    </div>}
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            {ratingText && (
              <div className="flex items-center gap-4 pt-4 text-white/60 text-sm">
                <div className="flex items-center gap-1 text-[var(--oak-300)]">
                  {[0,1,2,3,4].map((i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                  ))}
                </div>
                <span>{ratingText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
