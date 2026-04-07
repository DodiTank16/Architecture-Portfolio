'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <span className="text-light/40 text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
      <div className="relative w-px h-14 bg-light/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: '50%' }}
        />
      </div>
    </div>
  );
}
