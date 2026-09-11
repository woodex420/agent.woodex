"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SITE } from "@/lib/config";

/**
 * LinoxaHeader v2 — matches the screenshot exactly:
 * - Cube logo + "Woodex." wordmark
 * - Uppercase spaced nav (HOME · ABOUT · SERVICES · WORK · INSIGHTS · CONTACT)
 *   active item has a short underline
 * - Phone + "QUICK REPLY · 15 MIN" all-caps micro
 * - Navy pill "START PROJECT" with circular up-right arrow
 * - Fixed, hides on scroll (desktop)
 * - Cream page (always visible in this Linoxa light theme)
 */
const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const MEGA = [
  {
    heading: "Design + Build",
    items: [
      { label: "Office Fit-Out", href: "/services/office-fit-out", sub: "Shell to working floor" },
      { label: "Corporate Interiors", href: "/services/corporate", sub: "HQs & brand-led floors" },
      { label: "Commercial & Retail", href: "/services/commercial", sub: "Shops, cafés, hospitality" },
      { label: "Residential", href: "/services/residential", sub: "Selected private homes" },
      { label: "Turnkey", href: "/services/turnkey", sub: "Keys in. Keys out." },
    ],
  },
  {
    heading: "Specialist",
    items: [
      { label: "Open 3D Studio", href: "/3d-studio", sub: "See the room before it exists" },
      { label: "Custom Furniture", href: "/services/custom-furniture", sub: "Workshop-built joinery" },
      { label: "Renovation", href: "/services/renovation", sub: "Old spaces, made new" },
      { label: "Woodex Furniture", href: "/services/custom-furniture", sub: "Sister concern" },
      { label: "All services", href: "/services", sub: "Full capability list" },
    ],
  },
];

function isActive(p: string, h: string) {
  if (h === "/") return p === "/";
  return p === h || p.startsWith(h + "/");
}

