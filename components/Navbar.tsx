'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || menuOpen
            ? 'bg-dark/95 backdrop-blur-md border-b border-dark-400'
            : 'bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Arch Studio Home"
            >
              <div className="w-8 h-8 border border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <span className="text-accent group-hover:text-dark text-xs font-serif font-bold transition-colors duration-300">
                  TAS
                </span>
              </div>
              <span className="font-sans text-light text-sm tracking-[0.25em] uppercase font-medium">
                Architecture Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-300',
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-accent'
                        : 'text-light-300 hover:text-light'
                    )}
                  >
                    {link.label}
                    {(pathname === link.href || pathname.startsWith(link.href + '/')) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact" className="btn-ghost text-xs py-2.5 px-5">
                Book a Call
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  'block h-px w-6 bg-light transition-all duration-300',
                  menuOpen && 'rotate-45 translate-y-[5px]'
                )}
              />
              <span
                className={cn(
                  'block h-px w-4 bg-light transition-all duration-300 ml-auto',
                  menuOpen && '-rotate-45 -translate-y-[3px] w-6 ml-0'
                )}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-40 bg-dark-100/98 backdrop-blur-md border-b border-dark-400 md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-serif text-3xl transition-colors duration-300',
                      pathname === link.href ? 'text-accent' : 'text-light hover:text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-dark-400"
              >
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Book a Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
