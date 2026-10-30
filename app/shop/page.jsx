import Shop from '../../src/site-pages/Shop';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Shop All',
  description: 'Shop CEZLIAR alcohol-free attars, solid perfumes, charcoal-free dhoop, drain care and water filters — available on Amazon and Flipkart.',
  alternates: { canonical: '/shop' },
};

export default function Page() {
  return <Shop products={products.map(toProductCard)} />;
}
