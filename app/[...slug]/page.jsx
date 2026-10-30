import { notFound } from 'next/navigation';
import Category from '../../src/site-pages/Category';
import { products, toProductCard } from '../../src/data/products';

const categories = {
  'collections/fragrance-collection': ['Fragrance World'],
  'collections/fragrance-collection/attars': ['Fragrance World', 'Attar'],
  'collections/fragrance-collection/solid-perfumes': ['Fragrance World', 'Solid Perfumes'],
  'collections/fragrance-collection/dhoop': ['Fragrance World', 'Dhoop'],
  'collections/home-care-collection': ['Home Care'],
  'collections/home-care-collection/drain-cleaner': ['Home Care', 'Drain Opener'],
  'collections/water-care-collection': ['Home Care'],
  'collections/water-care-collection/pp-spun-filter': ['Home Care', 'PP Spun Filter'],
  'collections/water-care-collection/filter-candle': ['Home Care', 'Filter Candle'],
  'collections/water-care-collection/filter-set': ['Home Care', 'Filter Set'],
  'collections/water-care-collection/accessories': ['Home Care', 'Accessories'],
  'collections/signature-collection': ['Signature Collection'],
  'fragrance-world': ['Fragrance World'],
  'fragrance-world/attar': ['Fragrance World', 'Attar'],
  'fragrance-world/dhoop': ['Fragrance World', 'Dhoop'],
  'home-care': ['Home Care'],
  'home-care/drain-opener': ['Home Care', 'Drain Opener'],
  'home-care/water-filter': ['Home Care', 'Water Filter'],
};

const canonicalPaths = {
  'fragrance-world': '/collections/fragrance-collection',
  'fragrance-world/attar': '/collections/fragrance-collection/attars',
  'fragrance-world/dhoop': '/collections/fragrance-collection/dhoop',
  'home-care': '/collections/home-care-collection',
  'home-care/drain-opener': '/collections/home-care-collection/drain-cleaner',
  'home-care/water-filter': '/collections/water-care-collection',
};

export function generateStaticParams() {
  return Object.keys(categories).map((path) => ({ slug: path.split('/') }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories[slug.join('/')];
  const title = category?.[1] || category?.[0] || 'Collection';
  return {
    title: `${title} Collection`,
    description: `Explore CEZLIAR ${title} products and collections.`,
    alternates: { canonical: canonicalPaths[slug.join('/')] || `/${slug.join('/')}` },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const category = categories[slug.join('/')];
  if (!category) notFound();
  const categoryProducts = products
    .filter((product) => product.mainCategory === category[0] && (!category[1] || product.subCategory === category[1]))
    .map(toProductCard);
  return <Category mainCategory={category[0]} subCategory={category[1]} products={categoryProducts} />;
}
