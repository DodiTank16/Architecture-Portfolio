import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a consultation with Arch Studio. Fill in the form or reach us via WhatsApp or email.',
};

const WHATSAPP_NUMBER = '919737889882';
const whatsappMsg = `Hello! I'm interested in discussing an architecture project with TAS Architecture Studio.`;

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <>
      {/* ── Hero ─────────────────────────── */}
      <section className="pt-40 pb-20 lg:py-48 px-6 lg:px-16 bg-dark border-b border-dark-400">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="text-accent text-[11px] tracking-[0.4em] uppercase font-sans mb-5">
              Let&apos;s Talk
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-light leading-[0.9] max-w-2xl">
              Start a <em className="text-accent-light">Conversation</em>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Contact body ────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-dark">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Left — info */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection direction="left">
                <p className="text-light-300 leading-relaxed text-base">
                  Whether you have a fully formed brief or just the seed of an idea, we would love to hear from you. Fill in the form and one of our team will be in touch within 24 hours.
                </p>
              </AnimatedSection>

              {/* Contact blocks */}
              {[
                {
                  label: 'Studio',
                  lines: ['901, BKC Tower A', 'Bandra Kurla Complex', 'Mumbai 400 051, India'],
                },
                {
                  label: 'Phone',
                  lines: ['+91 22 1234 5678'],
                  href: 'tel:+912212345678',
                },
                {
                  label: 'Email',
                  lines: ['hello@archstudio.in'],
                  href: 'mailto:hello@archstudio.in',
                },
                {
                  label: 'Hours',
                  lines: ['Monday to Friday', '9:00 am — 7:00 pm IST'],
                },
              ].map((item, i) => (
                <AnimatedSection key={item.label} direction="left" delay={i * 0.08}>
                  <p className="text-muted text-[11px] tracking-[0.2em] uppercase font-sans mb-2">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-light-300 text-base hover:text-accent transition-colors duration-300 block"
                    >
                      {item.lines[0]}
                    </a>
                  ) : (
                    <div className="space-y-0.5">
                      {item.lines.map((line) => (
                        <p key={line} className="text-light-300 text-base">{line}</p>
                      ))}
                    </div>
                  )}
                </AnimatedSection>
              ))}

              {/* WhatsApp */}
              <AnimatedSection direction="left" delay={0.4}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.854L0 24l6.335-1.521A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.9 0-3.667-.514-5.192-1.41l-.373-.22-3.767.904.92-3.665-.24-.378A9.783 9.783 0 012.182 12C2.182 6.677 6.677 2.182 12 2.182S21.818 6.677 21.818 12 17.323 21.818 12 21.818z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-light text-sm font-medium group-hover:text-[#25D366] transition-colors duration-300">
                      Chat on WhatsApp
                    </p>
                    <p className="text-muted text-xs">Fast responses — usually within 1 hour</p>
                  </div>
                </a>
              </AnimatedSection>
            </div>

            {/* Right — form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-dark-200 border border-dark-400 p-8 lg:p-12">
                <h2 className="font-serif text-2xl text-light mb-8">Send us a message</h2>
                <LeadForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ strip ─────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-dark-200 border-t border-dark-400">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="mb-12">
            <div className="section-divider" />
            <h2 className="font-serif text-3xl text-light">Common Questions</h2>
          </AnimatedSection>
          <div className="space-y-0 divide-y divide-dark-400">
            {[
              {
                q: 'What is the typical timeline for a residential project?',
                a: 'Depending on scale and complexity, a residential project from initial concept to move-in typically takes 18–30 months. We provide a detailed programme at the outset of every project.',
              },
              {
                q: 'Do you work outside Mumbai?',
                a: 'Yes. We have completed projects across India — in Delhi, Bangalore, Hyderabad, Udaipur, and Goa. We also take on international commissions for the right projects.',
              },
              {
                q: 'What is your minimum project budget?',
                a: 'Our architectural services begin at approximately ₹1.5 Cr total construction value. Interior-only commissions begin from ₹50 Lakhs. Contact us to discuss your specific project.',
              },
              {
                q: 'How do your fees work?',
                a: 'We charge a percentage of the total construction cost for full architectural services, or a fixed lump-sum for defined scope. We are transparent about fees from the very first meeting.',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.q} delay={i * 0.07}>
                <div className="py-6 group">
                  <h3 className="font-serif text-lg text-light mb-3 group-hover:text-accent transition-colors duration-300">
                    {item.q}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
