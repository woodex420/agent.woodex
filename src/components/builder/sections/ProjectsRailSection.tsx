/**
 * ProjectsRailSection — typed CMS-driven adapter for section.projectsRail.
 *
 * Phase 5: data-bound carousel. Uses Embla; renders either manual picks or
 * automatically-resolved projects. Server component for initial render;
 * carousel interaction via client wrapper below.
 */
"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { imageUrl } from "@/sanity/client";
import EditableText from "../EditableText";
import { sanityAttr } from "../sanityAttr";
import type { SanityScope } from "../EditableText";

interface Project {
  title: string;
  slug?: string;
  category?: string;
  location?: string;
  area?: string;
  year?: string;
  heroImg?: any;
  image?: any;
}

export interface ProjectsRailProps {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  ctaLabel?: string;
  ctaHref?: string;
  source?: "latest" | "featured" | "category" | "manual";
  count?: number;
  category?: string;
  /** Resolved project documents. */
  items?: Project[];
  picks?: Project[];
  sanityScope?: SanityScope | null;
}

export default function ProjectsRailSection({
  eyebrow = "Selected work",
  heading = "Twenty-eight thousand",
  headingItalic = "square feet of proof.",
  ctaLabel = "Full portfolio →",
  ctaHref = "/portfolio",
  items,
  picks,
  sanityScope,
}: ProjectsRailProps) {
  const projects: Project[] = Array.isArray(picks) && picks.length ? picks : items ?? [];

  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: true,
  });
  const [selected, setSelected] = useState(0);
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    return () => { embla.off("select", onSelect); };
  }, [embla]);

  const E = EditableText;

  return (
    <section className="section-pad bg-[var(--bg)] overflow-hidden">
      <div className="container-x mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6">
        <div>
          {eyebrow && (
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4 md:mb-5" data-sanity={sanityAttr(sanityScope, ["eyebrow"])}>
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
            </div>
          )}
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]" data-sanity={sanityAttr(sanityScope, ["heading"])}>
            <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
            {headingItalic && (
              <>
                <br />
                <span className="italic-serif text-[var(--oak-600)]">
                  <E as="span" path={["headingItalic"]} sanityScope={sanityScope}>{headingItalic}</E>
                </span>
              </>
            )}
          </h2>
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          {ctaLabel && ctaHref && (
            <Link href={ctaHref} className="lg:order-3 lg:ml-4 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--oak-600)] transition" data-sanity={sanityAttr(sanityScope, ["ctaLabel"])}>
              <E as="span" path={["ctaLabel"]} sanityScope={sanityScope}>{ctaLabel}</E>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <button onClick={scrollPrev} aria-label="Previous project" className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition touch-manipulation">←</button>
            <button onClick={scrollNext} aria-label="Next project" className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition touch-manipulation">→</button>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="container-x">
          <div className="rounded-sm bg-[var(--surface-1)] aspect-[16/7] flex items-center justify-center text-[var(--fg-muted)]">
            Add projects in Sanity →
          </div>
        </div>
      ) : (
        <div className="embla overflow-hidden" ref={emblaRef} data-lenis-prevent>
          <div className="embla__container flex gap-4 md:gap-6 px-[4vw] md:px-[calc((100%-var(--container))/2)]">
            {projects.map((p, i) => {
              const img = p.heroImg ?? p.image;
              const bg = img
                ? (typeof img === "string"
                    ? img
                    : imageUrl(img, { width: 1400 })) ?? "/images/svc-commercial.jpg"
                : "/images/svc-commercial.jpg";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`embla__slide flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_42%] ${i === selected ? "" : "opacity-80"}`}
                >
                  <Link href={p.slug ? `/portfolio/${p.slug}` : "#"} className="block group">
                    <div
                      className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden bg-[var(--surface-1)]"
                      style={{
                        background: `linear-gradient(180deg,rgba(10,10,10,0) 50%,rgba(10,10,10,0.7) 100%),url(${bg}) center/cover no-repeat`,
                      }}
                    >
                      <div className="absolute top-5 left-5 font-mono text-xs text-white/70 tracking-widest">
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </div>
                      <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--graphite-900)] transition-all duration-500 group-hover:rotate-45 text-white">
                        <span className="text-lg leading-none">+</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                          {p.category && <span>{p.category}</span>}
                          {p.year && <><span className="w-4 h-px bg-white/40" /><span>{p.year}</span></>}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">{p.title}</h3>
                        <div className="text-xs md:text-sm text-white/70 flex items-center gap-3">
                          {p.location && <span>{p.location}</span>}
                          {p.area && <><span className="w-3 h-px bg-white/30" /><span>{p.area}</span></>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
