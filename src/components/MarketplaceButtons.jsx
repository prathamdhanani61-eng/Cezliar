import Icon from './Icon';

// Amazon / Flipkart buttons for a product, plus a compact WhatsApp order button
// on cards. Product pages show WhatsApp and Instagram separately (DirectOrder).
export default function MarketplaceButtons({ product, size = 'md', tone = 'light', whatsapp = size !== 'lg' }) {
  const height = size === 'lg' ? 'min-h-[56px] text-base' : 'min-h-[44px] text-sm';
  const solid = tone === 'dark' ? 'bg-ivory-on-forest text-forest-ink hover:bg-white' : 'bg-ink text-white hover:bg-forest';
  const outline = tone === 'dark'
    ? 'border border-ivory-on-forest text-ivory-on-forest hover:bg-ivory-on-forest hover:text-forest-ink'
    : 'border border-ink text-ink hover:bg-ink hover:text-white';
  const base = `flex flex-1 items-center justify-center gap-1 rounded-full px-3 font-medium no-underline transition-colors ${height}`;
  const prefix = size === 'lg' ? 'Buy on ' : '';
  const newTab = <span className="sr-only"> (opens in a new tab)</span>;

  return (
    <div className={`flex gap-2 ${size === 'lg' ? 'flex-col' : ''}`}>
      <a href={product.amazon} target="_blank" rel="noopener noreferrer" className={`${base} ${solid}`}>
        {prefix}Amazon <span aria-hidden="true">↗</span>{newTab}
      </a>
      <a href={product.flipkart} target="_blank" rel="noopener noreferrer" className={`${base} ${outline}`}>
        {prefix}Flipkart <span aria-hidden="true">↗</span>{newTab}
      </a>
      {whatsapp && product.whatsapp && (
        <a
          href={product.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${product.shortName || product.name} on WhatsApp (opens in a new tab)`}
          title="Order on WhatsApp"
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors ${tone === 'dark' ? 'border-ivory-on-forest text-ivory-on-forest hover:bg-ivory-on-forest hover:text-forest-ink' : 'border-forest text-forest hover:bg-forest hover:text-white'}`}
        >
          <Icon name="whatsapp" size={18} />
        </a>
      )}
    </div>
  );
}
