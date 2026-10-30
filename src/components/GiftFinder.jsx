'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Gift, MessageCircle, Sparkles } from 'lucide-react';

const budgets = [500, 1000, 2500, 5000, 15000];
const styles = [
  { value: 'Any', label: 'Show me ideas' },
  { value: 'Attar', label: 'Attars' },
  { value: 'Solid Perfumes', label: 'Solid perfumes' },
  { value: 'Dhoop', label: 'Dhoop & rituals' },
  { value: 'Home Care', label: 'Home & water care' },
];

export default function GiftFinder({ products }) {
  const [budget, setBudget] = useState(1000);
  const [style, setStyle] = useState('Any');
  const [recipient, setRecipient] = useState('Someone special');
  const [occasion, setOccasion] = useState('Just because');
  const [customRequest, setCustomRequest] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const suggestions = useMemo(() => {
    const eligible = products
      .filter((product) => Number(product.price) <= budget)
      .filter((product) => style !== 'Any' || product.mainCategory === 'Fragrance World')
      .filter((product) => style === 'Any' || product.subCategory === style || (style === 'Home Care' && product.mainCategory === 'Home Care'))
      .sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)) || Number(a.price) - Number(b.price));
    if (style !== 'Any') return eligible.slice(0, 4);
    const categoryLeads = ['Attar', 'Solid Perfumes', 'Dhoop']
      .map((category) => eligible.find((product) => product.subCategory === category))
      .filter(Boolean);
    const selected = new Set(categoryLeads.map((product) => product.id));
    return [...categoryLeads, ...eligible.filter((product) => !selected.has(product.id))].slice(0, 4);
  }, [budget, products, style]);

  const selectedProducts = suggestions.filter((product) => selectedIds.includes(product.id));
  const selectedSignature = selectedProducts.map((product) => `${product.name} (₹${Number(product.price).toLocaleString('en-IN')})`).join(', ');
  const message = [
    'Hello CEZLIAR! I need help choosing a gift.',
    `Budget: up to ₹${Number(budget).toLocaleString('en-IN')}`,
    `For: ${recipient}`,
    `Occasion: ${occasion}`,
    `Style: ${styles.find((item) => item.value === style)?.label}`,
    selectedSignature ? `Products I like: ${selectedSignature}` : 'Please suggest a custom gift from your catalog.',
    customRequest.trim() ? `My custom request: ${customRequest.trim()}` : '',
  ].filter(Boolean).join('\n');
  const whatsappUrl = whatsappNumber && (selectedProducts.length > 0 || customRequest.trim())
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;

  const toggleProduct = (id) => setSelectedIds((current) => current.includes(id)
    ? current.filter((selectedId) => selectedId !== id)
    : [...current, id]);

  return (
    <section className="gift-finder-section" id="gift-finder" aria-labelledby="gift-finder-heading">
      <div className="gift-finder-wrap">
        <div className="gift-finder-intro">
          <span className="gift-eyebrow"><Gift size={15} /> THE CEZLIAR GIFT FINDER</span>
          <h2 id="gift-finder-heading">A thoughtful gift,<br /><em>made personal.</em></h2>
          <p>Choose a budget and a style. We’ll suggest real CEZLIAR products, or help you put together a custom gift.</p>
          <div className="gift-trust"><Sparkles size={16} /> Recommendations come from the current CEZLIAR product collection.</div>
        </div>

        <div className="gift-finder-panel">
          <div className="gift-controls">
            <label>My budget
              <select value={budget} onChange={(event) => { setBudget(Number(event.target.value)); setSelectedIds([]); }}>
                {budgets.map((amount) => <option value={amount} key={amount}>Up to ₹{amount.toLocaleString('en-IN')}</option>)}
              </select>
            </label>
            <label>Gift style
              <select value={style} onChange={(event) => { setStyle(event.target.value); setSelectedIds([]); }}>
                {styles.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label>For
              <select value={recipient} onChange={(event) => setRecipient(event.target.value)}>
                {['Someone special', 'Partner', 'Parent or family', 'Friend', 'Colleague or client', 'Myself'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Occasion
              <select value={occasion} onChange={(event) => setOccasion(event.target.value)}>
                {['Just because', 'Birthday', 'Anniversary', 'Festive occasion', 'Thank you', 'Corporate gifting'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="gift-suggestions-heading"><h3>Ideas for your budget</h3><span>Select one or more</span></div>
          {suggestions.length ? (
            <div className="gift-suggestions">
              {suggestions.map((product) => {
                const selected = selectedIds.includes(product.id);
                return (
                  <button type="button" key={product.id} className={`gift-option${selected ? ' is-selected' : ''}`} onClick={() => toggleProduct(product.id)} aria-pressed={selected}>
                    <span className="gift-option-image"><img src={product.image} alt="" loading="lazy" /></span>
                    <span className="gift-option-copy"><strong>{product.name}</strong><small>₹{Number(product.price).toLocaleString('en-IN')}</small></span>
                    <span className="gift-check" aria-hidden="true">{selected ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          ) : <p className="gift-no-results">No products match that combination yet. Choose “Show me ideas” or a higher budget.</p>}

          <label className="gift-custom-request">Or tell us what you have in mind
            <textarea value={customRequest} onChange={(event) => setCustomRequest(event.target.value)} placeholder="For example: a calming fragrance gift set under ₹2,000" rows={2} />
          </label>
          {whatsappUrl ? (
            <a className="gift-whatsapp-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Continue on WhatsApp <ArrowRight size={16} />
            </a>
          ) : (
            <div className="gift-number-needed" role="status">
              <MessageCircle size={18} /> {whatsappNumber ? 'Select a suggestion or describe a custom gift to continue.' : 'WhatsApp gift enquiries will be enabled when the business number is added.'}
            </div>
          )}
        </div>
      </div>
      <div className="gift-custom-note">Want something unique? Share your budget and idea; our team can suggest a custom combination from the CEZLIAR collection.</div>
    </section>
  );
}
