'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={onTouchMove}
      role="img"
      aria-label="Before and after comparison slider"
    >
      {/* After image (base) */}
      <Image src={afterSrc} alt={afterLabel} fill className="object-cover" sizes="100vw" />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeSrc} alt={beforeLabel} fill className="object-cover" sizes="100vw" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-dark">
            <path d="M5 4L1 8l4 4M11 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-4 left-4 bg-dark/60 text-light text-xs tracking-[0.2em] uppercase px-3 py-1.5 font-sans pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute bottom-4 right-4 bg-dark/60 text-light text-xs tracking-[0.2em] uppercase px-3 py-1.5 font-sans pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}
