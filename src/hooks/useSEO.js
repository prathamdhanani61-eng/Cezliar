import { useEffect } from 'react';

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | CEZLIAR`;
    } else {
      document.title = 'CEZLIAR | Premium Luxury Fragrance & Home Care';
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    
    if (description) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc.setAttribute('content', 'Experience pure luxury with CEZLIAR. Concentrated perfume oils, organic charcoal-free dhoop, and safe home care solutions.');
    }
  }, [title, description]);
};
