import Link from 'next/link';
import ArchScene from '../components/ArchScene';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import MarketplaceButtons from '../components/MarketplaceButtons';
import WishlistButton from '../components/WishlistButton';
import Faq from '../components/Faq';
import { CATEGORY_GROUPS, CATEGORY_PAGES } from '../data/categories';
import { products, toProductCard } from '../data/products';
import { formatPrice } from '../utils/format';
import { summarize } from '../utils/text';

const GROUP_ROOT = { fragrance: 'fragrances', home: 'home-care' };

function CategoryVisual({ visual }) {
  if (visual.type === 'cutout') {
    return <ArchScene cutout={visual.cutout} alt={visual.alt} scale={visual.scale} />;
  }
  if (visual.type === 'product') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
        <img src={visual.src} alt={visual.alt} className="h-full max-h-[380px] w-auto object-contain" />
      </div>
    );
  }
  return <img src={visual.src} alt={visual.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: visual.position || 'center' }} />;
}

function MoodCard({ product }) {
  const url = `/product/${product.slug}`;
  return (
    <article className="flex flex-col overflow-hidden rounded-tile border border-line-soft bg-white">
      <div className="relative aspect-square bg-sand">
        <Link href={url} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <img src={product.moodImage} alt="" loading="lazy" className="h-full w-full object-cover" />
        </Link>
        {product.image && (
          <span className="absolute bottom-3.5 left-3.5 block h-[84px] w-[84px] overflow-hidden rounded-2xl border-4 border-white bg-white">
            <img src={product.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          </span>
        )}
        <WishlistButton id={product.id} name={product.shortName} className="absolute right-2 top-2 bg-ivory" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-[22px]">
        {product.notes && <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-saffron">{product.notes}</p>}
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[28px]"><Link href={url} className="text-ink no-underline hover:text-forest">{product.shortName}</Link></h2>
          <span className="text-lg font-medium">{formatPrice(product.price)}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-body">{product.summary}</p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <MarketplaceButtons product={product} />
          <Link href={url} className="self-center p-2.5 text-sm font-medium no-underline">View details →</Link>
        </div>
      </div>
    </article>
  );
}

export default function Category({ categoryId }) {
  const config = CATEGORY_PAGES[categoryId];
  const source = products.filter(config.match);
  const cards = source.map((p) => ({ ...toProductCard(p), summary: summarize(p.description, 150) }));
  const useMoodCards = cards.length > 0 && cards.every((c) => c.moodImage);

  const groupIds = CATEGORY_GROUPS[config.group];
  const rootId = GROUP_ROOT[config.group];
  const siblings = groupIds.map((id) => ({ id, ...CATEGORY_PAGES[id], count: products.filter(CATEGORY_PAGES[id].match).length }));

  const steps = (source[0]?.applications || []).slice(0, 3);
  const faqs = [];
  source.forEach((p) => (p.faqs || []).forEach((f) => {
    if (faqs.length < 6 && !faqs.some((x) => x.question === f.question)) faqs.push(f);
  }));

  const related = config.related ? products.filter(CATEGORY_PAGES[config.related].match).slice(0, 4).map(toProductCard) : [];
  const crumbs = [{ label: 'Home', href: '/' }];
  if (categoryId !== rootId) crumbs.push({ label: CATEGORY_PAGES[rootId].title, href: CATEGORY_PAGES[rootId].path });
  crumbs.push({ label: config.title });

  return (
    <div className="container-site">
      <Breadcrumbs items={crumbs} />

      <section className="flex flex-wrap overflow-hidden rounded-panel bg-forest text-ivory-on-forest">
        <div className="flex flex-[1.2_1_440px] flex-col justify-center gap-5 p-[clamp(32px,5vw,72px)]">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">{config.eyebrow}</p>
          <h1 className="font-display text-[clamp(52px,6vw,92px)] font-light leading-[0.95] tracking-[-0.02em]">{config.title}</h1>
          <p className="max-w-[480px] text-lg leading-relaxed text-mist">{config.description}</p>
          <ul className="flex flex-wrap gap-2">
            <li className="rounded-full border border-forest-line px-3.5 py-2 text-sm">{source.length} {source.length === 1 ? 'product' : 'products'}</li>
            {config.chips.map((chip) => <li key={chip} className="rounded-full border border-forest-line px-3.5 py-2 text-sm">{chip}</li>)}
          </ul>
        </div>
        <div className="relative min-h-[420px] flex-[1_1_380px]">
          <CategoryVisual visual={config.visual} />
        </div>
      </section>

      <nav aria-label={`${CATEGORY_PAGES[rootId].title} categories`} className="flex flex-wrap gap-2 pb-2 pt-7">
        {siblings.filter((s) => s.count > 0).map((s) => (
          <Link key={s.id} href={s.path} aria-current={s.id === categoryId ? 'page' : undefined} className={s.id === categoryId ? 'chip-active no-underline' : 'chip no-underline'}>
            {s.navLabel} · {s.count}
          </Link>
        ))}
      </nav>

      <section aria-label={`${config.title} products`} className="pt-6">
        {cards.length === 0 && (
          <div className="rounded-tile bg-sand p-10 text-center">
            <p className="font-display text-2xl">New products are on their way.</p>
            <Link href="/shop" className="btn-primary mt-4">Shop all products</Link>
          </div>
        )}
        {useMoodCards ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {cards.map((c) => <MoodCard key={c.id} product={c} />)}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-5 gap-y-7">
            {cards.map((c) => <ProductCard key={c.id} product={c} />)}
          </div>
        )}
      </section>

      {steps.length > 0 && (
        <section aria-labelledby="category-ritual" className="mt-[clamp(56px,7vw,104px)] rounded-panel bg-sand p-[clamp(32px,5vw,64px)]">
          <div className="mb-8 flex flex-col gap-2.5">
            <p className="eyebrow">The ritual</p>
            <h2 id="category-ritual" className="font-display text-[clamp(34px,3.6vw,52px)] font-light leading-[1.05] tracking-[-0.02em]">{config.ritualTitle}</h2>
          </div>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {steps.map((step, i) => (
              <li key={step} className="flex flex-col gap-3 rounded-card bg-ivory p-[26px]">
                <span className="font-display text-[44px] font-light leading-none text-forest">0{i + 1}</span>
                <p className="text-base leading-relaxed text-body">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {faqs.length > 0 && (
        <section aria-labelledby="category-faq" className="mt-[clamp(56px,7vw,104px)] flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex flex-[1_1_320px] flex-col gap-3">
            <p className="eyebrow">Good to know</p>
            <h2 id="category-faq" className="font-display text-[clamp(34px,3.6vw,52px)] font-light leading-[1.05] tracking-[-0.02em]">Common <em className="italic">questions</em></h2>
            <p className="text-base leading-relaxed text-body">Still unsure? <Link href="/contact">Get in touch</Link>.</p>
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            <Faq items={faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="category-related" className="mt-[clamp(56px,7vw,104px)]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="category-related" className="font-display text-display-md font-light">You may also <em className="italic">like</em></h2>
            <Link href={CATEGORY_PAGES[config.related].path} className="py-3 text-[15px] font-medium no-underline">All {CATEGORY_PAGES[config.related].title.toLowerCase()} →</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {related.map((c) => <ProductCard key={c.id} product={c} />)}
          </div>
        </section>
      )}
    </div>
  );
}
