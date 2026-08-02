"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import EditableText from "../EditableText";
import { sanityAttr } from "../sanityAttr";
import type { SanityScope } from "../EditableText";
import { imageUrl } from "@/sanity/client";

export default function HeroSection({
  eyebrow,
  heading,
  headingItalic,
  sub,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  image,
  imageAlt,
  layout = "text-only",
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: any;
  imageAlt?: string;
  layout?: "text-only" | "two-column" | "centered";
  sanityScope?: SanityScope | null;
}) {
  const imgSrc = typeof image === "string" ? image : imageUrl(image, { width: 1200 });
  const alt = imageAlt ?? (typeof image === "object" ? image?.alt : "") ?? "";
  const isTwoCol = layout === "two-column" && imgSrc;
  const isCentered = layout === "centered";
  const E = EditableText;

  return (
    <section className={`pt-[calc(var(--nav-h)+2rem)] md:pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-20 bg-[var(--bg)] ${isCentered ? "text-center" : ""}`}>
      <div className={`container-x ${isTwoCol ? "grid lg:grid-cols-12 gap-10 lg:gap-16 items-center" : ""}`}>
        <div className={isTwoCol ? "lg:col-span-7" : isCentered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.3em] text-[var(--fg-muted)] mb-5 md:mb-6 ${isCentered ? "justify-center" : ""}`}
            >
              <span className="w-6 md:w-8 h-px bg-[var(--oak-500)]" />
              <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[var(--fs-display)] leading-[0.98] tracking-tight mb-6 md:mb-8"
          >
            <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
            {headingItalic && <span className="italic-serif text-[var(--oak-600)]"> <E as="span" path={["headingItalic"]} sanityScope={sanityScope}>{headingItalic}</E></span>}
          </motion.h1>
          {sub && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[var(--fg-muted)] leading-relaxed mb-8 md:mb-10"
            >
              <E as="span" path={["sub"]} sanityScope={sanityScope}>{sub}</E>
            </motion.p>
          )}
          {(ctaLabel || secondaryLabel) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 ${isCentered ? "justify-center" : ""}`}
            >
              {ctaLabel && ctaHref && (
                <Button variant="dark" size="lg" magnetic href={ctaHref} iconRight={<span>→</span>} className="w-full sm:w-auto justify-center">
                  <E as="span" path={["ctaLabel"]} sanityScope={sanityScope}>{ctaLabel}</E>
                </Button>
              )}
              {secondaryLabel && secondaryHref && (
                <a href={secondaryHref} className="text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--oak-600)] transition">
                  <E as="span" path={["secondaryLabel"]} sanityScope={sanityScope}>{secondaryLabel}</E>
                </a>
              )}
            </motion.div>
          )}
        </div>
        {isTwoCol && imgSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-sm"
            data-sanity={sanityAttr(sanityScope, ["image"])}
          >
            <Image
              src={imgSrc}
              alt={alt}
              fill
              sizes="(min-width:1024px) 38vw, 100vw"
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
