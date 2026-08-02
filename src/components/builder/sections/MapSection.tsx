import { SITE } from "@/lib/config";

export default function MapSection({
  eyebrow = "Visit the studio",
  heading,
  sub,
  hours,
  embedUrl,
}: {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  hours?: string;
  embedUrl?: string;
}) {
  const title = heading ?? `${SITE.address.line1}, ${SITE.address.city}`;
  const body = sub ?? "By appointment only — please WhatsApp ahead so we can have samples ready.";
  const hrs = hours ?? SITE.hoursShort;

  return (
    <section id="map" className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          {eyebrow}
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-4">{title}</h2>
        <p className="text-[var(--fg-muted)] text-lg max-w-xl mb-6">{body}</p>
        <p className="text-sm uppercase tracking-widest text-[var(--oak-600)] mb-8">{hrs}</p>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="420"
            style={{ border: 0, borderRadius: 2 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio location"
          />
        ) : (
          <div className="aspect-[16/9] bg-[var(--surface-1)] rounded-sm flex items-center justify-center text-[var(--fg-muted)] text-sm border border-[var(--border)]">
            Set embedUrl to a Google Maps embed URL to show a map.
          </div>
        )}
      </div>
    </section>
  );
}
