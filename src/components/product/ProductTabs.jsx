'use client';

import { useState } from 'react';
import Icon from '../Icon';

export default function ProductTabs({ benefits = [], specifications = {}, applications = [], faqs = [] }) {
  const specs = Object.entries(specifications);
  const tabs = [
    benefits.length && { id: 'benefits', label: 'Benefits' },
    specs.length && { id: 'specs', label: 'Specifications' },
    applications.length && { id: 'use', label: 'How to use' },
    faqs.length && { id: 'faq', label: 'FAQs' },
  ].filter(Boolean);
  const [active, setActive] = useState(tabs[0]?.id);
  if (!tabs.length) return null;

  return (
    <section aria-label="Product details" className="mt-[clamp(56px,7vw,96px)]">
      <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-2 border-b border-line pb-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={t.id === active}
            aria-controls="product-tabpanel"
            onClick={() => setActive(t.id)}
            className={`min-h-[46px] rounded-full border px-5 text-[15px] ${t.id === active ? 'border-forest bg-forest font-medium text-white' : 'border-line bg-white text-ink hover:border-forest'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="product-tabpanel" role="tabpanel" aria-labelledby={`tab-${active}`} className="max-w-[920px] pt-8">
        {active === 'benefits' && (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3.5">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3.5 rounded-[18px] border border-line-soft bg-white p-5 text-base leading-snug">
                <Icon name="check" size={22} strokeWidth={1.8} className="mt-0.5 flex-none text-forest" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {active === 'specs' && (
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-6 border-t border-line">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-line py-[18px]">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {active === 'use' && (
          <ol className="flex flex-col gap-[18px]">
            {applications.map((step, i) => (
              <li key={step} className="flex items-baseline gap-5">
                <span className="min-w-[44px] font-display text-[32px] text-forest">0{i + 1}</span>
                <span className="text-[17px] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        )}
        {active === 'faq' && (
          <div className="flex flex-col gap-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="mb-2 font-display text-[22px]">{f.question}</h3>
                <p className="text-base leading-relaxed text-body">{f.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
