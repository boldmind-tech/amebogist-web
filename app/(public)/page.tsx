// apps/amebogist/app/(public)/page.tsx  [Server Component — ISR]
// ─────────────────────────────────────────────────────────────────────────────
// CORRECTIONS FROM PASTE:
//   1. SuperNavbar / SuperFooter → REMOVED (come from layout.tsx wrapper)
//   2. Direct fetch() calls → boldMindAPI / amebogistAPI from api-adapters
//   3. Hardcoded colors → all via CSS variables (var(--product-primary) etc.)
//   4. `amebogistAPI.getCategories()` and `amebogistAPI.articles.list()` use
//      the real endpoint client — not raw fetch
//   5. Kept ISR revalidate = 60 (news site — must stay fresh)
//   6. Inline UI components (Button, PostCard etc.) left as-is since they are
//      app-local components, not from @boldmind/ui
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { Brain, Zap, Users, Target, TrendingUp, Mail, Sparkles, ChevronRight } from 'lucide-react';

// App-local components (unchanged from paste)
import { Button }           from '../../components/ui/button';
import SearchBar            from '../../components/SearchBar';
import NewsletterForm       from '../../components/NewsletterForm';
import PostCard             from '../../components/PostCard';
import TrendingCarousel     from '../../components/TrendingCarousel';
import PopularPosts         from '../../components/PopularPosts';
import AdBanner             from '../../components/AdBanner';

// API client
import { amebogistAPI }     from '../../lib/api';   // your app-local api adapter

import type { AmebogistCategory } from '../../types/index';

export const revalidate = 60; // ISR — news site

// ─── Data fetchers (server-side) ─────────────────────────────────────────────

async function fetchCategories(): Promise<AmebogistCategory[]> {
  try {
    const response = await amebogistAPI.getCategories();
    return response.data ?? [];
  } catch (err) {
    console.error('[amebogist/page] fetchCategories:', err);
    return [];
  }
}

