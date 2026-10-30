import '../src/index.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/ScrollToTop';
import { SITE_URL } from '../src/utils/site';
import { products } from '../src/data/products';
import { getProductSlug } from '../src/utils/product';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CEZLIAR | Premium Fragrance & Home Care',
    template: '%s | CEZLIAR',
  },
  description: 'Explore CEZLIAR fragrances, dhoop, water care, and home care products.',
  keywords: ['CEZLIAR', 'attar', 'dhoop', 'fragrance', 'water care', 'home care'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'CEZLIAR',
    url: SITE_URL,
    title: 'CEZLIAR | Premium Fragrance & Home Care',
    description: 'Explore CEZLIAR fragrances, dhoop, water care, and home care products.',
    images: ['/images/logo/logo.png'],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CEZLIAR',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.png`,
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar searchProducts={products.map(({ id, name, description, subCategory, image, price }) => ({ id, slug: getProductSlug({ id, name }), name, description, subCategory, image, price }))} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
