'use client';

import { MotionConfig } from 'motion/react';

// Motion animations follow the visitor's "reduce motion" setting.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
