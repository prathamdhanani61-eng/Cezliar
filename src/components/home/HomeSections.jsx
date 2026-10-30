import Link from 'next/link';
import Icon from '../Icon';
import MarketplaceButtons from '../MarketplaceButtons';
import { formatPrice } from '../../utils/format';

export function SectionHeading({ id, eyebrow, start, end, link, center = false }) {
  return (
    <div className={`mb-8 flex flex-wrap gap-x-10 gap-y-4 ${center ? 'flex-col items-center text-center' : 'items-end justify-between'}`}>
      <div className={`flex flex-col gap-2.5 ${center ? 'items-center' : ''}`}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="heading-section">{start} <em className="italic">{end}</em></h2>
      </div>
      {link && <Link href={link.href} className="py-3 text-[15px] font-medium no-underline">{link.label} →</Link>}
    </div>
  );
}

export function Marquee({ names }) {
  const row = (hidden) => (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {names.map((name) => (
        <span key={name} className="flex items-center">
          <span className="px-7">{name}</span>
          <span className="text-[0.55em] not-italic text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee mt-8 overflow-hidden border-y border-line bg-cream py-[22px]" aria-label="Our fragrances">
      <div className="marquee-track flex w-max whitespace-nowrap font-display text-[clamp(24px,2.6vw,38px)] font-light italic leading-tight text-forest">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function CollectionsSection({ tiles }) {
  return (
    <section aria-labelledby="home-collections" className="container-site section-gap">
      <SectionHeading id="home-collections" eyebrow={`Four collections · ${tiles.reduce((n, t) => n + t.count, 0)} products`} start="Explore our" end="collections" link={{ href: '/shop', label: 'View all collections' }} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className={`group relative block aspect-3/4 overflow-hidden rounded-tile no-underline ${tile.bg}`}>
            <img src={tile.image} alt="" loading="lazy" className={`absolute transition-transform duration-700 group-hover:scale-[1.03] ${tile.imageClass}`} />
            <span className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 rounded-[18px] bg-ivory p-[18px] text-ink">
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
        {categories.map((cat) => (
          <Link key={cat.href} href={cat.href} className="flex items-center gap-4 rounded-[18px] border border-line-soft bg-white py-3 pl-3 pr-[18px] text-ink no-underline transition-colors hover:border-forest">
            {cat.image ? (
              <span className="block h-16 w-16 flex-none overflow-hidden rounded-full border border-line-soft bg-white">
                <img src={cat.image} alt="" loading="lazy" className="h-full w-full object-cover" />
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
            <Icon name="arrow-right" size={18} strokeWidth={1.7} className="text-forest" />
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
        <article className="flex min-w-0 flex-[1_1_520px] flex-wrap overflow-hidden rounded-tile bg-forest text-ivory-on-forest">
          <div className="relative min-h-[360px] flex-[1_1_240px]">
            <img src={spotlight.moodImage || spotlight.image} alt={spotlight.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-[1_1_260px] flex-col gap-4 p-[clamp(24px,3vw,40px)]">
            <span className="self-start rounded-full bg-gold-light px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-forest-ink">Bestseller</span>
            <h3 className="font-display text-[clamp(32px,3vw,44px)] font-light leading-[1.05]">
              <Link href={`/product/${spotlight.slug}`} className="text-ivory-on-forest no-underline">{spotlight.shortName}</Link>
            </h3>
            <p className="text-[15px] leading-relaxed text-mist">{spotlight.description}</p>
            {spotlight.notes && (
              <div className="flex flex-wrap gap-2">
                {spotlight.notes.split('·').map((note) => (
                  <span key={note} className="rounded-full border border-forest-line px-3 py-1.5 text-[13px]">{note.trim()}</span>
                ))}
              </div>
            )}
            <div className="mt-auto flex flex-col gap-3">
              <span className="font-display text-[32px]">{formatPrice(spotlight.price)}</span>
              <MarketplaceButtons product={spotlight} tone="dark" />
            </div>
          </div>
        </article>
        <div className="grid min-w-0 flex-[1_1_520px] grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
          {products.map((p) => (
            <article key={p.id} className="flex gap-3.5 rounded-card border border-line-soft bg-white p-3">
              <Link href={`/product/${p.slug}`} className="h-32 w-[104px] flex-none overflow-hidden rounded-[14px] bg-white" tabIndex={-1} aria-hidden="true">
                {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain" />}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-saffron">Bestseller</span>
                <h3 className="font-display text-xl leading-tight">
                  <Link href={`/product/${p.slug}`} className="text-ink no-underline hover:text-forest">{p.shortName}</Link>
                </h3>
                <span className="text-[13px] text-muted">{p.tagline}</span>
                <span className="mt-auto text-base font-medium">{formatPrice(p.price)}</span>
                <span className="flex gap-3.5 text-sm font-medium">
                  {p.amazon && <a href={p.amazon} target="_blank" rel="noopener noreferrer" className="py-1 no-underline">Amazon ↗</a>}
                  {p.flipkart && <a href={p.flipkart} target="_blank" rel="noopener noreferrer" className="py-1 no-underline">Flipkart ↗</a>}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ productCount }) {
  return (
    <section aria-labelledby="home-about" className="container-site section-gap">
      <div className="flex flex-wrap items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12">
        <div className="relative min-w-0 flex-[1_1_440px] pb-[72px]">
          <div className="relative aspect-4/5 w-[82%] overflow-hidden rounded-[999px_999px_24px_24px] bg-sand">
            <img src="/images/site/hero-attar.webp" alt="A CEZLIAR attar bottle on a marble pedestal with agarwood and jasmine" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[66%_center]" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-tile border-8 border-ivory bg-sand">
            <img src="/images/site/mood-sandal.webp" alt="Mysore Sandal dhoop jar beside a burning stick" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
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

export function WhyCezliar({ items, title = 'Why', titleEnd = 'CEZLIAR', contained = true }) {
  return (
    <section aria-labelledby="why-cezliar" className={contained ? 'container-site section-gap' : 'section-gap'}>
      <div className="rounded-panel bg-sand p-[clamp(32px,5vw,72px)]">
        <SectionHeading id="why-cezliar" eyebrow="The CEZLIAR promise" start={title} end={titleEnd} center />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-card bg-ivory p-7">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-forest text-ivory-on-forest">
                <Icon name={item.icon} size={24} strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-[22px]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ reviews }) {
  return (
    <section aria-labelledby="home-reviews" className="container-site section-gap">
      <div className="rounded-panel bg-forest p-[clamp(32px,5vw,72px)] text-ivory-on-forest">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">What our customers say</p>
            <h2 id="home-reviews" className="font-display text-[clamp(32px,3.4vw,50px)] font-light leading-[1.05]">Loved in homes <em className="italic">across India</em></h2>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
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

