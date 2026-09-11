"use client";
import { motion } from "framer-motion";
import LinoxaButton from "@/components/linoxa/LinoxaButton";

/** SectionCTA — wide CTA band (navy bg + circular arrow button) */
export default function SectionCTA({
  kicker = "Start your project",
  heading = "Have a space in mind?",
  body = "Tell us what you're planning. We'll help you turn the idea into a clear design and build direction.",
  cta = { label: "Start your project", href: "/contact" },
  dark = true,
}: { kicker?: string; heading?: React.ReactNode; body?: string; cta?: { label: string; href: string; }; dark?: boolean; }) {
  const bg = dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--cream)] text-[var(--navy)]";
  return (
    <section className={`${bg} relative noise overflow-hidden`}>
      <div className="container-x section-pad relative">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} className="max-w-4xl">
          <span className="kicker mb-6 inline-flex" data-kicker-invert={dark||undefined}>{kicker}</span>
          <h2 className="font-display text-[var(--fs-h1)] leading-[1.0] mb-6">{heading}</h2>
          <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mb-10 ${dark ? "text-white/80" : "text-[var(--muted)]"}`}>{body}</p>
          <LinoxaButton variant={dark ? "cream" : "dark"} size="lg" magnetic href={cta.href}>{cta.label}</LinoxaButton>
        </motion.div>
      </div>
    </section>
  );
}
