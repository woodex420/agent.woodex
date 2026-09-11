"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/** SectionIntro — simple eyebrow + heading + body intro block */
export default function SectionIntro({
  kicker, heading, children, align = "left", eyebrowAlign = "left",
}: { kicker?: string; heading: ReactNode; children?: ReactNode; align?: "left"|"center"; eyebrowAlign?: "left"|"center"; }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && <span className={`kicker mb-6 ${eyebrowAlign==="center" ? "justify-center" : ""} inline-flex`}>{kicker}</span>}
      <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">{heading}</h2>
      {children && <div className="text-[var(--fg-muted)] text-lg leading-relaxed">{children}</div>}
    </motion.div>
  );
}
