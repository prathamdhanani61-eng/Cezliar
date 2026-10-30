'use client';
import { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-body font-semibold uppercase tracking-[0.18em]',
    'transition-all duration-300 rounded-full',
    'focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'select-none',
  ].join(' ');

  const variants = {
    primary: [
      'bg-primary text-white border border-primary',
      'hover:bg-primary-dark hover:border-primary-dark hover:shadow-luxury-hover',
      'active:scale-[0.98]',
    ].join(' '),

    outline: [
      'border border-primary text-primary bg-transparent',
      'hover:bg-primary hover:text-white hover:shadow-luxury-hover',
      'active:scale-[0.98]',
    ].join(' '),

    'outline-gold': [
      'border border-gold text-gold bg-transparent',
      'hover:bg-gold hover:text-white',
      'active:scale-[0.98]',
    ].join(' '),

    gold: [
      'bg-gold text-white border border-gold',
      'hover:bg-gold-dark hover:border-gold-dark hover:shadow-gold',
      'active:scale-[0.98]',
    ].join(' '),

    ghost: [
      'text-primary bg-transparent border border-transparent',
      'hover:bg-primary/8 hover:border-primary/20',
    ].join(' '),

    white: [
      'bg-white text-primary border border-white/80',
      'hover:bg-background hover:shadow-luxury',
    ].join(' '),

    dark: [
      'bg-footer text-white border border-footer',
      'hover:bg-black',
    ].join(' '),
  };

  const sizes = {
    xs: 'px-4 py-2 text-[9px] tracking-[0.2em]',
    sm: 'px-5 py-2.5 text-[10px]',
    md: 'px-7 py-3.5 text-[11px]',
    lg: 'px-9 py-4 text-xs md:text-[13px]',
    xl: 'px-12 py-5 text-sm',
    icon: 'w-10 h-10 p-0',
    'icon-lg': 'w-12 h-12 p-0',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
