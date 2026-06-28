import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../data/products';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const products = getProducts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search and mobile menu when path changes
  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { 
      name: 'Fragrance World', 
      path: '/fragrance-world',
      subLinks: [
        { name: 'Attar', path: '/fragrance-world/attar' },
        { name: 'Dhoop', path: '/fragrance-world/dhoop' }
      ]
    },
    { 
      name: 'Home Care', 
      path: '/home-care',
      subLinks: [
        { name: 'Drain Opener', path: '/home-care/drain-opener' },
        { name: 'Water Filter', path: '/home-care/water-filter' }
      ]
    },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
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
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-3xl md:text-4xl font-heading font-bold text-primary tracking-widest uppercase">
            CEZLIAR
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={cn(
                    "text-sm font-body uppercase tracking-wider transition-colors hover:text-primary py-2 flex items-center gap-1",
                    location.pathname === link.path ? "text-primary font-bold" : "text-text"
                  )}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className="w-4 h-4 opacity-70" />}
                </Link>
                
                {/* Underline Animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
                  location.pathname === link.path && "scale-x-100"
                )} />

                {/* Dropdown Menu */}
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white shadow-luxury rounded-lg py-4 min-w-[200px] border border-gray-100 flex flex-col">
                      {link.subLinks.map(subLink => (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          className="px-6 py-2 text-sm font-body hover:bg-section hover:text-primary transition-colors"
                        >
                          {subLink.name}
                        </Link>
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
                    className="w-full p-5 pl-14 border border-gold/20 rounded-2xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white text-lg transition-colors font-body text-text"
                  />
                  <Search className="absolute left-5 top-5 w-6 h-6 text-gold" />
                </div>

                {/* Search Results */}
                {searchQuery.trim() !== '' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Results ({searchResults.length})</h4>
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map(product => (
                          <Link 
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-luxury transition-all duration-300 group"
                          >
                            <div className="w-16 h-16 bg-section rounded-xl p-2 shrink-0 flex items-center justify-center">
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
                              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{product.subCategory}</span>
                              <h5 className="font-heading font-bold text-text group-hover:text-primary transition-colors">{product.name}</h5>
                              <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
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
              className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background p-6 flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-heading font-bold text-primary tracking-widest">CEZLIAR</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-text hover:text-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto pb-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-gray-200 pb-4">
                    <Link 
                      to={link.path} 
                      className="text-lg font-heading font-bold tracking-wider hover:text-primary transition-colors"
                      onClick={() => !link.subLinks && setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    
                    {link.subLinks && (
                      <div className="flex flex-col gap-3 mt-4 pl-4 border-l-2 border-gold/30">
                        {link.subLinks.map(subLink => (
                          <Link 
                            key={subLink.name}
                            to={subLink.path}
                            className="text-text hover:text-primary transition-colors font-body"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
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
