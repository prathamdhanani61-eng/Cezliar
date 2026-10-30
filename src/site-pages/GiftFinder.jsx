'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '../components/Icon';
import InstagramOrderLink from '../components/InstagramOrderLink';
import { GIFT_BUDGETS, GIFT_MOODS, GIFT_WHO } from '../data/giftFinder';
import { SITE, whatsappLink } from '../data/site';
import { SITE_URL } from '../utils/site';
import { formatPrice } from '../utils/format';

const DEFAULTS = { who: 'her', mood: 'floral', budget: 'any', amount: '' };
const PICK_COUNT = ['No picks', 'One pick', 'Two picks', 'Three picks'];

const TIPS = [
  { title: 'Gift-ready boxes', text: 'Every attar arrives in a box with gold detailing — no extra wrapping needed.' },
  { title: 'Pair a ritual', text: 'An attar with a matching dhoop makes a thoughtful set for Diwali, weddings and housewarmings.' },
  { title: 'We send it for you', text: `Order on WhatsApp (${SITE.whatsappDisplay}) or Instagram (@${SITE.instagramHandle}) and tell us where to deliver — we will help with the rest.` },
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
  const amountRef = useRef(null);
  const set = (key) => (id) => setAnswers((a) => ({ ...a, [key]: id }));
  const chooseBudget = (id) => {
    set('budget')(id);
    if (id === 'custom') requestAnimationFrame(() => amountRef.current?.focus());
  };

  const custom = answers.budget === 'custom';
  const amount = Number(answers.amount) || 0;
  const maxPrice = custom ? amount || Infinity : GIFT_BUDGETS.find((b) => b.id === answers.budget).max;
  const lowestPrice = Math.min(...products.map((p) => p.price));
  const budgetOptions = GIFT_BUDGETS.map((b) => (b.id === 'custom' && amount ? { ...b, hint: `Up to ${formatPrice(amount)}` } : b));
  const budgetLabel = custom ? (amount ? `Up to ${formatPrice(amount)}` : 'Not sure yet') : GIFT_BUDGETS.find((b) => b.id === answers.budget).label;

  const picks = useMemo(() => {
    const score = (p) => {
      const moodRank = p.moods.indexOf(answers.mood);
      let s = moodRank === 0 ? 0 : moodRank > 0 ? 1 : 3;
      if (answers.who === 'home' && p.collection !== 'dhoop') s += 1.5;
      if (answers.who !== 'home' && p.collection === 'dhoop') s += 0.5;
      return s;
    };
    return products.filter((p) => p.price <= maxPrice).sort((a, b) => score(a) - score(b)).slice(0, 3);
  }, [products, answers.who, answers.mood, maxPrice]);

  const whoText = GIFT_WHO.find((w) => w.id === answers.who).text;
  const details = [
    `For: ${GIFT_WHO.find((w) => w.id === answers.who).label}`,
    `Mood: ${GIFT_MOODS.find((m) => m.id === answers.mood).label}`,
    `Budget: ${budgetLabel}`,
  ];
  const line = (p) => `• ${p.name} — ${formatPrice(p.price)}\n  ${SITE_URL}/product/${p.slug}`;
  const allMessage = [
    'Hello CEZLIAR! I would like to order a gift.',
    ...details,
    '',
    ...(picks.length ? ['My picks:', ...picks.map(line)] : ['Please suggest something that fits.']),
  ].join('\n');
  const oneMessage = (p) => ['Hello CEZLIAR! I would like to order this as a gift:', line(p), '', ...details].join('\n');

  return (
    <div className="container-site pt-5">
      <section className="flex flex-wrap overflow-hidden rounded-panel bg-sand">
        <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-[clamp(32px,5vw,64px)]">
          <p className="eyebrow">Gift finder</p>
          <h1 className="font-display text-[clamp(44px,5vw,76px)] font-light leading-none tracking-[-0.02em]">Find a gift that <em className="italic">lingers.</em></h1>
          <p className="max-w-[460px] text-[17px] leading-relaxed text-body">Three quick questions. We will suggest the right attar, balm or dhoop — then order it as a gift on WhatsApp or Instagram and we will take care of the rest.</p>
        </div>
        <div className="relative min-h-[340px] flex-[1.2_1_420px]">
          <img src="/images/site/gift-banner.webp" srcSet="/images/site/gift-banner-600.webp 600w, /images/site/gift-banner.webp 1600w" sizes="(min-width: 1024px) 55vw, 100vw" alt="A green gift box with a copper ribbon beside an attar bottle" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[75%_center]" />
        </div>
      </section>

      <section aria-label="Gift finder" className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-8">
          <OptionGroup number={1} legend="Who is it for?" options={GIFT_WHO} value={answers.who} onChange={set('who')} />
          <OptionGroup number={2} legend="Which mood do they love?" options={GIFT_MOODS} value={answers.mood} onChange={set('mood')} />
          <div className="flex flex-col gap-3">
            <OptionGroup number={3} legend="What is your budget?" options={budgetOptions} value={answers.budget} onChange={chooseBudget} tall={false} />
            <AnimatePresence initial={false}>
              {custom && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="gift-budget" className="mb-2 mt-1 block text-sm font-medium">Your budget in rupees</label>
                  <div className="flex max-w-[360px] items-center rounded-full border border-line bg-white pl-5 focus-within:border-forest">
                    <span aria-hidden="true" className="text-[17px] text-muted">₹</span>
                    <input
                      ref={amountRef}
                      id="gift-budget"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={6}
                      placeholder="e.g. 600"
                      value={answers.amount}
                      onChange={(e) => setAnswers((a) => ({ ...a, amount: e.target.value.replace(/\D/g, '') }))}
                      aria-describedby="gift-budget-hint"
                      className="min-h-[52px] w-full min-w-0 rounded-full bg-transparent pl-2 pr-5 text-[17px] text-ink placeholder:text-muted focus:outline-none"
                    />
                  </div>
                  <p id="gift-budget-hint" className="mt-2 text-[13px] text-muted">We show gifts at or under this price. Our gifts start at {formatPrice(lowestPrice)}.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <aside aria-live="polite" aria-label="Your gift picks" className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px] rounded-panel bg-forest p-[clamp(24px,3vw,36px)] text-ivory-on-forest lg:sticky lg:top-28">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold-light">Our picks</p>
          <h2 className="font-display text-[clamp(28px,2.6vw,38px)] font-light leading-[1.1]">{PICK_COUNT[picks.length]} for {whoText}</h2>
          {picks.length ? (
            <ul className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {picks.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3 } }}
                    exit={{ opacity: 0, x: -24, transition: { duration: 0.15 } }}
                    className="flex items-center gap-3.5 rounded-[18px] bg-ivory p-2.5 text-ink"
                  >
                    <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className="h-[88px] w-[88px] flex-none overflow-hidden rounded-xl bg-white">
                      {p.thumb && <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-contain" />}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <h3 className="font-display text-[19px] leading-tight"><Link href={`/product/${p.slug}`} className="text-ink no-underline hover:text-forest">{p.shortName}</Link></h3>
                      <span className="text-[13px] text-muted">{p.tagline}</span>
                      <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 text-sm">
                        <span className="text-[15px] font-medium">{formatPrice(p.price)}</span>
                        <span className="inline-flex items-center gap-1">
                          <a href={whatsappLink(oneMessage(p))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 font-medium no-underline">
                            <Icon name="whatsapp" size={14} /> Order as a gift<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                          </a>
                          <InstagramOrderLink message={oneMessage(p)} className="-my-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-sand">
                            <Icon name="instagram" size={16} /><span className="sr-only">Order {p.shortName} as a gift on Instagram (opens in a new tab)</span>
                          </InstagramOrderLink>
                        </span>
                      </span>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <p className="rounded-[18px] bg-ivory p-5 text-ink">
              {custom && amount
                ? `Our gifts start at ${formatPrice(lowestPrice)}, so nothing fits ${formatPrice(amount)} yet — try a little more, or message us and we will suggest something.`
                : 'Nothing fits that budget yet — try “Any budget”, or message us for ideas.'}
            </p>
          )}
          <div className="grid gap-2.5 sm:grid-cols-2">
            <a href={whatsappLink(allMessage)} target="_blank" rel="noopener noreferrer" className="btn-light min-h-[54px] px-4">
              <Icon name="whatsapp" size={18} /> Order on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <InstagramOrderLink message={allMessage} className="btn-outline-light min-h-[54px] px-4">
              <Icon name="instagram" size={18} /> Order on Instagram<span className="sr-only"> (opens in a new tab)</span>
            </InstagramOrderLink>
          </div>
          <p className="text-center text-[13px] leading-relaxed text-mist">Gift orders go to WhatsApp {SITE.whatsappDisplay} or Instagram @{SITE.instagramHandle} — on Instagram your picks are copied, just paste them in the chat. We confirm the price and delivery with you there.</p>
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
