'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, Eye, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { amebogistAPI } from '@/lib/api';
import type { AmebogistArticle, CreatorStats } from '@/types';

const QUICK_ACTIONS = [
  { href: '/write', emoji: '✍️', label: 'Write Article', sub: 'Share your gist' },
  { href: '/dashboard', emoji: '📚', label: 'My Articles', sub: 'Manage your content' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<CreatorStats | null>(null);
  const [articles, setArticles] = useState<AmebogistArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      amebogistAPI.creator.getStats(),
      amebogistAPI.creator.getMyArticles({ limit: 6 }),
    ])
      .then(([statsRes, articlesRes]) => {
        setStats(statsRes.data);
        setArticles(articlesRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const STAT_ROWS = [
    { label: 'Articles', icon: FileText, value: stats?.totalArticles },
    { label: 'Views', icon: Eye, value: stats?.totalViews },
    { label: 'Reactions', icon: Heart, value: stats?.totalReactions },
    { label: 'Comments', icon: MessageSquare, value: stats?.totalComments },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl p-7 bg-gradient-to-br from-[#e11d48] to-[#be123c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <h1 className="text-2xl font-black mb-1">Creator Dashboard 📰</h1>
        <p className="text-white/70 text-sm">
          Share your gist with Nigeria. Write in English or Pidgin!
        </p>
        <Link
          href="/write"
          className="mt-4 inline-flex items-center gap-2 bg-white text-[#e11d48] px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors"
        >
          <Plus size={16} /> Write New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_ROWS.map(({ label, icon: Icon, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#e11d48]/20 flex items-center justify-center">
                <Icon size={16} className="text-[#e11d48]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                {label}
              </span>
            </div>
            <p className="text-2xl font-black">
              {loading ? (
                <span className="text-white/20">—</span>
              ) : (
                (value ?? 0).toLocaleString()
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-black mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#e11d48] transition-all group"
            >
              <span className="text-2xl">{q.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-sm">{q.label}</p>
                <p className="text-xs text-white/40">{q.sub}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-[#e11d48] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* My Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black">My Articles</h2>
          <Link
            href="/write"
            className="text-sm font-bold text-[#e11d48] flex items-center gap-1"
          >
            <Plus size={14} /> New
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-white/5 border border-white/10 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <FileText size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-white/40 text-sm">No articles yet. Share your first gist!</p>
            <Link
              href="/write"
              className="mt-4 inline-block bg-[#e11d48] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#be123c] transition-colors"
            >
              Write Now
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {articles.map((a) => (
              <div
                key={a._id}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{a.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {new Date(a.createdAt).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-lg font-semibold capitalize ${
                    a.status === 'published'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
