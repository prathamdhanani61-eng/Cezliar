'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Award, ChevronLeft, ChevronRight, Flower2, Headphones,
  Leaf, Play, ShieldCheck, Sparkles, Sprout, Star, Truck,
} from 'lucide-react';
import Link from 'next/link';
import GiftFinder from '../components/GiftFinder';
import testimonials from '../data/testimonials.json';
import { getProductUrl } from '../utils/product';

const HERO_SLIDES = [
  {
    eyebrow: 'ROOTED IN INDIA. CRAFTED FOR TODAY.',
    title: 'Fragrances for a more mindful world',
    description: 'Pure attars, refined home rituals and gifts that carry a story.',
    image: '/images/homepage-hero-v3.png',
    link: '/collections/fragrance-collection/attars',
    cta: 'Explore our collections',
  },
  {
    eyebrow: 'A QUIETER KIND OF RITUAL.',
    title: 'Bring calm into the everyday',
    description: 'Discover sandalwood dhoop and thoughtful fragrance for your home.',
    image: '/images/homepage-hero-dhoop-v3.png',
    link: '/collections/fragrance-collection/dhoop',
    cta: 'Explore dhoop',
  },
  {
    eyebrow: 'THOUGHTFUL CARE FOR MODERN LIVING.',
    title: 'Small rituals. A better home.',
    description: 'Explore considered water and home-care essentials from CEZLIAR.',
    image: '/images/homepage-hero-homecare-v3.png',
    link: '/collections/home-care-collection',
    cta: 'Explore home care',
  },
];

const COLLECTIONS = [
  { title: 'Attars', description: 'Rare scents. Timeless traditions.', image: '/images/products/HeroImg/Attar.png', href: '/collections/fragrance-collection/attars' },
  { title: 'Dhoop Rituals', description: 'Fragrance for everyday rituals.', image: '/images/products/HeroImg/Dhoop.png', href: '/collections/fragrance-collection/dhoop' },
  { title: 'Solid Perfumes', description: 'Personal fragrance, made portable.', image: '/images/products/SolidPerfumes/White-oudh/1.jpg', href: '/collections/fragrance-collection/solid-perfumes' },
  { title: 'Home & Water Care', description: 'Thoughtful care for modern homes.', image: '/images/products/water-filter.webp', href: '/collections/home-care-collection' },
];

const CATEGORY_LINKS = [
  { title: 'Attars', subCategory: 'Attar', href: '/collections/fragrance-collection/attars' },
  { title: 'Dhoop', subCategory: 'Dhoop', href: '/collections/fragrance-collection/dhoop' },
  { title: 'Solid Perfumes', subCategory: 'Solid Perfumes', href: '/collections/fragrance-collection/solid-perfumes' },
  { title: 'Drain Care', subCategory: 'Drain Opener', href: '/collections/home-care-collection/drain-cleaner' },
  { title: 'Water Filters', subCategory: 'Water Filter', href: '/collections/water-care-collection' },
  { title: 'PP Spun Filters', subCategory: 'PP Spun Filter', href: '/collections/water-care-collection/pp-spun-filter' },
  { title: 'Filter Candles', subCategory: 'Filter Candle', href: '/collections/water-care-collection/filter-candle' },
  { title: 'Accessories', subCategory: 'Accessories', href: '/collections/water-care-collection/accessories' },
];

