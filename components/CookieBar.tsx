'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('ndpa-cookie-accepted');
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('ndpa-cookie-accepted', '1');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('ndpa-cookie-accepted', '0');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t border-white/10"
      style={{ backgroundColor: '#1C1917' }}>
      <div className="container mx-auto px-4 py-4 max-w-7xl flex flex-col md:flex-row items-center gap-4 justify-between">
        <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
          🍪 We use cookies to improve your experience on AmeboGist. By continuing, you agree to our{' '}
          <Link href="/privacy" className="underline text-white/90 hover:text-white">
            Privacy Policy
          </Link>{' '}
          — in compliance with Nigeria's NDPA 2023.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#065F46' }}
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="px-6 py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-bold transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
