import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { POSTS, CATEGORY_META, formatDate, PostCategory } from "@/lib/content/posts";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleChrome from "@/components/blog/ArticleChrome";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return POSTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> }
): Promise<Metadata> {
  const { category, slug } = await params;
  const post = POSTS.find((p) => p.slug === slug && p.category === category);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Woodex Journal`,
    description: post.deck,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = POSTS.find((p) => p.slug === slug && p.category === category);
  if (!post) notFound();
  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const next = POSTS[(idx + 1) % POSTS.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.deck,
    image: [`https://woodex.studio${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    publisher: { "@type": "Organization", name: "Woodex Interior", url: "https://woodex.studio" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://woodex.studio/blog/${post.category}/${post.slug}` },
    keywords: CATEGORY_META[post.category as PostCategory].label,
    articleSection: CATEGORY_META[post.category as PostCategory].label,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woodex.studio/" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://woodex.studio/blog" },
      { "@type": "ListItem", position: 3, name: CATEGORY_META[post.category as PostCategory].label, item: `https://woodex.studio/blog/${post.category}` },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  };

  return (
    <main className="pt-[calc(var(--nav-h)+2rem)]" id="top-of-article">
      <ArticleChrome readMinutes={post.readTime} title={post.title} />
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="article-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article>
        <div className="container-x pb-10">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-8">
            <Link href="/blog" className="hover:text-[var(--oak-600)]">Journal</Link>
            <span>/</span>
            <Link href={`/blog/${post.category}`} className="hover:text-[var(--oak-600)]">
              {CATEGORY_META[post.category as PostCategory].label}
            </Link>
          </nav>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--oak-600)] mb-5">
            <span>{CATEGORY_META[post.category as PostCategory].label}</span>
            <span className="w-6 h-px bg-[var(--oak-300)]" />
            <span className="text-[var(--fg-muted)]">{formatDate(post.date)}</span>
            <span className="w-6 h-px bg-[var(--oak-300)]" />
            <span className="text-[var(--fg-muted)]">{post.readTime} min read</span>
          </div>

          <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] max-w-4xl mb-8">
            {post.title}
          </h1>

          <p className="text-xl text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-10">{post.deck}</p>

          <div className="flex items-center gap-4 pb-10 border-b border-[var(--border)]">
            <div className="w-12 h-12 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] font-display flex items-center justify-center">
              {post.author.initials}
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-widest">{post.author.role}</div>
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--graphite-200)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
          </div>
        </div>

        <section className="py-12 bg-[var(--bg-subtle)] my-16">
          <div className="container-x grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-2 flex items-start">
              <div className="text-xs uppercase tracking-widest text-[var(--oak-600)]">Quick answer</div>
            </div>
            <p className="lg:col-span-10 font-display text-2xl md:text-3xl leading-[1.3] italic-serif">
              {post.capsule}
            </p>
          </div>
        </section>

        <ArticleBody slug={post.slug} />

        <section className="py-16 bg-[var(--graphite-900)] text-white noise">
          <div className="container-x grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--oak-500)] text-white font-display flex items-center justify-center">
                  {post.author.initials}
                </div>
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-xs text-white/60 uppercase tracking-widest">{post.author.role}</div>
                </div>
              </div>
              <p className="text-white/80 text-lg max-w-xl leading-relaxed">
                Got a question about this piece? Or a project you want a real number for?
                Zara and the author are both on WhatsApp — typically replies in under 15 minutes
                during business hours.
              </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end gap-3 flex-wrap">
              <Button href="https://wa.me/923000000000" variant="dark" size="lg" magnetic>Message on WhatsApp</Button>
              <Button href="/consultation" variant="ghost" size="lg" className="text-white hover:text-[var(--oak-300)]">Book a walkthrough</Button>
            </div>
          </div>
        </section>

        {next && (
          <section className="py-20 bg-[var(--bg)]">
            <div className="container-x">
              <div className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-4">Next article</div>
              <Link href={`/blog/${next.category}/${next.slug}`} className="group block max-w-3xl">
                <h3 className="font-display text-3xl md:text-5xl leading-[1.08] group-hover:text-[var(--oak-600)] transition-colors">
                  {next.title} →
                </h3>
                <p className="text-[var(--fg-muted)] text-lg mt-4">{next.deck}</p>
              </Link>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
