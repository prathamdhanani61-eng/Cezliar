import Shop from '../../src/site-pages/Shop';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Collections',
  description: 'Browse CEZLIAR product collections.',
  alternates: { canonical: '/collections' },
};

export default function Page() { return <Shop products={products.map(toProductCard)} />; }
