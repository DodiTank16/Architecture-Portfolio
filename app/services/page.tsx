import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { services, processSteps } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Arch Studio offers architecture, interior design, and urban planning services across India. Full-service design from concept to completion.',
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────── */}
      <section className="pt-40 pb-20 lg:py-48 px-6 lg:px-16 bg-dark border-b border-dark-400">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-5">
              What We Offer
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-light leading-[0.9] mb-8 max-w-3xl">
              Services Built Around <em className="text-accent-light">Your Vision</em>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="max-w-xl">
            <p className="text-light-300 text-lg leading-relaxed">
              From the first sketch to the final nail, we offer a full spectrum of architectural and design services — tailored to every scale, budget, and ambition.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Services ────────────────────── */}
      <section className="py-24 lg:py-36 bg-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="space-y-0 divide-y divide-dark-400">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className="scroll-mt-24"
              >
                <AnimatedSection delay={i * 0.1}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 py-16 lg:py-24 group">
                    {/* Number + title */}
                    <div>
                      <span className="font-serif text-6xl text-dark-500 group-hover:text-accent/20 transition-colors duration-500 mb-4 block">
                        0{i + 1}
                      </span>
                      <h2 className="font-serif text-3xl lg:text-4xl text-light mb-2">{svc.title}</h2>
                      <p className="text-accent text-xs tracking-[0.2em] uppercase font-sans">{svc.subtitle}</p>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-2">
                      <p className="text-light-300 leading-relaxed mb-10">{svc.description}</p>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                        {svc.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3 text-sm text-muted">
                            <span className="text-accent mt-0.5 shrink-0">—</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-muted text-xs tracking-[0.15em] uppercase font-sans mb-1">Starting at</p>
                          <p className="text-light font-sans font-medium">{svc.startingAt}</p>
                        </div>
                        <Link href="/contact" className="btn-ghost ml-auto">
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-dark-200">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-16">
            <div className="section-divider" />
            <h2 className="font-serif text-4xl lg:text-5xl text-light">How We Work</h2>
            <p className="text-muted mt-3 max-w-lg">A clear, collaborative process from first conversation to final handover.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-400">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1} className="bg-dark-200 p-8 lg:p-10 hover:bg-dark-300 transition-colors duration-500">
                <span className="font-serif text-5xl text-dark-500 mb-6 block">{step.number}</span>
                <h3 className="font-serif text-2xl text-light mb-4">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-dark border-t border-dark-400 text-center">
        <AnimatedSection>
          <div className="section-divider mx-auto" />
          <h2 className="font-serif text-4xl lg:text-5xl text-light mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted max-w-md mx-auto mb-10 leading-relaxed">
            Tell us about your project and we will provide a tailored proposal within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Request a Proposal</Link>
            <Link href="/projects" className="btn-outline">View Our Work</Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
