// Business details shown across the site. Environment variables (see .env.example)
// override the defaults below.
import { SITE_URL } from '../utils/site';
import { formatPrice } from '../utils/format';

const digits = (value) => (value || '').replace(/\D/g, '');

// WhatsApp number that receives direct and gift orders.
const WHATSAPP_NUMBER = digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || '919879825994';
const INSTAGRAM_HANDLE = 'cezliar';
// Inbox that receives newsletter sign-ups and other messages from the site.
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'cezliarenterprise61@gmail.com';

const displayIndianNumber = (number) => (number.length === 12 && number.startsWith('91')
  ? `+91 ${number.slice(2, 7)} ${number.slice(7)}`
  : `+${number}`);

export const SITE = {
  name: 'CEZLIAR',
  tagline: 'Indian fragrances & home rituals',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: displayIndianNumber(WHATSAPP_NUMBER),
  email: EMAIL,
  instagramHandle: INSTAGRAM_HANDLE,
  instagram: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
  instagramDm: `https://ig.me/m/${INSTAGRAM_HANDLE}`,
  amazonStore: process.env.NEXT_PUBLIC_AMAZON_STORE_URL || 'https://www.amazon.in/s?k=cezliar',
  flipkartStore: process.env.NEXT_PUBLIC_FLIPKART_STORE_URL || 'https://www.flipkart.com/search?q=cezliar',
  // Forms post here and the message is emailed to SITE.email. FormSubmit needs no account:
  // the first message sends an "Activate" link to the inbox, and messages arrive after that.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${EMAIL}`,
};

export const whatsappLink = (message) => (SITE.whatsappNumber
  ? `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  : '');

export const mailtoLink = (subject, body = '') => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

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
  { id: 'instagram', label: 'Instagram', text: `Send us a DM on Instagram @${INSTAGRAM_HANDLE} to order.`, href: SITE.instagramDm, cta: 'Order on Instagram' },
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
];
