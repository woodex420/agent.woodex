/**
 * Sprint F — PWA-ish manifest. Minimal but sufficient for mobile "add to home screen".
 */
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Woodex",
    description: "Interior design and build studio in Lahore. Approve it in 3D. Get exactly that.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0c0a",
    theme_color: "#a6804a",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      // Placeholder icons — replace with real 192/512 PNGs when designed.
      { src: "/images/og-woodex.jpg", sizes: "1200x630", type: "image/jpeg", purpose: "any" },
    ],
  };
}
