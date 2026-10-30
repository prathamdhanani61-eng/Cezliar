// Business details shown across the site. Environment variables (see .env.example)
// override the defaults below; values left empty are hidden.
import { SITE_URL } from '../utils/site';
import { formatPrice } from '../utils/format';

const digits = (value) => (value || '').replace(/\D/g, '');

// WhatsApp number that receives direct and gift orders.
const WHATSAPP_NUMBER = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || '919879825994';
const INSTAGRAM_HANDLE = 'cezliar';

const displayIndianNumber = (number) => (number.length === 12 && number.startsWith('91')
  ? `+91 ${number.slice(2, 7)} ${number.slice(7)}`
  : `+${number}`);

export const SITE = {
  name: 'CEZLIAR',
  tagline: 'Indian fragrances & home rituals',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: displayIndianNumber(WHATSAPP_NUMBER),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || displayIndianNumber(WHATSAPP_NUMBER),
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS || '',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Surat, Gujarat, India',
  instagramHandle: INSTAGRAM_HANDLE,
  instagram: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
  instagramDm: `https://ig.me/m/${INSTAGRAM_HANDLE}`,
  amazonStore: process.env.NEXT_PUBLIC_AMAZON_STORE_URL || 'https://www.amazon.in/s?k=cezliar',
  flipkartStore: process.env.NEXT_PUBLIC_FLIPKART_STORE_URL || 'https://www.flipkart.com/search?q=cezliar',
  newsletterAction: process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION || '',
};

export const whatsappLink = (message) => (SITE.whatsappNumber
  ? `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  : '');

// Pre-filled WhatsApp message for ordering one product (optionally as a gift).
export const orderMessage = ({ name, price, slug }, { gift = false } = {}) => [
  `Hello CEZLIAR! I would like to order${gift ? ' this as a gift' : ''}:`,
  `${name} — ${formatPrice(price)}`,
  `${SITE_URL}/product/${slug}`,
].join('\n');

export const whatsappOrderLink = (product, options) => whatsappLink(orderMessage(product, options));

export const ORDER_CHANNELS = [
  { id: 'amazon', label: 'Amazon', text: 'Order with Amazon delivery, offers and easy returns.', href: SITE.amazonStore, cta: 'Shop on Amazon' },
  { id: 'flipkart', label: 'Flipkart', text: 'Find every CEZLIAR product on Flipkart.', href: SITE.flipkartStore, cta: 'Shop on Flipkart' },
  { id: 'whatsapp', label: 'WhatsApp', text: `Order directly or send a gift — message ${SITE.whatsappDisplay}.`, href: whatsappLink('Hello CEZLIAR! I would like to place an order.'), cta: 'Order on WhatsApp' },
  { id: 'instagram', label: 'Instagram', text: `Send us a DM on Instagram @${INSTAGRAM_HANDLE} to order.`, href: `https://ig.me/m/${INSTAGRAM_HANDLE}`, cta: 'Order on Instagram' },
];

export const NAV = [
  {
    id: 'fragrances',
    label: 'Fragrances',
    href: '/collections/fragrance-collection',
    children: [
      { label: 'All fragrances', href: '/collections/fragrance-collection' },
      { label: 'Attars', href: '/collections/fragrance-collection/attars' },
      { label: 'Solid perfumes', href: '/collections/fragrance-collection/solid-perfumes' },
      { label: 'Dhoop', href: '/collections/fragrance-collection/dhoop' },
    ],
  },
  {
    id: 'dhoop',
    label: 'Dhoop',
    href: '/collections/fragrance-collection/dhoop',
    // Filled in with every dhoop product by the header.
    children: [{ label: 'All dhoop', href: '/collections/fragrance-collection/dhoop' }],
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
