import Link from 'next/link';
import { Logo } from '@/components/logo';

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'mavi pay', href: '/pay' },
      { label: 'mavi card', href: '/card' },
      { label: 'mavi wallet', href: '/wallet' },
      { label: 'mavi finans', href: '/banking' },
      { label: 'Handlr', href: '/handlr' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/legal/cookies' },
      { label: 'Acceptable Use', href: '/legal/acceptable-use' },
      { label: 'Merchant Agreement', href: '/legal/merchant-agreement' },
      { label: 'DPA', href: '/legal/dpa' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: 'var(--mavi-bg)',
      }}
    >
      {/* Decorative gradient line at top */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(69, 177, 232, 0.30), rgba(7, 132, 181, 0.20), rgba(69, 177, 232, 0.30), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4">
          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: 'var(--mavi-text)' }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:![color:var(--mavi-text)]"
                      style={{ color: 'var(--mavi-text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: 'var(--mavi-text)' }}
            >
              Social
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="https://x.com/mavi_finans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-200 hover:![color:var(--mavi-text)]"
                  style={{ color: 'var(--mavi-text-muted)' }}
                >
                  @mavi_finans
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-10" style={{ borderTop: '1px solid var(--mavi-border)' }}>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <Logo size={24} />
            <p
              className="text-base font-medium"
              style={{
                color: 'var(--mavi-text-muted)',
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              Built in Flanders — mavi finans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
