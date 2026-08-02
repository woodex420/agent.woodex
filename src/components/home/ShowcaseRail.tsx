"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  area: string;
  year: string;
  bg: string;
};

const PROJECTS: Project[] = [
  { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", category: "Corporate", location: "Gulberg, Lahore", area: "28,000 sqft", year: "2024", bg: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(60,40,25,0.5)),url(/images/svc-corporate.jpg)" },
  { slug: "packages-mall-flagship", title: "Packages Mall Flagship", category: "Retail", location: "Lahore", area: "4,200 sqft", year: "2024", bg: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(50,35,20,0.5)),url(/images/svc-retail.jpg)" },
  { slug: "dha-residence-2", title: "DHA Phase 5 Residence", category: "Residential", location: "Lahore", area: "8,500 sqft", year: "2023", bg: "linear-gradient(135deg,rgba(30,25,20,0.5),rgba(70,50,30,0.5)),url(/images/svc-residential.jpg)" },
  { slug: "systems-ltd-floor", title: "Systems Ltd — Floor 12", category: "Commercial", location: "IT Heights, Lahore", area: "22,000 sqft", year: "2023", bg: "linear-gradient(160deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-commercial.jpg)" },
  { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg Reno", category: "F&B", location: "Gulberg, Lahore", area: "3,100 sqft", year: "2024", bg: "linear-gradient(110deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/hero-turnkey.jpg)" },
  { slug: "hubl-branch-network", title: "HBL Branch Network", category: "Corporate", location: "12 branches, Punjab", area: "Multiple", year: "2023-24", bg: "linear-gradient(135deg,rgba(30,25,20,0.55),rgba(60,45,30,0.5)),url(/images/svc-corporate.jpg)" },
  { slug: "dha-brand-shop", title: "Defence Raya Brand Shop", category: "Retail", location: "Defence Raya", area: "1,800 sqft", year: "2024", bg: "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(45,34,22,0.5)),url(/images/svc-retail.jpg)" },
];

export default function ShowcaseRail() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
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

  return (
    <section className="section-pad bg-[var(--bg)] overflow-hidden">
      <div className="container-x mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4 md:mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Selected work
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
            Twenty-eight thousand<br />
            <span className="italic-serif text-[var(--oak-600)]">square feet of proof.</span>
          </h2>
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          <Link href="/portfolio" className="lg:order-3 lg:ml-4 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--oak-600)] transition">
            Full portfolio →
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous project"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition touch-manipulation"
            >←</button>
            <button
              onClick={scrollNext}
              aria-label="Next project"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition touch-manipulation"
            >→</button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef} data-lenis-prevent>
        <div className="flex gap-4 md:gap-6 lg:gap-8 select-none pl-[var(--gutter)] pr-[25vw] md:px-[4vw]">
          {PROJECTS.map((p, i) => {
            const isActive = i === selected;
            return (
              <div key={p.slug} className="flex-[0_0_80%] sm:flex-[0_0_55%] lg:flex-[0_0_42%] xl:flex-[0_0_32%]">
                <Link href={`/portfolio/${p.slug}`} className="block group">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-sm transition-[transform,box-shadow] duration-500 ${isActive ? "scale-100 shadow-[var(--shadow-lg)]" : "scale-95 opacity-70"}`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ background: p.bg }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="absolute inset-0 mix-blend-overlay opacity-30"
                           style={{ backgroundImage: "radial-gradient(circle at 40% 30%, rgba(210,187,142,0.35), transparent 60%)" }} />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-5 left-5 right-5 flex justify-between text-white/70 text-xs uppercase tracking-widest">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2 group-hover:text-[var(--oak-200)] transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span>{p.location}</span>
                        <span>{p.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
