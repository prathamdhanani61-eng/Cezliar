import { Fraunces, Jost } from 'next/font/google';
import 'lenis/dist/lenis.css';
import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import SmoothScroll from '../src/components/motion/SmoothScroll';
import MotionProvider from '../src/components/motion/MotionProvider';
import JsonLd from '../src/components/JsonLd';
import { SITE_URL } from '../src/utils/site';
import { SITE } from '../src/data/site';
import { products, toProductCard } from '../src/data/products';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const DESCRIPTION = 'Alcohol-free attars, solid perfumes, charcoal-free dhoop and home care from CEZLIAR, made in India. Order on Amazon, Flipkart, WhatsApp or Instagram.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CEZLIAR | Alcohol-free Attars, Solid Perfumes, Dhoop & Home Care',
    template: '%s | CEZLIAR',
  },
  description: DESCRIPTION,
  applicationName: 'CEZLIAR',
  keywords: ['CEZLIAR', 'attar', 'alcohol-free attar', 'roll-on perfume oil', 'solid perfume', 'dhoop sticks', 'charcoal-free dhoop', 'incense', 'drain opener', 'RO water filter', 'Surat', 'India'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'CEZLIAR',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'CEZLIAR | Alcohol-free Attars, Solid Perfumes, Dhoop & Home Care',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: '#0F4D3C',
};

export default function RootLayout({ children }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'CEZLIAR',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo.png`,
      description: DESCRIPTION,
      sameAs: [SITE.instagram],
      address: { '@type': 'PostalAddress', addressLocality: 'Surat', addressRegion: 'Gujarat', addressCountry: 'IN' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: `+${SITE.whatsappNumber}`,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'CEZLIAR',
      url: SITE_URL,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  const searchProducts = products.map(toProductCard).map(({ id, slug, name, shortName, tagline, thumb, price, collection }) => ({
    id, slug, name, shortName, tagline, image: thumb, price, collection,
  }));

  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <JsonLd data={structuredData} />
        <MotionProvider>
          <SmoothScroll />
          <div className="flex min-h-screen flex-col">
            <Header searchProducts={searchProducts} />
            <main id="main" className="flex-grow">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
