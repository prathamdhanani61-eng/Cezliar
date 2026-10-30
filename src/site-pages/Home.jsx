import HeroBento from '../components/home/HeroBento';
import FeaturedProducts from '../components/home/FeaturedProducts';
import {
  AboutSection, Bestsellers, CategoryCards, CollectionsSection, Marquee, Testimonials, WhyCezliar,
} from '../components/home/HomeSections';
import { cardsByIds, getProductById, products, toProductCard } from '../data/products';
import { COLLECTIONS } from '../data/categories';
import {
  BESTSELLER_IDS, BESTSELLER_SPOTLIGHT_ID, FEATURED_IDS, HERO_SLIDES, HOME_TESTIMONIALS, WHY_CEZLIAR,
} from '../data/home';
import testimonials from '../data/testimonials.json';
import { formatPrice } from '../utils/format';
import { summarize } from '../utils/text';

const countWhere = (match) => products.filter(match).length;
const fromPrice = (match) => {
  const prices = products.filter(match).map((p) => p.price);
  return prices.length ? `From ${formatPrice(Math.min(...prices))}` : 'Shop now';
};

function buildSlides() {
  return HERO_SLIDES.map((slide) => {
    const featured = toProductCard(getProductById(slide.featuredId));
    const side = toProductCard(getProductById(slide.side.id));
    const topProduct = slide.top.productId && getProductById(slide.top.productId);
    const collection = COLLECTIONS.find((c) => c.id === slide.top.collection);
    return {
      ...slide,
      featured: {
        name: featured.shortName,
        meta: `${formatPrice(featured.price)} · ${featured.notes || featured.tagline}`,
        image: featured.image,
        slug: featured.slug,
      },
      top: {
        ...slide.top,
        priceLabel: topProduct ? formatPrice(topProduct.price) : fromPrice(collection.match),
      },
      side: {
        ...slide.side,
        name: side.shortName,
        priceLabel: formatPrice(side.price),
        href: `/product/${side.slug}`,
      },
    };
  });
}

function buildCollectionTiles() {
  const [attar, solid, dhoop, home] = COLLECTIONS;
  return [
    { title: 'Attars', href: attar.href, count: countWhere(attar.match), unit: 'blends', text: 'Rare scents, timeless traditions. Alcohol-free roll-ons.', image: '/images/site/mood-musk-rijali.webp', bg: 'bg-forest', imageClass: 'inset-0 h-full w-full object-cover' },
    { title: 'Solid Perfumes', href: solid.href, count: countWhere(solid.match), unit: 'balms', text: 'Personal fragrance, made portable. Pocket-sized balms.', image: '/images/products/SolidPerfumes/White-oudh/1.jpg', bg: 'border border-line-soft bg-white', imageClass: 'left-0 right-0 top-0 h-[72%] w-full object-contain p-6' },
    { title: 'Dhoop', href: dhoop.href, count: countWhere(dhoop.match), unit: 'scents', text: 'Charcoal-free sticks for prayer and quiet evenings.', image: '/images/site/dhoop-cutout.webp', bg: 'bg-forest', imageClass: 'left-0 right-0 top-[2%] h-[70%] w-full object-contain' },
    { title: 'Home & Water', href: home.href, count: countWhere(home.match), unit: 'essentials', text: 'Drain care and water filtration for modern homes.', image: '/images/site/hero-homecare.webp', bg: 'bg-sand', imageClass: 'inset-0 h-full w-full object-cover object-[64%_center]' },
  ];
}

function buildCategoryCards() {
  const imageOf = (id) => toProductCard(getProductById(id)).image;
  const sub = (name) => (p) => p.subCategory === name;
  return [
    { title: 'Attars', href: '/collections/fragrance-collection/attars', count: countWhere(sub('Attar')), image: imageOf('attar-1'), icon: 'drop' },
    { title: 'Solid perfumes', href: '/collections/fragrance-collection/solid-perfumes', count: countWhere(sub('Solid Perfumes')), image: imageOf('Sabaya'), icon: 'drop' },
    { title: 'Dhoop sticks', href: '/collections/fragrance-collection/dhoop', count: countWhere(sub('Dhoop')), image: imageOf('LobanDhoop-2'), icon: 'stick' },
    { title: 'Drain care', href: '/collections/home-care-collection/drain-cleaner', count: countWhere(sub('Drain Opener')), image: imageOf('drain-1'), icon: 'pipe' },
    { title: 'Water filters', href: '/collections/water-care-collection', count: countWhere(sub('Water Filter')), image: imageOf('filter-1'), icon: 'filter' },
    { title: 'PP spun filters', href: '/collections/water-care-collection/pp-spun-filter', count: countWhere(sub('PP Spun Filter')), image: imageOf('pp-spun-1'), icon: 'filter' },
    { title: 'Filter candles', href: '/collections/water-care-collection/filter-candle', count: countWhere(sub('Filter Candle')), image: imageOf('filter-candle-1'), icon: 'candle' },
    { title: 'Filter sets & kits', href: '/collections/water-care-collection/filter-set', count: countWhere((p) => p.subCategory === 'Filter Set' || p.subCategory === 'Accessories'), image: imageOf('filter-set-1'), icon: 'pipe' },
  ];
}

export default function Home() {
  const featuredTabs = [
    { id: 'all', label: 'All', products: cardsByIds(FEATURED_IDS) },
    ...COLLECTIONS.map((c) => ({ id: c.id, label: c.label === 'Home & water care' ? 'Home & water' : c.label, products: products.filter(c.match).slice(0, 8).map(toProductCard) })),
  ];

  const spotlightSource = getProductById(BESTSELLER_SPOTLIGHT_ID);
  const spotlight = {
    ...toProductCard(spotlightSource),
    description: summarize(spotlightSource.description, 190),
    moodImage: '/images/site/mood-candles.webp',
  };

  const reviews = HOME_TESTIMONIALS.map(({ id, productId }) => {
    const review = testimonials.find((t) => t.id === id);
    return review && { ...review, image: toProductCard(getProductById(productId)).image };
  }).filter(Boolean);

  const marqueeNames = products.filter((p) => p.mainCategory === 'Fragrance World').map((p) => p.shortName || p.name);

  return (
    <>
      <HeroBento slides={buildSlides()} />
      <Marquee names={marqueeNames} />
      <FeaturedProducts tabs={featuredTabs} />
      <CollectionsSection tiles={buildCollectionTiles()} />
      <CategoryCards categories={buildCategoryCards()} />
      <Bestsellers spotlight={spotlight} products={cardsByIds(BESTSELLER_IDS)} />
      <AboutSection productCount={products.length} />
      <WhyCezliar items={WHY_CEZLIAR} />
      <Testimonials reviews={reviews} />
    </>
  );
}
