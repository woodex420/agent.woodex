import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--graphite-900)] text-white relative noise overflow-hidden">
      <div className="container-x section-pad">
        {/* Big CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 md:pb-16 border-b border-white/10">
          <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-[1.02] tracking-tight max-w-3xl text-balance">
            Have a space that needs
            <span className="italic-serif text-[var(--oak-300)]"> certainty?</span>
          </h2>
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <p className="text-white/70 max-w-sm text-base">
              Approve it in 3D. Get exactly that. On the date we said.
              Your project starts with a 45-minute site visit.
            </p>
            <Button
              variant="dark"
              size="lg"
              magnetic
              href="/consultation"
              className="w-full sm:w-auto"
            >
              Book my consultation →
            </Button>
          </div>
        </div>

        {/* Link grid — 1 col on smallest, 2 on sm+, 4 on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 py-10 md:py-14">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="font-display text-2xl mb-4">
              Woodex<span className="text-[var(--oak-400)]">.</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Design-and-build interior studio based in Lahore.
              Commercial, residential, corporate, retail &amp; 3D studio.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Services</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/services/commercial">Commercial</Link></li>
              <li><Link href="/services/residential">Residential</Link></li>
              <li><Link href="/services/office-fit-out">Office Fit-Out</Link></li>
              <li><Link href="/services/renovation">Renovation</Link></li>
              <li><Link href="/services/turnkey">Turnkey</Link></li>
              <li><Link href="/3d-studio">3D Studio</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Studio</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/blog">Journal</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/consultation">Consultation</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="leading-relaxed">{SITE.address.line1}<br />{SITE.address.city}</li>
              <li><a href={`tel:${SITE.phoneTel}`} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">{SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">{SITE.email}</a></li>
              <li className="pt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {SITE.socials.instagram && <><a href={SITE.socials.instagram} className="text-white/60 hover:text-[var(--oak-400)] underline-offset-4 hover:underline rounded-sm">Instagram</a><span aria-hidden className="text-white/20 last:hidden">·</span></>}
                {SITE.socials.linkedin && <><a href={SITE.socials.linkedin} className="text-white/60 hover:text-[var(--oak-400)] underline-offset-4 hover:underline rounded-sm">LinkedIn</a><span aria-hidden className="text-white/20 last:hidden">·</span></>}
                {SITE.socials.behance && <><a href={SITE.socials.behance} className="text-white/60 hover:text-[var(--oak-400)] underline-offset-4 hover:underline rounded-sm">Behance</a><span aria-hidden className="text-white/20 last:hidden">·</span></>}
                <a href={`https://wa.me/${SITE.whatsapp}`} className="text-white/60 hover:text-[var(--oak-400)] underline-offset-4 hover:underline rounded-sm">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6 border-t border-white/10 text-xs text-white/40">
          <div>© {year} Woodex Interior. Lahore, Pakistan.</div>
          <div className="flex flex-nowrap gap-4 sm:gap-6 overflow-x-auto max-w-full w-full sm:w-auto scrollbar-none">
            <Link href="/legal/privacy-policy" className="whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">Privacy</Link>
            <Link href="/legal/terms" className="whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">Terms</Link>
            <Link href="/sitemap.xml" className="whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] rounded-sm">Sitemap</Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} className="whitespace-nowrap hover:text-white/70">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
