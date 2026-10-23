'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/logo';

const productLinks = [
  { label: 'Pay', href: '/pay' },
  { label: 'For Creators', href: '/for-creators' },
  { label: 'Card', href: '/card' },
  { label: 'Wallet', href: '/wallet' },
  { label: 'Banking', href: '/banking' },
];

const secondaryLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'rgba(25, 36, 40, 0.75)'
          : 'rgba(25, 36, 40, 0.40)',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(12px) saturate(1.1)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(12px) saturate(1.1)',
        borderBottom: scrolled
          ? '1px solid rgba(69, 177, 232, 0.18)'
          : '1px solid rgba(69, 177, 232, 0.08)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — always visible */}
        <Logo />

        {/* Center: Product links — visible on md+ (768px+) */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {productLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200"
              style={{ color: 'var(--mavi-text-muted)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--mavi-text)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--mavi-text-muted)')
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: desktop full nav (lg+) OR hamburger (md and below lg, and mobile) */}
        <div className="flex items-center gap-4">
          {/* Desktop full right nav — lg+ (1024px+): secondary links + CTA inline */}
          <nav className="hidden items-center gap-6 lg:flex">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200"
                style={{ color: 'var(--mavi-text-muted)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--mavi-text)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--mavi-text-muted)')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              className="inline-flex h-9 items-center justify-center rounded-full px-5 text-xs font-semibold text-white no-underline transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--mavi-blue)',
                boxShadow: '0 0 12px rgba(69, 177, 232, 0.20)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 20px rgba(69, 177, 232, 0.35)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 12px rgba(69, 177, 232, 0.20)';
              }}
            >
              Join waitlist
            </Link>
          </nav>

          {/* Hamburger — visible below lg (< 1024px) */}
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md lg:hidden"
            style={{ color: 'var(--mavi-text)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </div>

      {/* Mobile/tablet dropdown menu — below lg */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t backdrop-blur-xl lg:hidden"
            style={{
              borderColor: 'var(--mavi-border)',
              backgroundColor:
                'color-mix(in srgb, var(--mavi-bg) 80%, transparent)',
            }}
          >
            <nav className="flex flex-col gap-3 px-4 pt-4 pb-4">
              {/* Product links on mobile only (hidden on md since they're in center nav) */}
              <div className="md:hidden">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
                    style={{ color: 'var(--mavi-text-muted)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div
                  className="my-3 h-px"
                  style={{ backgroundColor: 'var(--mavi-border)' }}
                />
              </div>

              {/* Secondary links — always in hamburger below lg */}
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.15em]"
                  style={{ color: 'var(--mavi-text-muted)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/waitlist"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full text-xs font-semibold text-white no-underline"
                style={{ backgroundColor: 'var(--mavi-blue)' }}
              >
                Join waitlist
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
