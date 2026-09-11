import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.address.line1}, ${SITE.address.city}`)}`;
  return (
    <footer className="bg-[var(--graphite-900)] text-white relative noise overflow-hidden border-t border-[var(--oak-900)]">
      <div className="container-x section-pad">
        {/* Big CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 md:pb-16 border-b border-white/10">
          <div className="max-w-3xl">
            <span className="kicker text-white/40 mb-5" aria-hidden>
              <span className="w-8 md:w-10 h-px bg-[var(--oak-400)]" />
              Start your project
            </span>
            <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-[1.02] tracking-tight text-balance">
              Have a space that needs
              <span className="italic-serif text-[var(--oak-300)]"> certainty?</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <p className="text-white/70 max-w-sm text-base leading-relaxed">
              Approve it in 3D. Get exactly that. On the date we said.
              Your project starts with a 45-minute site visit.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <Button
                variant="dark"
                size="lg"
                magnetic
                href="/consultation"
                className="w-full sm:w-auto justify-center"
              >
                Start your project
              </Button>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition uppercase tracking-widest tabular-nums group"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--oak-400)]" />
                Or WhatsApp us · ~15 min reply
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 py-10 md:py-14">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="font-display text-2xl mb-4">
              Woodex<span className="text-[var(--oak-400)]">.</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Design-and-build interior studio based in Lahore.
              Commercial, residential, corporate, retail &amp; 3D studio.
              Founded 2014.
            </p>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] tabular-nums">
              {SITE.hoursShort}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Services</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/services/commercial" className="hover:text-[var(--oak-300)] transition-colors">Commercial</Link></li>
              <li><Link href="/services/residential" className="hover:text-[var(--oak-300)] transition-colors">Residential</Link></li>
              <li><Link href="/services/office-fit-out" className="hover:text-[var(--oak-300)] transition-colors">Office Fit-Out</Link></li>
              <li><Link href="/services/retail" className="hover:text-[var(--oak-300)] transition-colors">Retail &amp; F&amp;B</Link></li>
              <li><Link href="/services/turnkey" className="hover:text-[var(--oak-300)] transition-colors">Turnkey</Link></li>
              <li><Link href="/services/renovation" className="hover:text-[var(--oak-300)] transition-colors">Renovation</Link></li>
              <li><Link href="/services/custom-furniture" className="hover:text-[var(--oak-300)] transition-colors">Custom &amp; Office Furniture</Link></li>
              <li><Link href="/3d-studio" className="hover:text-[var(--oak-300)] transition-colors">3D Studio</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Studio</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/work" className="hover:text-[var(--oak-300)] transition-colors">Work</Link></li>
              <li><Link href="/industries" className="hover:text-[var(--oak-300)] transition-colors">Industries</Link></li>
              <li><Link href="/about" className="hover:text-[var(--oak-300)] transition-colors">About</Link></li>
              <li><Link href="/insights" className="hover:text-[var(--oak-300)] transition-colors">Insights</Link></li>
              <li><Link href="/3d-studio" className="hover:text-[var(--oak-300)] transition-colors">Open 3D Studio</Link></li>
              <li><Link href="/locations" className="hover:text-[var(--oak-300)] transition-colors">Locations</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="leading-relaxed">
                {SITE.address.line1}<br />{SITE.address.city}, {SITE.address.country}
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-[var(--oak-300)] text-xs uppercase tracking-widest mt-1 transition-colors">
                  Get directions →
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-[var(--oak-300)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm tabular-nums">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE.whatsapp}`} className="hover:text-[var(--oak-300)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">
                  WhatsApp
                  <span className="block text-white/40 text-[11px] normal-case tracking-normal mt-0.5">
                    Quick reply · ~15 min response
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-[var(--oak-300)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="pt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {SITE.socials.instagram && <><a href={SITE.socials.instagram} className="text-white/60 hover:text-[var(--oak-300)] underline-offset-4 hover:underline rounded-sm">Instagram</a><span aria-hidden className="text-white/20 last:hidden">·</span></>}
                {SITE.socials.linkedin && <><a href={SITE.socials.linkedin} className="text-white/60 hover:text-[var(--oak-300)] underline-offset-4 hover:underline rounded-sm">LinkedIn</a><span aria-hidden className="text-white/20 last:hidden">·</span></>}
                {SITE.socials.behance && <><a href={SITE.socials.behance} className="text-white/60 hover:text-[var(--oak-300)] underline-offset-4 hover:underline rounded-sm">Behance</a></>}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6 border-t border-white/10 text-xs text-white/40">
          <div>© {year} Woodex Interior. Lahore, Pakistan.</div>
          <div className="flex flex-nowrap gap-4 sm:gap-6 overflow-x-auto max-w-full w-full sm:w-auto scrollbar-none">
            <Link href="/legal/privacy-policy" className="whitespace-nowrap hover:text-white/70">Privacy</Link>
            <Link href="/legal/terms" className="whitespace-nowrap hover:text-white/70">Terms</Link>
            <Link href="/sitemap.xml" className="whitespace-nowrap hover:text-white/70">Sitemap</Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} className="whitespace-nowrap hover:text-white/70">WhatsApp</a>
          </div>
          <div className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-white/30 tabular-nums">
            Designed &amp; built in Lahore
          </div>
        </div>
      </div>
    </footer>
  );
}
