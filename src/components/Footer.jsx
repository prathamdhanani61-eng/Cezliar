import Link from 'next/link';
import Icon from './Icon';
import NewsletterForm from './NewsletterForm';
import { SITE, mailtoLink, whatsappLink } from '../data/site';

const shopLinks = [
  { label: 'Shop all', href: '/shop' },
  { label: 'Attars', href: '/collections/fragrance-collection/attars' },
  { label: 'Solid perfumes', href: '/collections/fragrance-collection/solid-perfumes' },
  { label: 'Dhoop', href: '/collections/fragrance-collection/dhoop' },
  { label: 'Home & water care', href: '/collections/home-care-collection' },
];

const companyLinks = [
  { label: 'Our story', href: '/about' },
  { label: 'Gift finder', href: '/gift-finder' },
  { label: 'Wishlist', href: '/wishlist' },
];

export default function Footer() {
  const whatsapp = whatsappLink('Hello CEZLIAR!');

  return (
    <footer className="bg-ivory">
      <div className="container-site section-gap pb-8" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-b border-line pb-12">
          <div className="flex flex-[1_1_420px] flex-col gap-3">
            <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-light leading-none tracking-[-0.02em]">
              Letters from <em className="italic">CEZLIAR</em>
            </h2>
            <p className="text-base text-muted">New blends, ritual guides and gifting ideas. Once a month, never more.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8 py-10">
          <div className="flex flex-[1.4_1_260px] flex-col gap-3.5">
            <img src="/images/site/logo.webp" alt="CEZLIAR" width={150} height={27} className="h-auto w-[150px]" />
            <p className="max-w-[300px] text-sm leading-relaxed text-muted">Indian fragrances and home rituals. Blended in Surat, Gujarat. Gift orders on WhatsApp {SITE.whatsappDisplay} and Instagram.</p>
            <a href={mailtoLink('Hello CEZLIAR')} className="inline-flex items-center gap-2 break-all text-sm text-forest">
              <Icon name="mail" size={16} className="flex-none" /> {SITE.email}
            </a>
            <div className="flex gap-2">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="CEZLIAR on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest hover:border-forest">
                <Icon name="instagram" size={18} />
              </a>
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with CEZLIAR on WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest hover:border-forest">
                  <Icon name="whatsapp" size={18} />
                </a>
              )}
              <a href={mailtoLink('Hello CEZLIAR')} aria-label="Email CEZLIAR" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest hover:border-forest">
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>
          <nav aria-label="Shop" className="flex flex-[1_1_140px] flex-col gap-2.5 text-sm">
            <p className="mb-1 font-medium text-ink">Shop</p>
            {shopLinks.map((l) => <Link key={l.href} href={l.href} className="text-body no-underline hover:text-forest">{l.label}</Link>)}
          </nav>
          <nav aria-label="Company" className="flex flex-[1_1_140px] flex-col gap-2.5 text-sm">
            <p className="mb-1 font-medium text-ink">CEZLIAR</p>
            {companyLinks.map((l) => <Link key={l.href} href={l.href} className="text-body no-underline hover:text-forest">{l.label}</Link>)}
          </nav>
          <nav aria-label="Order on" className="flex flex-[1_1_160px] flex-col gap-2.5 text-sm">
            <p className="mb-1 font-medium text-ink">Order on</p>
            <a href={SITE.amazonStore} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Amazon ↗</a>
            <a href={SITE.flipkartStore} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Flipkart ↗</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">WhatsApp {SITE.whatsappDisplay} ↗</a>
            <a href={SITE.instagramDm} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Instagram @{SITE.instagramHandle} ↗</a>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-3 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} CEZLIAR. All rights reserved.</span>
          <span>Marketplace orders are delivered by Amazon and Flipkart · WhatsApp &amp; Instagram orders are confirmed with you directly.</span>
        </div>
      </div>
    </footer>
  );
}
