/**
 * Inline blocking script, runs BEFORE paint to set:
 *   1. Light/dark data-theme attribute (avoids FOUC).
 *   2. When Sanity is enabled, inlines published theme CSS vars on :root so
 *      pages render with editor-customised colours on first paint (no FOUC).
 *
 * Server-rendered: the published `cssVars` string is awaited at request time and
 * embedded directly into the script. Because the theme is ISR-cached under the
 * "site" tag, this is fast after first render.
 */
import { getSiteSettings } from "@/lib/sanity/site-settings";

export default async function ThemeScript() {
  const { cssVars } = await getSiteSettings();

  const themeScript = `(function(){
try {
  var s = localStorage.getItem('woodex-theme');
  var m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var t = s || (m ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
  var v = ${JSON.stringify(cssVars)};
  if (v) {
    document.documentElement.setAttribute('style', (document.documentElement.getAttribute('style')||'') + ';' + v);
  }
} catch(e) {}
})();`;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
