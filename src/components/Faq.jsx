'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
                className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left font-display text-[21px] text-ink hover:text-forest"
              >
                {item.question}
                <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex-none text-forest">
                  <Icon name="plus" size={22} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`${baseId}-a${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mb-5 max-w-[640px] text-base leading-relaxed text-body">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
