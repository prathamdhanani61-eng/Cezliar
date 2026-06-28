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
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center bg-gradient-to-br from-section to-background pt-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[70%] rounded-full bg-gold/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[70%] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Hero Content */}
                <div className="lg:col-span-7 max-w-2xl">
                  <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" /> {heroSlides[currentSlide].title}
                  </h2>
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-text leading-tight mb-6">
                    {heroSlides[currentSlide].headline.split(' ').map((word, i) => (
                      i === 2 || i === 3 ? <span key={i} className="text-primary italic block md:inline">{word} </span> : <span key={i}>{word} </span>
                    ))}
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 mb-8 font-body leading-relaxed max-w-xl">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to={heroSlides[currentSlide].link}>
                      <Button variant="primary" size="lg" className="group">
                        View Product
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/shop">
                      <Button variant="outline" size="lg">
                        Shop Collection
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="lg:col-span-5 flex justify-center items-center h-[350px] md:h-[450px]">
                  <motion.img
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-contain filter drop-shadow-2xl max-w-[400px] lg:max-w-none"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-[-40px] md:bottom-0 left-0 right-0 flex justify-between items-center z-20">
              <div className="flex gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-8' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevSlide}
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collections Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Curated Selections</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">Our Premium Collections</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Exquisite Attars",
                desc: "Alcohol-free concentrated fragrances",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F8F6F1'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Cpath d='M160,180 L240,180 L230,380 L170,380 Z' fill='%23C9A227' fill-opacity='0.2'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%230F4D3C' text-anchor='middle'%3EATTAR%3C/text%3E%3C/svg%3E",
                path: "/fragrance-world/attar"
              },
              {
                title: "Spiritual Dhoop",
                desc: "Charcoal-free purifying sticks",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F4EFE6'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%23C9A227' fill-opacity='0.05'/%3E%3Crect x='190' y='180' width='20' height='180' fill='%230F4D3C' fill-opacity='0.2' rx='3'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%23C9A227' text-anchor='middle'%3EDHOOP%3C/text%3E%3C/svg%3E",
                path: "/fragrance-world/dhoop"
              },
              {
                title: "Pristine Water Care",
                desc: "Alkaline multi-stage filtration",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F8F6F1'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Crect x='160' y='160' width='80' height='180' fill='%232D2D2D' fill-opacity='0.15' rx='5'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%232D2D2D' text-anchor='middle'%3EFILTERS%3C/text%3E%3C/svg%3E",
                path: "/home-care/water-filter"
              },
              {
                title: "Pro Home Care",
                desc: "Heavy-duty safe drain openers",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23F4EFE6'/%3E%3Ccircle cx='200' cy='250' r='120' fill='%23C9A227' fill-opacity='0.05'/%3E%3Cpath d='M150,150 L250,150 L230,350 L170,350 Z' fill='%230F4D3C' fill-opacity='0.2'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%230F4D3C' text-anchor='middle'%3EHOME CARE%3C/text%3E%3C/svg%3E",
                path: "/home-care/drain-opener"
              }
            ].map((col, i) => (
              <Link key={i} to={col.path} className="group cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-section rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-gold/5 hover:border-gold/20 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-background">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>
                  <div className="p-6 text-center mt-auto bg-white">
                    <h3 className="text-lg font-heading font-bold text-text group-hover:text-primary transition-colors mb-1">{col.title}</h3>
                    <p className="text-xs text-gray-500 font-body mb-4">{col.desc}</p>
                    <span className="text-xs font-bold text-gold uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-section relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Chosen by Connoisseurs</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">Our Best Sellers</h2>
              <div className="w-20 h-1 bg-gold"></div>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="border-text text-text hover:bg-primary hover:border-primary hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative aspect-[4/5] md:max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-luxury border border-gold/10"
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23F4EFE6'/%3E%3Cpath d='M100,100 L700,100 L700,900 L100,900 Z' fill='none' stroke='%23C9A227' stroke-width='4' stroke-opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='40' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3ECEZLIAR HERITAGE%3C/text%3E%3C/svg%3E"
                alt="CEZLIAR Brand Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Our Heritage</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-6">Bridging Royal Tradition & Modern Precision</h2>
              <div className="w-20 h-1 bg-gold mb-8"></div>
              <p className="text-lg text-gray-700 font-body leading-relaxed mb-6">
                Born in the royal perfume heartlands of India, **CEZLIAR** represents an unwavering commitment to sensory perfection. We combine generations-old hydro-distillation craftsmanship with modern, non-toxic chemical formulations.
              </p>
              <p className="text-base text-gray-500 font-body leading-relaxed mb-8">
                From luxury concentrated perfume oils (attars) aged to woody maturity, to high-performance home care products engineered to protect your households, CEZLIAR represents a premium lifestyle where purity, beauty, and safety are non-negotiable.
              </p>
              <div>
                <Link to="/about">
                  <Button variant="primary" size="lg" className="group">
                    Explore Brand Story
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (6 Icons) */}
      <section className="py-24 bg-section relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">The Cezliar Standard</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">Crafted for Excellence</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-3xl shadow-luxury hover:shadow-luxury-hover border border-gold/5 hover:border-gold/15 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-section flex items-center justify-center mb-6 text-primary border border-gold/10">
                  <promise.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-heading font-bold text-text mb-3">{promise.title}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{promise.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Patron Stories</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center bg-section rounded-3xl p-8 md:p-16 border border-gold/10 relative"
              >
                <Quote className="w-16 h-16 text-gold/20 mx-auto mb-6" />
                <p className="text-lg md:text-2xl font-heading italic text-text leading-relaxed mb-8">
                  "{testimonials[activeReview].review}"
                </p>
                <div className="flex justify-center text-gold mb-4">
                  {[...Array(testimonials[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <h4 className="font-heading font-bold text-primary text-lg">{testimonials[activeReview].name}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-body mt-1">
                  {testimonials[activeReview].role} — {testimonials[activeReview].location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeReview === idx ? 'bg-primary w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Grid Section */}
      <section className="py-24 bg-section relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Social Presence</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">Immerse in Our Lifestyle</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Attar Distillation", bg: "bg-primary/20", label: "@cezliar.luxury" },
              { title: "Sandalwood Woods", bg: "bg-gold/20", label: "@cezliar.spiritual" },
              { title: "Pure Hydration", bg: "bg-primary/10", label: "@cezliar.home" },
              { title: "Premium Living", bg: "bg-gold/10", label: "@cezliar.standard" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="aspect-square bg-white rounded-3xl overflow-hidden shadow-luxury border border-gold/10 flex flex-col items-center justify-center p-6 relative cursor-pointer group"
              >
                <div className={`absolute inset-0 ${item.bg} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />
                <h3 className="font-heading font-bold text-text text-lg z-10 text-center mb-2">{item.title}</h3>
                <span className="text-xs text-gold font-semibold uppercase tracking-widest z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Join the Cezliar Circle</h2>
            <p className="text-base md:text-lg text-white/80 mb-10 font-body max-w-xl mx-auto">
              Subscribe to receive private seasonal offerings, early invitations to new fragrance rollouts, and stories from our botanical fields.
            </p>

            <AnimatePresence mode="wait">
              {!emailSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold w-full sm:w-96 backdrop-blur-sm transition-colors"
                  />
                  <Button variant="gold" type="submit" className="py-4 px-10 rounded-xl font-bold uppercase tracking-wider">
                    Subscribe
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 border border-gold/30 rounded-2xl p-6 inline-block backdrop-blur-sm"
                >
                  <h3 className="text-xl font-heading font-bold text-gold mb-2">Welcome to the Circle</h3>
                  <p className="text-sm text-white/80">Thank you for subscribing. We will contact you soon with exclusive news.</p>
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
