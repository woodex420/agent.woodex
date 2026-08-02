"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Project = { slug: string; title: string; tag: string; img: string };

export default function RelatedProjects({ projects }: { projects: Project[] }) {
  if (!projects?.length) return null;
  return (
    <section className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Related work
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          Similar projects,<br />
          <span className="italic-serif text-[var(--oak-600)]">already delivered.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/portfolio/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ background: p.img }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-2">{p.tag}</div>
                    <h3 className="font-display text-2xl leading-tight group-hover:text-[var(--oak-200)] transition">{p.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
