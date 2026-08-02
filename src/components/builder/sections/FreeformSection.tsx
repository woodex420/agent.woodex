/**
 * Freeform: renders arbitrary Portable Text. Simple renderer for v1.
 */
import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-5 max-w-2xl">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-[var(--fs-h2)] leading-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[var(--oak-500)] pl-6 my-6 italic text-[var(--fg)]/90">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-[var(--fg)]">{children}</strong>,
    em: ({ children }) => <em className="italic-serif text-[var(--oak-600)]">{children}</em>,
  },
};

export default function FreeformSection({ name, content }: { name?: string; content?: any }) {
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x">
        {name && (
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
            {name}
          </div>
        )}
        {content ? <PortableText value={content} components={components} /> : null}
      </div>
    </section>
  );
}
