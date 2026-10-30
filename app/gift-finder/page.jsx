import GiftFinder from '../../src/site-pages/GiftFinder';
import { getProductById, toProductCard } from '../../src/data/products';
import { GIFT_PRODUCT_MOODS } from '../../src/data/giftFinder';

export const metadata = {
  title: 'Gift Finder',
  description: 'Answer three quick questions and find the right CEZLIAR attar, solid perfume or dhoop to gift.',
  alternates: { canonical: '/gift-finder' },
};

export default function Page() {
  const products = Object.entries(GIFT_PRODUCT_MOODS)
    .map(([id, moods]) => {
      const product = getProductById(id);
      return product && { ...toProductCard(product), moods };
    })
    .filter(Boolean);
  return <GiftFinder products={products} />;
}
