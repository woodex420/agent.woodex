"use client";

/**
 * Sprint F — Analytics loader.
 *
 * - Loads GA4 via next/script strategy="afterInteractive".
 * - Uses Google Consent Mode v2 defaults (denied) until the visitor accepts analytics.
 * - Listens for the `woodex_consent` event fired by ConsentBanner and updates
 *   consent via gtag('consent', 'update', ...).
 *
 * GA measurement ID is read from NEXT_PUBLIC_GA_ID. If the env var is unset,
 * nothing loads — the site runs analytics-free in local dev.
 */
import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    // Apply stored consent on boot.
    try {
      const stored = localStorage.getItem("woodex_consent");
      const analytics = stored === "accepted";
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer ?? [];
      w.gtag =
        w.gtag ??
        function gtag(...args: unknown[]) {
          (w.dataLayer as unknown[]).push(args);
        };
      w.gtag("js", new Date());
      w.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500,
      });
      if (analytics) {
        w.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
        });
      }

      const handler = (e: Event) => {
        const accepted = (e as CustomEvent<{ accepted: boolean }>).detail?.accepted ?? false;
        w.gtag?.("consent", "update", {
          analytics_storage: accepted ? "granted" : "denied",
          ad_storage: "denied",
        });
      };
      window.addEventListener("woodex_consent", handler as EventListener);
      return () => window.removeEventListener("woodex_consent", handler as EventListener);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
        nonce=""
      />
      <Script id="woodex-ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('config', '${GA_ID}', { anonymize_ip: true, allow_google_signals: false });
      `}</Script>
    </>
  );
}
