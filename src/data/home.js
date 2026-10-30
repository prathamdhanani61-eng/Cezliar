// Homepage content. Product references use the `id` from products.json and
// collections use the ids in categories.js, so names, prices, counts and photos
// always follow the product data.

// One hero slide per collection; together they show every product on the site.
export const HERO_SLIDES = [
  {
    tab: 'Attars',
    categoryId: 'attars',
    eyebrow: 'Attar collection · alcohol-free',
    titleStart: 'Fragrances for a',
    titleEnd: 'more mindful world.',
    description: 'Concentrated perfume oils in a 6 ml roll-on that stay with you up to 12 hours.',
    cta: 'Shop attars',
    image: '/images/site/hero-attar.webp',
    imagePosition: '50% center', // keeps the product visible beside the text card
    alt: 'CEZLIAR attar bottle on a marble pedestal with agarwood and jasmine',
    featuredId: 'attar-1',
    top: { cutout: '/images/site/attar-cutout.webp', scale: 0.32, alt: 'Attar bottle with agarwood' },
    stat: { label: 'Pure oil', value: '0%', text: 'alcohol in every attar and solid perfume.' },
    side: { id: 'attar-3', image: '/images/site/mood-sanaya-600.webp', alt: 'Sanaya attar among warm lights' },
  },
  {
    tab: 'Solid perfumes',
    categoryId: 'solid-perfumes',
    eyebrow: 'Solid perfumes · alcohol-free',
    titleStart: 'Fragrance you can',
    titleEnd: 'carry anywhere.',
    description: 'Six pocket-sized perfume balms with a natural beeswax and shea butter base.',
    cta: 'Shop solid perfumes',
    image: '/images/site/hero-solid.webp',
    imagePosition: '64% center',
    alt: 'Six CEZLIAR solid perfume tins standing on a stone pedestal',
    featuredId: 'White oudh',
    top: { cutout: '/images/site/solid-cutout-480.webp', scale: 0.22, baseline: 0.913, alt: 'CEZLIAR solid perfume tins' },
    stat: { label: 'Pocket balm', value: '19 g', text: 'beeswax and shea butter base — no alcohol, no spills.' },
    side: { id: 'Sabaya' },
  },
  {
    tab: 'Dhoop',
    categoryId: 'dhoop',
    eyebrow: 'Dhoop rituals · charcoal-free',
    titleStart: 'Bring calm into',
    titleEnd: 'the everyday.',
    description: 'Seven dhoop scents, from Mysore sandal to loban, for prayer and quiet evenings.',
    cta: 'Shop dhoop',
    image: '/images/site/hero-dhoop.webp',
    imagePosition: '52% center',
    alt: 'A dhoop stick burning on a brass stand beside sandalwood and jasmine',
    featuredId: 'SandalwoodDhoop-1',
    top: { cutout: '/images/site/dhoop-cutout-480.webp', scale: 0.36, alt: 'Dhoop sticks with roses, jasmine and resin' },
    stat: { label: 'Scents', value: '7', text: 'sandal, loban, mogra, gulab, kapur, cedarwood and gugal.' },
    side: { id: 'MograDhoop-3', image: '/images/site/mood-marigold-600.webp', alt: 'Dhoop sticks with marigold flowers' },
  },
  {
    tab: 'Home & water',
    categoryId: 'home-care',
    eyebrow: 'Home & water care',
    titleStart: 'Small rituals.',
    titleEnd: 'A better home.',
    description: 'Drain care and water filtration, made with the same attention as our fragrances.',
    cta: 'Shop home care',
    image: '/images/site/hero-homecare.webp',
    imagePosition: '50% center',
    alt: 'A copper and ivory water dispenser on a marble counter',
    featuredId: 'drain-1',
    top: { categoryId: 'water-care', photo: '/images/site/mood-kitchen-600.webp', alt: 'An under-sink water filter in a bright kitchen' },
    stat: { label: 'Essentials', value: '6', text: 'filters, candles, housings, kits and drain care.' },
    side: { id: 'drain-1' },
  },
];

export const HERO_ROTATE_MS = 6500;

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
  { icon: 'shield', title: 'Order your way', text: 'Amazon, Flipkart, WhatsApp or Instagram — pick whatever is easiest for you.' },
  { icon: 'gift', title: 'Gifting made personal', text: 'Tell us who it is for on WhatsApp and we will help you choose and send it.' },
];
