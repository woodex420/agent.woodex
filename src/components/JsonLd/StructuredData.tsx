/**
 * Sprint G — inlines a JSON-LD script. Used by individual pages to add
 * FAQPage, Article, Service, BreadcrumbList etc. without triggering React
 * DOM warnings (plain <script> tags with dangerouslySetInnerHTML are fine).
 */
export default function StructuredData({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
