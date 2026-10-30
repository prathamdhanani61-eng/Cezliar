import products from '../src/data/products.json';
import blogs from '../src/data/blogs.json';
import { SITE_URL } from '../src/utils/site';
import { getProductUrl } from '../src/utils/product';

const categoryPaths = [
  '/collections/fragrance-collection',
  '/collections/fragrance-collection/attars',
  '/collections/fragrance-collection/solid-perfumes',
  '/collections/fragrance-collection/dhoop',
  '/collections/home-care-collection',
  '/collections/home-care-collection/drain-cleaner',
  '/collections/water-care-collection',
  '/collections/water-care-collection/pp-spun-filter',
  '/collections/water-care-collection/filter-candle',
  '/collections/water-care-collection/filter-set',
  '/collections/water-care-collection/accessories',
  '/collections/signature-collection',
];

export default function sitemap() {
  const staticRoutes = ['', '/shop', '/collections', '/about', '/contact', '/blogs', ...categoryPaths];
  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' })),
    ...products.map((product) => ({ url: `${SITE_URL}${getProductUrl(product)}`, changeFrequency: 'monthly' })),
    ...blogs.map((blog) => ({ url: `${SITE_URL}/blogs/${blog.slug.trim()}`, changeFrequency: 'yearly' })),
  ];
}
