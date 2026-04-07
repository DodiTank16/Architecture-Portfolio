'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import AnimatedSection from '@/components/AnimatedSection';
import { projects, type ProjectCategory } from '@/lib/projects';

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | 'All'>('All');

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 px-6 lg:px-10 bg-dark border-b border-dark-400">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-5">
              Our Portfolio
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl text-light mb-6">
              Selected Works
            </h1>
            <p className="text-light-300 text-base max-w-lg leading-relaxed">
              Six years of residential, commercial, and interior projects — each one shaped by the same
              commitment to excellence, craft, and client partnership.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-dark">
        <div className="mx-auto max-w-7xl">
          {/* Filter bar */}
          <AnimatedSection className="mb-12">
            <FilterBar active={active} onChange={setActive} />
          </AnimatedSection>

          {/* Project count */}
          <p className="text-muted text-xs tracking-[0.2em] uppercase font-sans mb-10">
            Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid with AnimatePresence for filter transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p className="text-muted font-serif text-2xl">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
