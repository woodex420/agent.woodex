/**
 * Divider / spacer section.
 */
export default function DividerSection({
  style = "line",
  label,
  size = "md",
}: {
  style?: "line" | "space" | "eyebrow";
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "sm" ? "py-8 md:py-10" : size === "lg" ? "py-20 md:py-28" : "py-12 md:py-16";

  if (style === "space") return <div className={pad} aria-hidden />;

  if (style === "eyebrow") {
    return (
      <div className={`${pad} flex items-center justify-center`}>
        {label && (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            {label}
            <span className="w-8 h-px bg-[var(--oak-500)]" />
          </div>
        )}
      </div>
    );
  }

  return <div className={pad}><hr className="border-[var(--border)]" /></div>;
}
