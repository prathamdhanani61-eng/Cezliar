'use client';

import { useState } from 'react';
import ProductCard from '../ProductCard';

export default function FeaturedProducts({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <section aria-labelledby="home-featured" className="container-site section-gap">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="flex flex-col gap-2.5">
          <p className="eyebrow">{current.id === 'all' ? 'Handpicked for you' : `${current.products.length} products`}</p>
          <h2 id="home-featured" className="heading-section">Featured <em className="italic">products</em></h2>
        </div>
        <div role="tablist" aria-label="Filter featured products" className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`featured-tab-${tab.id}`}
              aria-selected={tab.id === current.id}
              aria-controls="featured-panel"
              onClick={() => setActive(tab.id)}
              className={tab.id === current.id ? 'chip-active' : 'chip'}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div id="featured-panel" role="tabpanel" aria-labelledby={`featured-tab-${current.id}`} className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-7">
        {current.products.map((product) => (
          <ProductCard key={product.id} product={product} badge={current.id === 'all' ? 'new' : 'auto'} />
        ))}
      </div>
    </section>
  );
}
