// app/(public)/page.tsx  [Server Component — ISR]

import Link from 'next/link';
import Image from 'next/image';
import { Eye, ChevronRight, ArrowRight, Flame } from 'lucide-react';

import PostCard        from '../../components/PostCard';
import NewsletterForm  from '../../components/NewsletterForm';
import CookieBar       from '../../components/CookieBar';
import { amebogistAPI } from '../../lib/api';
import type { AmebogistCategory } from '../../types/index';

export const revalidate = 60;

// ─── Types ────────────────────────────────────────────────────────────────────

type NormalizedPost = {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: { name: string; slug: string };
  author: { id: string; name: string; avatar?: string };
  imageUrl: string;
  views: number;
  createdAt: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizePost(p: any): NormalizedPost {
  return {
    _id:      p._id || p.id,
    title:    p.title,
    excerpt:  p.excerpt
      ?? (typeof p.content === 'string'
          ? p.content.slice(0, 160)
          : p.content?.pidgin?.slice(0, 160) ?? '') + '…',
    slug:     p.slug,
    category: typeof p.category === 'string'
      ? { name: p.category, slug: p.category.toLowerCase() }
      : (p.category ?? { name: 'Gist', slug: 'gist' }),
    author: {
      id:     p.author?.id ?? '',
      name:   p.author?.fullName || p.author?.name || 'Amebo Master',
      avatar: p.author?.avatar,
    },
    // API Article type uses coverImage; fallback chain covers legacy imageUrl field
    imageUrl:  p.coverImage || p.imageUrl || '/placeholder.svg',
    views:     p.viewCount ?? p.views ?? p.engagement?.views ?? 0,
    createdAt: p.createdAt,
  };
}

// ─── Data fetchers ────────────────────────────────────────────────────────────

async function fetchCategories(): Promise<AmebogistCategory[]> {
  try {
    const res = await amebogistAPI.getCategories();
    return res.data ?? [];
  } catch {
    return [];
  }
}

async function fetchLatestPosts(limit = 9, skip = 0, category = '') {
  try {
    const params: Record<string, unknown> = { limit, skip };
    if (category) params.category = category;
    const res = await amebogistAPI.articles.list(params as any);
    return (res.data ?? []).map(normalizePost);
  } catch {
    return [];
  }
}

async function fetchFeaturedPost(): Promise<NormalizedPost | null> {
  try {
    const res = await amebogistAPI.articles.getFeatured();
    const items: any[] = Array.isArray(res.data)
      ? res.data
      : res.data ? [res.data] : [];
    return items[0] ? normalizePost(items[0]) : null;
  } catch {
    return null;
  }
}

async function fetchTrending(limit = 5): Promise<NormalizedPost[]> {
  try {
    const res = await amebogistAPI.articles.getTrending(limit);
    return (res.data ?? []).map(normalizePost);
  } catch {
    return [];
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRENDING_TAGS = ['#Tinubu', '#Afrobeats', '#AI Tools', '#JAMB', '#Naira'];

const CROSS_PILLAR_TILES = [
  {
    icon: '🌱',
    name: 'VillageCircle',
    desc: 'Get the philosophy behind the news',
    url: 'https://villagecircle.ng?utm_source=amebogist&utm_medium=cta_block&utm_campaign=cross_pillar',
  },
  {
    icon: '🎓',
    name: 'EduCenter',
    desc: 'Turn your hustle knowledge into real skills',
    url: 'https://educenter.com.ng?utm_source=amebogist&utm_medium=cta_block&utm_campaign=cross_pillar',
  },
  {
    icon: '⚡',
    name: 'PlanAI',
    desc: 'Run your business with AI tools',
    url: 'https://planai.boldmind.ng/start?utm_source=amebogist&utm_medium=cta_block&utm_campaign=cross_pillar',
  },
  {
    icon: '💻',
    name: 'Vibe Coders',
    desc: 'Build the next Naija app',
    url: 'https://villagecircle.ng/vibe-coders?utm_source=amebogist&utm_medium=cta_block&utm_campaign=vibe_coders',
  },
];

const AVATAR_INITIALS = ['C', 'A', 'T', 'K'];

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories   = await fetchCategories();

  const baseTitle       = "AmeboGist — Nigeria's #1 Pidgin English Gist Platform";
  const baseDescription =
    'Hot gist, breaking news, AI & Tech, Politics, Entertainment — in Pidgin English wey make sense. Trusted by 12,000+ Nigerian hustlers.';

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    return {
      metadataBase: new URL('https://amebogist.ng'),
      title:        cat?.metaTitle       ?? `${cat?.name ?? category} News | AmeboGist.ng`,
      description:  cat?.metaDescription ?? `Latest ${category} news — AmeboGist.ng`,
      openGraph: { images: ['/og-image.jpg'], siteName: "AmeboGist — Nigeria's #1 Pidgin English Gist" },
    };
  }

  return {
    metadataBase: new URL('https://amebogist.ng'),
    title:        baseTitle,
    description:  baseDescription,
    openGraph: {
      title: baseTitle, description: baseDescription,
      url: 'https://amebogist.ng', images: ['/og-image.jpg'],
      siteName: "AmeboGist — Nigeria's #1 Pidgin English Gist", type: 'website',
    },
    twitter: {
      card: 'summary_large_image', title: baseTitle, description: baseDescription,
      images: ['/og-image.jpg'], site: '@Amebo__Gist',
    },
    alternates: { canonical: 'https://amebogist.ng' },
  };
}

export const viewport = { width: 'device-width', initialScale: 1 };

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

  const [, latestPosts, featuredPost] = await Promise.all([
    fetchCategories(),
    fetchLatestPosts(limit, skip, selectedCat),
    fetchFeaturedPost(),
    fetchTrending(5),
  ]);

  const heroCardPosts   = latestPosts.slice(0, 3);
  const displayFeatured = featuredPost ?? latestPosts[0] ?? null;
  const gridPosts       = latestPosts.slice(featuredPost ? 0 : 1, 7);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBEB' }}>

      {/* JSON-LD Schema */}
      <script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'CollectionPage',
            name: 'Amebo Wey Make Sense! — Latest Nigerian News',
            url:  'https://amebogist.ng',
            publisher: {
              '@type': 'Organization',
              name: 'BoldMind Technology Solutions',
              url:  'https://boldmind.ng',
            },
          }),
        }}
      />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: brand text */}
            <div className="space-y-8">
              {/* Ecosystem pulse badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#065F46]/20 bg-white/60 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#065F46] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#065F46]" />
                </span>
                <span className="text-[11px] font-black tracking-widest uppercase text-[#065F46]">
                  Part of BoldMind Ecosystem
                </span>
              </div>

              {/* H1 */}
              <div>
                <h1
                  className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight"
                  style={{ color: '#065F46' }}
                >
                  Amebo Wey<br />
                  Make Sense!{' '}
                  <span role="img" aria-label="fire">🔥</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg font-serif">
                  Nigeria's freshest gist — AI, Tech, Politics &amp; Entertainment in pure Pidgin
                </p>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {AVATAR_INITIALS.map((l, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-[#FFFBEB] flex items-center justify-center text-white text-xs font-black"
                      style={{ backgroundColor: '#065F46' }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-black text-[#065F46] text-lg leading-tight">12,000+ hustlers</p>
                  <p className="text-xs text-gray-500 font-medium">dey read daily</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wide text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: '#065F46' }}
                >
                  Read Today's Gist <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://whatsapp.com/channel/0029Vb8JrT172WTo9CpI3T1o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wide border-2 transition-all hover:bg-[#065F46] hover:text-white"
                  style={{ borderColor: '#065F46', color: '#065F46' }}
                >
                  Join WhatsApp Channel
                </a>
              </div>

              <p className="text-xs text-gray-400 font-medium tracking-wide">No spam. Just hot gist.</p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="font-bold text-gray-600">Trusted by 12k+ Hustlers</span>
                <span>·</span>
                <span>Part of BoldMind Ecosystem</span>
              </div>
            </div>

            {/* Right: 3 tilted article card previews */}
            {heroCardPosts.length > 0 && (
              <div
                className="hidden lg:grid grid-cols-3 gap-3 items-center"
                style={{ minHeight: '420px' }}
              >
                {heroCardPosts.map((post, i) => {
                  const cardStyles = [
                    { transform: 'rotate(-6deg) translateY(16px)' },
                    { transform: 'rotate(0deg) translateY(-8px) scale(1.06)', zIndex: 10, position: 'relative' as const },
                    { transform: 'rotate(6deg) translateY(16px)' },
                  ];
                  return (
                    <Link
                      key={post._id}
                      href={`/posts/${post.slug}`}
                      className="block bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      style={cardStyles[i]}
                    >
                      <div className="relative h-32">
                        <Image
                          src={post.imageUrl || '/placeholder.svg'}
                          alt={post.title}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#DC262615', color: '#DC2626' }}
                        >
                          {post.category.name}
                        </span>
                        <h4 className="mt-2 text-xs font-bold font-serif line-clamp-2 leading-tight text-gray-800">
                          {post.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                          <Eye className="h-3 w-3" />
                          <span>{post.views.toLocaleString()} reads</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. TRENDING STRIP ─────────────────────────────────────────────── */}
      <section
        className="border-y bg-white"
        style={{ borderTopColor: '#065F4620', borderBottomColor: '#065F4620' }}
      >
        <div className="overflow-x-auto">
          <div className="flex gap-3 py-4 px-6 items-center min-w-max">
            <span className="flex-shrink-0 text-[10px] font-black uppercase tracking-widest text-gray-400 mr-1">
              Trending:
            </span>
            {TRENDING_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag.replace('#', ''))}`}
                className="flex-shrink-0 px-5 py-2 rounded-full border text-xs font-black uppercase tracking-wide transition-all hover:bg-[#065F46] hover:text-white hover:border-[#065F46]"
                style={{ backgroundColor: '#FEF3C7', borderColor: '#065F46', color: '#065F46' }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED ARTICLE ───────────────────────────────────────────── */}
      {displayFeatured && (
        <section className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <div className="grid md:grid-cols-2">
              {/* Image — explicit height so next/image fill has a defined parent size */}
              <div className="relative overflow-hidden" style={{ minHeight: '320px', height: '100%' }}>
                <Image
                  src={displayFeatured.imageUrl || '/placeholder.svg'}
                  alt={displayFeatured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white"
                    style={{ backgroundColor: '#DC2626' }}
                  >
                    <Flame className="h-3 w-3" /> HOT GIST
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#065F4615', color: '#065F46' }}
                  >
                    {displayFeatured.category.name}
                  </span>
                </div>

                <h2
                  className="text-2xl md:text-3xl font-bold font-serif leading-tight"
                  style={{ color: '#1C1917' }}
                >
                  {displayFeatured.title}
                </h2>

                <p className="text-gray-600 leading-relaxed line-clamp-3 font-serif">
                  {displayFeatured.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3 w-3" />
                    {displayFeatured.views.toLocaleString()} reads
                  </span>
                  <span>·</span>
                  <span>
                    {(() => {
                      const d = displayFeatured.createdAt ? new Date(displayFeatured.createdAt) : null;
                      return d && !isNaN(d.getTime())
                        ? d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
                        : 'Recent';
                    })()}
                  </span>
                </div>

                <Link
                  href={`/posts/${displayFeatured.slug}`}
                  className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#065F46' }}
                >
                  Read Full Gist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. ARTICLE GRID ───────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div
          className="flex items-end justify-between mb-10 pb-6 border-b"
          style={{ borderColor: '#E7E5E4' }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif" style={{ color: '#1C1917' }}>
              Latest <span style={{ color: '#065F46' }}>Amebo Stories</span>
            </h2>
            <p className="mt-1 text-gray-500 font-serif italic text-sm">
              Fresh from de source, served hot hot.
            </p>
          </div>
          <Link
            href="/posts"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-opacity hover:opacity-70"
            style={{ color: '#065F46' }}
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-gray-400">No stories yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full border-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-[#065F46] hover:text-white"
            style={{ borderColor: '#065F46', color: '#065F46' }}
          >
            View More Stories <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 5. CROSS-PILLAR CTA BLOCK ─────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#065F46' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
              Oya, go further than gist
            </h2>
            <p className="mt-3 text-white/50 text-lg">Explore the full BoldMind ecosystem</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CROSS_PILLAR_TILES.map((tile) => (
              <a
                key={tile.name}
                href={tile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-6 rounded-2xl border transition-all hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-3xl" role="img">{tile.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg leading-tight">{tile.name}</h3>
                  <p className="mt-1.5 text-white/50 text-sm leading-relaxed">{tile.desc}</p>
                </div>
                <span className="text-white/30 group-hover:text-white transition-colors font-black text-xl">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. NAIJA HUSTLE SPOTLIGHT ─────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div
          className="bg-white rounded-3xl shadow-sm overflow-hidden"
          style={{ borderLeft: '4px solid #065F46' }}
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-sm font-black uppercase tracking-widest" style={{ color: '#DC2626' }}>
                📦 Naija Hustle Spotlight
              </span>
              <span className="text-xs text-gray-300 font-bold uppercase tracking-widest">
                · Weekly Feature
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold font-serif mb-4 leading-tight"
              style={{ color: '#1C1917' }}
            >
              How Mama Titi Take Use AI to Grow Her Pepper Sauce Business
            </h3>

            <p className="text-gray-600 leading-relaxed font-serif mb-8 max-w-2xl">
              Mama Titi don dey sell pepper sauce for Surulere since 2019. When she hear about PlanAI,
              she talk say she no sabi computer — but six months later, her online orders don increase
              by 340%. "E surprise me o," she talk. This na the real Naija hustle story wey go inspire you.
            </p>

            <a
              href="https://planai.boldmind.ng/store?utm_source=amebogist&utm_medium=spotlight&utm_campaign=storefronts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest transition-opacity hover:opacity-70"
              style={{ color: '#065F46' }}
            >
              Start your own store <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. NEWSLETTER SIGNUP ──────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#FEF3C7' }}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-4 leading-tight"
            style={{ color: '#065F46' }}
          >
            No Gree For Boredom!
          </h2>
          <p className="text-gray-600 mb-10 text-lg font-serif">
            Get Nigeria's freshest gist directly in your inbox. No wahala.
          </p>

          <div
            className="rounded-3xl p-8 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #065F46 0%, #044535 100%)' }}
          >
            <NewsletterForm product="amebogist" />
            <p className="mt-5 text-white/40 text-xs font-medium">
              Join 12k+ hustlers. No spam.
            </p>
          </div>
        </div>
      </section>

      {/* NDPA Cookie Consent Bar */}
      <CookieBar />
    </div>
  );
}
