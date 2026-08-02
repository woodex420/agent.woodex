/**
 * Phase 4 — Theme helpers.
 *
 * Shape of a theme object (mirrors siteSettings theme fields):
 *   brandPrimary, brandAccent, terracotta, graphite, paper (hex strings)
 *   headingFont, bodyFont
 *   radiusPx, containerMax
 *
 * Defaults match the current design tokens in globals.css so editors always
 * see a valid theme even if Sanity is empty.
 */
export interface ThemeValues {
  brandPrimary: string;
  brandAccent: string;
  terracotta: string;
  graphite: string;
  paper: string;
  headingFont: string;
  bodyFont: string;
  radiusPx: number;
  containerMax: number;
}

export const DEFAULT_THEME: ThemeValues = {
  brandPrimary: "#a6804a",
  brandAccent: "#d2bb8e",
  terracotta: "#c85a3b",
  graphite: "#171717",
  paper: "#faf7f2",
  headingFont: "Fraunces",
  bodyFont: "Inter",
  radiusPx: 2,
  containerMax: 1280,
};

/** Clamp a hex colour channel to 0..255. */
function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

/** Parse "#rrggbb" → {r,g,b}. */
export function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "").trim();
  const v = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Convert {r,g,b} → "#rrggbb". */
export function toHex({ r, g, b }: { r: number; g: number; b: number }): string {
  return "#" + [r, g, b].map((c) => clamp(c).toString(16).padStart(2, "0")).join("");
}

