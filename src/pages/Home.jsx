import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Award, Lock, Truck, Headphones, Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import testimonials from '../data/testimonials.json';
import { useSEO } from '../hooks/useSEO';

const Home = () => {
  useSEO({
    title: 'Premium Luxury Fragrance & Home Care',
    description: 'Experience pure luxury with CEZLIAR. Discover our alcohol-free Oud Majestic Attar, organic Sandalwood Dhoop, and high-performance, non-toxic Home Care solutions.'
  });
  const products = getProducts();
  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  // Hero Section Slides
  const heroSlides = [
    {
      title: "Oud Majestic Attar",
      subtitle: "Fragrance World",
      headline: "The Essence of Pure Luxury",
      description: "Indulge in our concentrated, alcohol-free Oud Majestic Attar, hand-distilled from the oldest agarwood forests of India.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='transparent'/%3E%3Ccircle cx='300' cy='300' r='220' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Cpath d='M220,120 L380,120 L360,420 L240,420 Z' fill='%23C9A227' fill-opacity='0.15' stroke='%23C9A227' stroke-width='2'/%3E%3Cpath d='M270,120 L330,120 L310,70 L290,70 Z' fill='%230F4D3C' fill-opacity='0.2' stroke='%230F4D3C' stroke-width='2'/%3E%3Ctext x='50%25' y='52%25' font-family='Playfair Display' font-size='22' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR OUD%3C/text%3E%3Ctext x='50%25' y='57%25' font-family='sans-serif' font-size='12' fill='%232D2D2D' text-anchor='middle' font-weight='300'%3E12ml e 0.4 FL.OZ.%3C/text%3E%3C/svg%3E",
      link: "/product/attar-1"
    },
    {
      title: "Premium Sandalwood Dhoop",
      subtitle: "Fragrance World",
      headline: "Purity & Serenity in the Air",
      description: "Experience the soothing, charcoal-free calming effects of Mysore Sandalwood paste, crafted to cleanse minds and spaces.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='transparent'/%3E%3Ccircle cx='300' cy='300' r='220' fill='%23C9A227' fill-opacity='0.05'/%3E%3Cg fill='%230F4D3C' fill-opacity='0.15' stroke='%230F4D3C' stroke-width='2'%3E%3Cpath d='M250,220 C250,150 280,180 300,100 C320,180 350,150 350,220 C350,300 250,300 250,220 Z'/%3E%3Crect x='285' y='280' width='30' height='180' rx='5'/%3E%3C/g%3E%3Ctext x='50%25' y='80%25' font-family='Playfair Display' font-size='20' fill='%23C9A227' text-anchor='middle' font-weight='bold'%3ENATURAL DHOOP%3C/text%3E%3C/svg%3E",
      link: "/product/dhoop-1"
    },
    {
      title: "Advanced Aqua Filter",
      subtitle: "Home Care",
      headline: "Pristine Hydration for Family",
      description: "A compact 9-stage alkaline under-sink filter system that restores key natural minerals while filtering out 99.9% of impurities.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='transparent'/%3E%3Ccircle cx='300' cy='300' r='220' fill='%230F4D3C' fill-opacity='0.03'/%3E%3Cg fill='%232D2D2D' fill-opacity='0.1' stroke='%232D2D2D' stroke-width='2'%3E%3Crect x='220' y='180' width='160' height='260' rx='10'/%3E%3Crect x='250' y='150' width='100' height='30' rx='5'/%3E%3Ccircle cx='300' cy='250' r='20' fill='%230F4D3C' fill-opacity='0.2'/%3E%3C/g%3E%3Ctext x='50%25' y='65%25' font-family='sans-serif' font-size='18' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3EAQUA FILTER%3C/text%3E%3C/svg%3E",
      link: "/product/filter-1"
    },
    {
      title: "Pro Drain Opener",
      subtitle: "Home Care",
      headline: "High Performance Care",
      description: "Clear clogged plumbing systems safely and rapidly. Our active alkaline gel dissolves hair and grease in minutes with zero harsh odors.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='transparent'/%3E%3Ccircle cx='300' cy='300' r='220' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Cg fill='%230F4D3C' fill-opacity='0.15' stroke='%230F4D3C' stroke-width='2'%3E%3Cpath d='M230,150 L370,150 L350,420 C350,450 250,450 250,420 Z'/%3E%3C/g%3E%3Ctext x='50%25' y='52%25' font-family='Playfair Display' font-size='22' fill='%23C9A227' text-anchor='middle' font-weight='bold'%3EPRO DRAIN%3C/text%3E%3C/svg%3E",
      link: "/product/drain-1"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  // Auto-slide Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-slide Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setEmailSubmitted(true);
      setEmail('');
    }
  };

  // Animation constants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-gradient-to-b from-section via-background to-background pt-28 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute bottom-[5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Hero Content */}
                <div className="lg:col-span-7 max-w-2xl text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gold font-semibold uppercase tracking-[0.25em] text-[10px] md:text-xs">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                    <span className="w-8 h-[1px] bg-gold/45"></span>
                  </div>
                  
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" /> {heroSlides[currentSlide].title}
                  </h2>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-[70px] font-heading font-normal text-text leading-[1.1] mb-6">
                    {heroSlides[currentSlide].headline.split(' ').map((word, i, arr) => (
                      // Highlight the last words in italic primary color
                      i >= arr.length - 2 ? 
                        <span key={i} className="text-primary italic font-light block md:inline">{word} </span> : 
                        <span key={i} className="font-semibold">{word} </span>
                    ))}
                  </h1>
                  
                  <p className="text-sm md:text-base text-gray-500 mb-10 font-body leading-relaxed max-w-lg">
                    {heroSlides[currentSlide].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link to={heroSlides[currentSlide].link}>
                      <Button variant="primary" size="lg">
                        View Product
                        <ArrowRight className="ml-2.5 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/shop">
                      <Button variant="outline" size="lg">
                        Shop Collection
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hero Image Framed */}
                <div className="lg:col-span-5 flex justify-center items-center h-[350px] md:h-[480px] relative">
                  <div className="absolute inset-0 border border-gold/10 scale-95 pointer-events-none" />
                  <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-contain filter drop-shadow-2xl max-w-[320px] md:max-w-[420px] lg:max-w-none relative z-10"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-[-60px] md:bottom-[-20px] left-0 right-0 flex justify-between items-center z-20">
              <div className="flex gap-3">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-[2px] transition-all duration-500 ${currentSlide === idx ? 'bg-primary w-12' : 'bg-gray-300 w-6'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrevSlide}
                  className="w-11 h-11 border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-11 h-11 border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Collections Section */}
      <section className="py-32 md:py-44 bg-white relative border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div {...fadeInUp} className="text-center mb-20 md:mb-28">
            <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">Curated Selections</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-5">Shop By Collections</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Exquisite Attars",
                desc: "Alcohol-free concentrated fragrances",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F8F6F1'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Cpath d='M160,180 L240,180 L230,380 L170,380 Z' fill='%23C9A227' fill-opacity='0.2'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%230F4D3C' text-anchor='middle'%3EATTAR%3C/text%3E%3C/svg%3E",
                path: "/collections/fragrance-collection/attars"
              },
              {
                title: "Spiritual Dhoop",
                desc: "Charcoal-free purifying sticks",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F4EFE6'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%23C9A227' fill-opacity='0.05'/%3E%3Crect x='190' y='180' width='20' height='180' fill='%230F4D3C' fill-opacity='0.2' rx='3'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%23C9A227' text-anchor='middle'%3EDHOOP%3C/text%3E%3C/svg%3E",
                path: "/collections/fragrance-collection/dhoop"
              },
              {
                title: "Pristine Water Care",
                desc: "Alkaline multi-stage filtration",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F8F6F1'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Crect x='160' y='160' width='80' height='180' fill='%232D2D2D' fill-opacity='0.15' rx='5'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%232D2D2D' text-anchor='middle'%3EFILTERS%3C/text%3E%3C/svg%3E",
                path: "/collections/water-care-collection"
              },
              {
                title: "Pro Home Care",
                desc: "Heavy-duty safe drain openers",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F4EFE6'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%23C9A227' fill-opacity='0.05'/%3E%3Cpath d='M150,150 L250,150 L230,350 L170,350 Z' fill='%230F4D3C' fill-opacity='0.2'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%230F4D3C' text-anchor='middle'%3EHOME CARE%3C/text%3E%3C/svg%3E",
                path: "/collections/home-care-collection/drain-cleaner"
              }
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[3/4.2] overflow-hidden bg-section border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-luxury"
              >
                {/* Background Image Zoom */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1200ms] ease-[0.16, 1, 0.3, 1]"
                  />
                  {/* Subtle luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 text-left">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-[0.25em] mb-2 block">
                    Collection
                  </span>
                  <h3 className="text-xl font-heading font-medium text-white mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                    {col.title}
                  </h3>
                  <p className="text-xs text-white/70 font-body mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {col.desc}
                  </p>
                  <Link to={col.path} className="inline-block">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border-b border-gold/0 group-hover:border-gold/60 pb-1 transition-all duration-300">
                      Explore Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="py-32 md:py-44 bg-section relative border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
            {...fadeInUp} 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8"
          >
            <div className="text-left">
              <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">Chosen by Connoisseurs</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-5">Our Best Sellers</h2>
              <div className="w-16 h-[1px] bg-gold"></div>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="border-text text-text hover:bg-primary hover:border-primary hover:text-white">
                View All Products
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Story Section */}
      <section className="py-32 md:py-44 bg-white relative overflow-hidden border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Image with Luxury Border Frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative aspect-[4/5] md:max-w-md mx-auto lg:max-w-none p-4 border border-gold/10 bg-section/30 shadow-luxury"
            >
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold/20 pointer-events-none z-10" />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23F4EFE6'/%3E%3Cpath d='M100,100 L700,100 L700,900 L100,900 Z' fill='none' stroke='%23C9A227' stroke-width='4' stroke-opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='40' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR HERITAGE%3C/text%3E%3C/svg%3E"
                alt="CEZLIAR Brand Heritage"
                className="w-full h-full object-cover filter brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center text-left lg:pl-6"
            >
              <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">Our Heritage</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-6">Bridging Royal Tradition & Modern Precision</h2>
              <div className="w-16 h-[1px] bg-gold mb-8"></div>
              <p className="text-sm md:text-base text-gray-600 font-body leading-relaxed mb-6">
                Born in the royal perfume heartlands of India, <strong className="text-primary font-semibold font-body">CEZLIAR</strong> represents an unwavering commitment to sensory perfection. We combine generations-old hydro-distillation craftsmanship with modern, non-toxic chemical formulations.
              </p>
              <p className="text-sm text-gray-500 font-body leading-relaxed mb-10">
                From luxury concentrated perfume oils (attars) aged to woody maturity, to high-performance home care products engineered to protect your households, CEZLIAR represents a premium lifestyle where purity, beauty, and safety are non-negotiable.
              </p>
              <div>
                <Link to="/about">
                  <Button variant="primary" size="lg">
                    Explore Brand Story
                    <ArrowRight className="ml-2.5 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose CEZLIAR Section */}
      <section className="py-32 md:py-44 bg-section relative border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div {...fadeInUp} className="text-center mb-20 md:mb-28">
            <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">The Cezliar Standard</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-5">Crafted for Excellence</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Award, title: "Premium Quality", desc: "Formulated only with the rarest ingredients, aged woods, and certified active agents." },
              { icon: ShieldCheck, title: "Trusted Brand", desc: "Delighting thousands of families across India with pure, premium sensory and home solutions." },
              { icon: Lock, title: "Secure Marketplace", desc: "Shop securely via authorized marketplace listings on Amazon & Flipkart with full brand warranty." },
              { icon: Truck, title: "Fast Delivery", desc: "Dispatched from regional hubs with high-priority tracking to arrive at your door within 2-4 days." },
              { icon: Sparkles, title: "Made in India", desc: "Honoring traditional Indian distillation arts while adhering to top global standards." },
              { icon: Headphones, title: "Dedicated Support", desc: "Our concierge team is at your service 7 days a week to handle questions, usage queries, or returns." }
            ].map((promise, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/45 backdrop-blur-sm p-8 rounded-none border border-gold/15 hover:border-gold/35 hover:bg-white hover:shadow-luxury transition-all duration-550 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-none bg-background flex items-center justify-center mb-6 text-primary border border-gold/15">
                  <promise.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-bold text-text mb-3">{promise.title}</h3>
                <p className="text-xs text-gray-500 font-body leading-relaxed max-w-xs">{promise.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials Section */}
      <section className="py-32 md:py-44 bg-white relative overflow-hidden border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div {...fadeInUp} className="text-center mb-20 md:mb-28">
            <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">Patron Stories</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-5">What Our Clients Say</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto relative px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center bg-section/40 rounded-none p-10 md:p-20 border border-gold/15 relative"
              >
                <Quote className="w-14 h-14 text-gold/15 mx-auto mb-8" />
                <p className="text-lg md:text-2xl font-heading italic font-light text-text leading-relaxed mb-10 max-w-2xl mx-auto">
                  "{testimonials[activeReview].review}"
                </p>
                <div className="flex justify-center text-gold mb-5 gap-0.5">
                  {[...Array(testimonials[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-heading font-bold text-primary text-base tracking-wider">{testimonials[activeReview].name}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-body mt-1">
                  {testimonials[activeReview].role} — {testimonials[activeReview].location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`h-[2px] transition-all duration-300 ${activeReview === idx ? 'bg-primary w-8' : 'bg-gray-300 w-4'}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Lifestyle Gallery Section */}
      <section className="py-32 md:py-44 bg-section relative border-b border-gold/10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div {...fadeInUp} className="text-center mb-20 md:mb-28">
            <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs">Social Presence</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-3 mb-5">Immerse in Our Lifestyle</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Attar Distillation", bg: "bg-primary/20", label: "@cezliar.luxury" },
              { title: "Sandalwood Woods", bg: "bg-gold/20", label: "@cezliar.spiritual" },
              { title: "Pure Hydration", bg: "bg-primary/10", label: "@cezliar.home" },
              { title: "Premium Living", bg: "bg-gold/10", label: "@cezliar.standard" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="aspect-square bg-white rounded-none overflow-hidden shadow-luxury border border-gold/10 flex flex-col items-center justify-center p-8 relative cursor-pointer group"
              >
                <div className={`absolute inset-0 ${item.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-4 border border-gold/5 group-hover:border-gold/20 transition-all duration-500 pointer-events-none" />
                <h3 className="font-heading font-bold text-text text-base md:text-lg z-10 text-center mb-2 transform group-hover:scale-95 transition-transform duration-500">{item.title}</h3>
                <span className="text-[10px] text-gold font-semibold uppercase tracking-[0.2em] z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section className="py-32 md:py-44 bg-primary text-white relative overflow-hidden">
        {/* Subtle Textured Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-[#082C22] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <motion.div {...fadeInUp}>
              <span className="text-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-4 block">The Cezliar Club</span>
              <h2 className="text-3xl md:text-5xl font-heading font-normal mb-6 text-white leading-tight">Join the Cezliar Circle</h2>
              <p className="text-sm md:text-base text-white/70 mb-12 font-body max-w-xl mx-auto leading-relaxed">
                Subscribe to receive private seasonal offerings, early invitations to new fragrance rollouts, and stories from our botanical fields.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!emailSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-0 items-stretch justify-center max-w-xl mx-auto border-b border-white/20 pb-2 focus-within:border-gold transition-colors duration-300"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-4 py-4 bg-transparent text-white placeholder:text-white/40 focus:outline-none w-full font-body text-sm"
                  />
                  <Button variant="gold" type="submit" className="py-4 px-8 font-semibold uppercase tracking-wider shrink-0 text-xs">
                    Subscribe
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-gold/20 rounded-none p-8 inline-block backdrop-blur-md max-w-md"
                >
                  <h3 className="text-lg font-heading font-medium text-gold mb-2">Welcome to the Circle</h3>
                  <p className="text-xs text-white/75 font-body leading-relaxed">Thank you for subscribing. We will contact you soon with exclusive news and botanical updates.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
