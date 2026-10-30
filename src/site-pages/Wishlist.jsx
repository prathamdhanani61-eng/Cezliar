'use client';

import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../lib/wishlist';

export default function Wishlist({ products }) {
  const { ids } = useWishlist();
  const saved = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
      <section className="flex flex-col gap-3 pb-8 pt-4">
        <p className="eyebrow">Saved on this device</p>
        <h1 className="font-display text-display-xl font-light">Your <em className="italic">wishlist</em></h1>
      </section>
      {saved.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-5 gap-y-7">
          {saved.map((p) => <ProductCard key={p.id} product={p} badge="none" />)}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-panel bg-sand p-[clamp(32px,5vw,64px)] text-center">
          <p className="font-display text-[28px]">Nothing saved yet</p>
          <p className="max-w-[440px] text-base text-body">Tap the heart on any product to keep it here for later. Your wishlist is saved in this browser.</p>
          <Link href="/shop" className="btn-primary">Browse products</Link>
        </div>
      )}
    </div>
  );
}
