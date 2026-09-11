import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Relaunch Sprint 0: single-family type system per DESIGN.md — Plus Jakarta Sans 300–700.
 * No second typeface. Both body and display share the same family; headings get weight + tracking.
 */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/** Display (headings) reuses the same family, just mapped to --font-display for legacy components. */
export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
