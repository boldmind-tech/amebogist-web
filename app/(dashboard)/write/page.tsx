'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Image, Tag } from 'lucide-react';

const CATEGORIES = ['Tech', 'Entertainment', 'Sports', 'Politics', 'Business', 'Lifestyle', 'Education', 'Health'];

export default function WriteArticlePage() {
  const [form, setForm] = useState({ title: '', content: '', category: '', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: call POST /amebogist/articles
    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="font-black text-sm">New Article</h1>
        <button
          onClick={handleSubmit}
          disabled={submitting || !form.title || !form.content}
          className="flex items-center gap-2 bg-[#e11d48] text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50 hover:bg-[#be123c] transition-colors"
        >
          <Send size={14} /> {submitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Title */}
        <input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Write your headline here..."
          className="w-full bg-transparent text-3xl font-black placeholder:text-white/20 outline-none border-b border-white/10 pb-4"
        />

        {/* Category */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setForm(f => ({ ...f, category: cat }))}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  form.category === cat
                    ? 'bg-[#e11d48] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Article Content</label>
          <textarea
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="Write your gist here... You fit write for Pidgin or English!"
            rows={16}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm outline-none placeholder:text-white/20 focus:border-[#e11d48] transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
            <Tag size={12} /> Tags (comma-separated)
          </label>
          <input
            value={form.tags}
            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            placeholder="e.g. naija, tech, news"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#e11d48] transition-colors"
          />
        </div>

        {/* Cover image placeholder */}
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-[#e11d48]/50 transition-colors">
          <Image size={32} className="mx-auto mb-2 text-white/20" />
          <p className="text-sm text-white/40">Add cover image (optional)</p>
          <p className="text-xs text-white/20 mt-1">PNG, JPG up to 5MB</p>
        </div>
      </div>
    </div>
  );
}
