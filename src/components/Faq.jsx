'use client';

import { useId, useState } from 'react';
import Icon from './Icon';

export default function Faq({ items }) {
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <div className="flex min-w-0 flex-col border-t border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${baseId}-q${i}`}
                aria-expanded={expanded}
                aria-controls={`${baseId}-a${i}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left font-display text-[21px] text-ink"
              >
                {item.question}
                <Icon name={expanded ? 'minus' : 'plus'} size={22} className="flex-none text-forest" />
              </button>
            </h3>
            <div id={`${baseId}-a${i}`} role="region" aria-labelledby={`${baseId}-q${i}`} hidden={!expanded}>
              <p className="mb-5 max-w-[640px] text-base leading-relaxed text-body">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
