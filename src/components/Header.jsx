'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon';
import { NAV, SITE, whatsappLink } from '../data/site';
import { useWishlist } from '../lib/wishlist';
import { formatPrice } from '../utils/format';

const isActive = (item, pathname) => {
  if (item.id === 'fragrances') return pathname.startsWith('/collections/fragrance-collection') && !pathname.includes('/dhoop');
  if (item.id === 'dhoop') return pathname.includes('/dhoop');
  if (item.id === 'home') return pathname.startsWith('/collections/home-care') || pathname.startsWith('/collections/water-care');
  return pathname === item.href;
};

const matches = (product, q) => `${product.name} ${product.shortName} ${product.tagline}`.toLowerCase().includes(q);

function SearchBox({ products, onNavigate }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const q = query.trim().toLowerCase();

  const results = useMemo(() => (q.length < 2 ? [] : products.filter((p) => matches(p, q))), [products, q]);

  const close = () => { setOpen(false); setQuery(''); onNavigate?.(); };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    close();
  };

  return (
    <div className="relative w-full" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <form role="search" onSubmit={onSubmit} className="flex h-11 items-center gap-2.5 rounded-md border border-header-line bg-white px-3.5 text-muted focus-within:border-forest">
        <Icon name="search" size={18} />
        <label className="sr-only" htmlFor={`${listId}-input`}>Search products</label>
        <input
          id={`${listId}-input`}
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
          placeholder="Search attars, dhoop, home care…"
          autoComplete="off"
          enterKeyHint="search"
          aria-controls={listId}
          aria-expanded={open && q.length >= 2}
          className="w-full min-w-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
        />
      </form>
      <AnimatePresence>
        {open && q.length >= 2 && (
          <motion.div
            id={listId}
            data-lenis-prevent
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[70vh] overflow-y-auto rounded-card border border-line-soft bg-white shadow-xl"
          >
            {results.length ? (
              <>
                <ul className="divide-y divide-line-soft">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} onClick={close} className="flex items-center gap-3 px-3 py-2.5 text-ink no-underline hover:bg-ivory">
                        <span className="h-12 w-12 flex-none overflow-hidden rounded-lg border border-line-soft bg-white">
                          {p.image && <img src={p.image} alt="" className="h-full w-full object-contain" loading="lazy" />}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate font-display text-[17px]">{p.shortName}</span>
                          <span className="truncate text-xs text-muted">{p.tagline}</span>
                        </span>
                        <span className="text-sm font-medium">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/shop?q=${encodeURIComponent(query.trim())}`} onClick={close} className="block border-t border-line-soft px-4 py-3 text-sm font-medium no-underline hover:bg-ivory">
                  See all {results.length} {results.length === 1 ? 'result' : 'results'} →
                </Link>
              </>
            ) : (
              <p className="px-4 py-4 text-sm text-muted">No products match “{query.trim()}”.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ searchProducts = [] }) {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const { ids } = useWishlist();

  const nav = useMemo(() => NAV.map((item) => (item.id === 'dhoop'
    ? {
      ...item,
      children: [
        ...item.children,
        ...searchProducts.filter((p) => p.collection === 'dhoop').map((p) => ({ label: p.shortName, href: `/product/${p.slug}` })),
      ],
    }
    : item)), [searchProducts]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <div className="bg-forest px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-ivory-on-forest sm:text-xs">
        Alcohol-free attars · Made in India · Order on Amazon, Flipkart, WhatsApp &amp; Instagram
      </div>
      <header className="sticky top-0 z-40 border-b border-header-line bg-cream/95 backdrop-blur">
        <div className="container-site flex items-center justify-between gap-6 py-3.5 lg:gap-10 lg:py-4">
          <Link href="/" aria-label="CEZLIAR home" className="flex flex-col gap-1.5 no-underline">
            <img src="/images/site/logo.webp" alt="CEZLIAR" width={168} height={30} className="h-auto w-[132px] sm:w-[168px]" />
            <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">{SITE.tagline}</span>
          </Link>

          <nav aria-label="Primary" className="hidden flex-wrap items-center gap-x-7 gap-y-2 text-[15px] lg:flex">
            {nav.map((item) => {
              const active = isActive(item, pathname);
              const linkClass = `flex items-center gap-1.5 border-b-2 py-2 no-underline transition-colors ${active ? 'border-forest font-medium text-forest' : 'border-transparent text-ink hover:text-forest'}`;
              if (!item.children) {
                return <Link key={item.id} href={item.href} aria-current={active ? 'page' : undefined} className={linkClass}>{item.label}</Link>;
              }
              return (
                <div key={item.id} className="group relative">
                  <Link href={item.href} aria-current={active ? 'page' : undefined} className={linkClass}>
                    {item.label}
                    <Icon name="chevron-down" size={12} strokeWidth={2} className="transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="rounded-card border border-line-soft bg-white p-2 shadow-xl">
                      {item.children.map((child, i) => (
                        <li key={child.href}>
                          <Link href={child.href} className={`block rounded-xl px-3 py-2.5 text-[15px] no-underline hover:bg-ivory hover:text-forest ${i === 0 ? 'font-medium text-forest' : 'text-ink'}`}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden w-[260px] lg:block">
              <SearchBox products={searchProducts} />
            </div>
            <Link href="/wishlist" aria-label={`Wishlist${ids.length ? `, ${ids.length} saved` : ''}`} className="relative flex h-11 w-11 items-center justify-center text-ink">
              <Icon name="heart" size={22} strokeWidth={1.5} />
              <AnimatePresence>
                {ids.length > 0 && (
                  <motion.span
                    key={ids.length}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[11px] font-medium text-white"
                  >
                    {ids.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              data-lenis-prevent
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-header-line bg-cream lg:hidden"
            >
              <div className="container-site flex max-h-[calc(100vh-80px)] flex-col gap-5 overflow-y-auto py-5">
                <SearchBox products={searchProducts} onNavigate={() => setMenuOpen(false)} />
                <nav aria-label="Mobile" className="flex flex-col" onClick={(e) => { if (e.target.closest('a')) setMenuOpen(false); }}>
                  {nav.map((item) => (
                    <div key={item.id} className="border-b border-line-soft py-1">
                      <Link href={item.href} className={`block py-3 font-display text-2xl no-underline ${isActive(item, pathname) ? 'text-forest' : 'text-ink'}`}>{item.label}</Link>
                      {item.children && (
                        <ul className="flex flex-wrap gap-2 pb-3">
                          {item.children.slice(1).map((child) => (
                            <li key={child.href}><Link href={child.href} className="chip no-underline">{child.label}</Link></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="grid grid-cols-2 gap-2">
                  <a href={whatsappLink('Hello CEZLIAR! I would like to place an order.')} target="_blank" rel="noopener noreferrer" className="btn-primary px-3">
                    <Icon name="whatsapp" size={18} /> WhatsApp
                  </a>
                  <a href={SITE.instagramDm} target="_blank" rel="noopener noreferrer" className="btn-outline px-3">
                    <Icon name="instagram" size={18} /> Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