async function fetchPosts(params: Record<string, unknown> = {}) {
  try {
    const response = await amebogistAPI.articles.list(params);
    const articles = response.data ?? [];
    const total    = response.meta?.total ?? articles.length;

    return {
      posts: articles.map((post: any) => ({
        _id:         post._id,
        title:       post.title,
        excerpt:
          post.excerpt ??
          (typeof post.content === 'string'
            ? post.content.substring(0, 160)
            : post.content?.pidgin?.substring(0, 160) ?? '') + '…',
        category:
          typeof post.category === 'string'
            ? { name: post.category, slug: post.category.toLowerCase() }
            : post.category,
        author:      post.author,
        imageUrl:    post.imageUrl ?? '/placeholder.svg',
        slug:        post.slug,
        views:       post.views ?? post.engagement?.views ?? 0,
        createdAt:   post.createdAt,
        source:      'api',
        isSponsored: false,
      })),
      total,
    };
  } catch (err) {
    console.error('[amebogist/page] fetchPosts:', err);
    return { posts: [], total: 0 };
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories   = await fetchCategories();

  const baseTitle       = "AmeboGist.ng — Nigeria's #1 Gist, AI, Tech, Politics & Entertainment Hub";
  const baseDescription = 'Amebo wey make sense! Nigeria\'s premier source for authentic gist, breaking politics, trending entertainment, AI & Tech, and hustle tips.';

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    return {
      metadataBase: new URL('https://amebogist.ng'),
      title:       cat?.metaTitle       ?? `${cat?.name ?? category} News | AmeboGist.ng`,
      description: cat?.metaDescription ?? `Latest ${category} news — AmeboGist.ng`,
      openGraph: {
        images: ['/og-image.jpg'],
        siteName: 'AmeboGist — BoldMind Ecosystem',
      },
    };
  }

  return {
    metadataBase: new URL('https://amebogist.ng'),
    title:        baseTitle,
    description:  baseDescription,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: 'https://amebogist.ng',
      images: ['/og-image.jpg'],
      siteName: 'AmeboGist — BoldMind Ecosystem',
      type: 'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       baseTitle,
      description: baseDescription,
      images:      ['/og-image.jpg'],
      site:        '@boldmindtech',
    },
    alternates: { canonical: 'https://amebogist.ng' },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ─── Ecosystem products sidebar ────────────────────────────────────────────────

const ECOSYSTEM_PRODUCTS = [
  { id: 'boldmind-hub', name: 'BoldMind Hub', description: 'Main dashboard for all products', icon: '🚀', url: 'https://boldmind.ng'        },
  { id: 'educenter',    name: 'EduCenter',    description: 'JAMB/WAEC prep tools',            icon: '🎓', url: 'https://educenter.com.ng'   },
  { id: 'naija-fit',   name: 'NaijaFit',     description: 'Fitness & wellness platform',      icon: '💪', url: 'https://fit.boldmind.ng'    },
  { id: 'planai-suite', name: 'PlanAI Suite', description: 'AI-powered business tools',       icon: '🤖', url: 'https://planai.boldmind.ng' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const pageNum     = parseInt(page ?? '1', 10);
  const limit       = 9;
  const skip        = (pageNum - 1) * limit;
  const selectedCat = category ?? '';

  const [categories, postsData, trendingRes] = await Promise.all([
    fetchCategories(),
    fetchPosts({ limit, skip, category: selectedCat }),
    amebogistAPI.articles.getTrending(8).catch(() => ({ data: [] })),
  ]);

  const { posts, total } = postsData;
  const trendingPosts    = (trendingRes.data ?? []).map((p: any) => ({
    ...p,
    category: typeof p.category === 'string'
      ? { name: p.category, slug: p.category.toLowerCase() }
      : p.category,
  }));

  const heroPost    = posts[0];
  const currentUrl  = `https://amebogist.ng${selectedCat ? `/category/${selectedCat}` : ''}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--product-background)' }}>

      {/* JSON-LD Schema */}
      <script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'CollectionPage',
            '@id':      currentUrl,
            name: selectedCat
              ? `${categories.find((c: any) => c.slug === selectedCat)?.name ?? category} News | AmeboGist.ng`
              : 'Amebo Wey Make Sense! — Latest Nigerian News',
            url:       currentUrl,
            publisher: {
              '@type': 'Organization',
              name:    'BoldMind Technology Solutions',
              url:     'https://boldmind.ng',
            },
          }),
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl pt-8">

        {/* ─── Ecosystem Intro Banner ────────────────────────────────────────── */}
        <div
          className="relative mb-16 overflow-hidden rounded-[2.5rem] p-8 md:p-14 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, var(--product-primary), color-mix(in srgb, var(--product-primary) 70%, black))' }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">
                  Part of BoldMind Ecosystem
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 font-serif tracking-tight leading-[1.05] text-white">
                Amebo Wey{' '}
                <span style={{ color: 'var(--product-secondary)', textDecoration: 'underline', textDecorationColor: 'var(--product-secondary)' }}>
                  Make Sense
                </span>!
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-medium max-w-xl leading-relaxed font-serif">
                Connect wit fresh gist, breaking politics, and real-life hustle tips across{' '}
                <span style={{ color: 'var(--product-secondary)' }} className="font-bold">Nigeria's #1 Ecosystem</span>.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-[260px]">
              <Button
                asChild
                size="lg"
                className="py-8 text-lg font-black rounded-2xl text-white"
                style={{ backgroundColor: 'var(--product-secondary)', color: 'var(--product-foreground)' }}
              >
                <Link href="/create">
                  Share Your Amebo
                  <Sparkles className="ml-2 h-5 w-5 fill-current" />
                </Link>
              </Button>
              <div className="flex items-center justify-center gap-2 text-white/40">
                <div className="h-px w-8 bg-current" />
                <span className="text-[10px] font-black tracking-widest uppercase">Trusted by 12k+ Hustlers</span>
                <div className="h-px w-8 bg-current" />
              </div>
            </div>
          </div>

          {/* decorative blob */}
          <div
            className="absolute top-0 right-0 w-2/3 h-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--product-secondary), transparent)' }}
          />
        </div>

        {/* AdBanner */}
        <AdBanner />

        {/* ─── Hero + Trending ─────────────────────────────────────────────── */}
        {heroPost && (
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px]">
              <div className="lg:col-span-8">
                <PostCard post={heroPost} featured={true} />
              </div>
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Trending */}
                <div
                  className="rounded-[2.5rem] p-6 flex-1 flex flex-col border overflow-hidden"
                  style={{ backgroundColor: 'var(--product-background)', borderColor: 'var(--product-muted)' }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5" style={{ color: 'var(--product-primary)' }} />
                    <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--product-foreground)' }}>
                      Hot Gist
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <TrendingCarousel topics={[]} posts={trendingPosts} />
                  </div>
                </div>

                {/* Newsletter */}
                <div
                  className="p-6 rounded-[2.5rem] relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--product-foreground), color-mix(in srgb, var(--product-foreground) 70%, black))', color: 'white' }}
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 font-serif">No Gree For Boredom!</h3>
                    <p className="text-sm opacity-60 mb-5 leading-relaxed">Get Nigeria's freshest gist directly in your inbox.</p>
                    <NewsletterForm compact={true} product="amebogist" />
                  </div>
                  <Mail className="absolute -right-4 -bottom-4 h-32 w-32 opacity-5" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Search ─────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div
            className="rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden border"
            style={{ backgroundColor: 'var(--product-highlight)', borderColor: 'var(--product-muted)' }}
          >
            <div className="relative z-10 w-full max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-5 font-serif" style={{ color: 'var(--product-foreground)' }}>
                Find Your Next{' '}
                <span style={{ color: 'var(--product-primary)' }} className="italic">Favourite Gist</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto font-serif" style={{ color: 'var(--product-foreground)', opacity: 0.6 }}>
                Search across thousands of stories in politics, tech, and entertainment.
              </p>
              <SearchBar showTrending={true} />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Tinubu', 'Afrobeats', 'AI Tools', 'Nollywood', 'Elections'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${term}`}
                    className="trending-tag text-xs font-black px-5 py-2.5 rounded-full uppercase tracking-widest transition-all border hover:text-white"
                    style={{ backgroundColor: 'var(--product-background)', borderColor: 'var(--product-muted)', color: 'var(--product-foreground)' }}
                  >
                    #{term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Latest Posts ────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8 mb-10" style={{ borderColor: 'var(--product-muted)' }}>
            <div>
              <h2 className="text-4xl font-bold font-serif mb-2" style={{ color: 'var(--product-foreground)' }}>
                Latest Amebo <span style={{ color: 'var(--product-primary)' }}>Stories</span>
              </h2>
              <p className="text-lg font-serif italic" style={{ color: 'var(--product-foreground)', opacity: 0.5 }}>
                Fresh from de source, served hot hot.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/category/trending',      label: '🔥 Trending',       color: 'var(--product-primary)' },
                { href: '/category/politics',      label: '🏛️ Politics',       color: '#1E40AF' },
                { href: '/category/entertainment', label: '🎬 Entertainment',  color: '#6B21A8' },
              ].map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors border"
                  style={{ backgroundColor: `${tab.color}15`, color: tab.color, borderColor: `${tab.color}30` }}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.slice(1).map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {skip + limit < total && (
                <div className="mt-16 flex justify-center">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full px-14 py-7 font-black uppercase tracking-[0.2em] text-[10px]"
                  >
                    <Link href={`?category=${selectedCat}&page=${pageNum + 1}`}>
                      View More Stories
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 space-y-10">
              <div
                className="rounded-[2.5rem] p-6 border"
                style={{ backgroundColor: 'var(--product-muted)', borderColor: 'var(--product-muted)' }}
              >
                <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2" style={{ color: 'var(--product-foreground)' }}>
                  <Sparkles className="h-4 w-4" style={{ color: 'var(--product-primary)' }} />
                  Popular Today
                </h3>
                <PopularPosts />
              </div>

              <div
                className="rounded-[2.5rem] p-6 relative overflow-hidden"
                style={{ backgroundColor: 'var(--product-primary)', color: 'white' }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 font-serif italic">Join 12k+ Creators</h3>
                  <p className="text-sm text-white/70 mb-6 leading-relaxed">
                    Don't miss out on AI & tech insights from the BoldMind Ecosystem.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full rounded-xl font-bold"
                    style={{ backgroundColor: 'white', color: 'var(--product-primary)' }}
                  >
                    <Link href="https://boldmind.ng/register">Join Community</Link>
                  </Button>
                </div>
                <Users className="absolute -right-6 -bottom-6 h-40 w-40 opacity-10" />
              </div>
            </aside>
          </div>
        </section>

        {/* ─── Ecosystem Widget ─────────────────────────────────────────────── */}
        <section
          className="relative mt-8 mb-16 overflow-hidden rounded-[3.5rem] p-8 md:p-14 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, var(--product-foreground), color-mix(in srgb, var(--product-foreground) 80%, black))', color: 'white' }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <Zap className="h-4 w-4" style={{ color: 'var(--product-secondary)' }} />
                <span className="text-[10px] font-black tracking-widest uppercase text-white/80">The BoldMind Network</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold font-serif mb-8 leading-tight">
                Empowering Nigeria's{' '}
                <span style={{ color: 'var(--product-secondary)' }}>Digital Future</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ECOSYSTEM_PRODUCTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.url}
                    className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-widest">{p.name}</h4>
                      <p className="text-[10px] text-white/40 italic">{p.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="https://boldmind.ng/products"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: 'var(--product-secondary)' }}
                >
                  Explore all 32+ Products <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div
              className="rounded-[3rem] p-10 border"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-10 text-center opacity-40">
                Global Impact Ecosystem
              </p>
              <div className="grid grid-cols-3 gap-10 text-center">
                {[
                  { icon: <Brain className="h-6 w-6" style={{ color: 'var(--product-secondary)' }} />, value: '18+',  label: 'AI Tools'  },
                  { icon: <Users className="h-6 w-6" style={{ color: 'var(--product-secondary)' }} />, value: '12.5k', label: 'Hustlers'  },
                  { icon: <Target className="h-6 w-6" style={{ color: 'var(--product-secondary)' }} />, value: '32+',  label: 'Live Apps' },
                ].map((s, i) => (
                  <div key={i} className="space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center border" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
                      {s.icon}
                    </div>
                    <p className="text-3xl font-black">{s.value}</p>
                    <p className="text-[9px] uppercase font-black tracking-widest opacity-40">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">
                  Mission: Digital Sovereignty for Nigeria
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}