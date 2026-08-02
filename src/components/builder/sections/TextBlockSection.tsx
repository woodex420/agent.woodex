"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { imageUrl } from "@/sanity/client";

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-display text-3xl md:text-4xl leading-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-2xl mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[var(--oak-500)] pl-6 my-6 italic text-[var(--fg)]/90">
        {children}
      </blockquote>
    ),
  },
};

export default function TextBlockSection({
  eyebrow,
  heading,
  headingItalic,
  body,
  image,
  imageAlt,
  imagePosition = "right",
  width = "medium",
}: {
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  body?: any;
  image?: any;
  imageAlt?: string;
  imagePosition?: "right" | "left" | "above" | "below";
  width?: "narrow" | "medium" | "wide";
}) {
  const imgSrc = image ? (typeof image === "string" ? image : imageUrl(image, { width: 1200 })) : null;
  const alt = imageAlt ?? (typeof image === "object" ? image?.alt : "") ?? "";
  const measure =
    width === "narrow" ? "max-w-2xl" : width === "wide" ? "max-w-5xl" : "max-w-3xl";
  const hasSide = imgSrc && (imagePosition === "left" || imagePosition === "right");

  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className={`container-x ${hasSide ? "grid lg:grid-cols-12 gap-10 lg:gap-16 items-start" : ""}`}>
        {imgSrc && imagePosition === "above" && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-10">
            <Image src={imgSrc} alt={alt} fill sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className={hasSide ? (imagePosition === "right" ? "lg:col-span-6" : "lg:col-span-6 lg:order-2") : measure}>
          {eyebrow && (
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
              {heading}
              {headingItalic && <span className="italic-serif text-[var(--oak-600)]"> {headingItalic}</span>}
            </h2>
          )}
          {body && <PortableText value={body} components={ptComponents} />}
        </div>

        {hasSide && imgSrc && (
          <div className={imagePosition === "right" ? "lg:col-span-6" : "lg:col-span-6 lg:order-1"}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image src={imgSrc} alt={alt} fill sizes="(min-width:1024px) 42vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        {imgSrc && imagePosition === "below" && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm mt-10">
            <Image src={imgSrc} alt={alt} fill sizes="100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
