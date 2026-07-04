'use client';

import { ReactNode } from 'react';
import { ThemeProvider, FontProvider } from '@boldmindng/ui';
import type { ProductThemeType } from '@boldmindng/ui';

interface AmebogistLayoutProps {
  children: ReactNode;
}

const AMEBOGIST_THEME: ProductThemeType = {
  slug: 'amebogist',
  name: 'AmeboGist NG',
  description: 'Hot gist, breaking news, AI & Tech, Politics, Entertainment — in Pidgin English wey make sense. Trusted by 12,000+ Nigerian hustlers.',
  icon: '📰',
  status: 'LIVE',
  colors: {
   primary: '#065F46', 
    secondary: '#DC2626', 
    accent: '#0891B2',
    background: '#FFFBEB', 
  },
};

export function AmebogistLayout({ children }: AmebogistLayoutProps) {
  return (
    <ThemeProvider
      defaultTheme="light"
      defaultProduct={AMEBOGIST_THEME}
    >
      <FontProvider defaultMode="dyslexic">
        {children}
      </FontProvider>
    </ThemeProvider>
  );
}