import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-body font-bold uppercase tracking-widest transition-all duration-300';

  const variants = {
    primary: 'bg-primary text-white hover:bg-[#5C162E] hover:shadow-luxury-hover',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    gold: 'bg-gold text-white hover:bg-[#B38D3A] hover:shadow-luxury-hover',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-12 py-5 text-base',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
