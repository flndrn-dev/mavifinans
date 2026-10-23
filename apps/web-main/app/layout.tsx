import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieBanner } from '@/components/cookie-banner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'mavi finans — Financial freedom for the unbanked',
    template: '%s | mavi finans',
  },
  description: 'Real bank accounts. Prepaid cards. Crypto wallet. E-commerce payments.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL('https://mavifinans.eu'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mavifinans.eu',
    siteName: 'mavi finans',
    title: 'mavi finans — Financial freedom for the unbanked',
    description: 'Real bank accounts. Prepaid cards. Crypto wallet. E-commerce payments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mavi finans — Financial freedom for the unbanked',
    description: 'Real bank accounts. Prepaid cards. Crypto wallet. E-commerce payments.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: "'General Sans', sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
