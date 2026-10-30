// Business details shown across the site. Values left empty are hidden.
// Set the matching environment variables (see .env.example) to fill them in.
const digits = (value) => (value || '').replace(/\D/g, '');

export const SITE = {
  name: 'CEZLIAR',
  tagline: 'Indian fragrances & home rituals',
  whatsappNumber: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS || '',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Surat, Gujarat, India',
  instagram: 'https://instagram.com/cezliar',
  amazonStore: process.env.NEXT_PUBLIC_AMAZON_STORE_URL || 'https://www.amazon.in/s?k=cezliar',
  flipkartStore: process.env.NEXT_PUBLIC_FLIPKART_STORE_URL || 'https://www.flipkart.com/search?q=cezliar',
  newsletterAction: process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION || '',
};

export const whatsappLink = (message) => (SITE.whatsappNumber
  ? `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  : '');

export const NAV = [
  {
    id: 'fragrances',
    label: 'Fragrances',
    href: '/collections/fragrance-collection',
    children: [
      { label: 'All fragrances', href: '/collections/fragrance-collection' },
      { label: 'Attars', href: '/collections/fragrance-collection/attars' },
      { label: 'Solid perfumes', href: '/collections/fragrance-collection/solid-perfumes' },
    ],
  },
  {
    id: 'dhoop',
    label: 'Dhoop',
    href: '/collections/fragrance-collection/dhoop',
    children: [
      { label: 'All dhoop', href: '/collections/fragrance-collection/dhoop' },
      { label: 'Gift finder', href: '/gift-finder' },
    ],
  },
  {
    id: 'home',
    label: 'Home Care',
    href: '/collections/home-care-collection',
    children: [
      { label: 'All home & water care', href: '/collections/home-care-collection' },
      { label: 'Drain care', href: '/collections/home-care-collection/drain-cleaner' },
      { label: 'Water care', href: '/collections/water-care-collection' },
      { label: 'PP spun filters', href: '/collections/water-care-collection/pp-spun-filter' },
      { label: 'Filter candles', href: '/collections/water-care-collection/filter-candle' },
      { label: 'Filter sets', href: '/collections/water-care-collection/filter-set' },
      { label: 'Accessories', href: '/collections/water-care-collection/accessories' },
    ],
  },
  { id: 'gifts', label: 'Gifts', href: '/gift-finder' },
  { id: 'story', label: 'Our Story', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];
