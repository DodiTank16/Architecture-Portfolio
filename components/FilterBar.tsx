'use client';

import { cn } from '@/lib/utils';
import { type ProjectCategory } from '@/lib/projects';

const categories: Array<ProjectCategory | 'All'> = ['All', 'Residential', 'Commercial', 'Interior'];

interface FilterBarProps {
  active: ProjectCategory | 'All';
  onChange: (cat: ProjectCategory | 'All') => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans border transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent',
            active === cat
              ? 'border-accent text-dark bg-accent'
              : 'border-dark-500 text-muted hover:border-light-300 hover:text-light-300'
          )}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
