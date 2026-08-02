/**
 * ServicesGridSection — typed CMS-driven adapter for section.servicesGrid.
 *
 * Phase 5: data-bound. Resolves `picks` references and inline `cards` into the
 * same card shape the bento grid expects. When the caller hasn't resolved
 * references (GROQ returned `_ref` strings), falls back to inline cards only.
 *
 * Server component — renders a static, 3D-tilt-free bento (matches the home
 * grid aesthetically but with stable data for editors).
 */
import { imageUrl } from "@/sanity/client";
import Link from "next/link";
import { sanityAttr } from "../sanityAttr";
import EditableText from "../EditableText";
import type { SanityScope } from "../EditableText";

interface Card {
  title: string;
  tagline?: string;
  href?: string;
  image?: any;
  imageUrl?: string | null;
  size?: "wide" | "tall" | "square";
}

export interface ServicesGridProps {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  intro?: string;
  source?: "all" | "category" | "manual" | "custom";
  category?: string;
  /** Resolved service documents (server-fetched via GROQ reference expansion). */
  picks?: any[];
  cards?: Card[];
  sanityScope?: SanityScope | null;
}

/** Derive a card from a resolved `service` document. */
function cardFromService(s: any, idx: number): Card {
  const img = s.heroImg
    ? typeof s.heroImg === "string"
      ? s.heroImg
      : imageUrl(s.heroImg, { width: 1200 })
    : null;
  return {
    title: s.title ?? `Service ${idx + 1}`,
    tagline: s.heroSub ?? s.situation?.heading ?? "",
    href: `/services/${s.slug ?? ""}`,
    imageUrl: img,
    // First card wide, 5th tall — matches the home bento rhythm when 6 cards
    size: idx === 0 || idx === 5 ? "wide" : idx === 4 ? "tall" : "square",
  };
}

export default function ServicesGridSection({
  eyebrow = "What we do",
  heading = "Six specializations.",
  headingItalic = "One delivery system.",
  intro,
  cards,
  picks,
  sanityScope,
}: ServicesGridProps) {
  // Prefer resolved service picks; otherwise use inline custom cards; else
  // fall back to empty placeholder.
  const resolved: Card[] = [];
  if (Array.isArray(picks) && picks.length) {
    picks.forEach((p, i) => {
      if (p && (p.slug || p.title)) resolved.push(cardFromService(p, i));
    });
  }
  if (Array.isArray(cards) && cards.length && resolved.length === 0) {
    cards.forEach((c, i) => {
      resolved.push({
        title: c.title ?? `Card ${i + 1}`,
        tagline: c.tagline,
        href: c.href,
        imageUrl: typeof c.image === "string" ? c.image : imageUrl(c.image, { width: 1200 }),
        size: c.size ?? "square",
      });
    });
  }

  // Placeholder grid when nothing is resolved yet (e.g. empty "all" query before CMS is wired).
  if (resolved.length === 0) {
    return (
      <section className="section-pad bg-[var(--bg-subtle)]">
        <div className="container-x">
          <SectionHead eyebrow={eyebrow} heading={heading} headingItalic={headingItalic} intro={intro} sanityScope={sanityScope} />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm bg-[var(--surface-1)] flex items-end p-6 text-[var(--fg-muted)] ${
                  i === 0 || i === 5 ? "md:col-span-2" : i === 4 ? "md:row-span-2" : ""
                }`}
              >
                Add services in Sanity →
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <SectionHead eyebrow={eyebrow} heading={heading} headingItalic={headingItalic} intro={intro} sanityScope={sanityScope} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
          {resolved.map((c, i) => {
            const spanClass =
              c.size === "wide" ? "md:col-span-2" : c.size === "tall" ? "md:row-span-2" : "";
            const bg = c.imageUrl
              ? `linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.55)),url(${c.imageUrl})`
              : "linear-gradient(135deg,#2b1f14,#6d4f2d)";
            const content = (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ background: bg }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/60" />
                <div className="absolute top-5 left-5 font-mono text-xs text-white/60 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[var(--graphite-900)] group-hover:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-3 text-white transition-transform duration-500 group-hover:-translate-y-1">
                    {c.title}
                  </h3>
                  {c.tagline && (
                    <p className="text-sm md:text-base text-white/70 max-w-xs leading-relaxed">
                      {c.tagline}
                    </p>
                  )}
                </div>
              </>
            );
            return c.href ? (
              <Link
                key={i}
                href={c.href}
                className={`group relative overflow-hidden rounded-sm ${spanClass} ${c.size === "tall" ? "row-span-2" : ""} text-white noise cursor-pointer shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-500`}
              >
                {content}
              </Link>
            ) : (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-sm ${spanClass} ${c.size === "tall" ? "row-span-2" : ""} text-white noise`}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  heading,
  headingItalic,
  intro,
  sanityScope,
}: {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  intro?: string;
  sanityScope?: SanityScope | null;
}) {
  const E = EditableText;
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5" data-sanity={sanityAttr(sanityScope, ["eyebrow"])}>
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            <E as="span" path={["eyebrow"]} sanityScope={sanityScope}>{eyebrow}</E>
          </div>
        )}
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]" data-sanity={sanityAttr(sanityScope, ["heading"])}>
          <E as="span" path={["heading"]} sanityScope={sanityScope}>{heading}</E>
          {headingItalic && (
            <>
              <br />
              <span className="italic-serif text-[var(--oak-600)]">
                <E as="span" path={["headingItalic"]} sanityScope={sanityScope}>{headingItalic}</E>
              </span>
            </>
          )}
        </h2>
      </div>
      {intro && (
        <p className="text-[var(--fg-muted)] max-w-md text-lg" data-sanity={sanityAttr(sanityScope, ["intro"])}>
          <E as="span" path={["intro"]} sanityScope={sanityScope}>{intro}</E>
        </p>
      )}
    </div>
  );
}
