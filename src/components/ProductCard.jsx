import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import Button from './Button';
import { formatMarketplaceUrl } from '../utils/url';

const ProductCard = ({ product }) => {
  const amazonUrl = formatMarketplaceUrl(product.amazon);
  const flipkartUrl = formatMarketplaceUrl(product.flipkart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white rounded-none overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-gold/10 hover:border-gold/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FBFBFA] flex items-center justify-center p-8">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-primary text-white text-[9px] font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none shadow-sm">New</span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-white text-[9px] font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none shadow-sm">Bestseller</span>
          )}
        </div>

        {/* Quick View Link overlay */}
        <Link 
          to={`/product/${product.id}`}
          className="absolute inset-0 z-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500"
        />

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center relative z-10 p-2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F4EFE6'/%3E%3Ctext x='50%25' y='40%25' font-family='Playfair Display' font-size='24' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR%3C/text%3E%3Ctext x='50%25' y='46%25' font-family='sans-serif' font-size='12' fill='%232D2D2D' text-anchor='middle' font-weight='300'%3EPremium Quality%3C/text%3E%3C/svg%3E";
            }}
          />
        </Link>

        {/* Hover Detail Button */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
          <Link to={`/product/${product.id}`} className="w-full">
            <Button variant="primary" className="w-full py-3 text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 rounded-none">
              <Eye className="w-3.5 h-3.5" /> View Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white relative z-10 border-t border-gray-100">
        <p className="text-[9px] font-bold text-gold uppercase tracking-[0.25em] mb-2">{product.subCategory}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-heading font-bold text-text mb-2 line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 line-clamp-2 mb-5 flex-grow font-body leading-relaxed">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          {/* Price */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-semibold text-gray-400 font-body uppercase tracking-[0.1em]">Exclusive Price</span>
            <span className="text-lg font-heading font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          </div>

          {/* Marketplace Buttons */}
          {(amazonUrl || flipkartUrl) && (
            <div className={`grid ${amazonUrl && flipkartUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-2`}>
              {amazonUrl && (
                <a 
                  href={amazonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 bg-[#232F3E] hover:bg-black text-white py-2.5 px-2 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Buy on Amazon <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              )}
              {flipkartUrl && (
                <a 
                  href={flipkartUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 border border-[#2874F0] hover:bg-[#2874F0] hover:text-white text-[#2874F0] py-2.5 px-2 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Buy on Flipkart <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
