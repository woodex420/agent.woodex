"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Cinematic Hero — Woodex Interior
 * 5 layers:
 *  1. Ken Burns background image (cross-fades between slides; active slide uses next/image for LCP)
 *  2. Gradient wash (darkens for legibility)
 *  3. Clip-path shape wipe (accent color sweep on slide change)
 *  4. Split-text reveal (headline, animated per-slide)
 *  5. Mouse-parallax UI chrome (scroll hint, badge)
 *
 * Motion: prefers-reduced-motion respected via Framer's useReducedMotion.
 */

type Slide = {
  eyebrow: string;
  line1: string;
  line2: string;
  line3?: string;
  sub: string;
  cta: string;
  ctaHref: string;
  imageSrc: string;
  accent: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Commercial Interiors",
    line1: "A boardroom",
    line2: "that closes deals",
    line3: "before the first slide.",
    sub: "From 500 sqft cafés to 40,000 sqft headquarters — built on a fixed date, for a fixed price, signed off in 3D first.",
    cta: "See commercial work",
    ctaHref: "/services/commercial",
    imageSrc: "/images/hero-commercial.jpg",
    accent: "#a6804a",
  },
  {
    eyebrow: "Residential Design",
    line1: "Your home.",
    line2: "Exactly",
    line3: "as you pictured it.",
    sub: "Not an interpretation. Not close. Photoreal 3D walkthroughs you approve before a single nail is driven.",
    cta: "See residential work",
    ctaHref: "/services/residential",
    imageSrc: "/images/hero-residential.jpg",
    accent: "#c85a3b",
  },
  {
    eyebrow: "3D Studio",
    line1: "See it.",
    line2: "Approve it.",
    line3: "Get exactly that.",
    sub: "Our in-house 3D studio produces renders so precise we guarantee them against the finished build.",
    cta: "Tour the 3D Studio",
    ctaHref: "/3d-studio",
    imageSrc: "/images/hero-3d.jpg",
    accent: "#d2bb8e",
  },
  {
    eyebrow: "Turnkey Fit-Out",
    line1: "Hand us the keys.",
    line2: "Walk in to a",
    line3: "finished space.",
    sub: "Design, build, furniture, MEP, lighting — single contract, single Gantt, single Friday report every week.",
    cta: "Explore turnkey",
    ctaHref: "/services/turnkey",
    imageSrc: "/images/hero-turnkey.jpg",
    accent: "#bc9a63",
  },
];

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [wipeKey, setWipeKey] = useState(0);
  const reducedMotion = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const px = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const py = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const parallaxX = useTransform(px, [-0.5, 0.5], ["-2%", "2%"]);
  const parallaxY = useTransform(py, [-0.5, 0.5], ["-2%", "2%"]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
      setWipeKey((k) => k + 1);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  function onMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const slide = SLIDES[index];

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-white noise"
    >
      {/* Layer 1: Ken Burns backgrounds — use next/image for all slides, priority on first for LCP */}
      {SLIDES.map((s, i) => {
        const isActive = i === index;
        return (
          <motion.div
            key={`bg-${i}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={isActive
              ? { opacity: 1, scale: reducedMotion.current ? 1 : 1.06 }
              : { opacity: 0 }}
            transition={{ duration: reducedMotion.current ? 0.4 : 1.8, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden={!isActive}
          >
            <Image
              src={s.imageSrc}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="100vw"
              quality={82}
              className="object-cover object-center"
            />
            {/* Warm light-leaks overlay for texture */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(210,187,142,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(200,90,59,0.18), transparent 50%)",
              }}
            />
          </motion.div>
        );
      })}

      {/* Mouse parallax accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
        aria-hidden
      >
        <div
          className="absolute -right-24 top-1/4 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${slide.accent}, transparent 65%)` }}
        />
        <div className="absolute left-10 bottom-20 w-24 h-24 border border-white/15 rotate-12" />
      </motion.div>

      {/* Layer 2: Gradient wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

      {/* Layer 3: Clip-path wipe accent on slide change */}
      {!reducedMotion.current && (
        <motion.div
          key={`wipe-${wipeKey}`}
          className="absolute inset-0 z-[3] pointer-events-none"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
          style={{ background: slide.accent, mixBlendMode: "overlay" as any, opacity: 0.4 }}
        />
      )}

      {/* Vertical rules */}
      <div className="absolute inset-0 container-x pointer-events-none hidden md:block">
        <div className="h-full w-full grid grid-cols-6 gap-4 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-l border-white last:border-r" />
          ))}
        </div>
      </div>

      {/* Layer 4: Content */}
      <div className="relative z-10 container-x h-full flex flex-col justify-center pt-[var(--nav-h)] pb-24 sm:pb-28 md:pb-32">
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${index}`}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                exit: {},
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="inline-flex items-center gap-2 md:gap-3 mb-5 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.3em] text-white/70"
              >
                <span className="w-6 md:w-8 h-px bg-[var(--oak-400)]" />
                {slide.eyebrow}
              </motion.div>

              <h1 className="font-display text-[var(--fs-display)] leading-[1.02] md:leading-[0.98] tracking-tight text-white mb-5 md:mb-8 max-w-[13ch] md:max-w-none">
                <SplitLine>{slide.line1}</SplitLine>
                <span className="block italic-serif text-[var(--oak-200)]">
                  <SplitLine delay={0.1}>{slide.line2}</SplitLine>
                </span>
                {slide.line3 && (
                  <SplitLine delay={0.2}>{slide.line3}</SplitLine>
                )}
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0 },
                }}
                className="text-base md:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed mb-8 md:mb-10 font-light"
              >
                {slide.sub}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0 },
                }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6"
              >
                <Button
                  variant="dark"
                  size="lg"
                  magnetic
                  href={slide.ctaHref}
                  iconRight={<span>→</span>}
                  className="w-full sm:w-auto justify-center"
                >
                  {slide.cta}
                </Button>
                <a
                  href="/consultation"
                  className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition"
                >
                  <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition flex-shrink-0">
                    <span className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-[var(--oak-400)] animate-pulse" />
                  </span>
                  <span className="text-xs md:text-sm uppercase tracking-widest leading-tight">
                    Free 45-min<br className="sm:hidden" /> site visit
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 container-x pb-4 sm:pb-5 md:pb-8 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <div className="font-mono text-xs text-white/60 tabular-nums flex-shrink-0">
            <span className="text-white text-base md:text-lg">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 md:mx-2">/</span>
            <span>{String(SLIDES.length).padStart(2, "0")}</span>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setWipeKey(k => k + 1); }}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative w-7 md:w-10 h-1 min-h-[4px] touch-manipulation"
              >
                <span className="absolute inset-0 bg-white/20" />
                <span
                  className="absolute inset-y-0 left-0 bg-[var(--oak-400)] transition-all duration-500"
                  style={{
                    width: i === index ? "100%" : i < index ? "100%" : "0%",
                    opacity: i <= index ? 1 : 0,
                  }}
                />
                {i === index && !reducedMotion.current && (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6.5, ease: "linear" }}
                    key={`bar-${wipeKey}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-10 bg-white/40 relative overflow-hidden"
          >
            <motion.span
              className="absolute top-0 left-0 w-full h-4 bg-[var(--oak-400)]"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function SplitLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const words = typeof children === "string" ? children.split(" ") : [children];
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="inline-block"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block pr-[0.25em] will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}
