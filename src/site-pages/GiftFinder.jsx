'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { GIFT_BUDGETS, GIFT_MOODS, GIFT_WHO } from '../data/giftFinder';
import { whatsappLink } from '../data/site';
import { formatPrice } from '../utils/format';

const DEFAULTS = { who: 'her', mood: 'floral', budget: 'any' };

const TIPS = [
  { title: 'Gift-ready boxes', text: 'Every attar arrives in a box with gold detailing — no extra wrapping needed.' },
  { title: 'Pair a ritual', text: 'An attar with a matching dhoop makes a thoughtful set for Diwali, weddings and housewarmings.' },
  { title: 'Ship it to them', text: 'Order on Amazon or Flipkart and send it straight to their address.' },
];

function OptionGroup({ number, legend, options, value, onChange, tall = true }) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-3.5 flex items-center gap-3 font-display text-[26px]">
        <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest font-sans text-[15px] text-white">{number}</span>
        {legend}
      </legend>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`flex flex-col gap-1 rounded-[18px] border px-4 py-3.5 text-left transition-colors ${tall ? 'min-h-[84px]' : 'min-h-[64px] justify-center'} ${active ? 'border-forest bg-forest text-white' : 'border-line bg-white text-ink hover:border-forest'}`}
            >
              <span className="text-[17px] font-medium">{o.label}</span>
              {o.hint && <span className={`text-[13px] ${active ? 'text-mist' : 'text-muted'}`}>{o.hint}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function GiftFinder({ products }) {
  const [answers, setAnswers] = useState(DEFAULTS);
  const set = (key) => (id) => setAnswers((a) => ({ ...a, [key]: id }));

  const picks = useMemo(() => {
    const max = GIFT_BUDGETS.find((b) => b.id === answers.budget).max;
    const score = (p) => {
      const moodRank = p.moods.indexOf(answers.mood);
      let s = moodRank === 0 ? 0 : moodRank > 0 ? 1 : 3;
      if (answers.who === 'home' && p.collection !== 'dhoop') s += 1.5;
      if (answers.who !== 'home' && p.collection === 'dhoop') s += 0.5;
      return s;
    };
    return products.filter((p) => p.price <= max).sort((a, b) => score(a) - score(b)).slice(0, 3);
  }, [products, answers]);

  const whoText = GIFT_WHO.find((w) => w.id === answers.who).text;
  const message = [
    'Hello CEZLIAR! I am looking for a gift.',
    `For: ${GIFT_WHO.find((w) => w.id === answers.who).label}`,
    `Mood: ${GIFT_MOODS.find((m) => m.id === answers.mood).label}`,
    `Budget: ${GIFT_BUDGETS.find((b) => b.id === answers.budget).label}`,
    picks.length ? `I like: ${picks.map((p) => `${p.shortName} (${formatPrice(p.price)})`).join(', ')}` : '',
  ].filter(Boolean).join('\n');
  const whatsapp = whatsappLink(message);

  return (
    <div className="container-site pt-5">
      <section className="flex flex-wrap overflow-hidden rounded-panel bg-sand">
        <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-[clamp(32px,5vw,64px)]">
          <p className="eyebrow">Gift finder</p>
          <h1 className="font-display text-[clamp(44px,5vw,76px)] font-light leading-none tracking-[-0.02em]">Find a gift that <em className="italic">lingers.</em></h1>
          <p className="max-w-[460px] text-[17px] leading-relaxed text-body">Three quick questions. We will suggest the right attar, balm or dhoop{whatsapp ? ' — and you can send your picks to us on WhatsApp for help' : ''}.</p>
        </div>
        <div className="relative min-h-[340px] flex-[1.2_1_420px]">
          <img src="/images/site/gift-banner.webp" alt="A green gift box with a copper ribbon beside an attar bottle" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[75%_center]" />
        </div>
      </section>

      <section aria-label="Gift finder" className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-8">
          <OptionGroup number={1} legend="Who is it for?" options={GIFT_WHO} value={answers.who} onChange={set('who')} />
          <OptionGroup number={2} legend="Which mood do they love?" options={GIFT_MOODS} value={answers.mood} onChange={set('mood')} />
          <OptionGroup number={3} legend="What is your budget?" options={GIFT_BUDGETS} value={answers.budget} onChange={set('budget')} tall={false} />
        </div>

        <aside aria-live="polite" aria-label="Your gift picks" className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px] rounded-panel bg-forest p-[clamp(24px,3vw,36px)] text-ivory-on-forest lg:sticky lg:top-40">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">Our picks</p>
          <h2 className="font-display text-[clamp(28px,2.6vw,38px)] font-light leading-[1.1]">Three picks for {whoText}</h2>
          {picks.length ? (
            <ul className="flex flex-col gap-2.5">
              {picks.map((p) => (
                <li key={p.id} className="flex items-center gap-3.5 rounded-[18px] bg-ivory p-2.5 text-ink">
                  <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className="h-[88px] w-[88px] flex-none overflow-hidden rounded-xl bg-white">
                    {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-contain" />}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h3 className="font-display text-[19px] leading-tight"><Link href={`/product/${p.slug}`} className="text-ink no-underline hover:text-forest">{p.shortName}</Link></h3>
                    <span className="text-[13px] text-muted">{p.tagline}</span>
                    <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 text-sm">
                      <span className="text-[15px] font-medium">{formatPrice(p.price)}</span>
                      {p.amazon && <a href={p.amazon} target="_blank" rel="noopener noreferrer" className="py-1 font-medium no-underline">Amazon ↗</a>}
                      {p.flipkart && <a href={p.flipkart} target="_blank" rel="noopener noreferrer" className="py-1 font-medium no-underline">Flipkart ↗</a>}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-[18px] bg-ivory p-5 text-ink">Nothing fits that budget yet — try “Any budget”.</p>
          )}
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light min-h-[54px]">
              <Icon name="whatsapp" size={18} /> Send my picks on WhatsApp
            </a>
          )}
          <button type="button" onClick={() => setAnswers(DEFAULTS)} className="min-h-[44px] self-center px-4 text-sm text-ivory-on-forest underline">Start over</button>
        </aside>
      </section>

      <section aria-label="Gifting tips" className="mt-[clamp(56px,7vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {TIPS.map((tip, i) => (
          <div key={tip.title} className="flex flex-col gap-2.5 rounded-tile border border-line-soft bg-white p-7">
            <span className="font-display text-[40px] font-light leading-none text-forest">0{i + 1}</span>
            <h3 className="font-display text-[22px]">{tip.title}</h3>
            <p className="text-[15px] leading-relaxed text-body">{tip.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
