"use client";

import { useMemo } from "react";
import Image from "next/image";
import EditableText from "@/components/builder/EditableText";
import { imageUrl } from "@/sanity/client";

type Logo = { name: string; logo?: any; href?: string };

const DEFAULT_LOGOS: Logo[] = [
  { name: "Nishat Hospitality" },
  { name: "Packages Mall" },
  { name: "Gulberg Galleria" },
  { name: "LUMS" },
  { name: "HBL" },
  { name: "KFC Pakistan" },
  { name: "Systems Ltd" },
  { name: "IT Heights" },
  { name: "Packages Ltd" },
  { name: "Fauji Foundation" },
  { name: "Defence Raya" },
  { name: "Movenpick" },
  { name: "Arif Habib Group" },
  { name: "Service Industries" },
];

export default function MarqueeSection({
  eyebrow = "Trusted by 120+ clients across Pakistan",
  logos,
  speed = 50,
  sanityScope,
}: {
  eyebrow?: string;
  logos?: Logo[];
  speed?: number;
  sanityScope?: import("../EditableText").SanityScope | null;
}) {
  const items = logos && logos.length ? logos : DEFAULT_LOGOS;
  const secondSpeed = Math.round(speed * 1.3);
  const animNameA = useMemo(() => `mk-a-${Math.random().toString(36).slice(2, 7)}`, []);
  const animNameB = useMemo(() => `mk-b-${Math.random().toString(36).slice(2, 7)}`, []);
  const E = EditableText;

  const renderItem = (l: Logo, i: number, sep: React.ReactNode) => {
    const logoSrc = l.logo ? (typeof l.logo === "string" ? l.logo : imageUrl(l.logo, { width: 240 })) : null;
    const content = logoSrc ? (
      <span className="inline-flex items-center h-8 md:h-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={l.name} className="h-full w-auto max-h-10 object-contain opacity-70" />
      </span>
    ) : (
      <span>{l.name}</span>
    );
    return (
      <span key={i} className="flex items-center flex-shrink-0">
        {l.href ? (
          <a href={l.href} className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--fg-muted)]/70 hover:text-[var(--fg)] transition">
            {content}
          </a>
        ) : (
          <span className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--fg-muted)]/70">
            {content}
          </span>
        )}
        {sep}
      </span>
    );
  };

  return (
    <section className="py-12 md:py-14 border-y border-[var(--border)] bg-[var(--surface-1)] overflow-hidden">
      <style>{`
        @keyframes ${animNameA} { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @keyframes ${animNameB} { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0); } }
        @media (prefers-reduced-motion: reduce) {
          .${animNameA}, .${animNameB} { animation: none !important; }
        }
      `}</style>
      <div className="container-x mb-5 md:mb-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
          <span className="w-6 h-px bg-[var(--oak-500)]" />
          <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
        </div>
      </div>
      <div
        className={animNameA}
        style={{ animation: `${animNameA} ${speed}s linear infinite`, width: "max-content", display: "flex", gap: "2rem" }}
      >
        {[...items, ...items].map((l, i) =>
          renderItem(l, i, <span className="ml-8 md:ml-14 text-[var(--oak-400)]/50">·</span>),
        )}
      </div>
      <div
        className={animNameB}
        style={{ animation: `${animNameB} ${secondSpeed}s linear infinite`, width: "max-content", display: "flex", gap: "2rem", marginTop: "0.75rem" }}
      >
        {[...items, ...items].map((l, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-display italic-serif text-lg md:text-xl lg:text-2xl text-[var(--fg-subtle)]">
              {l.name}
            </span>
            <span className="ml-6 md:ml-10 text-[var(--oak-300)]/40">—</span>
          </span>
        ))}
      </div>
    </section>
  );
}
