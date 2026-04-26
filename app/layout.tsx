
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
    default: "AmeboGist — Nigeria's #1 Pidgin English Platform for AI/Tech & Creator News",
    template: "%s | AmeboGist",
  },
  description:
    "Amebo wey make sense! Nigeria's premier source for authentic gist, AI/Tech, Creator entrepreneurship, Politics, Entertainment, Sports, and real-life hustle tips — all in Pidgin English.",
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
    title: "AmeboGist — Nigeria's #1 Pidgin English Platform",
    siteName: "AmeboGist",
    description:
      "Nigeria's #1 platform for AI/Tech, Creator entrepreneurship, Sports, Politics, and Entertainment in Pidgin English.",
    images: [
      {
        url: `${canonicalUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AmeboGist — Naija Gist Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@amebogist",
    title: "AmeboGist — Nigeria's #1 Pidgin News Platform",
    description:
      "Amebo wey make sense! AI/Tech, Creator entrepreneurship, Entertainment, Sports and Politics in Pidgin English.",
    images: [`${canonicalUrl}/og-image.png`],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#065F46" },
    { media: "(prefers-color-scheme: dark)", color: "#043D2E" },
  ],
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
  logo: `${canonicalUrl}/logo.png`,
  description: "Nigeria's #1 Pidgin English news and creator platform",
  foundingDate: "2025",
  address: { "@type": "PostalAddress", addressCountry: "NG", addressRegion: "Lagos" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@amebogist.ng",
  },
  sameAs: [
    "https://facebook.com/amebogistng",
    "https://instagram.com/amebogist",
    "https://x.com/amebo__gist",
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
        <meta name="mobile-web-app-capable" content="yes" />
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
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1390336761729977"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
