import Icon from './Icon';
import { SITE, whatsappLink } from '../data/site';

// Compact "order your way" band with all four ways to buy.
export default function OrderBand() {
  const links = [
    { label: 'Amazon', href: SITE.amazonStore, icon: 'bag', className: 'btn-light' },
    { label: 'Flipkart', href: SITE.flipkartStore, icon: 'bag', className: 'btn-outline-light' },
    { label: 'WhatsApp', href: whatsappLink('Hello CEZLIAR! I would like to place an order.'), icon: 'whatsapp', className: 'btn-outline-light' },
    { label: 'Instagram', href: SITE.instagramDm, icon: 'instagram', className: 'btn-outline-light' },
  ];
  return (
    <section data-reveal aria-label="Ways to order" className="mt-[clamp(56px,7vw,96px)] flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-panel bg-forest p-[clamp(28px,4vw,56px)] text-ivory-on-forest">
      <div className="flex flex-[1_1_380px] flex-col gap-2.5">
        <h2 className="font-display text-[clamp(30px,3vw,44px)] font-light leading-[1.08]">Order <em className="italic">your way</em></h2>
        <p className="text-base leading-relaxed text-mist">
          Shop on Amazon or Flipkart, or order directly from us on WhatsApp ({SITE.whatsappDisplay}) or Instagram (@{SITE.instagramHandle}). Gift orders are handled on WhatsApp.
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`${l.className} min-h-[52px]`}>
            <Icon name={l.icon} size={17} /> {l.label}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </section>
  );
}
