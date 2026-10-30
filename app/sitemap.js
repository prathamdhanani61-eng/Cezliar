import products from '../src/data/products.json';
import { CATEGORY_PAGES } from '../src/data/categories';
import { SITE_URL } from '../src/utils/site';
import { getProductUrl } from '../src/utils/product';

export default function sitemap() {
  const lastModified = new Date();
  const entry = (path, priority, changeFrequency = 'weekly') => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });
  return [
    entry('', 1, 'daily'),
    entry('/shop', 0.9, 'daily'),
    ...Object.values(CATEGORY_PAGES).map((c) => entry(c.path, 0.8)),
    ...products.map((product) => entry(getProductUrl(product), 0.8)),
    entry('/gift-finder', 0.6, 'monthly'),
    entry('/about', 0.5, 'monthly'),
  ];
}
