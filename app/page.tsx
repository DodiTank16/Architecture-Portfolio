'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '@/components/ProjectCard';
import AnimatedSection from '@/components/AnimatedSection';
import Testimonial from '@/components/Testimonial';
import ScrollIndicator from '@/components/ScrollIndicator';
import LoadingSpinner from '@/components/LoadingSpinner';
import { projects } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => <LoadingSpinner label="Initialising…" />,
});

const stats = [
  { value: '120+', label: 'Projects Completed' },
  { value: '18', label: 'Years of Practice' },
  { value: '12', label: 'Design Awards' },
  { value: '96%', label: 'Client Satisfaction' },
];

export default function HomePage() {
  const mouse = useRef({ x: 0, y: 0 });
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.width / 2) / rect.width;
    mouse.current.y = (e.clientY - rect.height / 2) / rect.height;
  };

  useGSAP(() => {
    if (!headlineRef.current) return;
    gsap.from(headlineRef.current.children, {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.5,
    });
  }, { scope: headlineRef });

  useGSAP(() => {
    if (!statsRef.current) return;
    gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
    });
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative h-screen min-h-[700px] overflow-hidden bg-dark"
        onMouseMove={onMouseMove}
      >
        <div className="absolute inset-0">
          <HeroScene mouse={mouse} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex h-full items-end pb-32 px-6 lg:px-16">
          <div ref={headlineRef} className="max-w-2xl">
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-6">
              Architecture Studio &mdash; Est. 2025
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.92] text-light mb-6">
              Designing Spaces
              <br />
              <em className="text-accent-light">That Define</em>
              <br />
              Living
            </h1>
            <p className="text-light-300 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Premium architectural design that transforms vision into enduring, extraordinary spaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-primary">
                View Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline">Book Consultation</Link>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="bg-dark-300 border-y border-dark-400 py-12 lg:py-16">
        <div ref={statsRef} className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-dark-400">
            {stats.map((s) => (
              <div key={s.label} className="stat-item text-center lg:px-12">
                <p className="font-serif text-4xl lg:text-5xl text-accent mb-2">{s.value}</p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase font-sans">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 bg-dark">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="section-divider" />
              <h2 className="font-serif text-4xl lg:text-5xl text-light">Selected Works</h2>
            </div>
            <Link href="/projects" className="text-accent text-xs tracking-[0.25em] uppercase font-sans hover:text-accent-light transition-colors duration-300 flex items-center gap-2 shrink-0">
              All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
              </svg>
            </Link>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── About tease ──────────────────────────── */}
      <section className="py-24 lg:py-36 bg-dark-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left" className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
                  alt="Architecture studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-dark-300 border border-dark-400 p-6 w-40"
              >
                <p className="font-serif text-3xl text-accent mb-1">18</p>
                <p className="text-muted text-xs tracking-widest uppercase font-sans">Years<br />Experience</p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="section-divider" />
              <h2 className="font-serif text-4xl lg:text-5xl text-light mb-6">
                A Studio Built on<br /><em>Craft &amp; Vision</em>
              </h2>
              <p className="text-light-300 leading-relaxed mb-5">
                Arch Studio is a Mumbai-based architecture and design practice founded in 2006. We work across scales — from intimate interiors to master plans — united by the belief that exceptional design improves the quality of life.
              </p>
              <p className="text-light-300 leading-relaxed mb-10">
                Each project begins with deep listening. We invest time understanding how you live, what you value, and what you dream of, before a single line is drawn.
              </p>
              <Link href="/about" className="btn-ghost">Our Story</Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Services overview ────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 bg-dark">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="text-center mb-16">
            <div className="section-divider mx-auto" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light mb-4">What We Do</h2>
            <p className="text-muted max-w-xl mx-auto text-base">Full-service design from concept to completion.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-400">
            {[
              { icon: '◻', title: 'Architecture', desc: 'New buildings, extensions, and adaptive reuse — from luxury residences to commercial towers.', href: '/services#architecture' },
              { icon: '◇', title: 'Interior Design', desc: 'Environments with a strong sense of identity — bespoke, material-led, deeply personal.', href: '/services#interior' },
              { icon: '◉', title: 'Urban Planning', desc: 'Master plans, township, and mixed-use developments that create lasting communities.', href: '/services#planning' },
            ].map((svc, i) => (
              <AnimatedSection key={svc.title} delay={i * 0.12} className="bg-dark p-10 lg:p-14 group hover:bg-dark-200 transition-colors duration-500">
                <span className="text-accent text-2xl mb-6 block">{svc.icon}</span>
                <h3 className="font-serif text-2xl text-light mb-3">{svc.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">{svc.desc}</p>
                <Link href={svc.href} className="text-accent text-xs tracking-[0.2em] uppercase font-sans flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M3 12h18" />
                  </svg>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14">
            <div className="section-divider" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light">Client Voices</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((p, i) => (
              <Testimonial key={p.id} quote={p.testimonial.quote} name={p.testimonial.name} role={p.testimonial.role} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="relative py-32 lg:py-48 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
            alt="Architecture CTA"
            fill className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedSection>
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-6">Start Your Project</p>
            <h2 className="font-serif text-5xl lg:text-6xl text-light mb-6">
              Ready to Build<br /><em>Something Extraordinary?</em>
            </h2>
            <p className="text-light-300 text-base mb-10 max-w-lg mx-auto leading-relaxed">
              Every great project begins with a conversation. Tell us about your vision — we will tell you what&apos;s possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
              <Link href="/projects" className="btn-outline">Browse Our Work</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
