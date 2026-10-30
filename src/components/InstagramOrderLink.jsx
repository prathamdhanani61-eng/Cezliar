'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon';
import { copyText } from '../lib/clipboard';
import { SITE } from '../data/site';

// Instagram can't pre-fill a DM, so the order message is copied before the chat opens
// and a toast tells the visitor to paste it.
export default function InstagramOrderLink({ message, className = '', children }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!copied) return undefined;
    const id = window.setTimeout(() => setCopied(false), 5000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <>
      <a href={SITE.instagramDm} target="_blank" rel="noopener noreferrer" onClick={() => setCopied(copyText(message))} className={className}>
        {children}
      </a>
      {mounted && createPortal(
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-6 z-[60] flex justify-center">
          <AnimatePresence>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="flex max-w-[460px] items-start gap-2.5 rounded-[18px] bg-ink px-5 py-3.5 text-sm leading-snug text-white shadow-lg"
              >
                <Icon name="check" size={18} className="mt-px flex-none text-gold-light" />
                Order details copied — paste them in the Instagram chat with @{SITE.instagramHandle}.
              </motion.p>
            )}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </>
  );
}
