import { SVGProps } from "react";

/**
 * Inline SVG icon set — Woodex Interior.
 * All icons inherit `currentColor`, 1.5 stroke, rounded caps/joins, 24px viewBox.
 * Use className to set size + color.
 */

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconArrowRight = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
);
export const IconArrowLeft = (p: P) => (
  <svg {...base} {...p}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>
);
export const IconArrowUpRight = (p: P) => (
  <svg {...base} {...p}><path d="M7 17 17 7M7 7h10v10"/></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base} {...p}><path d="M3 5a2 2 0 0 1 2-2h2l2 5-2.5 1.5a11 11 0 0 0 5 5L13 12l5 2v2a2 2 0 0 1-2 2C9.37 18 3 11.63 3 5z"/></svg>
);
export const IconWhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.26-1.38c1.45.79 3.09 1.2 4.78 1.2 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.49 14.07c-.23.65-1.34 1.24-1.85 1.32-.47.07-1.08.1-1.74-.11-.4-.13-.92-.3-1.58-.58-2.78-1.21-4.6-4-4.74-4.19-.14-.19-1.14-1.52-1.14-2.9s.72-2.05.97-2.33c.25-.28.55-.35.73-.35.18 0 .37 0 .52.01.17.01.39-.06.61.47.23.54.78 1.86.85 2 .07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.27.33-.38.45-.13.13-.26.27-.11.52.14.25.64 1.06 1.37 1.72.94.84 1.74 1.1 1.99 1.22.25.13.4.11.54-.07.15-.18.62-.73.78-.97.16-.25.33-.21.55-.13.22.08 1.42.67 1.66.8.25.12.41.18.47.28.07.1.07.59-.17 1.23z"/>
  </svg>
);
export const IconEmail = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
);
export const IconPin = (p: P) => (
  <svg {...base} {...p}><path d="M12 22s7-7.58 7-13a7 7 0 0 0-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>
);
export const IconCopy = (p: P) => (
  <svg {...base} {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><polyline points="20 6 9 17 4 12"/></svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>
);
export const IconMenu = (p: P) => (
  <svg {...base} {...p}><path d="M4 7h16M4 17h16"/></svg>
);
export const IconSun = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
);
export const IconMoon = (p: P) => (
  <svg {...base} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
);
export const IconLinkedin = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>
);
export const IconBehance = (p: P) => (
  <svg {...base} {...p}><path d="M3 6h5a2.5 2.5 0 0 1 0 5H3zM3 11h5.5a2.5 2.5 0 0 1 0 5H3zM15 8h5M14 14h6a3 3 0 0 0-6 0 3 3 0 0 0 6 0"/></svg>
);
