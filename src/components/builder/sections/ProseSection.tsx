import { PortableText } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-display text-3xl mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-2xl mt-8 mb-3">{children}</h3>
    ),
  },
};

export default function ProseSection({ body }: { body?: any }) {
  if (!body) return null;
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x max-w-3xl mx-auto">
        <PortableText value={body} components={components} />
      </div>
    </section>
  );
}
