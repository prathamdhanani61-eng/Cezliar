import Link from 'next/link';
import Icon from './Icon';
import { SITE, whatsappLink } from '../data/site';

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
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const whatsapp = whatsappLink();

  return (
    <footer className="bg-ivory">
      <div className="container-site section-gap pb-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-b border-line pb-12">
          <div className="flex flex-[1_1_420px] flex-col gap-3">
            <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-light leading-none tracking-[-0.02em]">
              Letters from <em className="italic">CEZLIAR</em>
            </h2>
            <p className="text-base text-muted">New blends, ritual guides and gifting ideas. Once a month, never more.</p>
          </div>
          {SITE.newsletterAction ? (
            <form action={SITE.newsletterAction} method="post" className="flex flex-[1_1_380px] flex-wrap gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="min-h-[52px] flex-[1_1_220px] rounded-full border border-line bg-white px-5 text-[15px] text-ink placeholder:text-muted focus:border-forest focus:outline-none" />
              <button type="submit" className="btn-primary min-h-[52px] px-7">Subscribe</button>
            </form>
          ) : (
            <div className="flex flex-[1_1_380px] flex-wrap gap-2 sm:justify-end">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[52px] px-7">
                <Icon name="instagram" size={18} /> Follow on Instagram
              </a>
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline min-h-[52px] px-7">
                  <Icon name="whatsapp" size={18} /> WhatsApp updates
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8 py-10">
          <div className="flex flex-[1.4_1_260px] flex-col gap-3.5">
            <img src="/images/logo/logo.png" alt="CEZLIAR" width={150} height={27} className="h-auto w-[150px]" />
            <p className="max-w-[300px] text-sm leading-relaxed text-muted">Indian fragrances and home rituals. Blended in Surat, Gujarat.</p>
            <div className="flex gap-2">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="CEZLIAR on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest hover:border-forest">
                <Icon name="instagram" size={18} />
              </a>
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with CEZLIAR on WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest hover:border-forest">
                  <Icon name="whatsapp" size={18} />
                </a>
              )}
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
          <nav aria-label="Buy on" className="flex flex-[1_1_140px] flex-col gap-2.5 text-sm">
            <p className="mb-1 font-medium text-ink">Buy on</p>
            <a href={SITE.amazonStore} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Amazon ↗</a>
            <a href={SITE.flipkartStore} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Flipkart ↗</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-body no-underline hover:text-forest">Instagram ↗</a>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-3 text-[13px] text-muted">
          <span>© {new Date().getFullYear()} CEZLIAR. All rights reserved.</span>
          <span>Orders, delivery and returns are handled by Amazon and Flipkart.</span>
        </div>
      </div>
    </footer>
  );
}
