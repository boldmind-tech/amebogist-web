
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Filter, LayoutGrid } from 'lucide-react';

import PostCard        from '../../../components/PostCard';
import SearchBar       from '../../../components/SearchBar';
import PopularPosts    from '../../../components/PopularPosts';
import AdBanner        from '../../../components/AdBanner';
import { amebogistAPI } from '../../../lib/api';
import type { AmebogistCategory } from '../../../types/index';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Gist — AmeboGist',
  description: 'Browse all the latest Nigerian news, entertainment, AI/Tech, sports, and lifestyle gist.',
};

const CATEGORIES = [
  { slug: '',              label: 'All Gist' },
  { slug: 'ai-tech',      label: 'AI & Tech' },
  { slug: 'creator',      label: 'Creator' },
  { slug: 'entertainment',label: 'Entertainment' },
  { slug: 'sports',       label: 'Sports' },
  { slug: 'politics',     label: 'Politics' },
  { slug: 'trending',     label: 'Trending' },
];

const PAGE_SIZE = 12;

// ─── Data fetchers ────────────────────────────────────────────────────────────

async function fetchPosts(category: string, sort: string, page: number) {
  try {
    const params: Record<string, unknown> = {
      limit: PAGE_SIZE,
      page,
      sort: sort === 'trending' ? 'trending' : 'latest',
    };
    if (category) params.category = category;

    const response = await amebogistAPI.articles.list(params);
    const articles  = response.data ?? [];
    const total     = response.meta?.total ?? articles.length;

    return {
      posts: articles.map((post: any) => ({
        _id:       post._id,
        title:     post.title,
        excerpt:
          post.excerpt ??
          (typeof post.content === 'string'
            ? post.content.substring(0, 160)
            : post.content?.pidgin?.substring(0, 160) ?? '') + '…',
        category:
          typeof post.category === 'string'
            ? { name: post.category, slug: post.category.toLowerCase() }
            : post.category,
        author:    post.author,
        imageUrl:  post.imageUrl ?? '/og-image.png',
        slug:      post.slug,
        views:     post.views ?? post.engagement?.views ?? 0,
        createdAt: post.createdAt,
      })),
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    };
  } catch (err) {
    console.error('[posts/page] fetchPosts:', err);
    return { posts: [], total: 0, totalPages: 0 };
  }
}

async function fetchTrending() {
  try {
    const res = await amebogistAPI.articles.getTrending(5);
    return (res.data ?? []).map((p: any) => ({
      ...p,
      category:
        typeof p.category === 'string'
          ? { name: p.category, slug: p.category.toLowerCase() }
          : p.category,
    }));
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}) {
  const params   = await searchParams;
  const category = params.category ?? '';
  const sort     = params.sort ?? 'latest';
  const page     = Math.max(1, parseInt(params.page ?? '1', 10));

  const [{ posts, total, totalPages }, trending] = await Promise.all([
    fetchPosts(category, sort, page),
    fetchTrending(),
  ]);

  const activeCategory = CATEGORIES.find((c) => c.slug === category) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero bar ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-amebogreen-600 mb-2">
              {total.toLocaleString()} Stories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-4">
              {activeCategory.label === 'All Gist' ? 'All the Gist' : activeCategory.label + ' Gist'}
            </h1>
            <p className="text-muted-foreground text-lg font-serif">
              The hottest Nigerian news, entertainment, and tech gist — fresh every hour.
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <SearchBar showTrending={false} />
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between gap-4 py-3 overflow-x-auto scrollbar-hide">

            {/* Category tabs */}
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="h-4 w-4 text-gray-400 shrink-0" />
              {CATEGORIES.map((cat) => {
                const isActive = cat.slug === category;
                const href = cat.slug
                  ? `/posts?category=${cat.slug}&sort=${sort}`
                  : `/posts?sort=${sort}`;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amebogreen-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-amebogreen-50 hover:text-amebogreen-700'
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              {(['latest', 'trending'] as const).map((s) => {
                const href = category
                  ? `/posts?category=${category}&sort=${s}`
                  : `/posts?sort=${s}`;
                return (
                  <Link
                    key={s}
                    href={href}
                    className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                      sort === s
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {s === 'trending' && <TrendingUp className="h-3 w-3" />}
                    {s === 'latest'   && <LayoutGrid   className="h-3 w-3" />}
                    {s}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Posts grid */}
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post: any) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Link
                        href={`/posts?category=${category}&sort=${sort}&page=${page - 1}`}
                        className="px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-black hover:border-amebogreen-500 hover:text-amebogreen-600 transition-all"
                      >
                        ← Prev
                      </Link>
                    )}
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest px-4">
                      {page} / {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link
                        href={`/posts?category=${category}&sort=${sort}&page=${page + 1}`}
                        className="px-5 py-2 rounded-full bg-amebogreen-600 text-white text-sm font-black hover:bg-amebogreen-700 transition-all"
                      >
                        Next →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-[3rem] p-16 text-center border border-gray-100">
                <div className="w-20 h-20 rounded-full bg-amebogreen-50 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-amebogreen-600 opacity-30" />
                </div>
                <h2 className="text-3xl font-bold font-serif mb-3 text-gray-900">No gist yet</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  No stories in this category yet. Check back soon or browse all gist.
                </p>
                <Link
                  href="/posts"
                  className="inline-block px-8 py-3 rounded-full bg-amebogreen-600 text-white font-black text-sm hover:bg-amebogreen-700 transition-all"
                >
                  Browse All Gist
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Ad */}
            <AdBanner slot="sidebar" />

            {/* Trending */}
            {trending.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-premium">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amebogreen-600" />
                  Trending Now
                </h3>
                <div className="space-y-5">
                  {trending.map((post: any, idx: number) => (
                    <Link
                      key={post._id}
                      href={`/posts/${post.slug}`}
                      className="flex items-start gap-4 group"
                    >
                      <span className="text-2xl font-black text-gray-100 group-hover:text-amebogreen-500/30 transition-colors leading-none">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-amebogreen-600 transition-colors font-serif">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                          <span className="text-amebogreen-600">{post.category?.name}</span>
                          <span>•</span>
                          <span>{(post.engagement?.views ?? post.views ?? 0).toLocaleString()} Views</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-premium">
              <h3 className="text-xl font-bold font-serif mb-6">Popular Stories</h3>
              <PopularPosts />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
