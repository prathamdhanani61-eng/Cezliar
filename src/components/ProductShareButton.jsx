'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { getProductUrl } from '../utils/product';

export default function ProductShareButton({ product }) {
  const [copied, setCopied] = useState(false);

  const shareProduct = async () => {
    const url = `${window.location.origin}${getProductUrl(product)}`;
    const shareData = { title: product.name, text: `Take a look at ${product.name} by CEZLIAR.`, url };
    try {
      if (navigator.share) {
        let imageFile;
        if (navigator.canShare && product.image) {
          const response = await fetch(product.image);
          const blob = await response.blob();
          imageFile = new File([blob], 'cezliar-product.jpg', { type: blob.type || 'image/jpeg' });
        }
        if (imageFile && navigator.canShare({ files: [imageFile] })) {
          await navigator.share({ ...shareData, files: [imageFile] });
        } else {
          await navigator.share(shareData);
        }
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error?.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {}
    }
  };

  return (
    <button type="button" onClick={shareProduct} className="product-share-button" aria-label={`Share ${product.name} with its image`}>
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      <span>{copied ? 'Link copied' : 'Share product'}</span>
    </button>
  );
}
