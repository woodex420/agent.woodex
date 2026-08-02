import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontDisplay, fontMono } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import NavServer from "@/components/layout/Nav.server";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
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
    default: "Woodex Interior — Approve it in 3D. Get exactly that.",
    template: "%s · Woodex Interior",
  },
  description:
    "Design-and-build interior studio in Lahore. Commercial, residential, corporate and retail fit-outs with a 3D-first process. Approve it in 3D. Get exactly that. On the date we said.",
  metadataBase: new URL("https://woodex.studio"),
  openGraph: {
    type: "website",
    title: "Woodex Interior",
    description:
      "Design-and-build interior studio. 3D-first process, fixed dates, zero surprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodex Interior",
    description:
      "Design-and-build interior studio. 3D-first process, fixed dates, zero surprises.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraft = (await draftMode()).isEnabled;
  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`} data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#a6804a" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
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
                  </div>
                </SmoothScroll>
                <div className="no-print">
                  <ChatWidget />
                  <ConsentBanner />
                  <Analytics />
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
