import { SITE_URL } from '../src/utils/site';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/wishlist'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
