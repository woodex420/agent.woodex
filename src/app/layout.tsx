import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontDisplay, fontMono } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import NavServer from "@/components/layout/Nav.server";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import MobileStickyCTA from "@/components/ui/MobileStickyCTA";
import ScrollReveal from "@/components/providers/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import AppMotionConfig from "@/components/providers/MotionConfig";
import PreviewToolbar from "@/components/providers/PreviewToolbar";
import DraftGate from "@/components/providers/DraftGate";
import Analytics from "@/components/providers/Analytics";
import ConsentBanner from "@/components/ui/ConsentBanner";
import { ToastProvider } from "@/components/ui/Toast";
import StudioBridge from "@/components/builder/StudioBridge";
import ThemePreviewServer from "@/components/builder/ThemePreview.server";
import DraftActivityBarServer from "@/components/builder/DraftActivityBar.server";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "Woodex Interior — Design + Build for Workplaces & Commercial Spaces · Lahore",
    template: "%s · Woodex Interior",
  },
  description:
    "Woodex Interior is a Lahore-based Design + Build studio for corporate workplaces, office fit-out, retail and hospitality. See the room before it exists. Approved in 3D. Delivered on the contract date.",
  metadataBase: new URL("https://woodex.com.pk"),
  openGraph: {
    type: "website",
    title: "Woodex Interior — Designed. Built. Made by Woodex.",
    description:
      "Design + Build for workplaces & commercial spaces in Lahore. 3D-first, workshop-built, 98% on the contract date.",
    locale: "en_PK",
    siteName: "Woodex Interior",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodex Interior — Designed. Built. Made by Woodex.",
    description:
      "Corporate workplaces · Office fit-out · Retail · Hospitality — Lahore.",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraft = (await draftMode()).isEnabled;
  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`} data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#A98252" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1E1E1C" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate" type="application/rss+xml" title="Woodex Journal RSS" href="/feed.xml" />
        <ThemeScript />
      </head>
      <body className="min-h-svh flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--oak-500)] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:font-medium focus:uppercase focus:text-sm focus:tracking-widest"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <ToastProvider>
            <AppMotionConfig>
              <DraftGate>
                <JsonLd />
                <SmoothScroll>
                  <div className="no-print">
                    <NavServer />
                  </div>
                  <main id="main-content" className="flex-1">{children}</main>
                  <div className="no-print">
                    <Footer />
                    <MobileStickyCTA />
                  </div>
                </SmoothScroll>
                <div className="no-print">
                  <ChatWidget />
                  <ConsentBanner />
                  <Analytics />
                  <ScrollReveal />
                  {isDraft && <PreviewToolbar />}
                  <StudioBridge />
                  <ThemePreviewServer />
                  <DraftActivityBarServer />
                </div>
              </DraftGate>
            </AppMotionConfig>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
