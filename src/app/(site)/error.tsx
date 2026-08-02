"use client";

/**
 * Sprint F — app-level error boundary. Shown when a server component or a
 * client component throws during render. Resets via router.refresh() so a
 * reload isn't required.
 */
import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="section-pad min-h-[70vh] flex items-center">
        <div className="container-x max-w-2xl">
          <div className="font-mono text-sm text-[var(--oak-600)] tracking-widest mb-4 uppercase">
            500 · Something broke
          </div>
          <h1 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            That page<br />
            <span className="italic-serif text-[var(--oak-600)]">threw an error.</span>
          </h1>
          <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-8">
            It's not you — it's us. Try again, or if the problem keeps happening
            call or WhatsApp us directly and we'll fix it.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={reset} variant="liquid" magnetic>Try again</Button>
            <Link href="/" className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)]">
              Back home →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
