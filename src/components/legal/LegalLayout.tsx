import Link from "next/link";
import { ReactNode } from "react";

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="pt-[calc(var(--nav-h)+3rem)] pb-24">
      <div className="container-x max-w-3xl">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--oak-600)]">Home</Link>
          <span>/</span>
          <span className="text-[var(--oak-600)]">{eyebrow}</span>
        </nav>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          {eyebrow}
        </div>
        <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] mb-4">{title}</h1>
        <p className="text-sm text-[var(--fg-subtle)] uppercase tracking-widest mb-12">Last updated {updated}</p>
        <article className="prose-legal space-y-8 text-lg text-[var(--fg-muted)] leading-[1.75]">
          {children}
        </article>
      </div>
    </main>
  );
}

export function Section({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-[var(--fg)] mb-3 leading-tight">{h}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
