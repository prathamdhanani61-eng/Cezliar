import { Fraunces, Jost } from 'next/font/google';
import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/ScrollToTop';
import { SITE_URL } from '../src/utils/site';
import { products, toProductCard } from '../src/data/products';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CEZLIAR | Alcohol-free Attars, Dhoop & Home Care',
    template: '%s | CEZLIAR',
  },
  description: 'Alcohol-free attars, solid perfumes, charcoal-free dhoop and home & water care from CEZLIAR. Made in India.',
  keywords: ['CEZLIAR', 'attar', 'alcohol-free attar', 'solid perfume', 'dhoop', 'charcoal-free dhoop', 'water filter', 'drain opener'],
  icons: { icon: '/images/logo/logo.png' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'CEZLIAR',
    url: SITE_URL,
    title: 'CEZLIAR | Alcohol-free Attars, Dhoop & Home Care',
    description: 'Alcohol-free attars, solid perfumes, charcoal-free dhoop and home & water care. Made in India.',
    images: ['/images/site/hero-attar.webp'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#0F4D3C',
};

export default function RootLayout({ children }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CEZLIAR',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.png`,
    sameAs: ['https://instagram.com/cezliar'],
  };

  const searchProducts = products.map(toProductCard).map(({ id, slug, name, shortName, tagline, image, price }) => ({
    id, slug, name, shortName, tagline, image, price,
  }));

  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header searchProducts={searchProducts} />
          <main id="main" className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
