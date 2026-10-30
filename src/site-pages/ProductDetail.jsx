'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Truck, Sparkles, ArrowUpRight, ArrowLeft, ChevronDown,
  Star, Leaf, Droplets, Clock, MapPin, Heart,
  CheckCircle, Package, RotateCcw, Phone, Quote
} from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import ProductShareButton from '../components/ProductShareButton';
import { formatMarketplaceUrl } from '../utils/url';

const ProductDetail = ({ product, relatedProducts = [] }) => {
  const id = product.id;
  const [activeTab, setActiveTab] = useState('description');
  const [showMarketplaces, setShowMarketplaces] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveTab('description');
    setShowMarketplaces(false);
  }, [id]);

  const amazonUrl = product ? formatMarketplaceUrl(product.amazon) : '';
  const flipkartUrl = product ? formatMarketplaceUrl(product.flipkart) : '';


  if (!product) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-4xl font-heading font-bold mb-4 text-primary">Product Not Found</h1>
        <p className="mb-8 text-gray-500 font-body">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/shop"><Button variant="primary">Return to Shop</Button></Link>
      </div>
    );
  }

  const collectionHref = product.mainCategory === 'Fragrance World'
    ? '/collections/fragrance-collection'
    : product.subCategory === 'Drain Opener'
      ? '/collections/home-care-collection'
      : '/collections/water-care-collection';

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'how-to-use', label: 'How To Use' },
    { id: 'faqs', label: 'FAQs' },
  ];

  // Feature icons based on product category
  const getFeatureIcons = () => {
    const isFragrance = product.mainCategory === 'Fragrance World';
    if (isFragrance) {
      return [
        { icon: Leaf, label: 'Alcohol Free' },
        { icon: Clock, label: 'Long Lasting' },
        { icon: MapPin, label: 'Made in India' },
        { icon: Sparkles, label: 'Premium Oils' },
      ];
    }
    return [
      { icon: Shield, label: 'Non Toxic' },
      { icon: CheckCircle, label: 'Lab Tested' },
      { icon: MapPin, label: 'Made in India' },
      { icon: Sparkles, label: 'Premium Grade' },
    ];
  };

  const featureIcons = getFeatureIcons();

  // Simulated reviews for product page
  const productReviews = [
    { name: 'Aishwarya S.', location: 'Mumbai', rating: 5, review: 'Absolutely divine! The fragrance lasts all day and feels extremely premium. My go-to luxury gift.', date: '2 days ago' },
    { name: 'Rajesh K.', location: 'Delhi', rating: 5, review: 'Exceptional quality. Exactly as described — pure, concentrated and long-lasting. Highly recommend!', date: '1 week ago' },
  ];

  const errorImgSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F4EFE6'/%3E%3Ctext x='50%25' y='50%25' font-family='Playfair Display' font-size='32' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR%3C/text%3E%3C/svg%3E";

  return (
    <div className="site-page-top product-detail-page bg-background min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-5 md:px-10 lg:px-12 py-3.5">
          <nav className="flex items-center text-xs font-body text-gray-400 flex-wrap gap-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-300 mx-1">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-gray-300 mx-1">/</span>
            <Link href={collectionHref} className="hover:text-primary transition-colors capitalize">{product.subCategory}</Link>
            <span className="text-gray-300 mx-1">/</span>
            <span className="text-text font-semibold line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-10 lg:px-12 py-10 md:py-14">

        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>

        {/* ─────────────────────────────────────────
            PRODUCT MAIN SECTION
        ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 mb-16 md:mb-24 items-start">

          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative bg-white border border-gold/10 shadow-luxury-card flex items-center justify-center overflow-hidden"
              style={{ aspectRatio: '1/1', maxHeight: '560px' }}>
              {/* Badges */}
              <div className="badge-stack">
                {product.isBestSeller && <span className="bg-gold text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">Bestseller</span>}
                {product.isNewArrival && <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">New</span>}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border transition-all duration-300 ${wishlist ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-gold/40 hover:text-gold'}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist ? 'fill-current' : ''}`} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  src={productImages[activeImageIndex]}
                  alt={`${product.name} — Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain p-8 md:p-12 hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  onError={(e) => { e.target.onerror = null; e.target.src = errorImgSvg; }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white border-2 p-1.5 flex items-center justify-center overflow-hidden transition-all duration-300 ${activeImageIndex === idx ? 'border-gold shadow-luxury-card' : 'border-gray-100 hover:border-gold/50'}`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F4EFE6'/%3E%3C/svg%3E"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Category tags */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-bold text-gold uppercase tracking-[0.2em] bg-gold/10 px-3 py-1">{product.mainCategory}</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/8 px-3 py-1">{product.subCategory}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating + review count */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-gold fill-current" />)}
              </div>
              <span className="text-xs text-gray-500 font-body">(4.9) · 128 Reviews</span>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                In Stock
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-400 font-body">Inclusive of all taxes</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs text-gray-500 font-body">Premium Brand Formulation · Authorized Listing</span>
              </div>
            </div>

            {/* Short description */}
            <p className="text-gray-600 font-body leading-relaxed mb-6 text-sm md:text-base">
              {product.description}
            </p>
            <div className="mb-6"><ProductShareButton product={product} /></div>

            {/* Feature Icons */}
            <div className="grid grid-cols-4 gap-3 mb-7 py-5 border-y border-gold/10">
              {featureIcons.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-10 h-10 bg-section border border-gold/15 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.1em] leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Marketplace Purchase Box */}
            {(amazonUrl || flipkartUrl) && (
              <div className="bg-section border border-gold/15 p-5 md:p-6 mb-6">
                <div className="flex items-start gap-2.5 mb-4">
                  <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-0.5">Authorized Marketplace Purchasing</h3>
                    <p className="text-[10px] text-gray-500 font-body leading-relaxed">
                      CEZLIAR products are sold exclusively through our official brand listings on Amazon and Flipkart for guaranteed quality.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowMarketplaces(!showMarketplaces)}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                >
                  <span>Buy Now</span>
                  <motion.span
                    animate={{ rotate: showMarketplaces ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showMarketplaces && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {amazonUrl ? (
                          <a href={amazonUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#232F3E] hover:bg-black text-white py-3.5 text-xs font-bold uppercase tracking-wider transition-all">
                            Amazon <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button disabled className="bg-gray-100 text-gray-400 py-3.5 text-xs font-bold uppercase tracking-wider opacity-60 cursor-not-allowed">
                            Amazon (N/A)
                          </button>
                        )}
                        {flipkartUrl ? (
                          <a href={flipkartUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#2874F0] hover:bg-[#1a5bbf] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition-all">
                            Flipkart <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button disabled className="bg-gray-100 text-gray-400 py-3.5 text-xs font-bold uppercase tracking-wider opacity-60 cursor-not-allowed">
                            Flipkart (N/A)
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Trust Row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: 'Fast Delivery 2–4 Days' },
                { icon: Shield, text: 'Authentic Brand Guarantee' },
                { icon: RotateCcw, text: 'Hassle-free Returns' },
                { icon: Package, text: 'Secure Premium Packaging' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-body">
                  <Icon className="w-4 h-4 text-gold shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────
            PRODUCT INFO TABS
        ───────────────────────────────────────── */}
        <div className="bg-white border border-gold/8 shadow-luxury-card mb-16 md:mb-24">
          {/* Tab Navigation */}
          <div className="flex gap-0 border-b border-gray-100 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 md:px-7 py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] relative transition-all shrink-0 ${
                  activeTab === tab.id ? 'text-primary bg-section/50' : 'text-gray-400 hover:text-text hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10 min-h-[200px]">
            <AnimatePresence mode="wait">

              {activeTab === 'description' && (
                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="text-gray-600 font-body leading-relaxed mb-4 text-sm md:text-base">{product.description}</p>
                  <p className="text-gray-500 font-body leading-relaxed text-sm">
                    Every CEZLIAR formulation is processed under strict quality controls to ensure premium purity. We combine centuries-old extraction methodologies with scientific testing to achieve optimal longevity and sensory satisfaction.
                  </p>
                </motion.div>
              )}

              {activeTab === 'benefits' && (
                <motion.div key="benefits" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits?.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-section/50 border border-gold/10">
                        <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-gold" />
                        </div>
                        <p className="text-sm text-gray-600 font-body leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-100">
                    {Object.entries(product.specifications || {}).map(([key, value], i) => (
                      <div key={key} className={`flex gap-4 p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-section/30'} border-b border-gray-50`}>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold min-w-[120px] shrink-0">{key}</span>
                        <span className="text-sm text-gray-700 font-body font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'how-to-use' && (
                <motion.div key="howto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  {product.applications && product.applications.length > 0 ? (
                    <div className="space-y-4">
                      {product.applications.map((app, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-section/40 border border-gold/8">
                          <div className="w-7 h-7 shrink-0 bg-primary text-white flex items-center justify-center text-xs font-bold font-body">
                            {i + 1}
                          </div>
                          <p className="text-sm text-gray-600 font-body leading-relaxed pt-0.5">{app}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic font-body text-sm">Application instructions will be updated soon.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'faqs' && (
                <motion.div key="faqs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  {product.faqs && product.faqs.length > 0 ? (
                    <div className="space-y-0">
                      {product.faqs.map((faq, i) => (
                        <div key={i} className="py-5 border-b border-gray-100 last:border-0">
                          <h4 className="font-heading font-bold text-primary text-sm mb-2 flex items-start gap-2">
                            <span className="text-gold font-bold shrink-0">Q.</span> {faq.question}
                          </h4>
                          <p className="text-sm text-gray-600 font-body leading-relaxed pl-5 border-l-2 border-gold/40">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic font-body text-sm">FAQs will be updated soon.</p>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            CUSTOMER REVIEWS SECTION
        ───────────────────────────────────────── */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8">
            <span className="section-label">Customer Feedback</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mb-2">Customer Reviews</h2>
            <span className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating summary */}
            <div className="bg-white border border-gold/10 p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-heading font-bold text-primary mb-2">4.9</span>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold fill-current" />)}
              </div>
              <span className="text-xs text-gray-500 font-body">Based on 128 verified reviews</span>

              {/* Rating bars */}
              <div className="w-full mt-6 space-y-2">
                {[5,4,3,2,1].map((stars, i) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-3">{stars}</span>
                    <Star className="w-3 h-3 text-gold fill-current shrink-0" />
                    <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full" style={{ width: `${[85, 10, 3, 1, 1][i]}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-400 w-6">{[85, 10, 3, 1, 1][i]}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            <div className="md:col-span-2 space-y-4">
              {productReviews.map((r, i) => (
                <div key={i} className="bg-white border border-gray-100 hover:border-gold/20 p-5 md:p-6 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-gold fill-current" />)}
                      </div>
                      <h5 className="font-heading font-bold text-text text-sm">{r.name}</h5>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider">{r.location} · {r.date}</span>
                    </div>
                    <div className="w-8 h-8 bg-section border border-gold/15 flex items-center justify-center text-gold/30">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-body leading-relaxed">{r.review}</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] text-green-600 font-semibold">Verified Purchase</span>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <a href={amazonUrl || flipkartUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-gold hover:text-primary uppercase tracking-[0.15em] transition-colors inline-flex items-center gap-1.5">
                  View All Reviews on Marketplace <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            RELATED PRODUCTS
        ───────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-gray-100">
            <div className="text-center mb-12 md:mb-16">
              <span className="section-label">Similar Creations</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mt-1 mb-3">You May Also Like</h2>
              <span className="divider-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Sticky Mobile Buy Bar ── */}
      {(amazonUrl || flipkartUrl) && (
        <div className="sticky-atc md:hidden flex gap-2">
          {amazonUrl && (
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#232F3E] text-white py-3 text-[10px] font-bold uppercase tracking-wider">
              Buy on Amazon
            </a>
          )}
          {flipkartUrl && (
            <a href={flipkartUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#2874F0] text-white py-3 text-[10px] font-bold uppercase tracking-wider">
              Buy on Flipkart
            </a>
          )}
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
