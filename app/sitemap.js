import products from '../src/data/products.json';
import { CATEGORY_PAGES } from '../src/data/categories';
import { SITE_URL } from '../src/utils/site';
import { getProductUrl } from '../src/utils/product';

export default function sitemap() {
  const staticRoutes = ['', '/shop', '/about', '/contact', '/gift-finder'];
  const categoryRoutes = Object.values(CATEGORY_PAGES).map((c) => c.path);
  return [
    ...[...staticRoutes, ...categoryRoutes].map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' })),
    ...products.map((product) => ({ url: `${SITE_URL}${getProductUrl(product)}`, changeFrequency: 'monthly' })),
  ];
}
