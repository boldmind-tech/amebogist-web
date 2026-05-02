import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { SuperNavbar, SuperFooter, ThemeProvider } from '@boldmind-tech/ui';

const AMEBOGIST_THEME = {
  slug: 'amebogist',
  name: 'AmeboGist NG',
  description: 'Nigeria\'s #1 Pidgin English platform',
  icon: '📰',
  status: 'LIVE' as const,
  colors: {
    primary: '#065F46',
    secondary: '#DC2626',
    accent: '#0891B2',
    background: '#FFFBEB',
  },
};

const NAV_LINKS = [
  { href: '/',                         label: 'Home' },
  { href: '/posts',                    label: 'All Gist' },
  { href: '/search?q=AI',              label: 'AI/Tech' },
  { href: '/search?q=Entertainment',   label: 'Entertainment' },
  { href: '/search?q=Sports',          label: 'Sports' },
  { href: '/pricing',                  label: 'Pricing' },
];

const FOOTER_SECTIONS = [
  {
    title: '📰 Categories',
    links: [
      { href: '/search?q=AI',            label: 'AI & Tech' },
      { href: '/search?q=Entertainment', label: 'Entertainment' },
      { href: '/search?q=Sports',        label: 'Sports' },
      { href: '/search?q=Politics',      label: 'Politics' },
      { href: '/search?q=Lifestyle',     label: 'Lifestyle' },
    ],
  },
  {
    title: '🏢 Company',
    links: [
      { href: '/about',   label: 'About AmeboGist' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms',   label: 'Terms of Service' },
    ],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL('https://amebogist.ng'),
  title: {
    default: 'AmeboGist NG',
    template: '%s | AmeboGist NG',
  },
  description: "Nigeria's #1 Pidgin English platform",
  applicationName: 'AmeboGist NG',
  keywords: ['Nigeria', 'amebogist', 'BoldMind', 'Nigerian entrepreneur'],
  authors: [{ name: 'Boldmind Technology Solution Enterprise', url: 'https://boldmind.ng' }],
  creator: 'BoldMind Technology Solution Enterprise',
  publisher: 'BoldMind Technology Solution Enterprise',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/icons/apple/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple/apple-touch-icon-167x167.png', sizes: '167x167' },
      { url: '/icons/apple/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/favicon-96x96.png' },
    ],
  },

  manifest: '/manifest.webmanifest',

  openGraph: {
    type: 'website',
    url: 'https://amebogist.ng',
    siteName: 'AmeboGist NG',
    title: 'AmeboGist NG',
    description: "Nigeria's #1 Pidgin English platform",
    locale: 'en_NG',
    images: [
      {
        url: '/social/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AmeboGist NG',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@amebogistNG',
    creator: '@boldmindindng',
    title: 'AmeboGist NG',
    description: "Nigeria's #1 Pidgin English platform",
    images: ['/social/twitter-card.jpg'],
  },

};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#065F46' },
    { media: '(prefers-color-scheme: dark)',  color: '#065F46' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" defaultProduct={AMEBOGIST_THEME}>
      <SuperNavbar
        logoSrc="/logo.png"
        brandName="AmeboGist NG"
        links={NAV_LINKS}
        cta={{ href: '/register', label: 'Join Free', variant: 'primary' }}
        theme="light"
        sticky={true}
        animated={true}
      />
      <main className="pt-20">
        {children}
      </main>
      <SuperFooter
        logoSrc="/logo.png"
        sections={FOOTER_SECTIONS}
        contactInfo={{
          email: 'hello@amebogist.ng',
          phone: '+234 913 834 9271',
          address: 'Lagos, Nigeria',
        }}
        newsletter={true}
        showStats={true}
        animated={true}
        copyright={`© ${new Date().getFullYear()} AmeboGist. A BoldMind Technology Solution.`}
      />
    </ThemeProvider>
  );
}