/** Mix a colour with white/black by amount (0 = original, 1 = target). */
function mix(hex: string, targetHex: string, amount: number): string {
  const a = parseHex(hex);
  const b = parseHex(targetHex);
  return toHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

/** Relative luminance per WCAG. */
export function luminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio between two colours. */
export function contrast(a: string, b: string): number {
  const L1 = luminance(a);
  const L2 = luminance(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Derive the full oak/graphite palette from the 5 primary hex inputs.
 * Produces 9 oak shades and 11 graphite shades by mixing toward black/white.
 */
export function derivePalette(t: ThemeValues) {
  // oak scale around brandPrimary (500)
  const oak = {
    50: mix(t.brandPrimary, "#ffffff", 0.93),
    100: mix(t.brandPrimary, "#ffffff", 0.85),
    200: mix(t.brandPrimary, "#ffffff", 0.70),
    300: mix(t.brandPrimary, "#ffffff", 0.45),
    400: mix(t.brandPrimary, "#ffffff", 0.20),
    500: t.brandPrimary,
    600: mix(t.brandPrimary, "#000000", 0.18),
    700: mix(t.brandPrimary, "#000000", 0.36),
    800: mix(t.brandPrimary, "#000000", 0.55),
    900: mix(t.brandPrimary, "#000000", 0.72),
  };
  // graphite scale around graphite (900)
  const gr = {
    50: mix(t.graphite, "#ffffff", 0.95),
    100: mix(t.graphite, "#ffffff", 0.88),
    200: mix(t.graphite, "#ffffff", 0.78),
    300: mix(t.graphite, "#ffffff", 0.62),
    400: mix(t.graphite, "#ffffff", 0.45),
    500: mix(t.graphite, "#ffffff", 0.32),
    600: mix(t.graphite, "#ffffff", 0.20),
    700: mix(t.graphite, "#ffffff", 0.12),
    800: mix(t.graphite, "#ffffff", 0.06),
    900: t.graphite,
    950: mix(t.graphite, "#000000", 0.4),
  };
  const graphite = gr;
  return { oak, graphite };
}

/**
 * Build the CSS custom properties declaration for a theme.
 * Returns a string like "--oak-500:#a6804a;--graphite-900:#171717;..."
 */
export function buildCssVars(t: ThemeValues): string {
  const { oak, graphite: gr } = derivePalette(t);
  const bg = t.paper;
  const bgSubtle = oak[100];
  const surface1 = "#ffffff";
  const rSm = Math.max(1, Math.round(t.radiusPx / 4));
  const rMd = Math.max(2, Math.round(t.radiusPx / 2));
  const rLg = t.radiusPx;
  const rXl = Math.round(t.radiusPx * 1.5);

  const vars: Record<string, string> = {
    // Brand (oak)
    "--oak-50": oak[50],
    "--oak-100": oak[100],
    "--oak-200": oak[200],
    "--oak-300": oak[300],
    "--oak-400": oak[400],
    "--oak-500": oak[500],
    "--oak-600": oak[600],
    "--oak-700": oak[700],
    "--oak-800": oak[800],
    "--oak-900": oak[900],

    // Graphite
    "--graphite-50": gr[50],
    "--graphite-100": gr[100],
    "--graphite-200": gr[200],
    "--graphite-300": gr[300],
    "--graphite-400": gr[400],
    "--graphite-500": gr[500],
    "--graphite-600": gr[600],
    "--graphite-700": gr[700],
    "--graphite-800": gr[800],
    "--graphite-900": gr[900],
    "--graphite-950": gr[950],

    // Accent warm
    "--accent": t.terracotta,
    "--accent-hover": mix(t.terracotta, "#000000", 0.15),

    // Semantic — light
    "--bg": bg,
    "--bg-elevated": surface1,
    "--bg-subtle": bgSubtle,
    "--bg-invert": gr[900],
    "--fg": gr[900],
    "--fg-muted": gr[600],
    "--fg-subtle": gr[400],
    "--fg-invert": oak[50],
    "--border": hexRgba(gr[900], 0.10),
    "--border-strong": hexRgba(gr[900], 0.20),
    "--ring": oak[500],
    "--surface-1": surface1,
    "--surface-2": oak[50],
    "--surface-3": gr[900],
    "--overlay": hexRgba(gr[950], 0.6),

    // Typography
    "--font-display-display": `"${t.headingFont}", "Playfair Display", Georgia, serif`,
    "--font-sans-display": `"${t.bodyFont}", ui-sans-serif, system-ui, -apple-system, sans-serif`,
    // Keep existing --font-display/--font-sans keys so globals.css @theme inline picks them up:
    "--font-display": `"${t.headingFont}", "Playfair Display", Georgia, serif`,
    "--font-sans": `"${t.bodyFont}", ui-sans-serif, system-ui, -apple-system, sans-serif`,

    // Radii
    "--r-sm": `${rSm}px`,
    "--r-md": `${rMd}px`,
    "--r-lg": `${rLg}px`,
    "--r-xl": `${rXl}px`,
    "--r-full": "9999px",
    "--radius": `${t.radiusPx}px`,

    // Layout
    "--container": `min(${t.containerMax}px, 92vw)`,
  };

  return Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

function hexRgba(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Basic contrast audit — returns an array of warnings to show in Studio.
 * Empty array = passes AA for body text.
 */
export function auditTheme(t: ThemeValues): string[] {
  const warnings: string[] = [];
  const bodyContrast = contrast(t.brandPrimary, t.paper);
  if (bodyContrast < 4.5) {
    warnings.push(
      `Brand primary ${t.brandPrimary} on paper ${t.paper} is ${bodyContrast.toFixed(2)}:1 (need 4.5:1 for AA body text). Darken the primary or lighten the page.`,
    );
  }
  const accentContrast = contrast(t.brandAccent, t.graphite);
  if (accentContrast < 3) {
    warnings.push(
      `Brand accent ${t.brandAccent} on graphite ${t.graphite} is ${accentContrast.toFixed(2)}:1 (need 3:1 for large text). Lighten the accent.`,
    );
  }
  const fgContrast = contrast(t.graphite, t.paper);
  if (fgContrast < 7) {
    warnings.push(
      `Graphite/ink ${t.graphite} on paper ${t.paper} is ${fgContrast.toFixed(2)}:1 (AAA is 7:1; still AA-legal).`,
    );
  }
  return warnings;
}
