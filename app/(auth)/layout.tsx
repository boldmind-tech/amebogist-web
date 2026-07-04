'use client';

import { motion } from 'framer-motion';
import { Logo, SuperNavbar, SuperFooter, ThemeProvider } from '@boldmindng/ui';
import Link from 'next/link';

const AMEBOGIST_THEME = {
  slug: 'amebogist', name: 'AmeboGist NG', description: 'Nigeria\'s #1 Pidgin English platform',
  icon: '📰', status: 'LIVE' as const,
  colors: { primary: '#065F46', secondary: '#DC2626', accent: '#0891B2', background: '#FAFAFA' },
};

// Background dots pattern
const DotsPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle, #FFC800 1px, transparent 1px)',
      backgroundSize: '30px 30px'
    }} />
  </div>
);

// Animated floating circles
const FloatingCircles = () => (
  <>
    <motion.div
      className="absolute top-20 left-10 w-64 h-64 bg-[#FFC800]/20 rounded-full blur-3xl"
      animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-10 w-96 h-96 bg-[#2A4A6E]/30 rounded-full blur-3xl"
      animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#00A859]/10 rounded-full blur-2xl"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

// Testimonial component
const Testimonial = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="mt-auto"
  >
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-[#FFC800] text-lg">★</span>
        ))}
      </div>
      <p className="text-white/90 text-lg mb-4 italic">
        "AmeboGist's ecosystem has transformed how I run my business.
        The AI tools saved me countless hours every week!"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFC800] to-[#FFD700] flex items-center justify-center text-[#00143C] font-bold text-lg">
          AO
        </div>
        <div>
          <p className="font-bold text-white">Adaeze Okonkwo</p>
          <p className="text-white/60 text-sm">Entrepreneur, Lagos</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Stats display
const StatsDisplay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="grid grid-cols-3 gap-6 mb-8"
  >
    {[
      { value: '24/7           Support' },
      { value: '24/7           Support' },
      { value: '99%', label: 'Satisfaction' },
    ].map((stat, index) => (
      <div key={index} className="text-center">
        <div className="text-2xl font-black text-[#FFC800]">{stat.value}</div>
        <div className="text-white/60 text-sm">{stat.label}</div>
      </div>
    ))}
  </motion.div>
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light" defaultProduct={AMEBOGIST_THEME}>
    <div className="min-h-screen flex flex-col">
      {/* SuperNavbar for theme support */}
      <SuperNavbar
        logoSrc="/logo.png"
        theme="dark"
        sticky={true}
        showThemeControls={true}
        links={[
          { href: '/', label: 'Home' },
          { href: '/posts', label: 'All Posts' },
          { href: '/about', label: 'About' },
        ]}
        cta={{
          href: '/register',
          label: 'Get Started',
          variant: 'primary'
        }}
      />

      {/* Main Auth Content */}
      <div className="flex-1 flex">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00143C] via-[#0A1F4F] to-[#2A4A6E] relative overflow-hidden">
          <FloatingCircles />
          <DotsPattern />

          <div className="relative z-10 flex flex-col p-12 w-full">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center gap-3 mb-12 group">
              <Logo src="/logo.png" alt="AmeboGist Logo" className='w-20 h-20' />
            </Link>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Building Systems
                  <br />
                  That <span className="text-[#FFC800]">Shift Nations</span>
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-md">
                  Join thousands of users who trust AmeboGist for their needs.
                </p>
              </motion.div>

              <StatsDisplay />
              <Testimonial />
            </div>

            {/* Footer Links */}
            <div className="mt-8 flex items-center gap-6 text-white/40 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-gray-950 relative">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="lg:hidden absolute top-6 left-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo src="../logo.png" alt="AmeboGist Logo" className='w-20 h-20' />
            </Link>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mt-16 lg:mt-0"
          >
            {children}
          </motion.div>

          {/* Back to Home (Mobile) */}
          <div className="lg:hidden absolute bottom-6 left-6 right-6 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#00143C] dark:hover:text-white text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* SuperFooter for theme support */}
      <SuperFooter
        logoSrc="/logo.png"
        brandName="AmeboGist"
      
        newsletter={false}
        showStats={false}
        variant="compact"
        className="border-t"
      />
    </div>
    </ThemeProvider>
  );
}

