import Shop from '../../src/site-pages/Shop';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Shop All',
  description: 'Shop all 22 CEZLIAR products: alcohol-free attars, solid perfumes, dhoop and water care. Order on Amazon, Flipkart, WhatsApp or Instagram.',
  alternates: { canonical: '/shop' },
};

export default function Page() {
  return <Shop products={products.map(toProductCard)} />;
}
