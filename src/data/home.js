// Homepage content. Product references use the `id` from products.json,
// so names, prices and photos always follow the product data.
export const HERO_SLIDES = [
  {
    tab: 'Attars',
    eyebrow: 'Attar collection · alcohol-free',
    titleStart: 'Fragrances for a',
    titleEnd: 'more mindful world.',
    description: 'Concentrated perfume oils in a 6 ml roll-on that stay with you up to 12 hours.',
    cta: 'Shop attars',
    href: '/collections/fragrance-collection/attars',
    image: '/images/site/hero-attar.webp',
    alt: 'CEZLIAR attar bottle on a marble pedestal with agarwood and jasmine',
    featuredId: 'attar-1',
    top: {
      cutout: '/images/site/attar-cutout.webp',
      scale: 0.32,
      alt: 'Attar bottle with agarwood',
      label: 'Musk Rijali · Sanaya · Blueberry Mushk',
      meta: '3 signature attars',
      collection: 'attar',
      href: '/collections/fragrance-collection/attars',
    },
    stat: { label: 'Pure oil', value: '0%', text: 'alcohol in every attar and solid perfume.' },
    side: { id: 'attar-3', image: '/images/site/mood-sanaya.webp', alt: 'Sanaya attar among warm lights' },
  },
  {
    tab: 'Dhoop',
    eyebrow: 'Dhoop rituals · charcoal-free',
    titleStart: 'Bring calm into',
    titleEnd: 'the everyday.',
    description: 'Seven dhoop scents, from Mysore sandal to loban, for prayer and quiet evenings.',
    cta: 'Shop dhoop',
    href: '/collections/fragrance-collection/dhoop',
    image: '/images/site/hero-dhoop.webp',
    alt: 'A dhoop stick burning on a brass stand beside sandalwood and jasmine',
    featuredId: 'SandalwoodDhoop-1',
    top: {
      cutout: '/images/site/dhoop-cutout.webp',
      scale: 0.36,
      alt: 'Dhoop sticks with roses, jasmine and resin',
      label: 'Sandal · Loban · Mogra · Gulab',
      meta: 'Charcoal-free dhoop sticks',
      collection: 'dhoop',
      href: '/collections/fragrance-collection/dhoop',
    },
    stat: { label: 'Scents', value: '7', text: 'sandal, loban, mogra, gulab, kapur, cedarwood and gugal.' },
    side: { id: 'MograDhoop-3', image: '/images/site/mood-marigold.webp', alt: 'Dhoop sticks with marigold flowers' },
  },
  {
    tab: 'Home & water',
    eyebrow: 'Home & water care',
    titleStart: 'Small rituals.',
    titleEnd: 'A better home.',
    description: 'Drain care and water filtration, made with the same attention as our fragrances.',
    cta: 'Shop home care',
    href: '/collections/home-care-collection',
    image: '/images/site/hero-homecare.webp',
    alt: 'A copper and ivory water dispenser on a marble counter',
    featuredId: 'drain-1',
    top: {
      bg: '/images/site/mood-kitchen.webp',
      cutout: '',
      alt: '',
      label: 'Advanced Aqua Filter',
      meta: 'Multi-stage, under-sink',
      productId: 'filter-1',
      href: '/collections/water-care-collection',
    },
    stat: { label: 'Essentials', value: '6', text: 'filters, candles, housings, kits and drain care.' },
    side: { id: 'drain-1', image: '/images/products/Drain/1.jpg', alt: 'Pro Drain Opener pack' },
  },
];

export const FEATURED_IDS = ['attar-3', 'White oudh', 'SandalwoodDhoop-1', 'attar-2', 'Sabaya', 'KapurDhoop-4', 'Shanaya', 'filter-1'];

export const BESTSELLER_SPOTLIGHT_ID = 'attar-1';
export const BESTSELLER_IDS = ['LobanDhoop-2', 'MograDhoop-3', 'Gulab', 'drain-1'];

// Reviews from testimonials.json shown on the homepage, with the product each one is about.
export const HOME_TESTIMONIALS = [
  { id: 2, productId: 'SandalwoodDhoop-1' },
  { id: 4, productId: 'attar-1' },
  { id: 3, productId: 'drain-1' },
];

export const WHY_CEZLIAR = [
  { icon: 'drop', title: 'Alcohol-free formulas', text: 'Attars and solid perfumes made with skin-safe oils — gentle on every skin type.' },
  { icon: 'clock', title: 'Made to last', text: 'Concentrated oils last 8–12 hours on skin and up to 48 hours on fabric.' },
  { icon: 'stick', title: 'Charcoal-free dhoop', text: 'Cleaner-burning sticks, made for indoor prayer, meditation and everyday calm.' },
  { icon: 'pin', title: 'Made in India', text: 'Blended in Surat, Gujarat, drawing on India’s long tradition of perfumery.' },
  { icon: 'shield', title: 'Secure shopping', text: 'Order through Amazon and Flipkart, with their trusted checkout and delivery.' },
  { icon: 'whatsapp', title: 'Here to help', text: 'Questions about a scent or a gift? Message us on WhatsApp.' },
];
