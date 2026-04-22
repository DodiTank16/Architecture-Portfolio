'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  amount?: number;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.15,
}: AnimatedSectionProps) {
  const variants: Record<string, { opacity: number; x?: number; y?: number }> = {
    up:    { opacity: 0, y: 24 },
    down:  { opacity: 0, y: -24 },
    left:  { opacity: 0, x: 24 },
    right: { opacity: 0, x: -24 },
    none:  { opacity: 0 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
