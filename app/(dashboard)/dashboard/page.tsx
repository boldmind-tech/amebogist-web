'use client';

import Link from 'next/link';
import { Plus, FileText, Eye, Heart, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

const STATS = [
  { label: 'Articles', value: '0', icon: FileText, sub: 'Published' },
  { label: 'Views', value: '0', icon: Eye, sub: 'Total reads' },
  { label: 'Reactions', value: '0', icon: Heart, sub: 'All time' },
  { label: 'Comments', value: '0', icon: MessageSquare, sub: 'Received' },
];

const QUICK_ACTIONS = [
  { href: '/write', emoji: '✍️', label: 'Write Article', sub: 'Share your gist' },
  { href: '/posts', emoji: '📚', label: 'My Articles', sub: 'Manage your content' },
  { href: '/trending', emoji: '🔥', label: 'Trending', sub: "See what's hot" },
  { href: '/profile', emoji: '👤', label: 'My Profile', sub: 'Edit creator profile' },
];

export default function AmeboGistDashboard() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl p-7 bg-gradient-to-br from-[#e11d48] to-[#be123c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <h1 className="text-2xl font-black mb-1">Creator Dashboard 📰</h1>
        <p className="text-white/70 text-sm">Share your gist with Nigeria. Write in English or Pidgin!</p>
        <Link href="/write" className="mt-4 inline-flex items-center gap-2 bg-white text-[#e11d48] px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">
          <Plus size={16} /> Write New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#e11d48]/20 flex items-center justify-center">
                <s.icon size={16} className="text-[#e11d48]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{s.label}</span>
            </div>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-black mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(q => (
            <Link key={q.href} href={q.href} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#e11d48] transition-all group">
              <span className="text-2xl">{q.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-sm">{q.label}</p>
                <p className="text-xs text-white/40">{q.sub}</p>
              </div>
              <ArrowRight size={14} className="text-[#e11d48] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>

      {/* My Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black">My Articles</h2>
          <Link href="/write" className="text-sm font-bold text-[#e11d48] flex items-center gap-1"><Plus size={14} /> New Article</Link>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <FileText size={32} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/40 text-sm">No articles yet. Share your first gist!</p>
          <Link href="/write" className="mt-4 inline-block bg-[#e11d48] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#be123c] transition-colors">
            Write Now
          </Link>
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black">Trending Now 🔥</h2>
          <Link href="/trending" className="text-sm font-bold text-[#e11d48]">See all →</Link>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-3 text-white/40 text-sm">
          <TrendingUp size={20} />
          <span>Loading trending articles...</span>
        </div>
      </div>
    </div>
  );
}
