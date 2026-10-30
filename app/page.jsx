import Home from '../src/site-pages/Home';
import { products, toProductCard } from '../src/data/products';

export const metadata = {
  title: 'Premium Luxury Fragrance & Home Care',
  description: 'Discover CEZLIAR fragrances, dhoop, water care, and home care products.',
  alternates: { canonical: '/' },
};

export default function Page() {
  const featuredSource = products.filter((product) => product.isBestSeller);
  const fallbackSource = products.filter((product) => product.isNewArrival || product.isTrending);
  const featuredProducts = (featuredSource.length ? featuredSource : fallbackSource.length ? fallbackSource : products).slice(0, 5).map(toProductCard);
  return <Home featuredProducts={featuredProducts} allProducts={products.map(toProductCard)} />;
}
