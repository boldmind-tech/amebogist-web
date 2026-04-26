// ─────────────────────────────────────────────────────────────────────────────
// apps/amebogist/app/amebogistLayout.tsx
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { ReactNode } from 'react';
import { ThemeProvider, FontProvider } from '@boldmind-tech/ui';
import type { ProductThemeType } from '@boldmind-tech/ui';

interface AmebogistLayoutProps {
  children: ReactNode;
}

const AMEBOGIST_THEME: ProductThemeType = {
  slug: 'amebogist',
  name: 'AmeboGist',
  description: 'Nigerian news, entertainment, sports, and lifestyle',
  icon: '📰',
  status: 'LIVE',
  colors: {
    primary:    '#DC2626',   // red — news/media energy
    secondary:  '#F97316',   // orange accent
    accent:     '#EF4444',   // lighter red for hover states
    background: '#FAFAFA',
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