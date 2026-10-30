import Link from 'next/link';
import Icon from './Icon';
import WishlistButton from './WishlistButton';
import MarketplaceButtons from './MarketplaceButtons';
import { formatPrice } from '../utils/format';

export function ProductImage({ product, className = '', padded = true }) {
  if (!product.image) {
    return (
      <span className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-placeholder text-[13px] text-muted ${className}`}>
        <Icon name="filter" size={34} strokeWidth={1.3} className="text-forest" />
        Photo coming soon
      </span>
    );
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] ${padded ? 'p-4' : ''} ${className}`}
    />
  );
}

const badgeFor = (product, badge) => {
  if (badge === 'none') return '';
  if (badge === 'new') return product.isNewArrival ? 'New' : '';
  if (product.isBestSeller) return 'Bestseller';
  return product.isNewArrival ? 'New' : '';
};

export default function ProductCard({ product, badge = 'auto' }) {
  const url = `/product/${product.slug}`;
  const badgeText = badgeFor(product, badge);

  return (
    <article className="group flex flex-col gap-3">
      <div className="relative">
        <Link href={url} className="block aspect-square overflow-hidden rounded-card border border-line-soft bg-white" tabIndex={-1} aria-hidden="true">
          <ProductImage product={product} />
        </Link>
        {badgeText && (
          <span className="absolute left-3 top-3 rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-ink">{badgeText}</span>
        )}
        <WishlistButton id={product.id} name={product.shortName} className="absolute right-1.5 top-1.5" />
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[21px] leading-tight">
          <Link href={url} className="text-ink no-underline hover:text-forest">{product.shortName}</Link>
        </h3>
        <span className="whitespace-nowrap text-base font-medium">{formatPrice(product.price)}</span>
      </div>
      <p className="-mt-1 text-sm text-muted">{product.tagline}</p>
      <MarketplaceButtons product={product} />
    </article>
  );
}
