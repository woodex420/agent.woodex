import Link from "next/link";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SITE } from "@/lib/config";

export default function LinoxaFooter() {
  const year = new Date().getFullYear();
  const dir = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.address.line1}, ${SITE.address.city}`)}`;
  return (
    <footer className="bg-[var(--navy)] text-[var(--beige)] relative noise overflow-hidden">
      <div className="container-x pt-20 md:pt-28 pb-8 relative z-10">
        {/* Stay connected */}
        <div className="grid lg:grid-cols-12 gap-10 items-end pb-16 border-b border-white/10">
          <div className="lg:col-span-8">
            <span className="kicker text-[var(--beige)]/60 mb-6">Stay connected</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] max-w-2xl">
              Have a space in mind?<br />
              <em className="accent-i">Let's build it.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <LinoxaButton variant="cream" size="lg" href="/contact">Start your project</LinoxaButton>
            <a href={`https://wa.me/${SITE.whatsapp}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[var(--accent)] transition uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              Or WhatsApp · ~15 min
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl mb-5">Woodex<span className="text-[var(--accent)]">.</span></div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Design + Build studio for corporate workplaces, commercial interiors and selected residential. Designed. Built. Made by Woodex.
            </p>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.2em]">{SITE.hoursShort}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-5">Navigation</div>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link href="/" className="hover:text-[var(--accent)]">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent)]">About</Link></li>
              <li><Link href="/services" className="hover:text-[var(--accent)]">Services</Link></li>
              <li><Link href="/work" className="hover:text-[var(--accent)]">Work</Link></li>
              <li><Link href="/insights" className="hover:text-[var(--accent)]">Insights</Link></li>
              <li><Link href="/3d-studio" className="hover:text-[var(--accent)]">Open 3D Studio</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-5">Services</div>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link href="/services/office-fit-out" className="hover:text-[var(--accent)]">Office Fit-Out</Link></li>
              <li><Link href="/services/corporate" className="hover:text-[var(--accent)]">Corporate Interiors</Link></li>
              <li><Link href="/services/commercial" className="hover:text-[var(--accent)]">Commercial</Link></li>
              <li><Link href="/services/retail" className="hover:text-[var(--accent)]">Retail &amp; F&amp;B</Link></li>
              <li><Link href="/services/turnkey" className="hover:text-[var(--accent)]">Turnkey</Link></li>
              <li><Link href="/services/custom-furniture" className="hover:text-[var(--accent)]">Custom Furniture</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="leading-relaxed">
                {SITE.address.line1}<br />{SITE.address.city}
                <a href={dir} target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-[var(--accent)] text-[10px] uppercase tracking-widest mt-1">Get directions →</a>
              </li>
              <li><a href={`tel:${SITE.phoneTel}`} className="hover:text-[var(--accent)] tabular-nums">{SITE.phoneDisplay}</a></li>
              <li>
                <a href={`https://wa.me/${SITE.whatsapp}`} className="hover:text-[var(--accent)]">WhatsApp</a>
                <span className="block text-white/40 text-[11px] mt-0.5">Quick reply · ~15 min</span>
              </li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-[var(--accent)] break-all">{SITE.email}</a></li>
              <li className="pt-2 flex gap-4 text-sm">
                {SITE.socials.instagram && <a href={SITE.socials.instagram} className="text-white/60 hover:text-[var(--accent)]">Instagram</a>}
                {SITE.socials.linkedin && <a href={SITE.socials.linkedin} className="text-white/60 hover:text-[var(--accent)]">LinkedIn</a>}
                {SITE.socials.behance && <a href={SITE.socials.behance} className="text-white/60 hover:text-[var(--accent)]">Behance</a>}
              </li>
            </ul>
          </div>
        </div>

        {/* Giant INTERIORS wordmark */}
        <div className="-mx-[calc((100vw_-_min(1280px,92vw))/2)] overflow-hidden border-t border-white/10 pt-8 md:pt-12 select-none pointer-events-none">
          <div className="giant-word text-white/8 whitespace-nowrap text-center">INTERIORS</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6 text-[11px] text-white/40 uppercase tracking-[0.2em]">
          <div>© {year} Woodex Interior · Lahore, Pakistan</div>
          <div className="flex gap-5">
            <Link href="/legal/privacy-policy" className="hover:text-white/70">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white/70">Terms</Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} className="hover:text-white/70">WhatsApp</a>
          </div>
          <div className="hidden md:block">Designed &amp; built in Lahore</div>
        </div>
      </div>
    </footer>
  );
}
