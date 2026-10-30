'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '../Icon';

// `images` are { full, thumb } pairs: a large copy for the main view and a small one for thumbnails.
export default function ProductGallery({ images, name, badges = [] }) {
  const [active, setActive] = useState(0);
  const main = images[active];

  return (
    <div className="flex min-w-0 flex-[1.1_1_480px] flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-tile border border-line-soft bg-white">
        {main ? (
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={main.full}
              src={main.full}
              alt={`${name}${images.length > 1 ? ` — photo ${active + 1} of ${images.length}` : ''}`}
              fetchPriority={active === 0 ? 'high' : 'auto'}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-3 bg-placeholder text-muted">
            <Icon name="filter" size={48} strokeWidth={1.2} className="text-forest" />
            Photo coming soon
          </span>
        )}
        {badges.length > 0 && (
          <span className="absolute left-4 top-4 z-10 flex gap-1.5">
            {badges.map((b, i) => (
              <span key={b} className={`rounded-full px-3 py-1.5 text-xs font-medium ${i === 0 ? 'bg-forest text-white' : 'bg-sand text-ink'}`}>{b}</span>
            ))}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div role="group" aria-label="Product photos" className="grid grid-cols-5 gap-2.5">
          {images.map((img, i) => (
            <button
              key={img.thumb}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded-[14px] bg-white transition-[border-color,transform] hover:-translate-y-0.5 ${i === active ? 'border-2 border-forest' : 'border border-line-soft hover:border-forest'}`}
            >
              <img src={img.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
