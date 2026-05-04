import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AmebogistLayout } from "./amebogistLayout";
import { ClientErrorBoundary } from "./components/ClientErrorBoundary";
import { FacebookSDK, CookieConsent } from "@boldmind-tech/ui";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

const getCanonicalUrl = () => {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || "https://amebogist.ng";
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
};
const canonicalUrl = getCanonicalUrl();

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: "'AmeboGist — Nigeria\'s #1 Pidgin English Gist Platform'",
    template: "%s | AmeboGist",
  },
  description:
    "Hot gist, breaking news, AI & Tech, Politics, Entertainment — in Pidgin English wey make sense. Trusted by 12,000+ Nigerian hustlers.",
  keywords: [
    "Nigerian news",
    "Pidgin English news",
    "AmeboGist",
    "Naija gist",
    "AI Nigeria",
    "tech news Nigeria",
    "creator news Nigeria",
    "Nigerian entrepreneur news",
    "entertainment Nigeria",
    "Nigerian politics news",
    "Nigerian sports news",
    "Pidgin English platform",
    "Naija hustle",
    "BoldMind news",
    "Nigerian digital media",
    "Nigerian startup news",
    "amebo Nigeria",
    "naija news",
  ],
  authors: [
    { name: "AmeboGist", url: canonicalUrl },
    { name: "BoldMind Technology Solution Enterprise", url: "https://boldmind.ng" },
  ],
  creator: "BoldMind Technology Solution Enterprise",
  publisher: "BoldMind Technology Solution Enterprise",
  formatDetection: { email: false, telephone: false },
  category: "news",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: canonicalUrl,
    languages: { "en-NG": canonicalUrl, "pcm-NG": canonicalUrl },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: canonicalUrl,
    title: "AmeboGist",
    siteName: "AmeboGist",
    description:
      "Nigeria\'s #1 Pidgin English platform. 12k+ hustlers. Fresh daily",
    images: [
      {
        url: `${canonicalUrl}/social/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AmeboGist — Naija Gist Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Amebo__Gist",
    title: "AmeboGist NG",
    description:
      "",
    images: [`${canonicalUrl}/social/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { title: "AmeboGist", statusBarStyle: "black-translucent" },
  other: {
    "application-name": "AmeboGist",
    "apple-mobile-web-app-title": "AmeboGist",
    "msapplication-TileColor": "#065F46",
    "google-adsense-account": "ca-pub-1390336761729977",
  },
};

export const viewport: Viewport = {
  themeColor: '#065F46',
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "AmeboGist",
  url: canonicalUrl,
  logo: `${canonicalUrl}/icon-512x512.png`,
  description: "Hot gist, breaking news, AI & Tech, Politics, Entertainment — in Pidgin English wey make sense. Trusted by 12,000+ Nigerian hustlers",
  foundingDate: "2025",
  address: { "@type": "PostalAddress", addressCountry: "NG", addressRegion: "Lagos" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@amebogist.ng",
  },
  sameAs: [
    "https://facebook.com/amebogistng",
    "https://instagram.com/amebogistng_",
    "https://x.com/amebo__gist",
    "https://tiktok.com/amebogistng",
    "https://whatsapp.com/channel/0029Vb8JrT172WTo9CpI3T1o"
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AmeboGist",
  url: canonicalUrl,
  inLanguage: ["en-NG", "pcm-NG"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${canonicalUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Blocking script — runs before first paint to prevent font FOUC.
          Sets data-font AND data-product on <html> synchronously.
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var f=localStorage.getItem('boldmind-font-mode')||'dyslexic';document.documentElement.setAttribute('data-font',f);document.documentElement.setAttribute('data-product','amebogist');}catch(e){document.documentElement.setAttribute('data-font','dyslexic');document.documentElement.setAttribute('data-product','amebogist');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.boldmind.ng" />
        <link rel="dns-prefetch" href="//cdn.boldmind.ng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="application-name" content="AmeboGist" />
        <meta name="description" content="Nigeria's #1 Pidgin English platform" />
        <meta name="theme-color" content="#065F46" />
        <meta name="msapplication-TileColor" content="#065F46" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple/apple-touch-icon-180x180.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amebogist.ng" />
        <meta property="og:site_name" content="AmeboGist" />
        <meta property="og:title" content="AmeboGist" />
        <meta property="og:description" content="Nigeria's #1 Pidgin English platform" />
        <meta property="og:image" content="https://amebogist.ng/social/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AmeboGist — Nigeria's #1 Pidgin English platform" />
        <meta property="og:locale" content="en_NG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Amebo__Gist" />
        <meta name="twitter:creator" content="@boldmindng" />
        <meta name="twitter:title" content="Amebo__Gist" />
        <meta name="twitter:description" content="Nigeria's #1 Pidgin English platform" />
        <meta name="twitter:image" content="https://amebogist.ng/social/twitter-card.jpg" />


        <meta name="msapplication-square70x70logo" content="/icons/windows/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/icons/windows/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/icons/windows/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/icons/windows/mstile-310x310.png" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="facebook-domain-verification" content="8nqyeao58s2i8acw0d06d5ityryxjx" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos, Nigeria" />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* AdSense — plain async script to avoid data-nscript attribute warning */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1390336761729977"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClientErrorBoundary>
          <AmebogistLayout>{children}</AmebogistLayout>
          <CookieConsent />
          <FacebookSDK
            appId={process.env['NEXT_PUBLIC_FACEBOOK_APP_ID']}
            pixelId={process.env['NEXT_PUBLIC_FACEBOOK_PIXEL_ID']}
          />
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
