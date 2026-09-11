"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SITE } from "@/lib/config";

/**
 * Linoxa Header — fixed, hide-on-scroll (desktop >820px only per DESIGN.md),
 * mega on Services, cream pages get navy bar.
 */
type NavLink = { label: string; href: string };

const NAV: NavLink[] = [
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
      { label: "Commercial", href: "/services/commercial", sub: "Retail, cafés, hospitality" },
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
  const [megaItem, setMegaItem] = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScroll = useRef(0);

  const isHome = pathname === "/";
  const isDark = isHome && !scrolled; // hero page, before scroll: white type on cine

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide-on-scroll desktop only
      if (window.innerWidth > 820 && y > 200) {
        setHidden(y > lastScroll.current);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMega(false); setMegaItem(null); }, [pathname]);

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

  function openMega(label: string) {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(true); setMegaItem(label);
  }
  function closeMega() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => { setMega(false); setMegaItem(null); }, 180);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled || open || !isHome
            ? "bg-[var(--cream)]/95 backdrop-blur-xl border-b border-[var(--border)] text-[var(--ink)] py-3"
            : "bg-transparent py-5 text-[var(--cream)]"
        )}
      >
        <div className="container-x flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 inline-block">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M4 26V8l10-4 14 4v18l-14 4L4 26z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M14 4v26M4 8l10 4 14-4M4 26l10-4 14 4" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              </svg>
            </span>
            <span className="font-display text-lg md:text-xl tracking-tight">
              Woodex<span className="text-[var(--wood)]">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((l) => {
              const active = isActive(pathname, l.href);
              const isServices = l.href === "/services";
              if (isServices) {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => openMega("Services")}
                    onMouseLeave={closeMega}
                  >
                    <Link
                      href={l.href}
                      aria-expanded={mega && megaItem === "Services"}
                      aria-haspopup="true"
                      className={cn(
                        "px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] font-medium relative transition-colors",
                        active ? "text-[var(--wood-deep)]" : "hover:text-[var(--wood-deep)]"
                      )}
                    >
                      {l.label}
                      <span
                        className={cn(
                          "absolute left-4 right-4 -bottom-0.5 h-px bg-current origin-left transition-transform duration-300",
                          active || (mega && megaItem === "Services") ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] font-medium relative transition-colors",
                    active ? "text-[var(--wood-deep)]" : "hover:text-[var(--wood-deep)]"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute left-4 right-4 -bottom-0.5 h-px bg-current origin-left transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hidden xl:flex flex-col leading-tight"
            >
              <span className="text-[0.7rem] uppercase tracking-widest font-medium">{SITE.phoneDisplay}</span>
              <span className={cn("text-[10px] uppercase tracking-widest mt-0.5", scrolled || !isHome ? "text-[var(--muted)]" : "text-white/60")}>
                Quick reply · 15 min
              </span>
            </a>
            <LinoxaButton
              variant={isDark ? "light" : "dark"}
              size="sm"
              magnetic
              href="/contact"
              className="hidden sm:inline-flex"
            >
              Start Project
            </LinoxaButton>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full",
                scrolled || !isHome ? "" : ""
              )}
            >
              <span className={cn("absolute left-3 right-3 h-px bg-current transition-all duration-300", open ? "top-1/2 rotate-45" : "top-[14px]")} />
              <span className={cn("absolute left-3 right-3 h-px bg-current transition-all duration-200", open ? "opacity-0" : "top-1/2")} />
              <span className={cn("absolute left-3 right-3 h-px bg-current transition-all duration-300", open ? "top-1/2 -rotate-45" : "bottom-[14px]")} />
            </button>
          </div>
        </div>

        {/* Mega panel */}
        <div
          className={cn(
            "hidden lg:block overflow-hidden transition-all duration-400",
            mega ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
          onMouseEnter={() => megaItem && openMega(megaItem)}
          onMouseLeave={closeMega}
        >
          <div className="container-x mt-3">
            <div className="bg-[var(--cream)] border border-[var(--border)] rounded-[var(--r-lg)] overflow-hidden shadow-[var(--shadow-md)]">
              <div className="grid md:grid-cols-2 divide-x divide-[var(--border)]">
                {MEGA.map((col) => (
                  <div key={col.heading} className="p-8">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-6 flex items-center gap-3">
                      <span className="w-6 h-px bg-[var(--wood)]" />
                      {col.heading}
                    </div>
                    <ul className="space-y-1">
                      {col.items.map((it) => (
                        <li key={it.href}>
                          <Link href={it.href} className="group/m flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-[var(--r-sm)] hover:bg-[var(--cream-2)] transition-colors" onClick={() => setMega(false)}>
                            <span>
                              <span className="font-display text-xl block group-hover/m:text-[var(--wood-deep)] transition-colors">{it.label}</span>
                              <span className="text-xs text-[var(--muted)] mt-0.5 block">{it.sub}</span>
                            </span>
                            <span className="linoxa-arrow w-9 h-9 text-[var(--ink)]/50 group-hover/m:text-[var(--wood-deep)]">
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="-rotate-45"><path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="bg-[var(--navy)] text-[var(--cream)] px-8 py-5 flex items-center justify-between">
                <p className="text-sm text-white/70">Not sure where to start? Book a 20-minute qualification call.</p>
                <LinoxaButton variant="cream" size="sm" href="/contact">Start Project</LinoxaButton>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div className={cn("lg:hidden overflow-hidden transition-all duration-500", open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
          <nav className="container-x py-6 bg-[var(--cream)] mt-3 rounded-[var(--r-lg)] border border-[var(--border)]">
            {NAV.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn("block py-3 font-display text-2xl border-b border-[var(--border)] last:border-0", active ? "text-[var(--wood-deep)]" : "text-[var(--ink)]")}
                >
                  {l.label}
                </Link>
              );
            })}
            <a href={`https://wa.me/${SITE.whatsapp}`} className="block py-3 text-xs uppercase tracking-widest text-[var(--muted)]">
              WhatsApp · ~15 min reply
            </a>
            <div className="mt-4"><LinoxaButton variant="dark" href="/contact" className="w-full justify-center">Start Project</LinoxaButton></div>
          </nav>
        </div>
      </header>
    </>
  );
}
