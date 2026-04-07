'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, projects } from '@/lib/projects';
import AnimatedSection from '@/components/AnimatedSection';
import Testimonial from '@/components/Testimonial';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import LoadingSpinner from '@/components/LoadingSpinner';
import { use } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ThreeDViewer = dynamic(() => import('@/components/ThreeDViewer'), {
  ssr: false,
  loading: () => <LoadingSpinner label="Loading 3D viewer…" />,
});

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Image reveal
      gsap.utils.toArray<HTMLElement>('.reveal-image').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });

      // Text reveals
      gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Horizontal scroll for feature tags
      const tagsEl = document.querySelector('.feature-tags');
      if (tagsEl) {
        gsap.from(tagsEl.children, {
          x: 30,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: tagsEl, start: 'top 85%' },
        });
      }
    },
    { scope: containerRef }
  );

  const nextProject = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <div ref={containerRef}>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

        {/* Category tag */}
        <div className="absolute top-28 left-6 lg:left-16">
          <span className="text-accent text-[11px] tracking-[0.3em] uppercase font-sans border border-accent/40 px-3 py-1.5">
            {project.category}
          </span>
        </div>

        {/* Hero content */}
        <div ref={heroTextRef} className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl lg:text-7xl text-light mb-6 max-w-2xl"
            >
              {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6 text-sm text-light-300 font-sans"
            >
              <span>{project.location}</span>
              <span className="text-dark-500">|</span>
              <span>{project.year}</span>
              <span className="text-dark-500">|</span>
              <span>{project.area}</span>
              <span className="text-dark-500">|</span>
              <span className="text-accent">{project.budget}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Project overview ─────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Tagline */}
            <div className="lg:col-span-1">
              <div className="section-divider" />
              <p className="reveal-text font-serif text-2xl text-light-200 italic leading-snug mb-8">
                &ldquo;{project.tagline}&rdquo;
              </p>
              {/* Features */}
              <div className="space-y-3">
                {project.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm text-muted">
                    <span className="text-accent mt-0.5">—</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview text */}
            <div className="lg:col-span-2 prose-dark">
              <h2 className="reveal-text font-serif text-3xl lg:text-4xl text-light mb-8">Overview</h2>
              <p className="reveal-text">{project.overview}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image gallery ────────────────────────── */}
      <section className="py-4 px-4 lg:px-10 bg-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((src, i) => (
              <div
                key={i}
                className="reveal-image relative aspect-[4/3] overflow-hidden bg-dark-300"
                style={{ clipPath: 'inset(0 0 0 0)' }}
              >
                <Image
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Viewer ────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-10">
            <div className="section-divider" />
            <h2 className="font-serif text-3xl lg:text-4xl text-light">3D Exploration</h2>
            <p className="text-muted text-sm mt-2">Drag to rotate — scroll to zoom</p>
          </AnimatedSection>
          <div className="aspect-[16/9] w-full">
            <ThreeDViewer category={project.category} />
          </div>
        </div>
      </section>

      {/* ── Design process ───────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="section-divider" />
              <h2 className="font-serif text-3xl lg:text-4xl text-light mb-8">Design Process</h2>
              <p className="text-light-300 leading-relaxed prose-dark">{project.process}</p>
            </AnimatedSection>

            {/* Floor plan */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="relative aspect-square overflow-hidden reveal-image" style={{ clipPath: 'inset(0 0 0 0)' }}>
                <Image
                  src={project.floorPlanImage}
                  alt={`${project.title} floor plan`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm px-4 py-2">
                  <span className="text-accent text-[11px] tracking-[0.2em] uppercase font-sans">Floor Plan</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Before / After ───────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-10">
            <div className="section-divider" />
            <h2 className="font-serif text-3xl lg:text-4xl text-light mb-2">Before &amp; After</h2>
            <p className="text-muted text-sm">Drag the slider to compare</p>
          </AnimatedSection>
          <BeforeAfterSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      </section>

      {/* ── Tags ─────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16 bg-dark border-y border-dark-400">
        <div className="mx-auto max-w-7xl">
          <div className="feature-tags flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 border border-dark-500 text-muted text-xs tracking-[0.15em] uppercase font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="mb-10">
            <div className="section-divider" />
            <h2 className="font-serif text-3xl text-light">Client Perspective</h2>
          </AnimatedSection>
          <Testimonial
            quote={project.testimonial.quote}
            name={project.testimonial.name}
            role={project.testimonial.role}
          />
        </div>
      </section>

      {/* ── Next project ─────────────────────────── */}
      <section className="relative overflow-hidden group cursor-pointer">
        <Link href={`/projects/${nextProject.slug}`} className="block">
          <div className="relative h-64 lg:h-80">
            <Image
              src={nextProject.heroImage}
              alt={nextProject.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-dark/70 group-hover:bg-dark/60 transition-colors duration-500" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-muted text-xs tracking-[0.3em] uppercase font-sans mb-4">Next Project</p>
            <h3 className="font-serif text-3xl lg:text-5xl text-light group-hover:text-accent transition-colors duration-300">
              {nextProject.title}
            </h3>
            <div className="mt-6 flex items-center gap-2 text-accent-light text-xs tracking-[0.2em] uppercase font-sans">
              View Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
              </svg>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
