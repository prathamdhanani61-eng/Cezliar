'use client';

import { AnimatePresence, motion } from 'motion/react';
import ProductCard from './ProductCard';

// Product grid whose cards fade and slide into place when the list is filtered or sorted.
export default function AnimatedGrid({ products, badge, className, id, ...rest }) {
  return (
    <motion.div id={id} layout className={className} {...rest}>
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, delay: Math.min(i, 8) * 0.03 } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
            transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          >
            <ProductCard product={product} badge={badge} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
