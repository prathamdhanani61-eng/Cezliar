'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AnimatedGrid from '../components/AnimatedGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import Icon from '../components/Icon';
import OrderBand from '../components/OrderBand';
import { formatPrice } from '../utils/format';

const COLLECTION_FILTERS = [
  { id: 'all', label: 'All products' },
  { id: 'attar', label: 'Attars' },
  { id: 'solid', label: 'Solid perfumes' },
  { id: 'dhoop', label: 'Dhoop' },
  { id: 'home', label: 'Home & water care' },
];

const PRICE_RANGES = [
  { id: 'under-300', label: 'Under ₹300', test: (p) => p < 300 },
  { id: '300-600', label: '₹300 – ₹600', test: (p) => p >= 300 && p <= 600 },
  { id: '600-1000', label: '₹600 – ₹1,000', test: (p) => p > 600 && p <= 1000 },
  { id: 'above-1000', label: 'Above ₹1,000', test: (p) => p > 1000 },
];

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'low', label: 'Price: low to high' },
  { id: 'high', label: 'Price: high to low' },
];

const QUICK_LINKS = [
  { id: 'attar', title: 'Attars', href: '/collections/fragrance-collection/attars', image: '/images/site/attar-cutout.webp', unit: 'blends', dark: true },
  { id: 'solid', title: 'Solid perfumes', href: '/collections/fragrance-collection/solid-perfumes', image: '/images/site/solid-cutout-480.webp', unit: 'balms' },
  { id: 'dhoop', title: 'Dhoop', href: '/collections/fragrance-collection/dhoop', image: '/images/site/dhoop-cutout-480.webp', unit: 'scents', dark: true },
  { id: 'home', title: 'Home & water', href: '/collections/home-care-collection', image: '/images/site/mood-kitchen-600.webp', unit: 'essentials', cover: true },
];

// Reads ?q= from the address. Kept in its own Suspense boundary so the rest of
// the shop still renders on the server.
function SearchQuery({ onChange }) {
  const q = (useSearchParams().get('q') || '').trim();
  useEffect(() => { onChange(q); }, [q, onChange]);
  return null;
}

