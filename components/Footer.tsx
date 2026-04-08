import Link from 'next/link';

const footerLinks = {
  Studio: [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
  Services: [
    { href: '/services#architecture', label: 'Architecture' },
    { href: '/services#interior', label: 'Interior Design' },
    { href: '/services#planning', label: 'Urban Planning' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-dark-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6 w-fit">
              <div className="w-8 h-8 border border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <span className="text-accent group-hover:text-dark text-xs font-serif font-bold transition-colors duration-300">
                  TAS
                </span>
              </div>
              <span className="font-sans text-light text-sm tracking-[0.25em] uppercase font-medium">
                Architecture Studio
              </span>
            </Link>
            <p className="text-light-300 text-sm leading-relaxed max-w-xs mb-8">
              A design practice dedicated to creating spaces that are beautiful, purposeful, and enduring.
              Based in Mumbai, working across India and beyond.
            </p>
            {/* Social */}
            <div className="flex items-center gap-5">
              {['Instagram', 'LinkedIn', 'Behance'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-muted hover:text-accent text-xs tracking-widest uppercase transition-colors duration-300"
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-light font-sans text-xs uppercase tracking-[0.2em] mb-5 font-medium">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-light-300 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-dark-400 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted">
            <a href="mailto:bhumintank@gmail.com" className="hover:text-light-300 transition-colors duration-300">
              bhumintank@gmail.com
            </a>
            <a href="tel:+919737889882" className="hover:text-light-300 transition-colors duration-300">
              +91 97378 89882
            </a>
            <span>Rajkot, Gujarat, India</span>
          </div>
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} TAS Architecture Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
