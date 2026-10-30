import Wishlist from '../../src/site-pages/Wishlist';
import { products, toProductCard } from '../../src/data/products';

export const metadata = {
  title: 'Wishlist',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <Wishlist products={products.map(toProductCard)} />;
}
