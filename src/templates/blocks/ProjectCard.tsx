"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/** Linoxa Project card — tall image + category/title/location meta */
export default function ProjectCard({
  href, image, title, category, location, year, index = 0,
}: { href: string; image: string; title: string; category: string; location?: string; year?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22,1,0.36,1] }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-md)] bg-[var(--navy)]" data-tilt>
          <Image src={image} alt={title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-108" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="pt-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mb-1.5">{category}{year && ` · ${year}`}</div>
            <h3 className="font-display text-xl md:text-[1.35rem] leading-tight group-hover:text-[var(--wood-deep)] transition-colors">{title}</h3>
            {location && <div className="text-sm text-[var(--muted)] mt-1">{location}</div>}
          </div>
          <span className="linoxa-arrow w-10 h-10 text-[var(--ink)]/40 group-hover:text-[var(--wood-deep)] mt-1">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="-rotate-45"><path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