const Home = ({ featuredProducts = [], allProducts = featuredProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    if (heroPaused) return undefined;
    const timer = window.setInterval(() => setCurrentSlide((index) => (index + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveReview((index) => (index + 1) % testimonials.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];
  const testimonialPosters = [
    '/images/products/Attar/MuskRijali/1.jpg',
    '/images/products/Dhoop/Sandalwood/1.jpg',
    '/images/products/SolidPerfumes/White-oudh/1.jpg',
  ];

  return (
    <div className="site-home homepage-reference-v3">
      <section
        className="home-hero-v3"
        style={{ '--home-hero-image': `url("${slide.image}")` }}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        aria-label="Featured CEZLIAR collections"
      >
        <div className="home-hero-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="home-hero-eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p className="home-hero-description">{slide.description}</p>
              <Link href={slide.link} className="home-primary-link">{slide.cta}<ArrowRight size={17} /></Link>
              <div className="home-hero-promises" aria-label="CEZLIAR values">
                <span><Sprout size={20} />Pure &amp; Natural<br />Ingredients</span>
                <span><Flower2 size={21} />Inspired by<br />Indian Heritage</span>
                <span><Leaf size={19} />Mindful Luxury<br />for Modern Living</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="home-hero-side-note" aria-hidden="true">ANCIENT<br />BOTANICALS<br />MODERN<br />RITUALS</div>
        <div className="home-hero-controls" aria-label="Hero slides">
          <div className="home-hero-dots">
            {HERO_SLIDES.map((item, index) => (
              <button key={item.title} type="button" aria-label={`Show ${item.title}`} aria-current={currentSlide === index ? 'true' : undefined} onClick={() => setCurrentSlide(index)} />
            ))}
          </div>
          <div className="home-hero-arrows">
            <button type="button" aria-label="Previous slide" onClick={() => setCurrentSlide((currentSlide + HERO_SLIDES.length - 1) % HERO_SLIDES.length)}><ChevronLeft size={16} /></button>
            <button type="button" aria-label="Next slide" onClick={() => setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="home-compact-products" aria-labelledby="home-featured-heading">
        <div className="home-rule-heading">
          <h2 id="home-featured-heading">Featured Products</h2><span />
          <Link href="/shop">View all <ArrowRight size={13} /></Link>
        </div>
        <div className="home-product-rail">
          {featuredProducts.slice(0, 5).map((product, index) => (
            <article className="home-mini-product" key={product.id}>
              <Link href={getProductUrl(product)} className="home-mini-product-image" aria-label={`View ${product.name}`}>
                {index === 0 && <span className="home-mini-badge">Bestseller</span>}
                <img src={product.image} alt={product.name} loading={index < 3 ? 'eager' : 'lazy'} />
              </Link>
              <div className="home-mini-product-copy">
                <Link href={getProductUrl(product)} className="home-mini-product-name">{product.name}</Link>
                <span className="home-mini-product-category">{product.subCategory}</span>
                <strong>₹{Number(product.price || 0).toLocaleString('en-IN')}</strong>
              </div>
              <Link className="home-mini-product-open" href={getProductUrl(product)} aria-label={`See ${product.name} details`}><ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-collections-v3" aria-labelledby="home-collections-heading">
        <div className="home-rule-heading">
          <h2 id="home-collections-heading">Explore Our Collections</h2><span />
          <Link href="/collections">View all <ArrowRight size={13} /></Link>
        </div>
        <div className="home-collection-grid">
          {COLLECTIONS.map((collection) => (
            <Link className="home-collection-banner" href={collection.href} key={collection.title}>
              <img src={collection.image} alt="" loading="lazy" />
              <span className="home-collection-shade" />
              <span className="home-collection-text"><strong>{collection.title}</strong><small>{collection.description}</small><em>Explore <ArrowRight size={12} /></em></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-discovery-row" aria-label="Shop by category and gift finder">
        <div className="home-categories-v3">
          <div className="home-rule-heading"><h2>Shop by Category</h2></div>
          <div className="home-category-circles">
            {CATEGORY_LINKS.map((category) => {
              const product = allProducts.find((item) => item.subCategory === category.subCategory);
              if (!product) return null;
              return (
                <Link href={category.href} className="home-category-circle" key={category.title}>
                  <span className="home-category-round-image"><img src={product.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></span>
                  <span>{category.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <Link href="/#gift-finder" className="home-gift-banner">
          <span className="home-gift-copy"><small>FIND THE PERFECT GIFT</small><strong>Curated ideas for every celebration.</strong><em>Gift finder <ArrowRight size={14} /></em></span>
        </Link>
      </section>

      <section className="home-testimonials-v3" aria-labelledby="home-testimonials-heading">
        <div className="home-rule-heading">
          <h2 id="home-testimonials-heading">What Our Customers Say</h2><span />
          <div className="home-testimonial-caption">Real stories. Lasting impressions.</div>
          <div className="home-testimonial-controls">
            <button type="button" aria-label="Previous testimonial" onClick={() => setActiveReview((activeReview + testimonials.length - 1) % testimonials.length)}><ChevronLeft size={14} /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => setActiveReview((activeReview + 1) % testimonials.length)}><ChevronRight size={14} /></button>
          </div>
        </div>
        <div className="home-testimonial-rail">
          {[0, 1, 2].map((offset) => {
            const storyIndex = (activeReview + offset) % testimonials.length;
            const story = testimonials[storyIndex];
            return (
              <article className="home-testimonial-card" key={`${story.id}-${offset}`}>
                <div className="home-testimonial-image">
                  <img src={testimonialPosters[storyIndex % testimonialPosters.length]} alt="CEZLIAR customer ritual product" loading="lazy" />
                  {story.videoUrl ? <video controls playsInline poster={story.poster}><source src={story.videoUrl} type="video/mp4" /></video> : <span className="home-video-pending"><Play size={17} /> Video story coming soon</span>}
                </div>
                <div className="home-testimonial-quote">
                  <p>“{story.review}”</p>
                  <div className="home-testimonial-person"><span>{story.name}</span><span className="home-testimonial-stars" aria-label={`${story.rating} out of 5 stars`}>{Array.from({ length: story.rating }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}</span></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-story-v3" aria-labelledby="home-story-heading">
        <div className="home-story-photo"><img src="/images/products/HeroImg/Attar.png" alt="CEZLIAR attar with oud botanicals" loading="lazy" /></div>
        <div className="home-story-copy">
          <span>OUR STORY</span>
          <h2 id="home-story-heading">Rooted in heritage.<br /><em>Made for today.</em></h2>
          <p>CEZLIAR brings Indian fragrance rituals and considered everyday care into modern homes.</p>
          <Link href="/about">Discover our story <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="home-promises-v3" aria-labelledby="home-promises-heading">
        <div className="home-rule-heading"><h2 id="home-promises-heading">The CEZLIAR Difference</h2><span /></div>
        <div className="home-promise-list">
          {[
            { icon: Sprout, title: 'Thoughtful ingredients', description: 'Clear product information and considered formulations.' },
            { icon: Award, title: 'Crafted with care', description: 'Products inspired by Indian fragrance and home rituals.' },
            { icon: ShieldCheck, title: 'Shop with confidence', description: 'Explore CEZLIAR products and our authorized marketplace listings.' },
            { icon: Headphones, title: 'Here to help', description: 'Our team can help you find a product or plan a gift.' },
          ].map(({ icon: Icon, title, description }) => (
            <article className="home-promise-item" key={title}><Icon size={21} /><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <GiftFinder products={allProducts} />
    </div>
  );
};

export default Home;
