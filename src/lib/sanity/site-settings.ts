/**
 * Phase 4 — fetch site settings (including theme) from Sanity or fall back
 * to defaults. Cached with the `site` tag so /api/revalidate sweeps it.
 */
import { isSanityEnabled, sanityFetch } from "./fetch";
import { SITE_SETTINGS } from "./groq";
import { DEFAULT_THEME, type ThemeValues, auditTheme, buildCssVars } from "./theme";

interface RawSettings {
  title?: string;
  tagline?: string;
  phoneDisplay?: string;
  phoneTel?: string;
  whatsapp?: string;
  email?: string;
  addressLine1?: string;
  addressCity?: string;
  hoursShort?: string;
  brandPrimary?: string;
  brandAccent?: string;
  terracotta?: string;
  graphite?: string;
  paper?: string;
  headingFont?: string;
  bodyFont?: string;
  radiusPx?: number;
  containerMax?: number;
}

export interface SettingsWithTheme {
  theme: ThemeValues;
  cssVars: string;
  warnings: string[];
  // identity fields (optional, for future use)
  title?: string;
}

function cleanHex(v: string | undefined, fallback: string): string {
  if (v && /^#[0-9A-Fa-f]{6}$/.test(v)) return v;
  return fallback;
}

function normalizeSettings(d?: RawSettings | null): SettingsWithTheme {
  const defaults = DEFAULT_THEME;
  const theme: ThemeValues = {
    brandPrimary: cleanHex(d?.brandPrimary, defaults.brandPrimary),
    brandAccent: cleanHex(d?.brandAccent, defaults.brandAccent),
    terracotta: cleanHex(d?.terracotta, defaults.terracotta),
    graphite: cleanHex(d?.graphite, defaults.graphite),
    paper: cleanHex(d?.paper, defaults.paper),
    headingFont: d?.headingFont || defaults.headingFont,
    bodyFont: d?.bodyFont || defaults.bodyFont,
    radiusPx: typeof d?.radiusPx === "number" ? Math.max(0, Math.min(32, d.radiusPx)) : defaults.radiusPx,
    containerMax:
      typeof d?.containerMax === "number"
        ? Math.max(960, Math.min(1600, d.containerMax))
        : defaults.containerMax,
  };
  return {
    theme,
    cssVars: buildCssVars(theme),
    warnings: auditTheme(theme),
    title: d?.title,
  };
}

/**
 * Published theme (SSR-safe, ISR cached under tag "site").
 * Returns defaults when Sanity is off or no settings doc exists.
 */
export async function getSiteSettings(): Promise<SettingsWithTheme> {
  if (!isSanityEnabled()) return normalizeSettings(null);
  try {
    const doc = await sanityFetch<RawSettings | null>({
      query: SITE_SETTINGS,
      tags: ["site"],
      revalidate: 3600,
    });
    return normalizeSettings(doc);
  } catch {
    return normalizeSettings(null);
  }
}

/**
 * Draft theme — uses preview client so editors see unsaved changes.
 * Returns defaults when Sanity is off.
 */
export async function getDraftSiteSettings(): Promise<SettingsWithTheme> {
  if (!isSanityEnabled()) return normalizeSettings(null);
  try {
    const doc = await sanityFetch<RawSettings | null>({
      query: SITE_SETTINGS,
      tags: ["site"],
      preview: true,
      revalidate: false,
    });
    return normalizeSettings(doc);
  } catch {
    return normalizeSettings(null);
  }
}
