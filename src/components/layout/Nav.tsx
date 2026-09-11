"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { SITE } from "@/lib/config";

type NavLink = { label: string; href: string; order?: number };
type MegaColumn = { heading: string; items: { label: string; href: string; sub?: string }[] };

/**
 * Relaunch nav — PRD primary nav: Work · Services · Industries · About · Insights + Start Your Project.
 * 3D Studio sits as a top-level utility link (Open 3D Studio) per 90-day non-negotiable #4.
 */
const STATIC_NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/portfolio", order: 10 },        // /work hub rename pending; /portfolio is the current alias
  { label: "Services", href: "/services", order: 20 },
  { label: "Industries", href: "/industries", order: 30 }, // hub being built in Sprint 3
  { label: "About", href: "/about", order: 40 },
  { label: "Insights", href: "/blog", order: 50 },          // /insights rename pending
];

/** Services mega menu — two-column: Capabilities (P1 first) + Specialist */
const MEGA_COLUMNS: MegaColumn[] = [
  {
    heading: "Capabilities",
    items: [
      { label: "Office Fit-Out", href: "/services/office-fit-out", sub: "Shell to working floor" },
      { label: "Corporate Interiors", href: "/services/corporate", sub: "HQs & multi-site" },
      { label: "Commercial Interiors", href: "/services/commercial", sub: "Offices & floors" },
      { label: "Turnkey Design + Build", href: "/services/turnkey", sub: "Keys in. Keys out." },
      { label: "Retail & F&B", href: "/services/retail", sub: "Shops, cafés, restaurants" },
      { label: "Residential Interiors", href: "/services/residential", sub: "Selected homes & villas" },
    ],
  },
  {
    heading: "Specialist",
    items: [
      { label: "Workplace Strategy", href: "/services/office-fit-out", sub: "Space planning & brief" },
      { label: "3D Visualisation", href: "/services/3d-design-planning", sub: "See the room before it exists" },
      { label: "Open 3D Studio", href: "/3d-studio", sub: "Live, interactive design sessions" },
      { label: "Custom Furniture", href: "/services/custom-furniture", sub: "Workshop-built joinery" },
      { label: "Office Furniture", href: "/services/office-furniture", sub: "Workstations & seating" },
      { label: "Renovation", href: "/services/renovation", sub: "Old spaces, made new" },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav({ extraLinks = [] }: { extraLinks?: NavLink[] }) {
  // Merge static + builder-managed links, de-dupe by href, sort by order.
  const seen = new Set<string>();
  const NAV_LINKS: NavLink[] = [...STATIC_NAV_LINKS, ...extraLinks]
    .filter((l) => {
      if (seen.has(l.href)) return false;
      seen.add(l.href);
      return true;
    })
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Hero pages: transparent nav over imagery until scroll
  const heroPages = /^\/($|portfolio(\/|$)|services\/[^/]+($|\/)|blog\/[^/]+\/[^/]+($|\/))/;
  const isHeroPage = heroPages.test(pathname);
  const onLight = scrolled || open || megaOpen || !isHeroPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Escape closes mega menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        if (open) { setOpen(false); closeBtnRef.current?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-out-quart)]",
          onLight
            ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] py-2.5"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-x flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0 -ml-1"
            aria-label="Woodex Interior home"
          >
            <span
              className={cn(
                "inline-block w-7 sm:w-8 h-7 sm:h-8 transition-colors duration-500",
                onLight ? "text-[var(--oak-600)]" : "text-white"
              )}
            >
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M4 26V8l10-4 14 4v18l-14 4L4 26z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 4v26M4 8l10 4 14-4M4 26l10-4 14 4" stroke="currentColor" strokeWidth="1" opacity="0.7" />
              </svg>
            </span>
            <span
              className={cn(
                "font-display text-base sm:text-lg md:text-xl tracking-tight transition-colors duration-500",
                onLight ? "text-[var(--fg)]" : "text-white"
              )}
            >
              Woodex<span className="text-[var(--oak-500)]">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Primary"
            className={cn(
              "hidden lg:flex items-center gap-6 xl:gap-7 text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-colors duration-500",
              onLight ? "text-[var(--fg)]" : "text-white/90"
            )}
          >
            {NAV_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              const isServices = l.href === "/services";

              if (isServices) {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      className={cn(
                        "relative py-1 transition-colors inline-flex items-center gap-1",
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-300",
                        active
                          ? "text-[var(--oak-500)] after:scale-x-100"
                          : "hover:text-[var(--oak-400)] after:scale-x-0"
                      )}
                      onFocus={openMega}
                    >
                      {l.label}
                      <svg
                        width="9" height="9" viewBox="0 0 10 10"
                        className={cn("transition-transform duration-300", megaOpen && "rotate-180")}
                        aria-hidden
                      >
                        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 transition-colors",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-300",
                    active
                      ? "text-[var(--oak-500)] after:scale-x-100"
                      : "hover:text-[var(--oak-400)] after:scale-x-0"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle
              className={cn(
                onLight
                  ? "border-[var(--border-strong)] text-[var(--fg-muted)]"
                  : "border-white/25 text-white/80 hover:text-white hover:border-white/50"
              )}
            />
            <a
              href={`tel:${SITE.phoneTel}`}
              className={cn(
                "hidden xl:flex flex-col leading-tight whitespace-nowrap transition-colors duration-500",
                onLight ? "text-[var(--fg-muted)] hover:text-[var(--oak-600)]" : "text-white/70 hover:text-white"
              )}
            >
              <span className="text-xs font-medium tracking-widest uppercase">{SITE.phoneDisplay}</span>
              <span className={cn(
                "text-[10px] tracking-widest uppercase mt-0.5",
                onLight ? "text-[var(--fg-subtle)]" : "text-white/50"
              )}>
                Quick reply · 15 min
              </span>
            </a>
            <Button
              variant={onLight ? "liquid" : "glass"}
              size="sm"
              magnetic
              href="/consultation"
            >
              Start your project
            </Button>
          </div>

          {/* Mobile cluster — smaller on <380px to prevent overlap */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-1.5">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              aria-label="WhatsApp"
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-colors",
                onLight
                  ? "border-[var(--border-strong)] text-[var(--fg)] hover:text-[var(--oak-600)]"
                  : "border-white/25 text-white hover:bg-white/10"
              )}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.2-.6.2s-.7.9-.9 1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.2.3-.4.1-.1 0-.3 0-.4s-.6-1.4-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.5-.3M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2m5.8 14.5c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .3-6.5-2.1-2.4-1.1-4-3.7-4.1-3.9-.1-.2-.9-1.2-.9-2.3s.5-1.7.8-2c.2-.3.4-.3.5-.3h.4c.1 0 .3 0 .5.4.2.5.7 1.6.7 1.7.1.1.1.2 0 .4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.4-.1.1-.2.2-.1.4.1.2.5 1 1.1 1.6.8.8 1.4 1.1 1.6 1.2.2.1.3.1.5 0 .1-.1.6-.7.7-.9.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3.1.1.1.7-.2 1.3"/>
              </svg>
            </a>
            <ThemeToggle
              className={cn(
                  "!w-8 !h-8 sm:!w-9 sm:!h-9 !p-0 text-xs",
                  onLight ? "border-[var(--border-strong)] text-[var(--fg)]" : "border-white/25 text-white"
              )}
            />
            <button
              ref={closeBtnRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors"
              onClick={() => setOpen(!open)}
            >
              <span
                className={cn(
                  "absolute left-2 right-2 h-px transition-all duration-300",
                  onLight ? "bg-[var(--fg)]" : "bg-white",
                  open ? "top-1/2 rotate-45" : "top-[11px]"
                )}
              />
              <span
                className={cn(
                  "absolute left-2 right-2 h-px transition-all duration-200",
                  onLight ? "bg-[var(--fg)]" : "bg-white",
                  open ? "opacity-0 scale-x-0" : "top-1/2 -translate-y-1/2"
                )}
              />
              <span
                className={cn(
                  "absolute left-2 right-2 h-px transition-all duration-300",
                  onLight ? "bg-[var(--fg)]" : "bg-white",
                  open ? "top-1/2 -rotate-45" : "bottom-[11px]"
                )}
              />
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        <div
          className={cn(
            "hidden lg:block overflow-hidden transition-[max-height,opacity] duration-300 ease-[var(--ease-out-quart)]",
            megaOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          role="menu"
          aria-label="Services menu"
        >
          <div className="container-x">
            <div className="mt-2 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] shadow-[var(--shadow-lg)] overflow-hidden">
              <div className="grid md:grid-cols-2 divide-x divide-[var(--border)]">
                {MEGA_COLUMNS.map((col) => (
                  <div key={col.heading} className="p-6 md:p-8">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--fg-subtle)] mb-5 flex items-center gap-2">
                      <span className="w-5 h-px bg-[var(--oak-500)]" />
                      {col.heading}
                    </div>
                    <ul className="space-y-1">
                      {col.items.map((item) => {
                        const active = isActive(pathname, item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "group/mega flex items-start justify-between gap-4 py-2.5 px-2 -mx-2 rounded-sm transition-colors hover:bg-[var(--bg-subtle)]",
                                active && "bg-[var(--oak-100)]/50"
                              )}
                              role="menuitem"
                              onClick={() => setMegaOpen(false)}
                            >
                              <span>
                                <span className={cn(
                                  "font-display text-lg leading-tight block transition-colors",
                                  active ? "text-[var(--oak-700)]" : "group-hover/mega:text-[var(--oak-600)]"
                                )}>
                                  {item.label}
                                </span>
                                {item.sub && (
                                  <span className="text-xs text-[var(--fg-muted)] mt-0.5 block">{item.sub}</span>
                                )}
                              </span>
                              <span className="text-[var(--fg-subtle)] group-hover/mega:text-[var(--oak-500)] group-hover/mega:translate-x-1 transition-all mt-1.5 text-sm">→</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              {/* CTA strip */}
              <div className="bg-[var(--bg-subtle)] border-t border-[var(--border)] px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-[var(--fg-muted)]">
                  Not sure which service? Start with a free 45-minute site visit.
                </p>
                <Button variant="liquid" size="sm" href="/consultation">
                  Book a visit →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-out-expo)]",
            open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="container-x py-6 flex flex-col gap-1 bg-[var(--bg)] border-t border-[var(--border)] mt-2.5 rounded-b-sm">
            {NAV_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              const isServices = l.href === "/services";

              if (isServices) {
                return (
                  <div key={l.href}>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      className={cn(
                        "w-full flex items-center justify-between font-display text-2xl py-2 transition-colors",
                        active ? "text-[var(--oak-600)]" : "text-[var(--fg)]"
                      )}
                    >
                      <span>{l.label}</span>
                      <svg
                        width="14" height="14" viewBox="0 0 14 14"
                        className={cn("transition-transform duration-300", mobileServicesOpen && "rotate-180")}
                        aria-hidden
                      >
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-[max-height] duration-400 ease-[var(--ease-out-quart)]",
                      mobileServicesOpen ? "max-h-[1200px]" : "max-h-0"
                    )}>
                      <ul className="pb-2 pt-1 pl-2 border-l border-[var(--border)] ml-1 space-y-1">
                        {MEGA_COLUMNS.flatMap((c) => c.items).map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "block py-2 text-[var(--fg-muted)] hover:text-[var(--oak-600)] transition-colors text-[0.95rem]",
                                isActive(pathname, item.href) && "text-[var(--oak-600)]"
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-display text-2xl py-2 transition-colors",
                    active ? "text-[var(--oak-600)]" : "text-[var(--fg)] hover:text-[var(--oak-500)]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-[var(--fg-muted)] text-xs uppercase tracking-[0.2em] mt-3"
            >
              {SITE.phoneDisplay}
              <span className="text-[var(--fg-subtle)] block normal-case tracking-normal mt-0.5 text-[11px]">
                Mon–Sat 10am–7pm · WhatsApp replies ~15 min
              </span>
            </a>
            <Button variant="liquid" href="/consultation" className="w-full sm:w-auto mt-2 justify-center">
              Book consultation
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
}
