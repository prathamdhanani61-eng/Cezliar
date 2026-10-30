'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { formatMarketplaceUrl } from '../utils/url';
import { getProductUrl } from '../utils/product';

const Navbar = ({ searchProducts = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
    setCollectionsExpanded(false);
    setExpandedCategory(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Gift Finder', path: '/#gift-finder' },
    {
      name: 'Collections',
      path: '/collections',
      isMegaMenu: true,
      categories: [
        {
          name: 'Fragrance World', image: '/images/products/HeroImg/Attar.png',
          icon: '🌿',
          path: '/collections/fragrance-collection',
          items: [
            { name: 'Attars', path: '/collections/fragrance-collection/attars', desc: 'Alcohol-free concentrated oils' },
            { name: 'Solid Perfumes', path: '/collections/fragrance-collection/solid-perfumes', desc: 'Wax-based premium blends' },
            { name: 'Dhoop', path: '/collections/fragrance-collection/dhoop', desc: 'Charcoal-free incense sticks' },
          ]
        },
        {
          name: 'Home Care', image: '/images/products/Drain/1.jpg',
          icon: '🏠',
          path: '/collections/home-care-collection',
          items: [
            { name: 'Drain Cleaner', path: '/collections/home-care-collection/drain-cleaner', desc: 'Non-toxic, high-performance' },
          ]
        },
        {
          name: 'Water solutions', image: '/images/products/water-filter.webp',
          icon: '💧',
          path: '/collections/water-care-collection',
          items: [
            { name: 'PP Spun Filter', path: '/collections/water-care-collection/pp-spun-filter', desc: '5-micron sediment removal' },
            { name: 'Filter Candle', path: '/collections/water-care-collection/filter-candle', desc: 'Ceramic filtration' },
            { name: 'Filter Set', path: '/collections/water-care-collection/filter-set', desc: 'Complete 9-stage system' },
            { name: 'Accessories', path: '/collections/water-care-collection/accessories', desc: 'Filter accessories & parts' },
          ]
        },
        {
          name: 'Signature', image: '/images/products/HeroImg/Dhoop.png',
          icon: '✨',
          path: '/collections/signature-collection',
          items: [],
        },
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];
  const visibleNavLinks = pathname === '/' ? [
    { name: 'Fragrances', path: '/collections/fragrance-collection/attars' },
    { name: 'Home Care', path: '/collections/home-care-collection' },
    navLinks.find((link) => link.name === 'Collections'),
    { name: 'Gifts', path: '/#gift-finder' },
    { name: 'Our Story', path: '/about' },
  ] : navLinks;

  const quickCategories = [
    { label: 'Shop Attar', path: '/collections/fragrance-collection/attars' },
    { label: 'Shop Perfume', path: '/collections/fragrance-collection/solid-perfumes' },
    { label: 'Shop Dhoop', path: '/collections/fragrance-collection/dhoop' },
  ];

  const searchResults = searchQuery.trim() === '' ? [] :
    searchProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);

  const isActive = (link) => {
    if (link.path === '/') return pathname === '/';
    return pathname.startsWith(link.path);
  };

  return (
    <>

      {/* ── Main Header ── */}
      <header
        className={cn(
          'site-header fixed left-0 right-0 z-40 transition-all duration-500',
          pathname === '/' ? 'home-site-header top-0' : announcementVisible ? 'top-[34px]' : 'top-0',
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-luxury border-b border-gold/10 py-3'
            : pathname === '/' ? 'bg-[#fbf7ed]/90 backdrop-blur-sm py-3 border-b border-white/30' : 'bg-background/80 backdrop-blur-sm py-4 border-b border-transparent'
        )}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-12 flex items-center justify-between gap-4">

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-text hover:text-primary transition-colors p-1 -ml-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="CEZLIAR Home">
            <img
              src="/images/logo/logo.png"
              alt="CEZLIAR"
              className={cn(
                'object-contain transition-all duration-500',
                isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-11'
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-0.5">
            {visibleNavLinks.map((link) => (
              <div key={link.name} className={cn('group relative', link.isMegaMenu && 'static')}>
                <Link
                  href={link.path}
                  className={cn(
                    'text-[11px] font-body font-semibold uppercase tracking-[0.15em] transition-colors duration-200 px-3 lg:px-4 py-2.5 flex items-center gap-1 relative',
                    isActive(link) ? 'text-primary' : 'text-text hover:text-primary'
                  )}
                >
                  {link.name}
                  {link.isMegaMenu && (
                    <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Mega Menu */}
                {link.isMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 min-w-[640px]">
                    <div className="bg-white shadow-luxury-xl border border-gold/10 p-8 relative">
                      {/* Gold accent line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

                      <div className="grid grid-cols-4 gap-6">
                        {link.categories.map((cat) => (
                          <div key={cat.name} className="flex flex-col gap-3">
                            <Link
                              href={cat.path}
                              className="flex flex-col gap-2 font-heading font-bold text-sm text-primary border-b border-gold/20 pb-3 hover:text-gold transition-colors"
                            >
                              <img src={cat.image} alt="" className="w-full h-20 object-cover rounded-lg bg-section" />
                              <span className="flex items-center gap-2"><span className="text-base">{cat.icon}</span><span>{cat.name}</span></span>
                            </Link>
                            {cat.items && cat.items.length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {cat.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.path}
                                    className="group/item flex flex-col"
                                  >
                                    <span className="text-[11px] text-gray-700 hover:text-primary font-semibold transition-colors duration-200 uppercase tracking-[0.08em] group-hover/item:translate-x-1 transition-transform">
                                      {item.name}
                                    </span>
                                    {item.desc && (
                                      <span className="text-[9px] text-gray-400 font-body mt-0.5">{item.desc}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[10px] text-gray-400 font-body leading-relaxed italic">
                                Limited exclusive formulations — coming soon
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Quick categories strip */}
                      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] shrink-0">Quick Shop:</span>
                        {quickCategories.map((cat, i) => (
                          <Link
                            key={i}
                            href={cat.path}
                            className="text-[10px] font-bold text-primary hover:text-gold uppercase tracking-[0.15em] flex items-center gap-1 transition-colors"
                          >
                            {cat.label}
                            <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons Row */}
          <div className="home-header-actions flex items-center gap-1 text-text">
            <button
              onClick={() => setSearchOpen(true)}
              className="home-search-trigger p-2 hover:text-primary transition-colors rounded-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
              <span>Search fragrances, attars, home care...</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex justify-center items-start"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-background border-b border-gold/10 shadow-luxury-xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto max-w-4xl px-5 py-6 md:py-8">
                {/* Search header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-heading font-bold text-primary tracking-[0.2em] uppercase">Search Catalog</h3>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-text hover:text-primary p-2 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search fragrances, home care products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold/30 bg-white text-base font-body text-text placeholder:text-gray-400 focus:outline-none transition-all"
                    aria-label="Search products"
                  />
                </div>

                {/* Quick links when empty */}
                {searchQuery.trim() === '' && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {['Oud Attar', 'Rose Attar', 'Sandalwood Dhoop', 'Drain Opener', 'Water Filter', 'Musk'].map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchQuery(q)}
                          className="px-4 py-1.5 bg-section border border-gold/15 text-xs text-gray-600 hover:border-gold/40 hover:text-primary transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search results */}
                {searchQuery.trim() !== '' && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">
                      {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults.map((product) => {
                          const amz = formatMarketplaceUrl(product.amazon);
                          const fkrt = formatMarketplaceUrl(product.flipkart);
                          return (
                            <div
                              key={product.id}
                              className="flex items-center gap-3 p-4 bg-white border border-gray-100 hover:border-gold/30 hover:shadow-luxury-card transition-all duration-300"
                            >
                              <Link href={getProductUrl(product)} className="flex items-center gap-3 flex-grow group min-w-0">
                                <div className="w-14 h-14 bg-section p-2 shrink-0 flex items-center justify-center">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F7F3EC'/%3E%3C/svg%3E"; }}
                                  />
                                </div>
                                <div className="min-w-0 flex-grow">
                                  <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{product.subCategory}</span>
                                  <h5 className="font-heading font-bold text-text group-hover:text-primary text-sm leading-snug line-clamp-1 transition-colors">{product.name}</h5>
                                  <span className="text-xs font-semibold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 transition-colors" />
                              </Link>
                              {(amz || fkrt) && (
                                <div className="flex flex-col gap-1 shrink-0">
                                  {amz && <a href={amz} target="_blank" rel="noopener noreferrer" className="bg-[#232F3E] hover:bg-black text-white py-1 px-2.5 text-[8px] font-bold uppercase tracking-wider transition-all whitespace-nowrap">Amazon</a>}
                                  {fkrt && <a href={fkrt} target="_blank" rel="noopener noreferrer" className="bg-[#2874F0] hover:bg-[#1a5bbf] text-white py-1 px-2.5 text-[8px] font-bold uppercase tracking-wider transition-all whitespace-nowrap">Flipkart</a>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 py-6 text-sm font-body text-center">
                        No products matched "<strong>{searchQuery}</strong>". Try "Attar", "Oud", "Filter" or "Drain".
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 bottom-0 w-[88%] max-w-[360px] bg-background flex flex-col shadow-luxury-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10 bg-white">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/images/logo/logo.png" alt="CEZLIAR" className="h-8 object-contain" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text hover:text-primary p-2 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Categories */}
              <div className="px-5 py-4 bg-section border-b border-gold/10">
                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.2em] mb-3">Quick Shop</p>
                <div className="flex flex-wrap gap-2">
                  {quickCategories.map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 bg-white border border-gold/20 text-[10px] font-bold text-primary uppercase tracking-[0.1em] hover:bg-primary hover:text-white hover:border-primary transition-all"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              <div className="flex-grow overflow-y-auto px-5 py-4 space-y-1">
                {visibleNavLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-100">
                    {link.isMegaMenu ? (
                      <>
                        <button
                          onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                          className="flex items-center justify-between w-full py-4 text-base font-heading font-bold text-text hover:text-primary transition-colors"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={cn('w-5 h-5 transition-transform duration-300 text-gold', collectionsExpanded && 'rotate-180')} />
                        </button>

                        <AnimatePresence>
                          {collectionsExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-3 border-l-2 border-gold/30 ml-1 space-y-1">
                                {link.categories.map((cat) => {
                                  const hasItems = cat.items && cat.items.length > 0;
                                  const isCatExpanded = expandedCategory === cat.name;
                                  return (
                                    <div key={cat.name}>
                                      {hasItems ? (
                                        <>
                                          <button
                                            onClick={() => setExpandedCategory(isCatExpanded ? null : cat.name)}
                                            className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-text hover:text-primary transition-colors"
                                          >
                                            <span className="flex items-center gap-2"><span>{cat.icon}</span><span>{cat.name}</span></span>
                                            <ChevronDown className={cn('w-4 h-4 transition-transform duration-300 text-gray-400', isCatExpanded && 'rotate-180')} />
                                          </button>
                                          <AnimatePresence>
                                            {isCatExpanded && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-5 border-l border-gray-200 ml-2 space-y-0.5"
                                              >
                                                <Link
                                                  href={cat.path}
                                                  onClick={() => setMobileMenuOpen(false)}
                                                  className="block py-2 text-xs text-gold font-bold uppercase tracking-wider hover:text-primary transition-colors"
                                                >
                                                  View All →
                                                </Link>
                                                {cat.items.map((item) => (
                                                  <Link
                                                    key={item.name}
                                                    href={item.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors font-body"
                                                  >
                                                    {item.name}
                                                  </Link>
                                                ))}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </>
                                      ) : (
                                        <Link
                                          href={cat.path}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-2 py-2.5 text-sm font-semibold text-text hover:text-primary transition-colors"
                                        >
                                          <span>{cat.icon}</span><span>{cat.name}</span>
                                        </Link>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block py-4 text-base font-heading font-bold hover:text-primary transition-colors',
                          isActive(link) ? 'text-primary' : 'text-text'
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer of menu */}
              <div className="px-5 py-5 border-t border-gold/10 bg-white">
                <button
                  onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-primary text-primary text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
                >
                  <Search className="w-4 h-4" />
                  Search Products
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
