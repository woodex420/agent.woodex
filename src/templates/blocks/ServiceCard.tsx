"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServiceCard({
  href, num, title, body, index = 0, dark = false,
}: { href: string; num: string; title: string; body: string; index?: number; dark?: boolean }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.6, delay:index*0.08, ease:[0.22,1,0.36,1] }}>
      <Link href={href} className={`group block p-7 md:p-8 h-full min-h-[220px] ${dark ? "bg-[var(--navy-2)] hover:bg-[var(--card)]" : "bg-[var(--surface-1)] hover:bg-[var(--cream-2)]"} transition-colors`}>
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-xs text-[var(--wood)] tracking-widest">{num}</span>
          <span className="linoxa-arrow w-9 h-9 opacity-40 group-hover:opacity-100 text-inherit">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="-rotate-45"><path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </span>
        </div>
        <h3 className="font-display text-xl md:text-[1.35rem] leading-tight mb-3 group-hover:text-[var(--wood-deep)] dark:group-hover:text-[var(--wood)] transition-colors">{title}</h3>
        <p className={`text-sm leading-relaxed ${dark ? "text-white/65" : "text-[var(--muted)]"}`}>{body}</p>
      </Link>
    </motion.div>
  );
}
