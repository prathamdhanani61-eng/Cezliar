import Shop from '../../src/site-pages/Shop';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Collections',
  description: 'Browse every CEZLIAR collection — attars, solid perfumes, dhoop and home & water care.',
  alternates: { canonical: '/shop' },
};

export default function Page() {
  return <Shop products={products.map(toProductCard)} />;
}
