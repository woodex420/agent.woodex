"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const MotionLink = motion.create(Link);

type Service = {
  href: string;
  num: string;
  title: string;
  tagline: string;
  size?: "tall" | "wide" | "square";
  bg: string;
};

const SERVICES: Service[] = [
  {
    href: "/services/commercial",
    num: "01",
    title: "Commercial",
    tagline: "Offices, HQs, co-working — built for productivity from day one.",
    size: "wide",
    bg: "linear-gradient(135deg,rgba(30,30,30,0.55),rgba(60,42,26,0.65)), url(/images/svc-commercial.jpg)",
  },
  {
    href: "/services/residential",
    num: "02",
    title: "Residential",
    tagline: "Homes and apartments, from studio to 2-kanal.",
    size: "square",
    bg: "linear-gradient(135deg,rgba(40,30,20,0.6),rgba(80,55,30,0.55)), url(/images/svc-residential.jpg)",
  },
  {
    href: "/services/retail",
    num: "03",
    title: "Retail & F&B",
    tagline: "Storefronts, cafés, restaurants. Opens on the contract date.",
    size: "square",
    bg: "linear-gradient(135deg,rgba(20,20,20,0.65),rgba(50,35,20,0.55)), url(/images/svc-retail.jpg)",
  },
  {
    href: "/services/corporate",
    num: "04",
    title: "Corporate",
    tagline: "Boardrooms, campuses, facilities-scale fit-outs.",
    size: "square",
    bg: "linear-gradient(135deg,rgba(30,25,20,0.6),rgba(70,50,30,0.55)), url(/images/svc-corporate.jpg)",
  },
  {
    href: "/3d-studio",
    num: "05",
    title: "3D Studio",
    tagline: "Photoreal renders, walkthroughs, 360° — guaranteed to match build.",
    size: "tall",
    bg: "linear-gradient(160deg,rgba(11,11,11,0.7),rgba(50,40,28,0.4)), url(/images/svc-3d.jpg)",
  },
  {
    href: "/services/turnkey",
    num: "06",
    title: "Turnkey",
    tagline: "Keys in, keys out. One contract. One Gantt. One Friday report.",
    size: "wide",
    bg: "linear-gradient(135deg,rgba(23,23,23,0.6),rgba(60,45,30,0.55)), url(/images/svc-turnkey.jpg)",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
          <div className="kicker text-[var(--fg-muted)] mb-5">
            What we do
          </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Six specializations.<br />
              <span className="italic-serif text-[var(--oak-600)]">One delivery system.</span>
            </h2>
          </div>
          <p className="text-[var(--fg-muted)] max-w-md text-lg">
            Not a jack-of-all-trades — six deep practices that share one 3D-first, Friday-report,
            fixed-date delivery engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
          {SERVICES.map((s, i) => (
            <TiltCard key={s.href} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  const gxPct = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const gyPct = useTransform(my, [-0.5, 0.5], [0, 100]);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const spanClass =
    service.size === "wide" ? "md:col-span-2" : service.size === "tall" ? "md:row-span-2" : "";

  function handleMove(e: React.MouseEvent) {
    if (isTouch) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    if (isTouch) return;
    mx.set(0);
    my.set(0);
  }

  const tiltStyle = isTouch
    ? undefined
    : { rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" as const };

  return (
    <MotionLink
      href={service.href}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tiltStyle}
      className={`group relative overflow-hidden rounded-sm ${spanClass} ${service.size === "tall" ? "row-span-2" : ""} text-white noise cursor-pointer shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500`}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ background: service.bg }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/60" />

      <Glow x={gxPct} y={gyPct} />

      <div className="absolute top-5 left-5 font-mono text-xs text-white/60 tracking-widest">
        {service.num}
      </div>
      <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[var(--graphite-900)] group-hover:rotate-45">
        <span className="text-lg leading-none">+</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-7"
      >
        <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-3 transition-transform duration-500 group-hover:-translate-y-1">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-white/70 max-w-xs leading-relaxed">{service.tagline}</p>
        <div className="mt-4 overflow-hidden h-6">
          <motion.div
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.2em] text-[var(--oak-300)]"
          >
            Explore service →
          </motion.div>
        </div>
      </motion.div>
    </MotionLink>
  );
}

function Glow({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  // Reactive radial highlight that follows cursor
  const bg = useTransform(
    [x, y],
    ([xv, yv]) =>
      `radial-gradient(360px circle at ${xv}% ${yv}%, rgba(210,187,142,0.25), transparent 60%)`
  );
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ background: bg } as any}
    />
  );
}
