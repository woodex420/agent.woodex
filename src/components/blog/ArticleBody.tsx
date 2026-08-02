"use client";

import { POSTS } from "@/lib/content/posts";
import Link from "next/link";
import type { Block } from "@/lib/content/blocks";
import type { ReactNode } from "react";

function renderInline(text: string): ReactNode {
  // Handle [text](url), **bold**, *italic* — order matters
  const parts: (string | ReactNode)[] = [text];
  // links
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  let out: (string | ReactNode)[] = [];
  let key = 0;
  parts.forEach((chunk) => {
    if (typeof chunk !== "string") { out.push(chunk); return; }
    let lastIdx = 0;
    const s = chunk;
    while ((m = linkRe.exec(s)) !== null) {
      if (m.index > lastIdx) out.push(s.slice(lastIdx, m.index));
      const href = m[2];
      const isExternal = href.startsWith("http");
      if (isExternal) {
        out.push(<a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--oak-600)] underline underline-offset-4 hover:text-[var(--oak-700)]">{m[1]}</a>);
      } else {
        out.push(<Link key={key++} href={href} className="text-[var(--oak-600)] underline underline-offset-4 hover:text-[var(--oak-700)]">{m[1]}</Link>);
      }
      lastIdx = m.index + m[0].length;
    }
    if (lastIdx < s.length) out.push(s.slice(lastIdx));
  });
  // bold **x**
  const boldRe = /\*\*([^*]+)\*\*/g;
  out = out.map((chunk, i) => {
    if (typeof chunk !== "string") return chunk;
    const pieces: (string | ReactNode)[] = [];
    let last = 0; let mm: RegExpExecArray | null; let k = 0;
    const s = chunk;
    while ((mm = boldRe.exec(s)) !== null) {
      if (mm.index > last) pieces.push(s.slice(last, mm.index));
      pieces.push(<strong key={`b${i}-${k++}`} className="font-semibold text-[var(--fg)]">{mm[1]}</strong>);
      last = mm.index + mm[0].length;
    }
    if (last < s.length) pieces.push(s.slice(last));
    return <>{pieces}</>;
  });
  return <>{out}</>;
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i} className="font-display text-2xl md:text-3xl leading-tight mt-12 mb-4 text-[var(--fg)]">{renderInline(b.text)}</h2>;
    case "h3":
      return <h3 key={i} className="font-display text-xl leading-tight mt-8 mb-3 text-[var(--fg)]">{renderInline(b.text)}</h3>;
    case "p":
      return <p key={i}>{renderInline(b.text)}</p>;
    case "ul":
      return (
        <ul key={i} className="space-y-2 pl-0 my-4">
          {b.items.map((it, j) => (
            <li key={j} className="flex gap-3 items-start">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--oak-500)] flex-shrink-0" />
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="space-y-2 pl-0 my-4 list-decimal list-inside marker:text-[var(--oak-600)] marker:font-semibold">
          {b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i} className="border-l-2 border-[var(--oak-500)] pl-6 my-8 font-display text-xl md:text-2xl italic-serif leading-snug text-[var(--fg)]">
          {renderInline(b.text)}
          {b.cite && <div className="mt-3 text-sm italic-serif-italic font-sans text-[var(--fg-muted)] text-base not-italic font-normal">— {b.cite}</div>}
        </blockquote>
      );
    case "pullout":
      return (
        <aside key={i} className="bg-[var(--bg-subtle)] border-l-2 border-[var(--oak-500)] p-5 md:p-6 my-8 text-base">
          {b.title && <div className="text-xs uppercase tracking-widest text-[var(--oak-600)] mb-2">{b.title}</div>}
          <div className="leading-relaxed">{renderInline(b.text)}</div>
        </aside>
      );
    case "table":
      return (
        <div key={i} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--border-strong)]">
                {b.headers.map((h, j) => (
                  <th key={j} className="text-left py-3 px-3 text-xs uppercase tracking-widest text-[var(--oak-600)] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, j) => (
                <tr key={j} className="border-b border-[var(--border)]">
                  {row.map((cell, k) => (
                    <td key={k} className="py-3 px-3 align-top">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function ArticleBody({ slug }: { slug: string }) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const related = POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const blocks = (post as any).bodyBlocks as Block[] | undefined;

  return (
    <section className="pb-8">
      <div className="container-x max-w-3xl">
        <article className="prose-custom space-y-0 text-lg text-[var(--fg-muted)] leading-[1.75]">
          <p className="text-xl text-[var(--fg)] leading-[1.55] font-display italic-serif !mb-8">
            {post.capsule}
          </p>

          {blocks && blocks.length > 0 ? (
            blocks.map(renderBlock)
          ) : (
            <>
              <p>
                This article is being expanded with a full breakdown, tables and project photos. We publish every article with real numbers from real quotes we've sent to clients in the last 90 days — not generic ranges copied from a competitor.
              </p>
              <p>
                When the full version lands on this URL the short answer above won't change, but we'll add the line items, assumptions and trade-offs behind each number.
              </p>
            </>
          )}

          <div className="bg-[var(--bg-subtle)] border-l-2 border-[var(--oak-500)] p-6 my-10 text-base">
            <div className="text-xs uppercase tracking-widest text-[var(--oak-600)] mb-2">Need a number for your actual space?</div>
            <p className="!mb-3">
              Published ranges are only so useful — every wall, window and MEP riser changes the number.{" "}
              <Link href="/consultation" className="text-[var(--oak-600)] underline underline-offset-4 font-medium">Book a 45-minute walkthrough</Link>{" "}
              and we'll send you an itemised budget range within 48 hours, free.
            </p>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 py-8 border-t border-[var(--border)] mt-10">
            <div className="w-12 h-12 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] font-display flex items-center justify-center flex-shrink-0">
              {post.author.initials}
            </div>
            <div>
              <div className="font-medium text-[var(--fg)]">{post.author.name}</div>
              <div className="text-sm text-[var(--fg-subtle)]">{post.author.role}, Woodex Interior</div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <div className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-6">Related reading</div>
            <ul className="space-y-5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.category}/${r.slug}`} className="group block">
                    <div className="text-xs uppercase tracking-widest text-[var(--oak-600)] mb-1">{r.readTime} min read</div>
                    <div className="font-display text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">{r.title}</div>
                    <p className="text-[var(--fg-muted)] mt-2 text-base">{r.deck}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
