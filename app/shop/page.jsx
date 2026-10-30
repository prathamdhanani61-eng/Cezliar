import Shop from '../../src/site-pages/Shop';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Shop All Collections',
  description: 'Explore CEZLIAR attars, dhoop, solid perfumes, water filters, and home care products.',
  alternates: { canonical: '/shop' },
};

export default function Page() { return <Shop products={products.map(toProductCard)} />; }
