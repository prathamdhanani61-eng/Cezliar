import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import MarketplaceButtons from '../components/MarketplaceButtons';
import WishlistButton from '../components/WishlistButton';
import ProductShareButton from '../components/ProductShareButton';
import ProductGallery from '../components/product/ProductGallery';
import ProductTabs from '../components/product/ProductTabs';
import { CATEGORY_PAGES } from '../data/categories';
import { getProductImages, toProductCard } from '../data/products';
import { whatsappLink } from '../data/site';
import testimonials from '../data/testimonials.json';
import { formatPrice } from '../utils/format';

// Most specific collection page first, broad ones last.
const CATEGORY_PRIORITY = ['attars', 'solid-perfumes', 'dhoop', 'drain-care', 'pp-spun', 'filter-candle', 'filter-set', 'accessories', 'water-care', 'fragrances', 'home-care'];
const GROUP_ROOT = { fragrance: 'fragrances', home: 'home-care' };

// Which customer review (testimonials.json id) to show for each kind of product.
const REVIEW_BY_SUBCATEGORY = { Attar: 4, 'Solid Perfumes': 4, Dhoop: 2, 'Drain Opener': 3 };

export default function ProductDetail({ product, relatedProducts }) {
  const card = toProductCard(product);
  const images = getProductImages(product);
  const categoryId = CATEGORY_PRIORITY.find((id) => CATEGORY_PAGES[id].match(product));
  const category = CATEGORY_PAGES[categoryId];
  const root = CATEGORY_PAGES[GROUP_ROOT[category.group]];
  const facts = Object.entries(product.specifications || {}).slice(0, 3);
  const review = testimonials.find((t) => t.id === REVIEW_BY_SUBCATEGORY[product.subCategory]);
  const whatsapp = whatsappLink(`Hello CEZLIAR! I have a question about ${product.name}.`);
  const badges = [card.isBestSeller && 'Bestseller', card.isNewArrival && 'New'].filter(Boolean);
  const isFragrance = product.mainCategory === 'Fragrance World';

  const crumbs = [{ label: 'Home', href: '/' }, { label: root.title, href: root.path }];
  if (category !== root) crumbs.push({ label: category.title, href: category.path });
  crumbs.push({ label: card.shortName });

  return (
    <div className="container-site">
      <Breadcrumbs items={crumbs} />

      <section className="flex flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-8">
        <ProductGallery images={images} name={product.name} badges={badges} />

        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <p className="eyebrow">{card.tagline}</p>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-[clamp(44px,4.8vw,72px)] font-light leading-none tracking-[-0.02em]">{card.shortName}</h1>
            {product.name !== card.shortName && <p className="text-base text-muted">{product.name}</p>}
          </div>
          <div className="flex flex-wrap items-baseline gap-3.5">
            <span className="font-display text-4xl">{formatPrice(product.price)}</span>
            <span className="text-[15px] text-muted">Price on Amazon and Flipkart may vary</span>
          </div>
          <p className="text-[17px] leading-[1.7] text-body">{product.description}</p>

          {(card.notes || product.specifications?.['Scent Family']) && (
            <ul className="flex flex-wrap gap-2" aria-label="Scent notes">
              {card.notes && card.notes.split('·').map((note) => <li key={note} className="rounded-full bg-sand px-3.5 py-2 text-sm">{note.trim()}</li>)}
              {product.specifications?.['Scent Family'] && <li className="rounded-full bg-sand px-3.5 py-2 text-sm">{product.specifications['Scent Family']}</li>}
            </ul>
          )}

          {facts.length > 0 && (
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
              {facts.map(([label, value]) => (
                <div key={label} className="flex flex-col-reverse gap-1 rounded-2xl border border-line-soft bg-white p-4">
                  <dt className="text-[13px] text-muted">{label}</dt>
                  <dd className="font-display text-xl leading-tight text-forest">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <MarketplaceButtons product={card} size="lg" />

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <WishlistButton id={card.id} name={card.shortName} withLabel className="min-w-0 justify-start px-0" />
            <ProductShareButton name={product.name} url={`/product/${card.slug}`} />
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 no-underline">
                <Icon name="whatsapp" size={18} /> Ask on WhatsApp
              </a>
            )}
          </div>
          <p className="rounded-[14px] bg-sand px-4 py-3.5 text-sm leading-normal text-body">
            Delivery, payment and returns are handled by Amazon and Flipkart.
            {product.specifications?.Origin && ` Made in ${product.specifications.Origin.replace('Surat Gujarat', 'Surat, Gujarat')}.`}
          </p>
        </div>
      </section>

      <ProductTabs
        benefits={product.benefits}
        specifications={product.specifications}
        applications={product.applications}
        faqs={product.faqs}
      />

      {review && (
        <section aria-label="Customer review" className="mt-[clamp(56px,7vw,96px)] flex flex-wrap items-center gap-x-16 gap-y-6 rounded-panel bg-forest p-[clamp(32px,5vw,64px)] text-ivory-on-forest">
          <div className="flex flex-[0_1_260px] flex-col gap-2">
            <p className="font-display text-[44px] font-light leading-[1.05]">What customers <em className="italic">say</em></p>
            <span role="img" aria-label={`Rated ${review.rating} out of 5`} className="text-lg tracking-[4px] text-gold-light">{'★'.repeat(review.rating)}</span>
          </div>
          <figure className="flex flex-[1_1_420px] flex-col gap-4">
            <blockquote className="font-display text-[clamp(22px,2.4vw,30px)] font-light leading-snug">“{review.review}”</blockquote>
            <figcaption className="text-[15px] text-mist">{review.name} · {review.role}, {review.location}</figcaption>
          </figure>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-[clamp(56px,7vw,96px)]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-heading" className="font-display text-display-md font-light">
              {isFragrance ? <>Complete the <em className="italic">ritual</em></> : <>You may also <em className="italic">need</em></>}
            </h2>
            <Link href={category.path} className="py-3 text-[15px] font-medium no-underline">All {category.title.toLowerCase()} →</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
