import HeroBento from '../components/home/HeroBento';
import FeaturedProducts from '../components/home/FeaturedProducts';
import {
  AboutSection, Bestsellers, CategoryCards, CollectionsSection, Marquee, OrderChannels, Testimonials, WhyCezliar,
} from '../components/home/HomeSections';
import { cardsByIds, getProductById, products, publicFileExists, toProductCard } from '../data/products';
import { CATEGORY_PAGES, COLLECTIONS } from '../data/categories';
import {
  BESTSELLER_IDS, BESTSELLER_SPOTLIGHT_ID, FEATURED_IDS, HERO_ROTATE_MS, HERO_SLIDES, HOME_TESTIMONIALS, WHY_CEZLIAR,
} from '../data/home';
import testimonials from '../data/testimonials.json';
import { formatPrice } from '../utils/format';
import { summarize } from '../utils/text';

const countWhere = (match) => products.filter(match).length;

const RAIL_NOUN = { attars: 'attars', 'solid-perfumes': 'solid perfumes', dhoop: 'dhoop scents', 'home-care': 'home & water essentials' };

function buildSlides() {
  return HERO_SLIDES.map((slide) => {
    const category = CATEGORY_PAGES[slide.categoryId];
    const items = products.filter(category.match).map(toProductCard);
    const topCategory = CATEGORY_PAGES[slide.top.categoryId || slide.categoryId];
    const topItems = products.filter(topCategory.match);
    const side = toProductCard(getProductById(slide.side.id));
    const small = slide.image.replace(/\.webp$/, '-900.webp');
    return {
      ...slide,
      srcSet: publicFileExists(small) ? `${small} 900w, ${slide.image} 1800w` : undefined,
      href: category.path,
      rail: {
        label: `All ${items.length} ${RAIL_NOUN[slide.categoryId]}`,
        products: items.map((p) => ({ id: p.id, slug: p.slug, shortName: p.shortName, image: p.thumb, priceLabel: formatPrice(p.price) })),
      },
      top: {
        ...slide.top,
        href: topCategory.path,
        label: topCategory.title,
        meta: `${topItems.length} ${topItems.length === 1 ? 'product' : 'products'}`,
        priceLabel: `From ${formatPrice(Math.min(...topItems.map((p) => p.price)))}`,
      },
      side: {
        image: slide.side.image || side.image,
        alt: slide.side.alt || side.name,
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
    { title: 'Solid Perfumes', href: solid.href, count: countWhere(solid.match), unit: 'balms', text: 'Personal fragrance, made portable. Pocket-sized balms.', image: '/images/site/solid-cutout-480.webp', bg: 'bg-sand', imageClass: 'left-[6%] right-[6%] top-[14%] h-[40%] w-[88%] object-contain' },
    { title: 'Dhoop', href: dhoop.href, count: countWhere(dhoop.match), unit: 'scents', text: 'Charcoal-free sticks for prayer and quiet evenings.', image: '/images/site/dhoop-cutout-480.webp', bg: 'bg-forest', imageClass: 'left-[6%] right-[6%] top-[6%] h-[56%] w-[88%] object-contain' },
    { title: 'Home & Water', href: home.href, count: countWhere(home.match), unit: 'essentials', text: 'Drain care and water filtration for modern homes.', image: '/images/site/hero-homecare-900.webp', bg: 'bg-sand', imageClass: 'inset-0 h-full w-full object-cover object-[64%_center]' },
  ];
}

function buildCategoryCards() {
  const imageOf = (id) => toProductCard(getProductById(id)).thumb;
  const sub = (name) => (p) => p.subCategory === name;
  return [
    { title: 'Attars', href: CATEGORY_PAGES.attars.path, count: countWhere(sub('Attar')), image: imageOf('attar-1'), icon: 'drop' },
    { title: 'Solid perfumes', href: CATEGORY_PAGES['solid-perfumes'].path, count: countWhere(sub('Solid Perfumes')), image: imageOf('Sabaya'), icon: 'drop' },
    { title: 'Dhoop sticks', href: CATEGORY_PAGES.dhoop.path, count: countWhere(sub('Dhoop')), image: imageOf('LobanDhoop-2'), icon: 'stick' },
    { title: 'Drain care', href: CATEGORY_PAGES['drain-care'].path, count: countWhere(sub('Drain Opener')), image: imageOf('drain-1'), icon: 'pipe' },
    { title: 'Water filters', href: CATEGORY_PAGES['water-care'].path, count: countWhere(sub('Water Filter')), image: imageOf('filter-1'), icon: 'filter' },
    { title: 'PP spun filters', href: CATEGORY_PAGES['pp-spun'].path, count: countWhere(sub('PP Spun Filter')), image: imageOf('pp-spun-1'), icon: 'filter' },
    { title: 'Filter candles', href: CATEGORY_PAGES['filter-candle'].path, count: countWhere(sub('Filter Candle')), image: imageOf('filter-candle-1'), icon: 'candle' },
    { title: 'Filter sets & kits', href: CATEGORY_PAGES['filter-set'].path, count: countWhere((p) => p.subCategory === 'Filter Set' || p.subCategory === 'Accessories'), image: imageOf('filter-set-1'), icon: 'pipe' },
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
    moodImage: '/images/site/mood-candles-600.webp',
  };

  const reviews = HOME_TESTIMONIALS.map(({ id, productId }) => {
    const review = testimonials.find((t) => t.id === id);
    return review && { ...review, image: toProductCard(getProductById(productId)).thumb };
  }).filter(Boolean);

  const marqueeNames = products.filter((p) => p.mainCategory === 'Fragrance World').map((p) => p.shortName || p.name);

  return (
    <>
      <h1 className="sr-only">CEZLIAR — alcohol-free attars, solid perfumes, dhoop and home care, made in India</h1>
      <HeroBento slides={buildSlides()} rotateMs={HERO_ROTATE_MS} />
      <Marquee names={marqueeNames} />
      <FeaturedProducts tabs={featuredTabs} />
      <CollectionsSection tiles={buildCollectionTiles()} />
      <CategoryCards categories={buildCategoryCards()} />
      <Bestsellers spotlight={spotlight} products={cardsByIds(BESTSELLER_IDS)} />
      <OrderChannels />
      <AboutSection productCount={products.length} />
      <WhyCezliar items={WHY_CEZLIAR} />
      <Testimonials reviews={reviews} />
    </>
  );
}
