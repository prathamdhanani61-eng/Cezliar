import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Truck, Sparkles, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { getProductById, getProductsBySubCategory } from '../data/products';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useSEO } from '../hooks/useSEO';
import { formatMarketplaceUrl } from '../utils/url';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeTab, setActiveTab] = useState('description');

  const amazonUrl = product ? formatMarketplaceUrl(product.amazon) : '';
  const flipkartUrl = product ? formatMarketplaceUrl(product.flipkart) : '';

  useSEO({
    title: product ? product.name : 'Product Details',
    description: product ? product.description : 'Explore premium CEZLIAR product details, specifications, benefits, applications, and FAQs.'
  });

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-4xl font-heading font-bold mb-4 text-primary">Product Not Found</h1>
        <p className="mb-8 text-gray-500 font-body">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = getProductsBySubCategory(product.subCategory)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'applications', label: 'Applications' },
    { id: 'faqs', label: 'FAQs' }
  ];

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 md:px-12 flex items-center text-xs md:text-sm font-body text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
          
          {/* Left: Product Image */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-luxury border border-gold/5 flex items-center justify-center aspect-square max-h-[550px] relative overflow-hidden"
            >
              {product.isNewArrival && (
                <span className="absolute top-6 left-6 z-10 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 shadow-md">New</span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F4EFE6'/%3E%3Ctext x='50%25' y='50%25' font-family='Playfair Display' font-size='32' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR%3C/text%3E%3C/svg%3E";
                }}
              />
            </motion.div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category tag */}
              <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-widest uppercase">
                <span className="text-gold">{product.mainCategory}</span>
                <span className="text-gray-300">|</span>
                <span className="text-primary">{product.subCategory}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Quality Seal */}
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-gold shrink-0" />
                <span className="text-gray-500 text-sm font-body">Premium Brand Formulation</span>
              </div>

              {/* Price */}
              <div className="mb-8 pb-6 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-400 font-body uppercase block mb-1">Exclusive Value</span>
                <div className="text-3xl font-heading font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 font-body leading-relaxed mb-8 text-base md:text-lg">
                {product.description}
              </p>

              {/* Marketplace Buy Actions */}
              {(amazonUrl || flipkartUrl) && (
                <div className="bg-section p-6 rounded-3xl border border-gold/10 mb-10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gold" /> Authorized Marketplace Purchasing
                  </h3>
                  <p className="text-xs text-gray-500 font-body mb-6 leading-relaxed">
                    To ensure premium quality and secure shipping, CEZLIAR products are sold exclusively through our official brand store listings on Amazon and Flipkart.
                  </p>
                  <div className={`grid grid-cols-1 ${amazonUrl && flipkartUrl ? 'sm:grid-cols-2' : ''} gap-4`}>
                    {amazonUrl && (
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#232F3E] hover:bg-black text-white py-4 px-6 rounded-2xl font-body text-xs font-bold uppercase tracking-widest transition-all shadow-md"
                      >
                        Buy on Amazon <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {flipkartUrl && (
                      <a
                        href={flipkartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#2874F0] hover:bg-[#1a5bbf] text-white py-4 px-6 rounded-2xl font-body text-xs font-bold uppercase tracking-widest transition-all shadow-md"
                      >
                        Buy on Flipkart <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-100 mb-10">
                <div className="flex items-center gap-2.5 text-xs md:text-sm text-gray-600 font-body">
                  <Shield className="w-5 h-5 text-gold shrink-0" /> Authentic Indian Heritage
                </div>
                <div className="flex items-center gap-2.5 text-xs md:text-sm text-gray-600 font-body">
                  <Truck className="w-5 h-5 text-gold shrink-0" /> Fast Marketplace Delivery
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-luxury border border-gold/5 mb-24">
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-gray-100 mb-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest relative transition-all shrink-0 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-text'}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 font-body leading-relaxed space-y-4"
                >
                  <p>{product.description}</p>
                  <p>
                    Every formulation under the CEZLIAR brand is processed under strict quality controls to ensure premium purity. We combine centuries-old extraction methodologies with scientific testing to achieve optimal longevity and sensory satisfaction.
                  </p>
                </motion.div>
              )}

              {activeTab === 'benefits' && (
                <motion.ul
                  key="benefits"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pl-2"
                >
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-body">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                >
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col pb-3 border-b border-gray-50">
                      <span className="text-[10px] font-bold uppercase text-gold tracking-widest mb-1.5">{key}</span>
                      <span className="text-gray-800 font-body font-semibold">{value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'applications' && (
                <motion.ul
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pl-2"
                >
                  {product.applications ? (
                    product.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-600 font-body">
                        <span className="w-6 h-6 rounded-full bg-section border border-gold/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{app}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 font-body italic">Application instructions will be updated soon.</li>
                  )}
                </motion.ul>
              )}

              {activeTab === 'faqs' && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {product.faqs && product.faqs.length > 0 ? (
                    product.faqs.map((faq, i) => (
                      <div key={i} className="p-6 bg-section rounded-2xl border border-gold/5">
                        <h4 className="font-heading font-bold text-primary text-base mb-2">Q: {faq.question}</h4>
                        <p className="text-gray-600 font-body text-sm leading-relaxed pl-5 border-l-2 border-gold/45">
                          A: {faq.answer}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 font-body italic">FAQs will be updated soon.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-gray-100">
            <div className="text-center mb-16">
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Similar Creations</span>
              <h2 className="text-3xl font-heading font-bold text-text mt-2 mb-4">You May Also Like</h2>
              <div className="w-16 h-1 bg-gold mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
