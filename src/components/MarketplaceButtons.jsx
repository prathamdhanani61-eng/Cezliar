import Link from 'next/link';

// Amazon / Flipkart links for a product. Falls back to the product page
// when no marketplace link has been added yet.
export default function MarketplaceButtons({ product, size = 'md', tone = 'light' }) {
  const height = size === 'lg' ? 'min-h-[56px] text-base' : 'min-h-[44px] text-sm';
  const solid = tone === 'dark' ? 'bg-ivory-on-forest text-forest-ink hover:bg-white' : 'bg-ink text-white hover:bg-forest';
  const outline = tone === 'dark'
    ? 'border border-ivory-on-forest text-ivory-on-forest hover:bg-ivory-on-forest hover:text-forest-ink'
    : 'border border-ink text-ink hover:bg-ink hover:text-white';
  const base = `flex flex-1 items-center justify-center rounded-full px-3 font-medium no-underline transition-colors ${height}`;
  const prefix = size === 'lg' ? 'Buy on ' : '';

  if (!product.amazon && !product.flipkart) {
    return (
      <Link href={`/product/${product.slug}`} className={`${base} ${outline}`}>View details</Link>
    );
  }

  return (
    <div className={`flex gap-2 ${size === 'lg' ? 'flex-col' : ''}`}>
      {product.amazon && (
        <a href={product.amazon} target="_blank" rel="noopener noreferrer" className={`${base} ${solid}`}>
          {prefix}Amazon <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {product.flipkart && (
        <a href={product.flipkart} target="_blank" rel="noopener noreferrer" className={`${base} ${outline}`}>
          {prefix}Flipkart <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
