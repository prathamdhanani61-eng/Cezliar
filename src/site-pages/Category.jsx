'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Category = ({ mainCategory, subCategory, products }) => {
  const title = subCategory || mainCategory;


  return (
    <div className="site-page-top category-page bg-background min-h-screen">
      <div className="container mx-auto px-5 md:px-10 lg:px-12 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-body text-gray-400 py-4 border-b border-gold/10 mb-10 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          {subCategory && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-text font-semibold">{mainCategory}</span>
            </>
          )}
          <span className="text-gray-300">/</span>
          <span className="text-text font-semibold">{title}</span>
        </nav>

        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px]">
              {subCategory ? mainCategory : 'CEZLIAR Collections'}
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-bold text-text mb-4"
          >
            {title}
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
            className="text-gray-500 max-w-xl mx-auto font-body leading-relaxed text-sm"
          >
            Discover the finest {title.toLowerCase()} collection crafted with exceptional quality and attention to detail.
            <span className="font-semibold text-primary"> {products.length} product{products.length !== 1 ? 's' : ''}</span> available.
          </motion.p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-gold/10">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-xl font-heading font-bold text-text mb-2">Coming Soon</h3>
            <p className="text-gray-500 text-sm font-body mb-6">Products for this collection will be available soon.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-gold uppercase tracking-wider transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> View All Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Category;
