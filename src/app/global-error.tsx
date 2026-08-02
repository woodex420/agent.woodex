"use client";

/**
 * Sprint F — root error boundary. Catches errors that happen in the root layout
 * (where the normal error.tsx can't render because the layout shell errored).
 */
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#0d0c0a", color: "#f6f0e3", fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#c9a26a", marginBottom: 16 }}>
              Critical error
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.05, margin: "0 0 1rem" }}>
              Something failed.
            </h1>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.6, color: "rgba(246,240,227,0.75)", marginBottom: "2rem" }}>
              The page crashed on render. Try refreshing, or head back to the homepage.
              If the problem persists, call us directly.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  background: "#c9a26a", color: "#0d0c0a", border: "none",
                  padding: "0.85rem 1.75rem", borderRadius: 999, fontWeight: 500,
                  letterSpacing: 2, textTransform: "uppercase", fontSize: 13, cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link href="/" style={{ color: "#f6f0e3", textTransform: "uppercase", letterSpacing: 2, fontSize: 13, alignSelf: "center" }}>
                Back home →
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
