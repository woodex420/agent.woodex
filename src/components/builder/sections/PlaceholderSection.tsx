/**
 * Placeholder section — rendered for section types that don't yet have a
 * component binding. Visible only to editors in draft/preview mode; production
 * falls back to nothing so missing sections never break a published page.
 */
import { draftMode } from "next/headers";

export default async function PlaceholderSection({ _type }: { _type?: string; _key?: string }) {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <section className="section-pad border-y-2 border-dashed border-amber-500/50 bg-amber-50/40">
      <div className="container-x">
        <div className="text-amber-900 font-mono text-xs uppercase tracking-widest mb-2">
          Section placeholder
        </div>
        <p className="font-display text-2xl text-amber-900">
          <code>{_type ?? "unknown"}</code> has no component yet.
        </p>
        <p className="text-amber-800/80 text-sm mt-2">
          Drop a different section type or wire this one up in{" "}
          <code>src/components/builder/SectionRegistry.tsx</code>.
        </p>
      </div>
    </section>
  );
}
