import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, CATEGORY_META, PostCategory, formatDate } from "@/lib/content/posts";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((c) => ({ category: c }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const cat = category as PostCategory;
  const meta = CATEGORY_META[cat];
  if (!meta) return { title: "Not found" };
  return {
    title: `${meta.label} — Woodex Journal`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = category as PostCategory;
  const meta = CATEGORY_META[cat];
  if (!meta) notFound();
  const posts = POSTS.filter((p) => p.category === cat);

  return (
    <main className="pt-[calc(var(--nav-h)+3rem)] pb-24">
      <div className="container-x">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-8">
          <Link href="/blog" className="hover:text-[var(--oak-600)]">Journal</Link>
          <span>/</span>
          <span className="text-[var(--oak-600)]">{meta.label}</span>
        </nav>

        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Category
        </div>
        <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] max-w-3xl mb-6">
          {meta.label}.<br />
          <span className="italic-serif text-[var(--oak-600)]">{meta.description}</span>
        </h1>
        <p className="text-[var(--fg-muted)] text-lg max-w-2xl mb-16">
          {posts.length} article{posts.length !== 1 ? "s" : ""} in this category,
          written from our own project data in {meta.label.toLowerCase()}.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {posts.map((p) => (
            <article key={p.slug} className="group">
              <Link href={`/blog/${p.category}/${p.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--graphite-200)] mb-5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--fg-subtle)] mb-3">
                  <span>{formatDate(p.date)}</span><span>·</span><span>{p.readTime} min</span>
                </div>
                <h2 className="font-display text-2xl leading-tight mb-3 group-hover:text-[var(--oak-600)] transition-colors">
                  {p.title}
                </h2>
                <p className="text-[var(--fg-muted)] leading-relaxed line-clamp-2">{p.deck}</p>
              </Link>
            </article>
          ))}
        </div>

        <div className="border-t border-[var(--border)] pt-10 flex flex-wrap items-center justify-between gap-4">
          <Button href="/blog" variant="outline">← Back to all writing</Button>
          <Button href="/consultation" variant="ghost">Plan a project instead →</Button>
        </div>
      </div>
    </main>
  );
}
