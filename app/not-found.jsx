import Link from 'next/link';
import ProductCard from '../src/components/ProductCard';
import { cardsByIds } from '../src/data/products';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  const popular = cardsByIds(['attar-1', 'attar-3', 'LobanDhoop-2', 'drain-1']);

  return (
    <div className="container-site pt-5">
      <section className="flex flex-wrap items-stretch overflow-hidden rounded-panel bg-sand">
        <div className="flex flex-[1.2_1_480px] flex-col justify-center gap-5 p-[clamp(36px,6vw,88px)]">
          <p className="font-display text-[clamp(96px,13vw,200px)] font-light leading-[0.85] tracking-[-0.04em] text-forest" aria-hidden="true">4<em className="italic">0</em>4</p>
          <h1 className="font-display text-[clamp(30px,3.4vw,48px)] font-light leading-[1.1]">This page has drifted away, <em className="italic">like dhoop smoke.</em></h1>
          <p className="max-w-[480px] text-[17px] leading-relaxed text-body">The link may be old or mistyped. Use the search at the top of the page, or head somewhere familiar.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">Back to home</Link>
            <Link href="/shop" className="btn-outline">Shop all</Link>
            <Link href="/contact" className="btn px-4 text-forest">Contact us</Link>
          </div>
        </div>
        <div className="relative min-h-[420px] flex-[1_1_380px] bg-forest">
          <img src="/images/site/dhoop-cutout-480.webp" alt="" className="absolute inset-x-[4%] bottom-0 top-[6%] h-[94%] w-[92%] object-contain object-bottom" />
        </div>
      </section>

      <section aria-labelledby="popular-heading" className="mt-[clamp(56px,7vw,96px)]">
        <h2 id="popular-heading" className="mb-6 font-display text-display-md font-light">Popular <em className="italic">right now</em></h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {popular.map((p) => <ProductCard key={p.id} product={p} badge="none" />)}
        </div>
      </section>
    </div>
  );
}
