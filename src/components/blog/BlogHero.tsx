"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { POSTS, formatDate } from "@/lib/content/posts";
import Button from "@/components/ui/Button";

/**
 * BlogHero + Featured Post band.
 * Signature motion: featured image has a slow clip-path reveal,
 * category tag slides in, headline words stagger on view.
 */
export default function BlogHero() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];

  return (
    <section className="pt-[calc(var(--nav-h)+3rem)] pb-20 bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          The Woodex Journal
        </div>
        <h1 className="font-display text-[var(--fs-display)] leading-[0.98] tracking-tight max-w-4xl mb-16">
          Numbers, not<br />
          <span className="italic-serif text-[var(--oak-600)]">adjectives.</span>
        </h1>

        {/* Featured post */}
        <Link href={`/blog/${featured.category}/${featured.slug}`} className="group block">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-[var(--graphite-200)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="bg-[var(--oak-500)] text-white text-xs uppercase tracking-widest px-3 py-1.5 font-medium">
                  Featured
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--oak-600)] mb-5">
                <span>{featured.category.replace("-", " ")}</span>
                <span className="w-6 h-px bg-[var(--oak-300)]" />
                <span className="text-[var(--fg-muted)]">{formatDate(featured.date)}</span>
                <span className="w-6 h-px bg-[var(--oak-300)]" />
                <span className="text-[var(--fg-muted)]">{featured.readTime} min read</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-5 group-hover:text-[var(--oak-600)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-8">{featured.deck}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] font-display flex items-center justify-center text-sm">
                  {featured.author.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{featured.author.name}</div>
                  <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-widest">{featured.author.role}</div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="inline" iconRight={<span>→</span>}>Read the article</Button>
              </div>
            </motion.div>
          </div>
        </Link>
      </div>
    </section>
  );
}