export default function Shop({ products }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('all');
  const [bestOnly, setBestOnly] = useState(false);
  const [prices, setPrices] = useState([]);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shown = useMemo(() => {
    const q = query.toLowerCase();
    const ranges = PRICE_RANGES.filter((r) => prices.includes(r.id));
    const list = products.filter((p) => (!q || `${p.name} ${p.shortName} ${p.tagline} ${p.subCategory}`.toLowerCase().includes(q))
      && (collection === 'all' || p.collection === collection)
      && (!bestOnly || p.isBestSeller)
      && (!ranges.length || ranges.some((r) => r.test(p.price))));
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, collection, bestOnly, prices, sort]);

  const statsFor = (id) => {
    const items = products.filter((p) => p.collection === id);
    return { count: items.length, from: items.length ? Math.min(...items.map((p) => p.price)) : 0 };
  };

  const togglePrice = (id) => setPrices((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
  const clearSearch = () => router.replace(pathname, { scroll: false });
  const reset = () => { setCollection('all'); setBestOnly(false); setPrices([]); if (query) clearSearch(); };

  return (
    <div className="container-site">
      <Suspense fallback={null}>
        <SearchQuery onChange={setQuery} />
      </Suspense>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop all' }]} />

      <section className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 pb-8 pt-4">
        <div className="flex flex-[1_1_480px] flex-col gap-3">
          <p className="eyebrow">{products.length} products · 4 collections</p>
          <h1 className="font-display text-display-xl font-light">Shop <em className="italic">all</em></h1>
        </div>
        <p className="max-w-[480px] flex-[1_1_360px] text-[17px] leading-relaxed text-body">
          Alcohol-free attars, solid perfumes, charcoal-free dhoop and home essentials. Order on Amazon, Flipkart, WhatsApp or Instagram.
        </p>
      </section>

      <section aria-label="Collections" data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 pb-10">
        {QUICK_LINKS.map((q) => {
          const { count, from } = statsFor(q.id);
          return (
            <Link key={q.id} href={q.href} className={`group flex items-center gap-3.5 rounded-[18px] py-2.5 pl-2.5 pr-4 no-underline transition-colors ${q.dark ? 'bg-forest text-ivory-on-forest hover:bg-forest-deep' : 'border border-line-soft bg-white text-ink hover:border-forest'}`}>
              <span className={`block h-[72px] w-[72px] flex-none overflow-hidden rounded-[14px] ${q.dark ? 'bg-[#133129]' : 'bg-sand'}`}>
                <img src={q.image} alt="" loading="lazy" className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${q.cover ? 'object-cover' : 'object-contain p-1.5'}`} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-[21px]">{q.title}</span>
                <span className={`text-[13px] ${q.dark ? 'text-mist' : 'text-muted'}`}>{count} {q.unit} · from {formatPrice(from)}</span>
              </span>
            </Link>
          );
        })}
      </section>

      <section aria-label="Products" className="flex flex-wrap items-start gap-8 border-t border-line pt-8">
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          aria-controls="shop-filters"
          className="btn-outline w-full lg:hidden"
        >
          {filtersOpen ? 'Hide filters' : 'Show filters'}
        </button>

        <aside id="shop-filters" aria-label="Filters" className={`${filtersOpen ? 'flex' : 'hidden'} w-full min-w-0 flex-col gap-7 lg:flex lg:max-w-[280px] lg:flex-[1_1_240px]`}>
          <div className="flex flex-col gap-1.5">
            <p className="eyebrow mb-1.5">Collection</p>
            {COLLECTION_FILTERS.map((c) => {
              const active = c.id === collection;
              const count = c.id === 'all' ? products.length : statsFor(c.id).count;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCollection(c.id)}
                  className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-3.5 text-left text-[15px] transition-colors ${active ? 'bg-forest text-white' : 'text-ink hover:bg-white'}`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[13px] ${active ? 'text-white' : 'text-muted'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="eyebrow">Show</p>
            <button type="button" role="switch" aria-checked={bestOnly} onClick={() => setBestOnly((v) => !v)} className="flex min-h-[44px] items-center gap-3 text-[15px] text-ink">
              <span className={`flex h-[26px] w-11 items-center rounded-full p-[3px] transition-colors ${bestOnly ? 'bg-forest' : 'bg-line'}`}>
                <span className={`block h-5 w-5 rounded-full bg-white transition-transform duration-200 ${bestOnly ? 'translate-x-[18px]' : ''}`} />
              </span>
              Bestsellers only
            </button>
          </div>

          <fieldset className="flex flex-col gap-1">
            <legend className="eyebrow mb-2">Price</legend>
            {PRICE_RANGES.map((r) => (
              <label key={r.id} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]">
                <input type="checkbox" checked={prices.includes(r.id)} onChange={() => togglePrice(r.id)} className="h-[18px] w-[18px] accent-forest" />
                {r.label}
              </label>
            ))}
          </fieldset>

          <Link href="/gift-finder" className="flex flex-col gap-2 rounded-[18px] bg-sand p-5 text-ink no-underline">
            <span className="font-display text-[21px]">Buying a gift?</span>
            <span className="text-sm leading-normal text-body">Answer three quick questions and order your gift on WhatsApp.</span>
            <span className="text-sm font-medium text-forest">Open gift finder →</span>
          </Link>
        </aside>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <h2 className="sr-only">Products</h2>
          {query && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-sand px-4 py-3">
              <p className="text-[15px]">Search results for <strong className="font-medium">“{query}”</strong></p>
              <button type="button" onClick={clearSearch} className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-forest">
                <Icon name="close" size={16} /> Clear search
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] text-body" aria-live="polite">Showing <strong className="font-medium text-ink">{shown.length}</strong> {shown.length === 1 ? 'product' : 'products'}</p>
            <div role="group" aria-label="Sort products" className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-sm text-muted">Sort</span>
              {SORTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={o.id === sort}
                  onClick={() => setSort(o.id)}
                  className={`min-h-[40px] rounded-full border px-3.5 text-sm transition-colors ${o.id === sort ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          {shown.length ? (
            <AnimatedGrid products={shown} className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-[18px] gap-y-7" />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-tile bg-sand p-10 text-center">
              <p className="font-display text-2xl">No products match {query ? `“${query}”` : 'these filters'}</p>
              <p className="text-[15px] text-body">Try another word, or ask us on WhatsApp — we are happy to help.</p>
              <button type="button" onClick={reset} className="btn-primary">Clear search and filters</button>
            </div>
          )}
        </div>
      </section>

      <OrderBand />
    </div>
  );
}
