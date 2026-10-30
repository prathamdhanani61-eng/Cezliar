import Link from 'next/link';
import Icon from '../Icon';
import MarketplaceButtons from '../MarketplaceButtons';
import { ORDER_CHANNELS, SITE } from '../../data/site';
import { formatPrice } from '../../utils/format';

export function SectionHeading({ id, eyebrow, start, end, link, center = false, dark = false }) {
  return (
    <div data-reveal className={`mb-8 flex flex-wrap gap-x-10 gap-y-4 ${center ? 'flex-col items-center text-center' : 'items-end justify-between'}`}>
      <div className={`flex flex-col gap-2.5 ${center ? 'items-center' : ''}`}>
        {eyebrow && <p className={dark ? 'text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light' : 'eyebrow'}>{eyebrow}</p>}
        <h2 id={id} className="heading-section">{start} <em className={`italic ${dark ? 'text-gold-light' : ''}`}>{end}</em></h2>
      </div>
      {link && <Link href={link.href} className="py-3 text-[15px] font-medium no-underline">{link.label} →</Link>}
    </div>
  );
}

// Decorative strip of product names (the same names appear in the sections below).
export function Marquee({ names }) {
  const row = (
    <div className="flex items-center">
      {names.map((name) => (
        <span key={name} className="flex items-center">
          <span className="px-7">{name}</span>
          <span className="text-[0.55em] not-italic text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee mt-8 overflow-hidden border-y border-line bg-cream py-[22px]" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap font-display text-[clamp(24px,2.6vw,38px)] font-light italic leading-tight text-forest">
        {row}
        {row}
      </div>
    </div>
  );
}

export function CollectionsSection({ tiles }) {
  return (
    <section aria-labelledby="home-collections" className="container-site section-gap">
      <SectionHeading id="home-collections" eyebrow={`Four collections · ${tiles.reduce((n, t) => n + t.count, 0)} products`} start="Explore our" end="collections" link={{ href: '/shop', label: 'View all products' }} />
      <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className={`group relative block aspect-3/4 overflow-hidden rounded-tile no-underline ${tile.bg}`}>
            <img src={tile.image} alt="" loading="lazy" className={`absolute transition-transform duration-700 ease-out group-hover:scale-[1.05] ${tile.imageClass}`} />
            <span className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 rounded-[18px] bg-ivory p-[18px] text-ink transition-transform duration-500 group-hover:-translate-y-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-display text-[26px]">{tile.title}</span>
                <span className="whitespace-nowrap text-[13px] text-muted">{tile.count} {tile.unit}</span>
              </span>
              <span className="text-sm leading-normal text-body">{tile.text}</span>
              <span className="text-sm font-medium text-forest">Explore →</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoryCards({ categories }) {
  return (
    <section aria-labelledby="home-categories" className="container-site section-gap">
      <SectionHeading id="home-categories" eyebrow="Find it fast" start="Shop by" end="category" />
      <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
        {categories.map((cat) => (
          <Link key={cat.href} href={cat.href} className="group flex items-center gap-4 rounded-[18px] border border-line-soft bg-white py-3 pl-3 pr-[18px] text-ink no-underline transition-colors hover:border-forest">
            {cat.image ? (
              <span className="block h-16 w-16 flex-none overflow-hidden rounded-full border border-line-soft bg-white">
                <img src={cat.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
            ) : (
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-sand text-forest">
                <Icon name={cat.icon} size={30} strokeWidth={1.4} />
              </span>
            )}
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="font-display text-xl">{cat.title}</span>
              <span className="text-[13px] text-muted">{cat.count} {cat.count === 1 ? 'product' : 'products'}</span>
            </span>
            <Icon name="arrow-right" size={18} strokeWidth={1.7} className="text-forest transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Bestsellers({ spotlight, products }) {
  return (
    <section aria-labelledby="home-best" className="container-site section-gap">
      <SectionHeading id="home-best" eyebrow="Customer favourites" start="Best" end="sellers" link={{ href: '/shop', label: 'Shop all bestsellers' }} />
      <div className="flex flex-wrap gap-4">
        <article data-reveal className="flex min-w-0 flex-[1_1_520px] flex-wrap overflow-hidden rounded-tile bg-forest text-ivory-on-forest">
          <div className="relative min-h-[360px] flex-[1_1_240px] overflow-hidden">
            <img data-parallax="6" src={spotlight.moodImage || spotlight.image} alt={spotlight.name} loading="lazy" className="absolute inset-x-0 top-[-7.5%] h-[115%] w-full object-cover" />
          </div>
          <div className="flex flex-[1_1_260px] flex-col gap-4 p-[clamp(24px,3vw,40px)]">
            <span className="self-start rounded-full bg-gold-light px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-forest-ink">Bestseller</span>
            <h3 className="font-display text-[clamp(32px,3vw,44px)] font-light leading-[1.05]">
              <Link href={`/product/${spotlight.slug}`} className="text-ivory-on-forest no-underline hover:text-gold-light">{spotlight.shortName}</Link>
            </h3>
            <p className="text-[15px] leading-relaxed text-mist">{spotlight.description}</p>
            {spotlight.notes && (
              <ul className="flex flex-wrap gap-2" aria-label="Scent notes">
                {spotlight.notes.split('·').map((note) => (
                  <li key={note} className="rounded-full border border-forest-line px-3 py-1.5 text-[13px]">{note.trim()}</li>
                ))}
              </ul>
            )}
            <div className="mt-auto flex flex-col gap-3">
              <span className="font-display text-[32px]">{formatPrice(spotlight.price)}</span>
              <MarketplaceButtons product={spotlight} tone="dark" />
            </div>
          </div>
        </article>
        <div data-reveal-stagger className="grid min-w-0 flex-[1_1_520px] grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
          {products.map((p) => (
            <article key={p.id} className="group flex gap-3.5 rounded-card border border-line-soft bg-white p-3 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(15,46,37,0.5)]">
              <Link href={`/product/${p.slug}`} className="h-32 w-[104px] flex-none overflow-hidden rounded-[14px] bg-white" tabIndex={-1} aria-hidden="true">
                {p.thumb && <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-saffron">Bestseller</span>
                <h3 className="font-display text-xl leading-tight">
                  <Link href={`/product/${p.slug}`} className="text-ink no-underline hover:text-forest">{p.shortName}</Link>
                </h3>
                <span className="text-[13px] text-muted">{p.tagline}</span>
                <span className="mt-auto text-base font-medium">{formatPrice(p.price)}</span>
                <span className="flex flex-wrap gap-x-3.5 text-sm font-medium">
                  <a href={p.amazon} target="_blank" rel="noopener noreferrer" className="py-1 no-underline">Amazon ↗</a>
                  <a href={p.flipkart} target="_blank" rel="noopener noreferrer" className="py-1 no-underline">Flipkart ↗</a>
                  <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="py-1 no-underline">WhatsApp ↗</a>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const CHANNEL_STYLE = {
  amazon: { box: 'bg-ink text-white', icon: 'bag', button: 'btn-light' },
  flipkart: { box: 'border border-ink bg-white text-ink', icon: 'bag', button: 'btn-dark' },
  whatsapp: { box: 'bg-forest text-ivory-on-forest', icon: 'whatsapp', button: 'btn-light' },
  instagram: { box: 'bg-sand text-ink', icon: 'instagram', button: 'btn-primary' },
};

export function OrderChannels({ heading = true }) {
  return (
    <section aria-labelledby={heading ? 'order-channels' : undefined} aria-label={heading ? undefined : 'Ways to order'} className="container-site section-gap">
      {heading && <SectionHeading id="order-channels" eyebrow="Four easy ways to buy" start="Order" end="your way" />}
      <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {ORDER_CHANNELS.map((c) => {
          const style = CHANNEL_STYLE[c.id];
          return (
            <div key={c.id} className={`flex flex-col gap-4 rounded-tile p-7 ${style.box}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-current">
                <Icon name={style.icon} size={22} />
              </span>
              <h3 className="font-display text-[26px]">{c.label}</h3>
              <p className="text-[15px] leading-relaxed opacity-90">{c.text}</p>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${style.button} mt-auto self-start`}>
                {c.cta} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          );
        })}
      </div>
      <p data-reveal className="mt-5 text-center text-sm text-muted">
        Buying a gift? Gift orders are handled personally on WhatsApp at <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-medium">{SITE.whatsappDisplay}</a>.
      </p>
    </section>
  );
}

export function AboutSection({ productCount }) {
  return (
    <section aria-labelledby="home-about" className="container-site section-gap">
      <div className="flex flex-wrap items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12">
        <div data-reveal className="relative min-w-0 flex-[1_1_440px] pb-[72px]">
          <div className="relative aspect-4/5 w-[82%] overflow-hidden rounded-[999px_999px_24px_24px] bg-sand">
            <img data-parallax="5" src="/images/site/hero-attar-900.webp" alt="A CEZLIAR attar bottle on a marble pedestal with agarwood and jasmine" loading="lazy" className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover object-[66%_center]" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-tile border-8 border-ivory bg-sand">
            <img src="/images/site/mood-sandal-600.webp" alt="Mysore Sandal dhoop jar beside a burning stick" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
        <div data-reveal className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
          <p className="eyebrow">About CEZLIAR</p>
          <h2 id="home-about" className="heading-section">Rooted in India. <em className="italic">Crafted for today.</em></h2>
          <p className="text-[17px] leading-[1.7] text-body">The rituals that make an Indian home feel like home — a dab of attar before you step out, dhoop at the evening prayer, clean water at the table — deserve care. CEZLIAR brings that care to every product.</p>
          <p className="text-[17px] leading-[1.7] text-body">Our attars and solid perfumes are blended in Surat, Gujarat, and are completely alcohol-free. Our dhoop is charcoal-free. And our home and water care is made with the same attention to quality.</p>
          <dl className="grid grid-cols-3 gap-4 border-y border-line py-5">
            <div className="flex flex-col-reverse gap-1"><dt className="text-sm text-muted">products</dt><dd className="font-display text-[40px] font-light leading-none text-forest">{productCount}</dd></div>
            <div className="flex flex-col-reverse gap-1"><dt className="text-sm text-muted">collections</dt><dd className="font-display text-[40px] font-light leading-none text-forest">4</dd></div>
            <div className="flex flex-col-reverse gap-1"><dt className="text-sm text-muted">alcohol in our attars</dt><dd className="font-display text-[40px] font-light leading-none text-forest">0%</dd></div>
          </dl>
          <Link href="/about" className="btn-primary self-start">Read our story <Icon name="arrow-right" size={16} strokeWidth={1.8} /></Link>
        </div>
      </div>
    </section>
  );
}

// Full-width dark band with gold accents.
export function WhyCezliar({ items, title = 'Why', titleEnd = 'CEZLIAR' }) {
  return (
    <section aria-labelledby="why-cezliar" className="relative mt-[clamp(64px,8vw,120px)] overflow-hidden bg-[#0B1F19] text-ivory-on-forest">
      <svg aria-hidden="true" viewBox="0 0 400 520" className="pointer-events-none absolute -right-24 top-10 h-[120%] w-auto opacity-[0.14]" fill="none" stroke="#E2C46A" strokeWidth="1.2">
        <path d="M20 520V200a180 180 0 0 1 360 0v320" />
        <path d="M60 520V210a140 140 0 0 1 280 0v310" />
        <path d="M100 520V220a100 100 0 0 1 200 0v300" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 400 520" className="pointer-events-none absolute -left-32 -bottom-40 h-[90%] w-auto opacity-[0.08]" fill="none" stroke="#E2C46A" strokeWidth="1.2">
        <path d="M20 520V200a180 180 0 0 1 360 0v320" />
        <path d="M60 520V210a140 140 0 0 1 280 0v310" />
      </svg>
      <div className="container-site relative py-[clamp(72px,9vw,128px)]">
        <div data-reveal className="mx-auto mb-12 flex max-w-[720px] flex-col items-center gap-4 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-gold-light">The CEZLIAR promise</p>
          <h2 id="why-cezliar" className="font-display text-display-lg font-light">{title} <em className="italic text-gold-light">{titleEnd}</em></h2>
          <span aria-hidden="true" className="h-px w-16 bg-gold-light/70" />
          <p className="text-[17px] leading-relaxed text-mist">Fragrance and home care made with care in India — and easy to buy, however you like to shop.</p>
        </div>
        <ol data-reveal-stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title} className="group relative flex flex-col gap-4 rounded-card border border-[#244A3E] bg-[#11302A] p-7 transition-colors duration-300 hover:border-gold-light/60">
              <div className="flex items-center justify-between">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold-light/70 text-gold-light transition-colors duration-300 group-hover:bg-gold-light group-hover:text-[#0B1F19]">
                  <Icon name={item.icon} size={24} strokeWidth={1.5} />
                </span>
                <span aria-hidden="true" className="font-display text-[32px] font-light text-gold-light/50">0{i + 1}</span>
              </div>
              <h3 className="font-display text-[22px]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-mist">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials({ reviews }) {
  return (
    <section aria-labelledby="home-reviews" className="container-site section-gap">
      <div data-reveal className="rounded-panel bg-forest p-[clamp(32px,5vw,72px)] text-ivory-on-forest">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">What our customers say</p>
            <h2 id="home-reviews" className="font-display text-[clamp(32px,3.4vw,50px)] font-light leading-[1.05]">Loved in homes <em className="italic">across India</em></h2>
          </div>
        </div>
        <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
          {reviews.map((r) => (
            <figure key={r.id} className="flex flex-col gap-5 border-t border-forest-line pt-6">
              <span role="img" aria-label={`Rated ${r.rating} out of 5`} className="text-base tracking-[4px] text-gold-light">{'★'.repeat(r.rating)}</span>
              <blockquote className="font-display text-[22px] font-light leading-snug">“{r.review}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {r.image && <img src={r.image} alt="" loading="lazy" className="h-12 w-12 rounded-full bg-white object-cover" />}
                <span className="flex flex-col">
                  <span className="text-[15px]">{r.name} · {r.location}</span>
                  <span className="text-[13px] text-mist">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
