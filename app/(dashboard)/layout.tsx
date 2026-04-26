import { ReactNode } from 'react';

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#0f0f0f]">{children}</div>;
}
