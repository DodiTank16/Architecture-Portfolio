import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-dark">
      <AnimatedSection className="text-center">
        <p className="font-serif text-[8rem] lg:text-[12rem] leading-none text-dark-400 select-none mb-4">
          404
        </p>
        <div className="section-divider mx-auto" />
        <h1 className="font-serif text-3xl lg:text-4xl text-light mb-4">Page Not Found</h1>
        <p className="text-muted text-base mb-10 max-w-sm mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/projects" className="btn-outline">View Projects</Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
