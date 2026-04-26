'use client';

import { ReactNode } from 'react';
import { SuperNavbar, SuperFooter, ThemeProvider } from '@boldmind-tech/ui';

const AMEBOGIST_THEME = {
  slug: 'amebogist', name: 'AmeboGist', description: 'Nigerian news and creator platform',
  icon: '📰', status: 'LIVE' as const,
  colors: { primary: '#DC2626', secondary: '#F97316', accent: '#EF4444', background: '#FAFAFA' },
};

const NAV_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/posts',        label: 'All Gist' },
  { href: '/search?q=AI',  label: 'AI/Tech' },
  { href: '/search?q=Entertainment', label: 'Entertainment' },
  { href: '/search?q=Sports',        label: 'Sports' },
  { href: '/pricing',      label: 'Pricing' },
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

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" defaultProduct={AMEBOGIST_THEME}>
      <SuperNavbar
        logoSrc="/logo.png"
        brandName="AmeboGist"
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
