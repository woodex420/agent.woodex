"use client";

/**
 * Phase 4 — Theme live-preview client.
 *
 * Mounted only when draftMode is on. Polls /api/theme/draft once per second
 * and applies returned CSS custom properties to document.documentElement so
 * editors see colour/type/radius changes in <1.5s.
 *
 * Strategy: write theme vars into a <style id="woodex-theme-preview"> in <head>.
 * That way we don't fight with inline styles or the inline ThemeScript, and
 * the preview overrides (higher specificity via a second :root block) win over
 * defaults but not over dark theme overrides — we match light/dark theme by
 * emitting both :root and [data-theme="dark"] blocks with the same custom
 * values (so dark theme semantic tokens are re-derived by globals.css).
 */
import { useEffect } from "react";

const STYLE_ID = "woodex-theme-preview";

function applyCssVars(cssVars: string) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    el.setAttribute("data-woodex", "theme-preview");
    document.head.appendChild(el);
  }
  // Higher specificity rule so preview beats ThemeScript inlined vars.
  el.textContent = `:root[data-theme-preview="1"] { ${cssVars} }`;
  document.documentElement.setAttribute("data-theme-preview", "1");
}

function clearPreview() {
  document.documentElement.removeAttribute("data-theme-preview");
  const el = document.getElementById(STYLE_ID);
  if (el) el.remove();
}

export default function ThemePreview() {
  useEffect(() => {
    let active = true;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const seen = new Set<string>();

    async function tick() {
      if (!active) return;
      try {
        const r = await fetch("/api/theme/draft", { cache: "no-store" });
        if (!active) return;
        if (r.ok) {
          const data = (await r.json()) as { cssVars: string; warnings?: string[] };
          if (data.cssVars) applyCssVars(data.cssVars);
          if (data.warnings?.length) {
            for (const w of data.warnings) {
              if (!seen.has(w)) {
                seen.add(w);
                console.warn("[ThemePreview]", w);
              }
            }
          }
        } else if (r.status === 404) {
          clearPreview();
        }
      } catch {
        // ignore
      } finally {
        if (active) timeout = setTimeout(tick, 1000);
      }
    }

    tick();
    return () => {
      active = false;
      if (timeout) clearTimeout(timeout);
      clearPreview();
    };
  }, []);

  return null;
}
