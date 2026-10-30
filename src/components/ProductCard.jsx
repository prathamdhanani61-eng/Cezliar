'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye } from 'lucide-react';
import { formatMarketplaceUrl } from '../utils/url';
import { getProductUrl } from '../utils/product';

const ProductCard = ({ product }) => {
  const amazonUrl = formatMarketplaceUrl(product.amazon);
  const flipkartUrl = formatMarketplaceUrl(product.flipkart);
  const badge = product.isBestSeller ? 'Bestseller' : product.isNewArrival ? 'New arrival' : null;
  const productUrl = getProductUrl(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.42 }}
      className="product-card group flex h-full flex-col overflow-hidden bg-white"
    >
      <div className="product-card-image relative aspect-[4/4.25] overflow-hidden">
        {badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-primary">{badge}</span>}
        <Link href={productUrl} className="flex h-full w-full items-center justify-center p-5 sm:p-7" aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-sm"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23eaeDe5'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%23183c32' text-anchor='middle'%3ECEZLIAR%3C/text%3E%3C/svg%3E";
            }}
          />
        </Link>
        <Link href={productUrl} className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md transition hover:bg-primary hover:text-white" aria-label={`See details for ${product.name}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[.17em] text-gold">{product.subCategory}</p>
        <Link href={productUrl} className="text-text hover:text-primary">
          <h3 className="product-card-title font-heading font-semibold">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-gray-500">{product.description}</p>

        <div className="mt-4 flex items-end justify-between border-t border-primary/10 pt-4">
          <div>
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[.12em] text-gray-400">Price</span>
            <span className="font-heading text-2xl font-semibold text-primary">₹{Number(product.price || 0).toLocaleString('en-IN')}</span>
          </div>
          <Link href={productUrl} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.1em] text-primary hover:text-gold">
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {(amazonUrl || flipkartUrl) && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {amazonUrl && <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="marketplace-link inline-flex items-center justify-center gap-1.5 bg-[#24313B] px-3 text-white transition hover:bg-primary">Amazon <ArrowUpRight className="h-3 w-3" /></a>}
            {flipkartUrl && <a href={flipkartUrl} target="_blank" rel="noopener noreferrer" className="marketplace-link inline-flex items-center justify-center gap-1.5 bg-[#2674C8] px-3 text-white transition hover:bg-[#185b9f]">Flipkart <ArrowUpRight className="h-3 w-3" /></a>}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
