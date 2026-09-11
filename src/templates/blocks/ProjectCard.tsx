"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Linoxa ProjectCard — matches the screenshot exactly:
 * - 4:5 aspect image with rounded corners
 * - CATEGORY · YEAR in all-caps micro (charcoal)
 * - Title: two-line stacked with the SECOND LINE in accent italic
 * - Location in sub-text
 * - Circular outlined arrow at right (up-right diagonal)
 */
export default function ProjectCard({
  href, image, title, accentWord, category, location, year, index = 0,
}: {
  href: string; image: string; title: string; accentWord?: string;
  category: string; location?: string; year?: string; index?: number;
}) {
  // Split title: last word becomes italic accent (per Linoxa convention)
  const words = title.split(" ");
  const last = accentWord ?? words[words.length - 1];
  const rest = words.slice(0, words.length - (accentWord?0:1)).join(" ");

  return (
    <motion.div
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.7, delay:index*0.07, ease:[0.22,1,0.36,1] }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-md)] bg-[var(--black)]">
          <Image src={image} alt={title} fill sizes="(min-width:1024px) 33vw, 100vw"
                 className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
        </div>
        <div className="pt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--charcoal)] mb-2">
              {category}{year && <span className="mx-2 opacity-50">·</span>}{year}
            </div>
            <h3 className="font-display text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.1] tracking-tight">
              {rest}{rest && " "}<em className="accent-i not-italic">{last}</em>
            </h3>
            {location && <div className="text-sm text-[var(--charcoal)] mt-2">{location}</div>}
          </div>
          <span className="linoxa-circle w-12 h-12 text-[var(--black)]/70 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] mt-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
