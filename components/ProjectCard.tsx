'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[4/3] bg-dark-300 mb-4">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="border border-accent text-accent text-xs tracking-[0.25em] uppercase px-5 py-2.5 font-sans translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              View Project
            </span>
          </div>

          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="bg-dark/70 backdrop-blur-sm text-accent text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-light group-hover:text-accent transition-colors duration-300 mb-1">
              {project.title}
            </h3>
            <p className="text-muted text-xs tracking-wide font-sans">
              {project.location} &middot; {project.year}
            </p>
          </div>
          <span className="mt-1 text-muted text-xs tracking-widest font-sans shrink-0">
            {project.area}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
