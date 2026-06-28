import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { cn } from '../utils/cn';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const Shop = () => {
  useSEO({
    title: 'Shop Collections',
    description: 'Explore the complete CEZLIAR collection. Shop our premium alcohol-free Oud and Rose Attars, natural Dhoop sticks, Pro Drain Opener, and Advanced Aqua Water Filters.'
  });
  const products = getProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products based on selected category and subcategory
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.mainCategory === selectedCategory;
    const subCategoryMatch = selectedSubCategory === 'All' || product.subCategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  const categories = [
    {
      name: 'Fragrance World',
      subCategories: ['Attar', 'Dhoop']
    },
    {
      name: 'Home Care',
      subCategories: ['Drain Opener', 'Water Filter']
    }
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory('All');
  };

  const handleSubCategorySelect = (categoryName, subCategoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(subCategoryName);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubCategory('All');
  };

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Exquisite Range</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-text mt-2 mb-6"
          >
            The Complete Collection
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-gold mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto font-body leading-relaxed"
          >
            Explore our meticulously formulated, premium offerings designed to elevate your sensory experiences and protect your home space.
          </motion.p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex md:hidden justify-between items-center bg-white p-4 rounded-2xl shadow-luxury mb-6">
          <span className="font-heading font-bold text-text flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gold" /> Filter & Sort
          </span>
          <button 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-body text-xs font-semibold uppercase tracking-wider hover:bg-primary/95 transition-all"
          >
            {mobileFilterOpen ? 'Close' : 'Filter'}
          </button>
        </div>

        {/* Filters and Grid */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Desktop Sidebar Filter */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gold/5 sticky top-32">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-heading font-bold text-primary tracking-wide flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold" /> Filters
                </h3>
                {(selectedCategory !== 'All' || selectedSubCategory !== 'All') && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-gold hover:text-primary transition-colors font-bold uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Tree */}
              <div className="space-y-6">
                <div>
                  <button
                    onClick={clearFilters}
                    className={cn(
                      "w-full text-left font-body text-sm font-semibold py-2 transition-colors",
                      selectedCategory === 'All' ? "text-primary font-bold" : "text-gray-600 hover:text-primary"
                    )}
                  >
                    All Products
                  </button>
                </div>

                {categories.map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <button
                      onClick={() => handleCategorySelect(cat.name)}
                      className={cn(
                        "w-full text-left font-heading font-bold text-sm transition-colors pt-2 border-t border-gray-50 flex items-center justify-between group",
                        selectedCategory === cat.name && selectedSubCategory === 'All' 
                          ? "text-primary" 
                          : "text-text hover:text-primary"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] bg-section px-2 py-0.5 rounded text-gray-400 group-hover:bg-gold/10 group-hover:text-gold transition-all">
                        {products.filter(p => p.mainCategory === cat.name).length}
                      </span>
                    </button>

                    <div className="pl-4 space-y-1.5 flex flex-col border-l-2 border-gold/10 mt-1">
                      {cat.subCategories.map((subCat) => (
                        <button
                          key={subCat}
                          onClick={() => handleSubCategorySelect(cat.name, subCat)}
                          className={cn(
                            "text-left font-body text-xs py-1 transition-colors flex justify-between items-center group",
                            selectedCategory === cat.name && selectedSubCategory === subCat
                              ? "text-primary font-semibold"
                              : "text-gray-500 hover:text-primary"
                          )}
                        >
                          <span>{subCat}</span>
                          <span className="text-[9px] text-gray-400 group-hover:text-primary transition-colors">
                            ({products.filter(p => p.subCategory === subCat).length})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Expandable Drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full bg-white p-6 rounded-2xl shadow-luxury border border-gold/5 mb-6 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                  <h3 className="font-heading font-bold text-primary">Filters</h3>
                  <button 
                    onClick={() => { clearFilters(); setMobileFilterOpen(false); }}
                    className="text-xs text-gold font-bold uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => { setSelectedCategory('All'); setSelectedSubCategory('All'); }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-body transition-colors",
                      selectedCategory === 'All' ? "bg-primary text-white font-semibold" : "bg-section text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    All ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-body transition-colors",
                        selectedCategory === cat.name && selectedSubCategory === 'All'
                          ? "bg-primary text-white font-semibold"
                          : "bg-section text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {cat.name} ({products.filter(p => p.mainCategory === cat.name).length})
                    </button>
                  ))}
                </div>

                {selectedCategory !== 'All' && (
                  <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider">Subcategories</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedSubCategory('All')}
                        className={cn(
                          "px-4.5 py-2 rounded-xl text-xs font-body transition-colors",
                          selectedSubCategory === 'All' ? "bg-gold text-white font-semibold" : "bg-section text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        All {selectedCategory}
                      </button>
                      {categories.find(c => c.name === selectedCategory)?.subCategories.map(subCat => (
                        <button
                          key={subCat}
                          onClick={() => setSelectedSubCategory(subCat)}
                          className={cn(
                            "px-4.5 py-2 rounded-xl text-xs font-body transition-colors",
                            selectedSubCategory === subCat ? "bg-gold text-white font-semibold" : "bg-section text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {subCat} ({products.filter(p => p.subCategory === subCat).length})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8 bg-white p-4 px-6 rounded-2xl shadow-luxury border border-gold/5">
              <p className="text-sm font-body text-gray-500">
                Showing <span className="font-semibold text-text">{filteredProducts.length}</span> products
              </p>
              <div className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Exclusive Catalog
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-luxury border border-gold/5">
                <h3 className="text-2xl font-heading font-bold text-text mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto font-body">No products matched the selected filters. Please select another category or clear filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-body text-xs font-bold uppercase tracking-widest hover:bg-primary/95 transition-all shadow-md"
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
