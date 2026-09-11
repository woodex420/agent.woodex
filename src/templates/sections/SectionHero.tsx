"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

/** SectionHero — full-width cinematic hero with background image, kicker, H1, body, CTA */
export default function SectionHero({
  kicker, title, subtitle, image, children, align = "left", dark = true, height = "cine",
}: {
  kicker?: string; title: string; subtitle?: string; image?: string; children?: ReactNode;
  align?: "left" | "center"; dark?: boolean; height?: "cine" | "tall" | "inner";
}) {
  const h = height === "cine" ? "h-[100svh] min-h-[700px]" : height === "inner" ? "min-h-[520px]" : "min-h-[70vh]";
  return (
    <section className={`relative w-full overflow-hidden ${h} ${dark ? "text-[var(--cream)]" : "text-[var(--ink)]"} noise`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" quality={82} className="object-cover" />
          <div className={`absolute inset-0 ${dark ? "bg-gradient-to-b from-black/50 via-black/25 to-[var(--navy)]/85" : "bg-[var(--cream)]/85"}`} />
        </>
      )}
      {!image && <div className={`absolute inset-0 ${dark ? "bg-[var(--navy)]" : "bg-[var(--cream)]"}`} />}
      <div className={`relative z-10 container-x h-full flex flex-col justify-center pt-[var(--nav-h)] pb-24 ${align === "center" ? "items-center text-center" : ""}`}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} className={align === "center" ? "max-w-3xl" : "max-w-4xl"}>
          {kicker && <span className="kicker mb-7 inline-flex" data-kicker-invert={dark || undefined}>{kicker}</span>}
          <h1 className="font-display text-[var(--fs-display)] leading-[0.95] mb-6">{title}</h1>
          {subtitle && <p className={`text-lg md:text-xl leading-[1.6] max-w-2xl mb-8 ${dark ? "text-white/80" : "text-[var(--muted)]"}`}>{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
