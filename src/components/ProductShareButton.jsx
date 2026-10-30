'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function ProductShareButton({ name, url }) {
  const [copied, setCopied] = useState(false);

  const copy = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard access can be blocked; nothing else to do.
    }
  };

  const share = async () => {
    const link = `${window.location.origin}${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `Take a look at ${name} by CEZLIAR.`, url: link });
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    copy(link);
  };

  return (
    <button type="button" onClick={share} className="inline-flex min-h-[44px] items-center gap-2 text-ink" aria-live="polite">
      <Icon name={copied ? 'check' : 'share'} size={18} />
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}
