import Link from 'next/link';
import { WhyCezliar } from '../components/home/HomeSections';
import { WHY_CEZLIAR } from '../data/home';
import { products } from '../data/products';

const STEPS = [
  { image: '/images/site/mood-candles.webp', alt: 'Musk Rijali attar among gold candles', title: 'Blended in Surat', text: 'Concentrated perfume oils, blended alcohol-free for a scent that stays close to the skin.' },
  { image: '/images/products/Attar/Sanaya/1.jpg', alt: 'Sanaya attar in its red gift box', title: 'Packed with care', text: 'Every attar comes in a gift-ready box with gold detailing, so it is as good to give as to keep.', light: true },
  { image: '/images/site/gift-banner.webp', alt: 'A green gift box with a copper ribbon', title: 'Delivered to your door', text: 'Order on Amazon or Flipkart and get their trusted checkout, delivery and support.', position: '78% center' },
];

export default function About() {
  const stats = [
    { value: products.length, label: 'products' },
    { value: 4, label: 'collections' },
    { value: '0%', label: 'alcohol in our attars' },
    { value: 2, label: 'marketplaces — Amazon & Flipkart' },
  ];

  return (
    <div className="container-site pt-5">
      <section className="relative min-h-[600px] overflow-hidden rounded-panel bg-sand">
        <img src="/images/site/hero-attar.webp" alt="A CEZLIAR attar bottle on a marble pedestal with agarwood and jasmine" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute bottom-[clamp(12px,3vw,32px)] left-[clamp(12px,3vw,32px)] right-[clamp(12px,3vw,32px)] flex max-w-[600px] flex-col gap-4 rounded-card bg-ivory p-[clamp(24px,3.4vw,44px)]">
          <p className="eyebrow">Our story</p>
          <h1 className="font-display text-[clamp(42px,5vw,76px)] font-light leading-none tracking-[-0.02em] text-forest-ink">Rooted in India. <em className="italic">Crafted for today.</em></h1>
          <p className="text-[17px] leading-relaxed text-body">Indian fragrances and home rituals — made with care, sold where you already shop.</p>
        </div>
      </section>

      <section className="section-gap flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-8">
        <p className="flex-[1.3_1_480px] font-display text-[clamp(28px,3vw,42px)] font-light leading-[1.3] text-forest-ink">
          A dab of attar before you step out. Dhoop at the evening prayer. Clean water at the table. <em className="italic">Small rituals that make an Indian home feel like home.</em>
        </p>
        <div className="flex flex-[1_1_360px] flex-col gap-4 text-[17px] leading-[1.7] text-body">
          <p>CEZLIAR exists to give those rituals the care they deserve. Our attars and solid perfumes are blended in Surat, Gujarat, and are completely alcohol-free — concentrated oils that sit close to the skin and last through the day.</p>
          <p>Our dhoop is charcoal-free, so the smoke stays light enough for indoor prayer and meditation. And our home and water care is made with the same attention to quality, because a calm home is about more than how it smells.</p>
        </div>
      </section>

      <dl aria-label="CEZLIAR in numbers" className="mt-[clamp(48px,6vw,80px)] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-y border-line">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1.5 py-8 pr-6">
            <dt className="text-[15px] text-muted">{s.label}</dt>
            <dd className="font-display text-[56px] font-light leading-none text-forest">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Vision and mission" className="section-gap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="flex min-h-[320px] flex-col gap-4 rounded-panel bg-forest p-[clamp(32px,4vw,56px)] text-ivory-on-forest">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">Our vision</p>
          <h2 className="font-display text-[clamp(30px,3vw,44px)] font-light leading-[1.12]">To bring India’s fragrance rituals into <em className="italic">every modern home.</em></h2>
          <p className="text-base leading-relaxed text-mist">Honest products, beautiful to live with, and easy to buy wherever you shop.</p>
        </div>
        <div className="flex min-h-[320px] flex-col gap-4 rounded-panel bg-sand p-[clamp(32px,4vw,56px)]">
          <p className="eyebrow">Our mission</p>
          <h2 className="font-display text-[clamp(30px,3vw,44px)] font-light leading-[1.12]">Make fragrance and home care people <em className="italic">trust and return to.</em></h2>
          <p className="text-base leading-relaxed text-body">Alcohol-free attars, charcoal-free dhoop and dependable home essentials — with no compromise on quality.</p>
        </div>
      </section>

      <section aria-labelledby="about-journey" className="section-gap">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="eyebrow">How we work</p>
          <h2 id="about-journey" className="heading-section">From Surat <em className="italic">to your shelf</em></h2>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4">
              <div className={`relative aspect-4/5 overflow-hidden rounded-[999px_999px_24px_24px] ${step.light ? 'bg-white' : 'bg-sand'}`}>
                <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={step.position ? { objectPosition: step.position } : undefined} />
              </div>
              <span className="font-display text-[40px] font-light leading-none text-forest">0{i + 1}</span>
              <h3 className="font-display text-[26px]">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <WhyCezliar items={WHY_CEZLIAR} title="Why choose" contained={false} />

      <section className="section-gap">
        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-panel bg-forest p-[clamp(32px,5vw,72px)] text-ivory-on-forest">
          <h2 className="flex-[1_1_420px] font-display text-[clamp(32px,3.6vw,52px)] font-light leading-[1.06]">Find the ritual <em className="italic">that is yours.</em></h2>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/shop" className="btn-light min-h-[52px]">Shop all</Link>
            <Link href="/gift-finder" className="btn-outline-light min-h-[52px]">Open gift finder</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
