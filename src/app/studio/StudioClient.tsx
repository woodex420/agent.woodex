"use client";

/**
 * Sprint E5 — Sanity Studio mounted inside Next.js at /studio.
 * Password gate shown unless STUDIO_PASSWORD is empty (local dev).
 * NextStudio is lazy-loaded so the Sanity bundle doesn't ship to regular pages.
 */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => ({ default: m.NextStudio })),
  { ssr: false },
);

const studioPassword = process.env.NEXT_PUBLIC_STUDIO_PASSWORD ?? process.env.STUDIO_PASSWORD ?? "";

const STORAGE_KEY = "woodex_studio_authed";

export default function StudioClient() {
  const [authed, setAuthed] = useState<boolean>(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!studioPassword) { setAuthed(true); setLoading(false); return; }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!studioPassword) { setAuthed(true); return; }
    if (pw === studioPassword) {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
      setAuthed(true);
    } else {
      setErr("Wrong password.");
    }
  }

  if (loading) return null;

  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--graphite-900)] text-white flex items-center justify-center p-6 noise">
        <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/5 border border-white/10 p-8 rounded-sm">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-4">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            Woodex Studio
          </div>
          <h1 className="font-display text-3xl mb-2">Private.</h1>
          <p className="text-sm text-white/60 mb-6">Enter the shared team password to open the CMS.</p>
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--oak-400)] transition mb-2"
            placeholder="Studio password"
            aria-label="Studio password"
          />
          {err && <p className="text-xs text-red-300 mb-2" role="alert">{err}</p>}
          <button
            type="submit"
            className="mt-4 w-full relative inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase px-8 py-3 text-[0.9rem] rounded-full overflow-hidden border border-white/30 text-white group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)]"
          >
            <span aria-hidden className="absolute inset-0 -z-10 bg-[var(--oak-400)] translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
            <span className="relative z-10 group-hover:text-[var(--graphite-900)] transition-colors duration-500">Open Studio →</span>
          </button>
        </form>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
