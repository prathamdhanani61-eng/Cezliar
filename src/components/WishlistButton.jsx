'use client';

import Icon from './Icon';
import { useWishlist } from '../lib/wishlist';

export default function WishlistButton({ id, name, className = '', withLabel = false }) {
  const { has, toggle } = useWishlist();
  const saved = has(id);
  const label = saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`;

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={withLabel ? undefined : label}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full transition-transform active:scale-90 ${saved ? 'text-forest' : 'text-ink'} ${className}`}
    >
      <span key={saved ? 'saved' : 'empty'} className={`inline-flex ${saved ? 'animate-pop' : ''}`}>
        <Icon name="heart" size={withLabel ? 18 : 20} filled={saved} />
      </span>
      {withLabel && <span>{saved ? 'Saved to wishlist' : 'Save to wishlist'}</span>}
    </button>
  );
}
