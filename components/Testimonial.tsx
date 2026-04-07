'use client';

import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  delay?: number;
}

export default function Testimonial({ quote, name, role, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-dark-400 bg-dark-200 p-8 md:p-10"
    >
      {/* Decorative quote mark */}
      <span
        className="absolute top-6 right-8 font-serif text-7xl leading-none text-accent/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="font-serif text-xl md:text-2xl text-light leading-relaxed mb-8 italic relative z-10">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-px bg-accent" />
        <div>
          <p className="text-light font-sans text-sm font-medium">{name}</p>
          <p className="text-muted text-xs tracking-wide">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