export default function LinoxaHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (window.innerWidth > 820 && y > 180) setHidden(y > lastY.current);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setOpen(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  function openMega() { if (megaTimer.current) clearTimeout(megaTimer.current); setMega(true); }
  function closeMega() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 180);
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      hidden && !open ? "-translate-y-full" : "translate-y-0",
      scrolled || open
        ? "bg-[var(--beige)]/95 backdrop-blur-xl border-b border-[var(--border)] py-2.5 text-[var(--black)]"
        : "bg-transparent py-5 text-[var(--black)]"
    )}>
      <div className="container-x flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0 -ml-1">
          <span className="w-9 h-9 inline-block">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <path d="M6 28V10l12-5 12 5v18l-12 4L6 28z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M18 5v27M6 10l12 4 12-4M6 28l12-4 12 4" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
            </svg>
          </span>
          <span className="font-display text-xl tracking-tight">Woodex<span className="text-[var(--accent)]">.</span></span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.2em]">
          {NAV.map((l) => {
            const active = isActive(pathname, l.href);
            const isServices = l.href === "/services";
            if (isServices) {
              return (
                <div key={l.href} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <Link href={l.href} aria-expanded={mega} aria-haspopup="true"
                        className={cn("px-4 py-2 relative transition-colors hover:text-[var(--accent)]", active && "text-[var(--accent)]")}>
                    {l.label}
                    <span className={cn("absolute left-4 right-4 -bottom-0.5 h-px bg-current origin-left transition-transform duration-300", (active||mega)?"scale-x-100":"scale-x-0")} />
                  </Link>
                </div>
              );
            }
            return (
              <Link key={l.href} href={l.href}
                    className={cn("px-4 py-2 relative transition-colors hover:text-[var(--accent)]", active && "text-[var(--accent)]")}>
                {l.label}
                <span className={cn("absolute left-4 right-4 -bottom-0.5 h-px bg-current origin-left transition-transform duration-300", active?"scale-x-100":"scale-x-0")} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${SITE.phoneTel}`} className="hidden xl:flex flex-col leading-tight whitespace-nowrap">
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em]">{SITE.phoneDisplay}</span>
            <span className="text-[9px] uppercase tracking-[0.18em] mt-0.5 text-[var(--charcoal)]">Quick reply · 15 min</span>
          </a>
          <LinoxaButton variant="dark" size="sm" magnetic href="/contact" className="hidden sm:inline-flex">
            Start Project
          </LinoxaButton>

          <button type="button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open}
                  onClick={()=>setOpen(!open)}
                  className="lg:hidden relative w-11 h-11 flex items-center justify-center">
            <span className={cn("absolute left-2.5 right-2.5 h-px bg-current transition-all", open?"top-1/2 rotate-45":"top-[13px]")} />
            <span className={cn("absolute left-2.5 right-2.5 h-px bg-current transition-all", open?"opacity-0":"top-1/2")} />
            <span className={cn("absolute left-2.5 right-2.5 h-px bg-current transition-all", open?"top-1/2 -rotate-45":"bottom-[13px]")} />
          </button>
        </div>
      </div>

      {/* Mega panel */}
      <div className={cn("hidden lg:block overflow-hidden transition-all duration-400", mega?"max-h-[600px] opacity-100":"max-h-0 opacity-0 pointer-events-none")}
           onMouseEnter={openMega} onMouseLeave={closeMega}>
        <div className="container-x mt-3">
          <div className="bg-[var(--beige)] border border-[var(--border)] rounded-[var(--r-lg)] overflow-hidden shadow-[var(--shadow-md)]">
            <div className="grid md:grid-cols-2 divide-x divide-[var(--border)]">
              {MEGA.map(col => (
                <div key={col.heading} className="p-8">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] mb-6 flex items-center gap-3">
                    <span className="w-6 h-px bg-[var(--black)]" />{col.heading}
                  </div>
                  <ul className="space-y-1">
                    {col.items.map(it => (
                      <li key={it.href}>
                        <Link href={it.href} onClick={()=>setMega(false)}
                              className="group/m flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-[var(--r-sm)] hover:bg-[var(--bg-subtle)] transition-colors">
                          <span>
                            <span className="font-display text-xl block group-hover/m:text-[var(--accent)] transition-colors">{it.label}</span>
                            {it.sub && <span className="text-xs text-[var(--charcoal)] mt-0.5 block">{it.sub}</span>}
                          </span>
                          <span className="linoxa-circle w-9 h-9 text-[var(--black)]/50 group-hover/m:text-[var(--accent)]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-[var(--navy)] text-[var(--beige)] px-8 py-5 flex items-center justify-between">
              <p className="text-sm text-white/75">Not sure where to start? Book a 20-minute qualification call.</p>
              <LinoxaButton variant="cream" size="sm" href="/contact">Start Project</LinoxaButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={cn("lg:hidden overflow-hidden transition-all duration-500", open?"max-h-[1000px] opacity-100":"max-h-0 opacity-0")}>
        <nav className="container-x py-6 bg-[var(--beige)] mt-3 rounded-[var(--r-lg)] border border-[var(--border)]">
          {NAV.map(l => {
            const active = isActive(pathname, l.href);
            return <Link key={l.href} href={l.href} onClick={()=>setOpen(false)}
                         className={cn("block py-3 font-display text-2xl border-b border-[var(--border)] last:border-0", active?"text-[var(--accent)]":"text-[var(--black)]")}>{l.label}</Link>;
          })}
          <a href={`https://wa.me/${SITE.whatsapp}`} className="block py-3 text-xs uppercase tracking-widest text-[var(--charcoal)]">WhatsApp · ~15 min reply</a>
          <div className="mt-4"><LinoxaButton variant="dark" href="/contact" className="w-full justify-center">Start Project</LinoxaButton></div>
        </nav>
      </div>
    </header>
  );
}
