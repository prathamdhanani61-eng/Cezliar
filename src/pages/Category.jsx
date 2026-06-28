import { motion } from 'framer-motion';
import { getProductsByCategory, getProductsBySubCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useSEO } from '../hooks/useSEO';

const Category = ({ mainCategory, subCategory }) => {
  const title = subCategory || mainCategory;
  
  useSEO({
    title: title,
    description: `Discover the premium range of CEZLIAR ${title} products. Meticulously formulated for an elevated lifestyle and uncompromising quality.`
  });

  const products = subCategory 
    ? getProductsBySubCategory(subCategory) 
    : getProductsByCategory(mainCategory);

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-text mb-6"
          >
            {title}
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
            className="text-gray-600 max-w-2xl mx-auto font-body"
          >
            Discover the finest {title.toLowerCase()} collection crafted with exceptional quality and attention to detail.
          </motion.p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-heading font-bold text-text mb-2">No products found</h3>
            <p className="text-gray-500">Products for this category will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
