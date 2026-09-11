"use client";
import { motion } from "framer-motion";

/** SectionTestimonial — large pull-quote */
export default function SectionTestimonial({
  quote, author, role, dark = true,
}: { quote: string; author?: string; role?: string; dark?: boolean }) {
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--cream-2)] text-[var(--ink)]"}`}>
      <div className="container-x max-w-4xl">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
          <span className={`font-display text-[6rem] leading-none ${dark ? "text-[var(--wood)]" : "text-[var(--wood)]"} block`}>&ldquo;</span>
          <blockquote className="font-display text-[clamp(1.5rem,3vw+0.8rem,3rem)] leading-[1.2] italic-serif -mt-8 mb-8">
            {quote}
          </blockquote>
          {(author || role) && (
            <div className="flex items-center gap-4 pt-6 border-t border-current/15">
              <div className="w-10 h-px bg-[var(--wood)]" />
              <div>
                {author && <div className="text-sm font-medium">{author}</div>}
                {role && <div className={`text-xs uppercase tracking-widest ${dark ? "text-white/55" : "text-[var(--muted)]"}`}>{role}</div>}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
