"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function BlogCtaSection({
  eyebrow = "Free guide",
  heading = "Want the 2025 cost guide as a PDF?",
  sub,
  ctaLabel = "Send me the guide",
  theme = "oak",
}: {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  theme?: "oak" | "graphite" | "paper";
}) {
  const bg =
    theme === "graphite"
      ? "bg-[var(--graphite-900)] text-white"
      : theme === "paper"
      ? "bg-[var(--surface-1)] text-[var(--graphite-900)]"
      : "bg-[var(--oak-500)] text-[var(--graphite-900)]";
  const body =
    sub ??
    "Get the per-sqft cost bands for residential, commercial, retail, and turnkey — plus a 12-point checklist for hiring a contractor in Lahore.";

  return (
    <section className={`section-pad ${bg} noise relative overflow-hidden`}>
      <div className="container-x max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-xs uppercase tracking-[0.25em] opacity-70 mb-4">{eyebrow}</div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-4">{heading}</h2>
          <p className="text-lg opacity-85 leading-relaxed mb-8 max-w-xl">{body}</p>
          <Button variant="dark" size="lg" magnetic href="/consultation" iconRight={<span>→</span>}>
            {ctaLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
