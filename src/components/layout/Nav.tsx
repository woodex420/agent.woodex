"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { SITE } from "@/lib/config";

type NavLink = { label: string; href: string; order?: number };

const STATIC_NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services", order: 10 },
  { label: "3D Studio", href: "/3d-studio", order: 20 },
  { label: "Portfolio", href: "/portfolio", order: 30 },
  { label: "About", href: "/about", order: 40 },
  { label: "Journal", href: "/blog", order: 50 },
  { label: "Contact", href: "/contact", order: 60 },
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

  // Compute hero-like pages (transparent nav over imagery): home, service detail,
  // project detail, portfolio hub (hero image at top). White text on these until scroll.
  const heroPages = /^\/($|portfolio(\/|$)|services\/[^/]+($|\/)|blog\/[^/]+\/[^/]+($|\/))/;
  const isHeroPage = heroPages.test(pathname);
  const onLight = scrolled || open || !isHeroPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-out-quart)]",
        onLight
          ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] py-2.5"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-x flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0 -ml-1"
          aria-label="Woodex Interior home"
        >
          <span
            className={cn(
              "inline-block w-8 h-8 transition-colors duration-500",
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
              "font-display text-lg md:text-xl tracking-tight transition-colors duration-500",
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
            "hidden lg:flex items-center gap-7 text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-colors duration-500",
            onLight ? "text-[var(--fg)]" : "text-white/90"
          )}
        >
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href);
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
                    : cn("hover:text-[var(--oak-400)]", onLight ? "after:scale-x-0" : "after:scale-x-0")
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
              "text-xs font-medium tracking-widest uppercase transition-colors duration-500 hidden xl:block whitespace-nowrap",
              onLight ? "text-[var(--fg-muted)] hover:text-[var(--oak-600)]" : "text-white/70 hover:text-white"
            )}
          >
            {SITE.phoneDisplay}
          </a>
          <Button
            variant={onLight ? "liquid" : "glass"}
            size="sm"
            magnetic
            href="/consultation"
          >
            Book consultation
          </Button>
        </div>

        {/* Mobile cluster */}
        <div className="lg:hidden flex items-center gap-1.5">
          <ThemeToggle
            className={cn(
              "!w-9 !h-9 !p-0 text-xs",
              onLight ? "border-[var(--border-strong)] text-[var(--fg)]" : "border-white/25 text-white"
            )}
          />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors"
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-out-expo)]",
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-x py-6 flex flex-col gap-1 bg-[var(--bg)] border-t border-[var(--border)] mt-2.5 rounded-b-sm">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href);
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
          </a>
          <Button variant="liquid" href="/consultation" className="w-full sm:w-auto mt-2 justify-center">
            Book consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
