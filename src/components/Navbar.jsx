import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../data/products';
import { formatMarketplaceUrl } from '../utils/url';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const location = useLocation();
  const products = getProducts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search, mobile menu and collapse accordions when path changes
  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
    setCollectionsExpanded(false);
    setExpandedCategory(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    {
      name: 'Collections',
      path: '/collections',
      isMegaMenu: true,
      categories: [
        {
          name: 'Fragrance Collection',
          icon: '🌿',
          path: '/collections/fragrance-collection',
          items: [
            { name: 'Attars', path: '/collections/fragrance-collection/attars' },
            { name: 'Solid Perfumes', path: '/collections/fragrance-collection/solid-perfumes' },
            { name: 'Dhoop', path: '/collections/fragrance-collection/dhoop' }
          ]
        },
        {
          name: 'Home Care Collection',
          icon: '🏠',
          path: '/collections/home-care-collection',
          items: [
            { name: 'Drain Cleaner', path: '/collections/home-care-collection/drain-cleaner' }
          ]
        },
        {
          name: 'Water Care Collection',
          icon: '💧',
          path: '/collections/water-care-collection',
          items: [
            { name: 'PP Spun Filter', path: '/collections/water-care-collection/pp-spun-filter' },
            { name: 'Filter Candle', path: '/collections/water-care-collection/filter-candle' },
            { name: 'Filter Set', path: '/collections/water-care-collection/filter-set' },
            { name: 'Accessories', path: '/collections/water-care-collection/accessories' }
          ]
        },
        {
          name: 'Signature Collection',
          icon: '✨',
          path: '/collections/signature-collection',
          items: []
        },
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Our Story', path: '/our-story' }
  ];

  const searchResults = searchQuery.trim() === '' ? [] : products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-gold/10 py-4'
          : 'bg-transparent py-6'
      )}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo/logo.png"
              alt="CEZLIAR Logo"
              className={cn(
                "transition-all duration-500 object-contain",
                isScrolled ? "h-8" : "h-10"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className={cn("group", !link.isMegaMenu && "relative")}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-body uppercase tracking-wider transition-colors hover:text-primary py-2 flex items-center gap-1",
                    location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path
                      ? "text-primary font-bold"
                      : "text-text"
                  )}
                >
                  {link.name}
                  {link.isMegaMenu && <ChevronDown className="w-4 h-4 opacity-70 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Underline Animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
                  (location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path) && "scale-x-100"
                )} />

                {/* Mega Menu Dropdown */}
                {link.isMegaMenu && (
                  <div className="absolute top-full left-0 right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white shadow-luxury border border-gold/15 p-10 grid grid-cols-4 gap-8">
                      {link.categories.map((cat) => (
                        <div key={cat.name} className="flex flex-col text-left">
                          <Link
                            to={cat.path}
                            className="font-heading font-bold text-sm text-primary border-b border-gold/15 pb-2 mb-4 hover:text-gold transition-colors flex items-center gap-2"
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </Link>
                          {cat.items && cat.items.length > 0 ? (
                            <div className="flex flex-col gap-2.5">
                              {cat.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="font-body text-[11px] text-gray-500 hover:text-primary uppercase tracking-[0.1em] hover:translate-x-1 transition-all duration-300"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-gray-400 font-body leading-relaxed">
                              Exclusive collections and limited formulations.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 text-text">
            <button
              className="hover:text-primary transition-colors p-2"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-down Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm flex justify-center items-start"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full bg-background border-b border-gold/10 p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="container mx-auto max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-heading font-bold text-primary tracking-widest uppercase">Search our Catalog</h3>
                  <button onClick={() => setSearchOpen(false)} className="text-text hover:text-primary p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="relative mb-8">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search premium fragrances, home care products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full p-5 pl-14 border border-gold/20 rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white text-lg transition-colors font-body text-text"
                  />
                  <Search className="absolute left-5 top-5 w-6 h-6 text-gold" />
                </div>

                {/* Search Results */}
                {searchQuery.trim() !== '' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Results ({searchResults.length})</h4>
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map(product => {
                          const amazonUrl = formatMarketplaceUrl(product.amazon);
                          const flipkartUrl = formatMarketplaceUrl(product.flipkart);
                          return (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-4 bg-white rounded-none border border-gray-100 hover:border-gold/30 hover:shadow-luxury transition-all duration-300"
                            >
                              <Link
                                to={`/product/${product.id}`}
                                className="flex items-center gap-4 flex-grow mr-4 group"
                              >
                                <div className="w-16 h-16 bg-section rounded-none p-2 shrink-0 flex items-center justify-center">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F7F3EC'/%3E%3C/svg%3E";
                                    }}
                                  />
                                </div>
                                <div className="flex-grow">
                                  <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{product.subCategory}</span>
                                  <h5 className="font-heading font-bold text-text group-hover:text-primary transition-colors text-sm">{product.name}</h5>
                                  <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                              </Link>

                              {/* Marketplace Buy Buttons */}
                              {(amazonUrl || flipkartUrl) && (
                                <div className="flex flex-col gap-1.5 shrink-0 ml-2">
                                  {amazonUrl && (
                                    <a
                                      href={amazonUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1 bg-[#232F3E] hover:bg-black text-white py-1.5 px-3 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm whitespace-nowrap"
                                    >
                                      Buy on Amazon
                                    </a>
                                  )}
                                  {flipkartUrl && (
                                    <a
                                      href={flipkartUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1 border border-[#2874F0] hover:bg-[#2874F0] hover:text-white text-[#2874F0] py-1.5 px-3 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap"
                                    >
                                      Buy on Flipkart
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 py-4 font-body">No products matched your search. Try searching for "Attar", "Oud", "Filter" or "Drain".</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background p-6 flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <img
                    src="/images/logo/logo.png"
                    alt="CEZLIAR Logo"
                    className="h-8 object-contain"
                  />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="text-text hover:text-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-5 overflow-y-auto pb-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-gray-200/60 pb-3">
                    {link.isMegaMenu ? (
                      <>
                        <button
                          onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                          className="flex items-center justify-between w-full text-lg font-heading font-bold tracking-wider hover:text-primary transition-colors text-left text-text py-1"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", collectionsExpanded && "transform rotate-180")} />
                        </button>

                        <AnimatePresence>
                          {collectionsExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col gap-4 mt-3 pl-4 border-l border-gold/20 overflow-hidden"
                            >
                              {link.categories.map((cat) => {
                                const hasItems = cat.items && cat.items.length > 0;
                                const isCategoryExpanded = expandedCategory === cat.name;

                                return (
                                  <div key={cat.name} className="flex flex-col">
                                    {hasItems ? (
                                      <>
                                        <button
                                          onClick={() => setExpandedCategory(isCategoryExpanded ? null : cat.name)}
                                          className="flex items-center justify-between w-full text-sm font-heading font-semibold tracking-wider hover:text-primary transition-colors text-left py-1 text-text"
                                        >
                                          <span className="flex items-center gap-2"><span>{cat.icon}</span> <span>{cat.name}</span></span>
                                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isCategoryExpanded && "transform rotate-180")} />
                                        </button>

                                        <AnimatePresence>
                                          {isCategoryExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="flex flex-col gap-2 mt-2 pl-6 border-l border-gray-200 overflow-hidden"
                                            >
                                              <Link
                                                to={cat.path}
                                                className="text-xs text-gold font-bold uppercase tracking-wider py-1 hover:text-primary transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                              >
                                                View All
                                              </Link>
                                              {cat.items.map((item) => (
                                                <Link
                                                  key={item.name}
                                                  to={item.path}
                                                  className="text-xs text-gray-600 hover:text-primary transition-colors font-body py-1"
                                                  onClick={() => setMobileMenuOpen(false)}
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
                                        to={cat.path}
                                        className="flex items-center gap-2 w-full text-sm font-heading font-semibold tracking-wider hover:text-primary transition-colors py-1 text-text"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <span>{cat.icon}</span> <span>{cat.name}</span>
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-lg font-heading font-bold tracking-wider hover:text-primary transition-colors py-1 text-text"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
