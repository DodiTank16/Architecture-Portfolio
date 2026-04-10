import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TAS Architecture Studio — Architecture & Interior Design',
    template: '%s | TAS Architecture Studio',
  },
  description:
    'Premium architecture and interior design studio based in Mumbai. We design spaces that are beautiful, purposeful, and enduring.',
  keywords: [
    'architecture', 'interior design', 'luxury homes',
    'commercial architecture', 'Mumbai architect', 'India architecture studio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tasarchitecturestudio.in',
    siteName: 'TAS Architecture Studio',
    title: 'TAS Architecture Studio — Architecture & Interior Design',
    description:
      'Premium architecture and interior design studio based in Mumbai.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'TAS Architecture Studio Portfolio',
      },
    ],
  },
  twitter: { card: 'summary_large_image', title: 'TAS Architecture Studio' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t||p);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-dark text-light antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
