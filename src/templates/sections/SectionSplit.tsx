"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

/** SectionSplit — 50/50 image + content, supports reverse */
export default function SectionSplit({
  kicker, heading, children, image, imageAlt = "", reverse = false, dark = false,
}: {
  kicker?: string; heading: ReactNode; children?: ReactNode; image: string; imageAlt?: string;
  reverse?: boolean; dark?: boolean;
}) {
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className={`container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div initial={{ opacity:0, x: reverse ? 30 : -30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} className="relative aspect-[4/5] rounded-[var(--r-lg)] overflow-hidden" data-tilt>
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </motion.div>
        <motion.div initial={{ opacity:0, x: reverse ? -30 : 30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
          {kicker && <span className="kicker mb-6 inline-flex" data-kicker-invert={dark || undefined}>{kicker}</span>}
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">{heading}</h2>
          <div className={`${dark ? "text-white/75" : "text-[var(--fg-muted)]"} text-lg leading-[1.65] space-y-4`}>{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
