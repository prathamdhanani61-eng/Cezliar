'use client';

import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Icon from '../components/Icon';
import MarketplaceBand from '../components/MarketplaceBand';
import { SITE, whatsappLink } from '../data/site';

const TOPICS = ['Product question', 'Gifting help', 'An order on Amazon or Flipkart', 'Bulk or corporate gifting', 'Something else'];

const QUICK_ANSWERS = [
  { q: 'Where can I buy?', a: 'All CEZLIAR products are sold on Amazon and Flipkart. Each product page links straight to its listing.' },
  { q: 'Questions about an order?', a: 'Delivery, returns and refunds are handled by the marketplace you ordered from — start from your order page there.' },
  { q: 'Are the attars alcohol-free?', a: 'Yes — every attar and solid perfume is 100% alcohol-free and lasts 8–12 hours on skin.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' });
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const canSend = Boolean(SITE.whatsappNumber || SITE.email);
  const chat = whatsappLink('Hello CEZLIAR!');

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
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
    SITE.email && { icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    SITE.phone && { icon: 'phone', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^\d+]/g, '')}` },
    SITE.hours && { icon: 'clock', label: 'Hours', value: SITE.hours },
    SITE.address && { icon: 'pin', label: 'Address', value: SITE.address },
  ].filter(Boolean);

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 pb-10 pt-4">
        <div className="flex flex-[1_1_520px] flex-col gap-3">
          <p className="eyebrow">Contact us</p>
          <h1 className="font-display text-display-xl font-light">We would love to <em className="italic">hear from you.</em></h1>
        </div>
        <p className="max-w-[440px] flex-[1_1_340px] text-[17px] leading-relaxed text-body">
          Questions about a scent, a gift or an order? Write to us{SITE.whatsappNumber ? ' — or for the quickest reply, message us on WhatsApp' : ''}.
        </p>
      </section>

      <section className="flex flex-wrap items-stretch gap-6">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
          <div className="flex flex-col gap-3.5 rounded-tile bg-forest p-7 text-ivory-on-forest">
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-ivory-on-forest text-forest">
              <Icon name={chat ? 'whatsapp' : 'instagram'} size={24} />
            </span>
            <h2 className="font-display text-[26px]">{chat ? 'Chat on WhatsApp' : 'Message us on Instagram'}</h2>
            <p className="text-[15px] leading-relaxed text-mist">The fastest way to get help with products, gifting and orders.</p>
            <a href={chat || SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-light self-start">
              {chat ? 'Start a chat' : 'Open Instagram'} <Icon name="arrow-right" size={16} />
            </a>
          </div>
          {details.length > 0 && (
            <ul className="rounded-tile border border-line-soft bg-white px-6 py-2">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4 border-b border-line-soft py-[18px] last:border-b-0">
                  <Icon name={d.icon} size={22} className="mt-0.5 flex-none text-forest" />
                  <div>
                    <p className="mb-0.5 text-[13px] text-muted">{d.label}</p>
                    {d.href ? <a href={d.href} className="text-base no-underline">{d.value}</a> : <p className="text-base leading-normal">{d.value}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex min-w-0 flex-[1.4_1_480px] flex-col gap-5 rounded-tile border border-line-soft bg-white p-[clamp(24px,3.4vw,44px)]">
          <h2 className="font-display text-[clamp(28px,2.6vw,38px)] font-light">Send us a <em className="italic">message</em></h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium">Your name
              <input required type="text" autoComplete="name" value={form.name} onChange={update('name')} placeholder="Full name" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">Email
              <input required type="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium"><span>Phone <span className="font-normal text-muted">(optional)</span></span>
              <input type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} placeholder="+91" className="field font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">Topic
              <select value={form.topic} onChange={update('topic')} className="field font-normal">
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium">Message
            <textarea required rows={6} value={form.message} onChange={update('message')} placeholder="How can we help?" className="field resize-y py-3.5 font-normal" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {SITE.whatsappNumber ? 'Your message opens in WhatsApp, ready to send.' : SITE.email ? 'Your message opens in your email app, ready to send.' : 'Online messages are being set up — please reach us on Instagram for now.'}
            </p>
            <button type="submit" disabled={!canSend} className="btn-primary min-h-[54px] px-8 disabled:cursor-not-allowed disabled:opacity-50">Send message</button>
          </div>
        </form>
      </section>

      <section aria-labelledby="contact-faq" className="mt-[clamp(56px,7vw,96px)] rounded-panel bg-sand p-[clamp(32px,5vw,64px)]">
        <h2 id="contact-faq" className="mb-7 font-display text-display-md font-light">Quick <em className="italic">answers</em></h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {QUICK_ANSWERS.map((item) => (
            <div key={item.q} className="flex flex-col gap-2 rounded-card bg-ivory p-6">
              <h3 className="font-display text-[21px]">{item.q}</h3>
              <p className="text-[15px] leading-relaxed text-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <MarketplaceBand />
    </div>
  );
}
