import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import Testimonial from '@/components/Testimonial';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Arch Studio — our story, philosophy, and the team behind our award-winning design practice.',
};

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founding Principal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'With over 22 years of practice across India and Europe, Arjun brings a deep commitment to contextual design and technical excellence.',
  },
  {
    name: 'Priya Kapoor',
    role: 'Director, Interiors',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b602?auto=format&fit=crop&w=400&q=80',
    bio: 'Priya leads our interiors practice with a focus on bespoke materiality, artisan collaboration, and spaces that feel both curated and lived-in.',
  },
  {
    name: 'Rohan Sharma',
    role: 'Senior Associate',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Rohan specialises in computational design and sustainable building systems, ensuring our buildings perform as beautifully as they look.',
  },
  {
    name: 'Ananya Singh',
    role: 'Design Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    bio: 'Ananya drives concept development across multiple project types, with a particular passion for residential architecture and urban housing.',
  },
];

const awards = [
  { year: 2024, title: 'JK Cement Architecture Award', category: 'Residential Architecture' },
  { year: 2023, title: 'HUDCO Design Award', category: 'Affordable Housing' },
  { year: 2023, title: 'CODA Awards Shortlist', category: 'Interior Architecture' },
  { year: 2022, title: 'Asia Pacific Interior Design Award', category: 'Commercial' },
  { year: 2021, title: 'Indian Architecture & Design Award', category: 'Excellence' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ────────────────────────── */}
      <section className="pt-40 pb-20 lg:py-48 px-6 lg:px-16 bg-dark relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-5">
              About Us
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-light leading-[0.9] mb-8 max-w-3xl">
              Architecture is a{' '}
              <em className="text-accent-light">Conversation</em>{' '}
              with Time
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="max-w-xl">
            <p className="text-light-300 text-lg leading-relaxed">
              Founded in 2006, Arch Studio has spent nearly two decades asking one question: how do we design buildings and spaces that will be loved for generations?
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Studio intro ─────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <AnimatedSection direction="left">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
                  alt="Arch Studio office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="section-divider" />
              <h2 className="font-serif text-4xl lg:text-5xl text-light mb-8">Our Philosophy</h2>
              <div className="space-y-6 text-light-300 leading-relaxed">
                <p>
                  We are a practice of 28 designers, architects, and consultants working from a shared studio in Mumbai's Bandra-Kurla Complex. Our work spans the full spectrum — intimate apartments, sprawling villas, corporate headquarters, and urban master plans.
                </p>
                <p>
                  What connects everything we do is a refusal to accept the ordinary. We believe that every project, regardless of scale or budget, deserves a considered response — one that begins with curiosity, proceeds with rigour, and ends with spaces that feel precisely right.
                </p>
                <p>
                  We work closely with our clients, engaging them as partners in the design process rather than audiences for a final reveal. The best projects emerge from genuine collaboration.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-16">
            <div className="section-divider" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light">What We Stand For</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-400">
            {[
              { title: 'Craft', body: 'We believe in making things well. Every material, every joint, every proportion is considered. Good craft is not a luxury — it is the foundation of design that endures.' },
              { title: 'Context', body: 'Buildings do not exist in isolation. Every design response begins with a deep reading of the site, climate, culture, and community that will define its life.' },
              { title: 'Collaboration', body: 'The best work happens when architects, clients, consultants, and craftspeople think together. We create the conditions for genuine partnership on every project.' },
              { title: 'Sustainability', body: 'We design buildings that perform efficiently, use materials responsibly, and age with grace. Sustainability is not a checklist — it is a design ethic.' },
              { title: 'Innovation', body: 'We invest in research, technology, and continuous learning. Computational tools, new materials, and emerging construction methods enrich our practice.' },
              { title: 'Clarity', body: 'Great architecture communicates. Our designs are confident, legible, and purposeful — free of unnecessary complexity, enriched by considered detail.' },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08} className="bg-dark p-10 lg:p-12 hover:bg-dark-200 transition-colors duration-500">
                <h3 className="font-serif text-2xl text-accent mb-4">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-16">
            <div className="section-divider" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light">The Team</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1} direction="up">
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl text-light mb-1">{member.name}</h3>
                  <p className="text-accent text-xs tracking-[0.15em] uppercase font-sans mb-3">{member.role}</p>
                  <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ─────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14">
            <div className="section-divider" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light">Recognition</h2>
          </AnimatedSection>
          <div className="space-y-0 divide-y divide-dark-400">
            {awards.map((award, i) => (
              <AnimatedSection key={award.title} delay={i * 0.07}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-3 group">
                  <div className="flex items-center gap-6">
                    <span className="text-muted font-sans text-sm w-10 shrink-0">{award.year}</span>
                    <h3 className="font-serif text-xl text-light group-hover:text-accent transition-colors duration-300">
                      {award.title}
                    </h3>
                  </div>
                  <span className="text-muted text-xs tracking-[0.15em] uppercase font-sans sm:text-right">
                    {award.category}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-4xl">
          <Testimonial
            quote={projects[2].testimonial.quote}
            name={projects[2].testimonial.name}
            role={projects[2].testimonial.role}
          />
        </div>
      </section>

      {/* ── CTA ─────────────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-dark border-t border-dark-400 text-center">
        <AnimatedSection>
          <div className="section-divider mx-auto" />
          <h2 className="font-serif text-4xl lg:text-5xl text-light mb-6">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-10 leading-relaxed">
            We are always open to new projects, conversations, and collaborations. Reach out and tell us about your vision.
          </p>
          <Link href="/contact" className="btn-primary">Start a Conversation</Link>
        </AnimatedSection>
      </section>
    </>
  );
}
