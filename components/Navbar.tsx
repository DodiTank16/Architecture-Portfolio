'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

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
  const { theme, toggleTheme } = useTheme();

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
              <motion.button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="relative w-9 h-9 flex items-center justify-center border border-dark-400 hover:border-accent text-light-300 hover:text-accent transition-colors duration-300 overflow-hidden"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {theme === 'dark' ? (
                      /* Sun icon */
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="12" y1="2" x2="12" y2="4"/>
                        <line x1="12" y1="20" x2="12" y2="22"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="2" y1="12" x2="4" y2="12"/>
                        <line x1="20" y1="12" x2="22" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    ) : (
                      /* Moon icon */
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
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
                className="pt-4 border-t border-dark-400 flex flex-col gap-4"
              >
                <motion.button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="flex items-center gap-3 text-light-300 hover:text-accent transition-colors duration-300 w-fit"
                  whileTap={{ scale: 0.94 }}
                >
                  <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={theme}
                        initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {theme === 'dark' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4"/>
                            <line x1="12" y1="2" x2="12" y2="4"/>
                            <line x1="12" y1="20" x2="12" y2="22"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="2" y1="12" x2="4" y2="12"/>
                            <line x1="20" y1="12" x2="22" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                          </svg>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={theme + '-label'}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="font-sans text-xs tracking-[0.15em] uppercase"
                    >
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
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
