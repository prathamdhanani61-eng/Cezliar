'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { cn } from '../utils/cn';
import { Filter, SlidersHorizontal, Sparkles, X, ChevronRight } from 'lucide-react';

const Shop = ({ products }) => {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const catMatch = selectedCategory === 'All' || product.mainCategory === selectedCategory;
    const subCatMatch = selectedSubCategory === 'All' || product.subCategory === selectedSubCategory;
    return catMatch && subCatMatch;
  });

  const categories = [
    { name: 'Fragrance World', icon: '🌿', subCategories: ['Attar', 'Dhoop', 'Solid Perfumes'] },
    { name: 'Home Care', icon: '🏠', subCategories: ['Drain Opener', 'Water Filter', 'PP Spun Filter', 'Filter Candle', 'Filter Set', 'Accessories'] },
  ];

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedSubCategory('All');
  };

  const handleSubCategorySelect = (catName, subCat) => {
    setSelectedCategory(catName);
    setSelectedSubCategory(subCat);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubCategory('All');
  };

  const activeFilterLabel = selectedSubCategory !== 'All'
    ? selectedSubCategory
    : selectedCategory !== 'All' ? selectedCategory : null;

  return (
    <div className="site-page-top shop-page bg-background min-h-screen">
      <div className="container mx-auto px-5 md:px-10 lg:px-12 pb-24">

        {/* ── Page Header ── */}
        <div className="text-center py-12 md:py-16 border-b border-gold/10 mb-10">
          <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs block mb-3">Exquisite Range</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-bold text-text mb-4"
          >
            The Complete Collection
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-12 h-px bg-gold mx-auto mb-5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-gray-500 max-w-xl mx-auto font-body leading-relaxed text-sm md:text-base"
          >
            Meticulously formulated premium offerings designed to elevate your sensory experiences and protect your home.
          </motion.p>
        </div>

        {/* ── Mobile Filter Bar ── */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gold/20 bg-white text-xs font-bold uppercase tracking-wider text-text hover:border-gold/40 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-gold" />
              Filter
            </button>
            {activeFilterLabel && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-primary/8 border border-primary/15 text-xs font-bold text-primary">
                {activeFilterLabel}
                <button onClick={clearFilters} className="ml-1 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <span className="ml-auto text-xs text-gray-500 font-body">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
              >
                <div className="bg-white border border-gold/10 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Filter by Category</h3>
                    <button onClick={clearFilters} className="text-[10px] font-bold text-gold hover:text-primary uppercase tracking-wider transition-colors">Clear All</button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={clearFilters}
                      className={cn('px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all', selectedCategory === 'All' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary/30')}
                    >
                      All ({products.length})
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategorySelect(cat.name)}
                        className={cn('px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1', selectedCategory === cat.name && selectedSubCategory === 'All' ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary/30')}
                      >
                        <span>{cat.icon}</span> {cat.name}
                      </button>
                    ))}
                  </div>

                  {selectedCategory !== 'All' && (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[9px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Sub-categories</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.find(c => c.name === selectedCategory)?.subCategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => handleSubCategorySelect(selectedCategory, sub)}
                            className={cn('px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all', selectedSubCategory === sub ? 'bg-gold text-white border-gold' : 'border-gray-200 text-gray-500 hover:border-gold/30')}
                          >
                            {sub} ({products.filter(p => p.subCategory === sub).length})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Main Content ── */}
        <div className="flex gap-10">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white border border-gold/8 shadow-luxury-card sticky top-32">
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gold" />
                  Filters
                </h3>
                {(selectedCategory !== 'All' || selectedSubCategory !== 'All') && (
                  <button onClick={clearFilters} className="text-[10px] font-bold text-gold hover:text-primary uppercase tracking-wider transition-colors">
                    Clear
                  </button>
                )}
              </div>

              <div className="p-5 space-y-1">
                {/* All Products */}
                <button
                  onClick={clearFilters}
                  className={cn(
                    'w-full text-left flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-all',
                    selectedCategory === 'All' ? 'bg-primary/8 text-primary border-l-2 border-primary pl-[10px]' : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  )}
                >
                  <span>All Products</span>
                  <span className="text-[9px] bg-gray-100 px-2 py-0.5 text-gray-500">{products.length}</span>
                </button>

                {categories.map(cat => (
                  <div key={cat.name} className="pt-2">
                    <button
                      onClick={() => handleCategorySelect(cat.name)}
                      className={cn(
                        'w-full text-left flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-all',
                        selectedCategory === cat.name && selectedSubCategory === 'All'
                          ? 'bg-primary/8 text-primary border-l-2 border-primary pl-[10px]'
                          : 'text-text hover:text-primary hover:bg-gray-50'
                      )}
                    >
                      <span className="flex items-center gap-2"><span>{cat.icon}</span><span>{cat.name}</span></span>
                      <span className="text-[9px] bg-gray-100 px-2 py-0.5 text-gray-500">{products.filter(p => p.mainCategory === cat.name).length}</span>
                    </button>

                    <div className="ml-3 pl-3 border-l border-gold/15 mt-1 space-y-0.5">
                      {cat.subCategories
                        .filter(sub => products.some(p => p.subCategory === sub))
                        .map(sub => (
                          <button
                            key={sub}
                            onClick={() => handleSubCategorySelect(cat.name, sub)}
                            className={cn(
                              'w-full text-left flex items-center justify-between px-2 py-2 text-xs transition-all',
                              selectedCategory === cat.name && selectedSubCategory === sub
                                ? 'text-primary font-bold'
                                : 'text-gray-500 hover:text-primary'
                            )}
                          >
                            <span className="flex items-center gap-1.5">
                              <ChevronRight className="w-3 h-3 opacity-40" />
                              {sub}
                            </span>
                            <span className="text-[9px] text-gray-400">({products.filter(p => p.subCategory === sub).length})</span>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow min-w-0">
            {/* Result bar */}
            <div className="flex items-center justify-between mb-7 py-3 border-b border-gold/10">
              <p className="text-xs font-body text-gray-500">
                Showing <span className="font-bold text-text">{filteredProducts.length}</span> of <span className="font-bold text-text">{products.length}</span> products
                {activeFilterLabel && <span className="text-gold ml-1">in "{activeFilterLabel}"</span>}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Exclusive Range
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
              >
                <AnimatePresence>
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white border border-gold/10">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-bold text-text mb-2">No products found</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-body text-sm mb-6">
                  No products matched the selected filters. Try another category or clear filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary text-white px-7 py-3 text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;
