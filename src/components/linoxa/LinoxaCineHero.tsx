"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import Link from "next/link";

type Slide = {
  eyebrow: string;
  lines: [string, string, string?];
  body: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  img: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Design + Build Studio",
    lines: ["Inspired", "spaces.", "Lasting design."],
    body:
      "Woodex Interior is a Lahore-based Design + Build studio for corporate workplaces, commercial interiors and selected residential. See the room before it exists.",
    cta: { label: "Start your project", href: "/contact" },
    secondary: { label: "Explore our work", href: "/work" },
    img: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "Office Fit-Out",
    lines: ["Shell", "to working", "floor."],
    body:
      "Complete workplace transformation. One contract, one Gantt, Friday report at 4pm every week. 98% on the contract date or we pay PKR 25,000 per week.",
    cta: { label: "Office Fit-Out", href: "/services/office-fit-out" },
    secondary: { label: "View workplaces", href: "/industries" },
    img: "/images/hero-turnkey.jpg",
  },
  {
    eyebrow: "Open 3D Studio",
    lines: ["See the room", "before it", "exists."],
    body:
      "Photoreal 3D walkthroughs you approve before anything is ordered. So precise we contractually guarantee them against the finished build.",
    cta: { label: "Open 3D Studio", href: "/3d-studio" },
    img: "/images/hero-3d.jpg",
  },
];

export default function LinoxaCineHero() {
  const [i, setI] = useState(0);
  const [wipe, setWipe] = useState(0);
  const reduced = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const px = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const py = useSpring(mouseY, { stiffness: 70, damping: 20 });
  const parX = useTransform(px, [-0.5, 0.5], ["-2%", "2%"]);
  const parY = useTransform(py, [-0.5, 0.5], ["-2%", "2%"]);

  useEffect(() => { reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  useEffect(() => {
    if (reduced.current) return;
    const t = setInterval(() => { setI(x=>(x+1)%SLIDES.length); setWipe(w=>w+1); }, 7200);
    return () => clearInterval(t);
  }, []);
  function mm(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX-r.left)/r.width-0.5); mouseY.set((e.clientY-r.top)/r.height-0.5);
  }
  const s = SLIDES[i];

  return (
    <section className="cine-hero relative text-[var(--beige)] noise" onMouseMove={mm}>
      {SLIDES.map((sl, idx) => (
        <motion.div key={idx} className="cine-slide" initial={false}
          animate={{ opacity: idx===i?1:0, scale: idx===i?1.05:1.15 }}
          transition={{ duration: reduced.current?0.4:1.8, ease:[0.22,1,0.36,1] }} aria-hidden={idx!==i}>
          <Image src={sl.img} alt="" fill priority={idx===0} sizes="100vw" quality={82} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[var(--navy)]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/60 via-transparent to-black/25" />
        </motion.div>
      ))}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: parX, y: parY }} aria-hidden>
        <div className="absolute -right-20 top-1/4 w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-3xl opacity-25" style={{ background:"radial-gradient(circle, #b8956a, transparent 65%)" }}/>
      </motion.div>
      {!reduced.current && (
        <motion.div key={`w-${wipe}`} className="absolute inset-0 z-[3] pointer-events-none"
          initial={{ clipPath:"inset(0 100% 0 0)" }} animate={{ clipPath:"inset(0 0 0 0)" }}
          transition={{ duration:1, ease:[0.77,0,0.18,1] }}
          style={{ background:"#b8956a", mixBlendMode:"overlay", opacity:0.35 }} />
      )}

      <div className="relative z-10 container-x h-full flex flex-col justify-center pt-[var(--nav-h)] pb-32">
        <motion.div key={i} initial="hidden" animate="show"
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.25 } } }} className="max-w-5xl">
          <motion.div variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0, transition:{duration:0.7,ease:[0.22,1,0.36,1]}} }}
            className="inline-flex items-center gap-3 mb-7 text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/75">
            <span className="w-8 h-px bg-[var(--accent)]" />{s.eyebrow}
          </motion.div>
          <h1 className="font-display text-[var(--fs-display)] leading-[0.95] tracking-tight text-white mb-8 max-w-[14ch]">
            <SL>{s.lines[0]}</SL>
            <span className="block accent-i"><SL d={0.12}>{s.lines[1]}</SL></span>
            {s.lines[2] && <SL d={0.24}>{s.lines[2]}</SL>}
          </h1>
          <motion.p variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0, transition:{duration:0.7,delay:0.5,ease:[0.22,1,0.36,1]}} }}
            className="text-base md:text-lg text-white/80 max-w-2xl leading-[1.6] mb-10">{s.body}</motion.p>
          <motion.div variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0, transition:{duration:0.7,delay:0.7,ease:[0.22,1,0.36,1]}} }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <LinoxaButton variant="cream" size="lg" magnetic href={s.cta.href}>{s.cta.label}</LinoxaButton>
            {s.secondary && (
              <Link href={s.secondary.href} className="group inline-flex items-center gap-3 text-white/85 hover:text-white transition">
                <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.4" /></svg>
                </span>
                <span className="text-xs uppercase tracking-[0.25em]">{s.secondary.label}</span>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 container-x flex items-end justify-between z-10">
        <div className="flex items-center gap-5">
          <div className="font-mono text-xs text-white/60 tabular-nums">
            <span className="text-white text-lg">{String(i+1).padStart(2,"0")}</span>
            <span className="mx-2">/</span>{String(SLIDES.length).padStart(2,"0")}
          </div>
          <div className="flex gap-2">
            {SLIDES.map((_,x)=>(
              <button key={x} onClick={()=>{setI(x);setWipe(w=>w+1);}} aria-label={`Slide ${x+1}`} className="relative w-10 h-1 touch-manipulation">
                <span className="absolute inset-0 bg-white/25" />
                <span className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all" style={{width:x===i?"100%":x<i?"100%":"0%"}} />
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/60">
          <span>Scroll</span>
          <motion.span animate={{y:[0,8,0]}} transition={{duration:1.8,repeat:Infinity}} className="block w-px h-10 bg-white/40">
            <motion.span animate={{y:[0,24,0]}} transition={{duration:1.8,repeat:Infinity}} className="block w-full h-4 bg-[var(--accent)]" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}

function SL({ children, d=0 }: { children: React.ReactNode; d?: number }) {
  const words = typeof children === "string" ? children.split(" ") : [children];
  return (
    <span className="block overflow-hidden">
      <motion.span className="inline-block" variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.06, delayChildren:d } } }}>
        {words.map((w,i)=>(
          <motion.span key={i} className="inline-block pr-[0.22em]" variants={{
            hidden:{y:"110%",opacity:0},
            show:{y:0,opacity:1,transition:{duration:0.9,ease:[0.22,1,0.36,1]}}
          }}>{w}</motion.span>
        ))}
      </motion.span>
    </span>
  );
}
