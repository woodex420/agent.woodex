/**
 * Single image section — Phase 5: uses next/image with hotspot/crop support.
 * Server-rendered where possible; falls back to placeholder when no image.
 */
import Image from "next/image";
import { imageUrl } from "@/sanity/client";

export default function ImageSection({
  image,
  alt = "",
  caption,
  layout = "contained",
  aspect = "16/9",
}: {
  image?: any;
  alt?: string;
  caption?: string;
  layout?: "contained" | "full-bleed" | "wide";
  aspect?: "16/9" | "4/3" | "3/4" | "1/1" | "original";
}) {
  // Choose output width based on layout
  const width =
    layout === "full-bleed" ? 2000 : layout === "wide" ? 1600 : 1280;
  const src = image ? (typeof image === "string" ? image : imageUrl(image, { width })) : null;
  const resolvedAlt =
    alt || (typeof image === "object" ? image?.alt : "") || "";

  const aspectClass =
    aspect === "original"
      ? ""
      : aspect === "1/1"
      ? "aspect-square"
      : aspect === "3/4"
      ? "aspect-[3/4]"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[16/9]";

  if (!src) {
    return (
      <section className={`section-pad ${layout === "full-bleed" ? "" : "container-x"}`}>
        <div className={`${aspectClass} bg-[var(--surface-1)] rounded-sm flex items-center justify-center text-[var(--fg-muted)] text-sm`}>
          {alt || "Add an image in Sanity Studio"}
        </div>
        {caption && <p className="text-sm text-[var(--fg-muted)] text-center mt-4">{caption}</p>}
      </section>
    );
  }

  const wrapper =
    layout === "full-bleed"
      ? ""
      : layout === "wide"
      ? "container-x-wide"
      : "container-x";

  return (
    <section className={`section-pad ${layout === "full-bleed" ? "px-0" : ""}`}>
      <div className={wrapper}>
        <div className={`relative w-full overflow-hidden rounded-sm ${aspectClass}`}>
          <Image
            src={src}
            alt={resolvedAlt}
            fill
            sizes={
              layout === "full-bleed"
                ? "100vw"
                : layout === "wide"
                ? "(min-width:1280px) 1200px, 95vw"
                : "(min-width:1024px) 960px, 92vw"
            }
            className="object-cover"
          />
        </div>
        {caption && <p className="text-sm text-[var(--fg-muted)] text-center mt-4">{caption}</p>}
      </div>
    </section>
  );
}
