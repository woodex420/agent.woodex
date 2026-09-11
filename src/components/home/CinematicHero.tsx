"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Cinematic Hero — Relaunch Sprint 1
 * PRD H1: "Spaces Designed to Work. Built to Last."
 * Lead with office fit-out + corporate (P1) slides; 3D + turnkey + residential support.
 * Carries ≥3 concrete numbers above the fold (98%, PKR 25k, 12 y).
 */

type Slide = {
  eyebrow: string;
  line1: string;
  line2: string;
  line3?: string;
  sub: string;
  cta: string;
  ctaHref: string;
  secondary?: { label: string; href: string };
  imageSrc: string;
  accent: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Design + Build Company",
    line1: "Spaces",
    line2: "designed to work.",
    line3: "Built to last.",
    sub:
      "Woodex Interior brings design, workplace strategy and turnkey execution together to create high-performance corporate and commercial environments. 98% handed over on the contract date or we pay PKR 25,000 per week.",
    cta: "Start your project",
    ctaHref: "/consultation",
    secondary: { label: "Explore our work", href: "/work" },
    imageSrc: "/images/hero-commercial.jpg",
    accent: "#A98252",
  },
  {
    eyebrow: "Office Fit-Out",
    line1: "From shell",
    line2: "to working floor—",
    line3: "on the date we said.",
    sub:
      "Complete workplace transformation from planning to handover. One contract, one Gantt, Friday report at 4pm every week. Built that way for 12 years in Lahore.",
    cta: "See office fit-out",
    ctaHref: "/services/office-fit-out",
    secondary: { label: "View workplaces", href: "/industries" },
    imageSrc: "/images/hero-turnkey.jpg",
    accent: "#b8956a",
  },
  {
    eyebrow: "3D Studio",
    line1: "See the room",
    line2: "before it exists.",
    sub:
      "Photoreal 3D walkthroughs you approve before anything is ordered. So precise we contractually guarantee them against the finished build — invoked twice in 12 years.",
    cta: "Open 3D Studio",
    ctaHref: "/3d-studio",
    secondary: { label: "Book my 3D session", href: "/consultation" },
    imageSrc: "/images/hero-3d.jpg",
    accent: "#C9BFB1",
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
    }, 7200);
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
      {/* Background images */}
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
            transition={{ duration: reducedMotion.current ? 0.4 : 1.8, ease: [0.22, 1, 0.36, 1] }}
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
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(184,149,106,0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgba(169,130,82,0.18), transparent 50%)",
              }}
            />
          </motion.div>
        );
      })}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
        aria-hidden
      >
        <div
          className="absolute -right-24 top-1/4 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${slide.accent}, transparent 65%)` }}
        />
      </motion.div>

      {/* Gradient wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/40" />

      {!reducedMotion.current && (
        <motion.div
          key={`wipe-${wipeKey}`}
          className="absolute inset-0 z-[3] pointer-events-none"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
          style={{ background: slide.accent, mixBlendMode: "overlay" as any, opacity: 0.35 }}
        />
      )}

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
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="inline-flex items-center gap-2 md:gap-3 mb-5 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.3em] text-white/75"
              >
                <span className="w-6 md:w-8 h-px bg-[var(--brass)]" />
                {slide.eyebrow}
              </motion.div>

              <h1 className="font-display text-[var(--fs-display)] leading-[1.0] md:leading-[0.96] tracking-tight text-white mb-6 md:mb-8 max-w-[13ch] md:max-w-none">
                <SplitLine>{slide.line1}</SplitLine>
                <span className="block italic-serif text-[var(--wood)]">
                  <SplitLine delay={0.1}>{slide.line2}</SplitLine>
                </span>
                {slide.line3 && (
                  <SplitLine delay={0.2}>{slide.line3}</SplitLine>
                )}
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0 },
                }}
                className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-[1.55] mb-8 md:mb-10 font-light"
              >
                {slide.sub}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
                {slide.secondary && (
                  <a
                    href={slide.secondary.href}
                    className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition"
                  >
                    <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition flex-shrink-0">
                      <span className="block w-0 group-hover:w-3 h-px bg-white/70 transition-all duration-300 origin-left" />
                      <span className="arrow ml-1">→</span>
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-widest leading-tight">
                      {slide.secondary.label}
                    </span>
                  </a>
                )}
              </motion.div>

              {/* Above-the-fold proof strip */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0 },
                }}
                className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-xs uppercase tracking-[0.22em] text-white/60"
              >
                <ProofStat num="98%" label="on contract date" />
                <span className="hidden sm:block w-px h-4 bg-white/20" />
                <ProofStat num="PKR 25k" label="/ week delay credit" />
                <span className="hidden sm:block w-px h-4 bg-white/20" />
                <ProofStat num="12 yrs" label="building in Lahore" />
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
                  className="absolute inset-y-0 left-0 bg-[var(--brass)] transition-all duration-500"
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
                    transition={{ duration: 7.2, ease: "linear" }}
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
              className="absolute top-0 left-0 w-full h-4 bg-[var(--brass)]"
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
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
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

function ProofStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-white font-semibold text-sm md:text-base tabular-nums">{num}</span>
      <span className="text-white/50 normal-case tracking-normal text-[10px] md:text-xs">{label}</span>
    </div>
  );
}
