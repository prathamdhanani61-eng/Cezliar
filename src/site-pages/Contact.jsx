'use client';

import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Icon from '../components/Icon';
import OrderBand from '../components/OrderBand';
import { SITE, whatsappLink } from '../data/site';

const TOPICS = ['Place an order', 'Order a gift', 'Product question', 'An order on Amazon or Flipkart', 'Bulk or corporate gifting', 'Something else'];

const QUICK_ANSWERS = [
  { q: 'How can I order?', a: `Buy on Amazon or Flipkart, or order directly from us on WhatsApp (${SITE.whatsappDisplay}) or Instagram (@${SITE.instagramHandle}).` },
  { q: 'Can you send a gift for me?', a: 'Yes. Gift orders are handled personally on WhatsApp — tell us who it is for and where to send it.' },
  { q: 'Questions about a marketplace order?', a: 'Delivery, returns and refunds for Amazon and Flipkart orders are handled by the marketplace — start from your order page there.' },
  { q: 'Are the attars alcohol-free?', a: 'Yes — every attar and solid perfume is 100% alcohol-free and lasts 8–12 hours on skin.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' });
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const chat = whatsappLink('Hello CEZLIAR!');

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      ...(form.email ? [`Email: ${form.email}`] : []),
      ...(form.phone ? [`Phone: ${form.phone}`] : []),
      `Topic: ${form.topic}`,
      '',
      form.message,
    ].join('\n');
    if (SITE.whatsappNumber) {
      window.open(whatsappLink(`Hello CEZLIAR!\n${lines}`), '_blank', 'noopener');
    } else if (SITE.email) {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${form.topic} — ${form.name}`)}&body=${encodeURIComponent(lines)}`;
    }
  };

  const details = [
    { icon: 'whatsapp', label: 'WhatsApp orders & gifts', value: SITE.whatsappDisplay, href: chat },
    SITE.phone && SITE.phone !== SITE.whatsappDisplay && { icon: 'phone', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^\d+]/g, '')}` },
    { icon: 'instagram', label: 'Instagram', value: `@${SITE.instagramHandle}`, href: SITE.instagram },
    SITE.email && { icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    SITE.hours && { icon: 'clock', label: 'Hours', value: SITE.hours },
    SITE.address && { icon: 'pin', label: 'Based in', value: SITE.address },
  ].filter(Boolean);

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 pb-10 pt-4">
        <div className="flex flex-[1_1_520px] flex-col gap-3">
          <p className="eyebrow">Contact &amp; orders</p>
          <h1 className="font-display text-display-xl font-light">We would love to <em className="italic">hear from you.</em></h1>
        </div>
        <p className="max-w-[440px] flex-[1_1_340px] text-[17px] leading-relaxed text-body">
          Questions about a scent, a gift or an order? Message us on WhatsApp or Instagram — you can also place your order there.
        </p>
      </section>

      <section className="flex flex-wrap items-stretch gap-6">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
          <div data-reveal className="flex flex-col gap-3.5 rounded-tile bg-forest p-7 text-ivory-on-forest">
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-ivory-on-forest text-forest">
              <Icon name="whatsapp" size={24} />
            </span>
            <h2 className="font-display text-[26px]">Order on WhatsApp</h2>
            <p className="text-[15px] leading-relaxed text-mist">The fastest way to order, send a gift or ask a question. Message {SITE.whatsappDisplay}.</p>
            <div className="flex flex-wrap gap-2">
              <a href={chat} target="_blank" rel="noopener noreferrer" className="btn-light">
                Start a chat <Icon name="arrow-right" size={16} />
              </a>
              <a href={SITE.instagramDm} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <Icon name="instagram" size={16} /> Instagram DM
              </a>
            </div>
          </div>
          <ul className="rounded-tile border border-line-soft bg-white px-6 py-2">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-4 border-b border-line-soft py-[18px] last:border-b-0">
                <Icon name={d.icon} size={22} className="mt-0.5 flex-none text-forest" />
                <div>
                  <p className="mb-0.5 text-[13px] text-muted">{d.label}</p>
                  {d.href
                    ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-base no-underline">{d.value}</a>
                    : <p className="text-base leading-normal">{d.value}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="flex min-w-0 flex-[1.4_1_480px] flex-col gap-5 rounded-tile border border-line-soft bg-white p-[clamp(24px,3.4vw,44px)]">
          <h2 className="font-display text-[clamp(28px,2.6vw,38px)] font-light">Send us a <em className="italic">message</em></h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium">Your name
              <input required type="text" name="name" autoComplete="name" value={form.name} onChange={update('name')} placeholder="Full name" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium"><span>Phone <span className="font-normal text-muted">(optional)</span></span>
              <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={update('phone')} placeholder="+91" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium"><span>Email <span className="font-normal text-muted">(optional)</span></span>
              <input type="email" name="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">Topic
              <select name="topic" value={form.topic} onChange={update('topic')} className="field font-normal">
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium">Message
            <textarea required name="message" rows={6} value={form.message} onChange={update('message')} placeholder="Which product, how many, and anything else we should know" className="field resize-y py-3.5 font-normal" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Your message opens in WhatsApp, ready to send to {SITE.whatsappDisplay}.</p>
            <button type="submit" className="btn-primary min-h-[54px] px-8"><Icon name="whatsapp" size={18} /> Send on WhatsApp</button>
          </div>
        </form>
      </section>

      <section aria-labelledby="contact-faq" className="mt-[clamp(56px,7vw,96px)] rounded-panel bg-sand p-[clamp(32px,5vw,64px)]">
        <h2 id="contact-faq" data-reveal className="mb-7 font-display text-display-md font-light">Quick <em className="italic">answers</em></h2>
        <div data-reveal-stagger className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {QUICK_ANSWERS.map((item) => (
            <div key={item.q} className="flex flex-col gap-2 rounded-card bg-ivory p-6">
              <h3 className="font-display text-[21px]">{item.q}</h3>
              <p className="text-[15px] leading-relaxed text-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <OrderBand />
    </div>
  );
}
