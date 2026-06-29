import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-body font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-none';

  const variants = {
    primary: 'bg-primary text-white border border-primary hover:bg-[#0A3328] hover:border-[#0A3328] hover:shadow-luxury-hover',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    gold: 'bg-gold text-white border border-gold hover:bg-[#A9841C] hover:border-[#A9841C] hover:shadow-luxury-hover',
    ghost: 'text-primary hover:bg-primary/5',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[10px]',
    md: 'px-8 py-4 text-xs',
    lg: 'px-10 py-5 text-xs md:text-sm',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
