'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Tag, Save } from 'lucide-react';
import { amebogistAPI } from '@/lib/api';
import type { CreateArticlePayload } from '@/types';

const CATEGORIES = [
  'Tech', 'Entertainment', 'Sports', 'Politics',
  'Business', 'Lifestyle', 'Education', 'Health',
];

export default function WriteArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', category: '', tags: '', excerpt: '' });
  const [submitting, setSubmitting] = useState<'publish' | 'draft' | null>(null);
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildPayload = (status: 'published' | 'draft'): CreateArticlePayload => ({
    title: form.title.trim(),
    content: form.content.trim(),
    ...(form.excerpt.trim() && { excerpt: form.excerpt.trim() }),
    ...(form.category && { category: form.category }),
    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    status,
  });

  const submit = async (status: 'published' | 'draft') => {
    setError('');
    setSubmitting(status === 'published' ? 'publish' : 'draft');
    try {
      await amebogistAPI.articles.create(buildPayload(status));
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(msg);
    } finally {
      setSubmitting(null);
    }
  };

  const canSubmit = form.title.trim().length > 0 && form.content.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <h1 className="font-black text-sm truncate">New Article</h1>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => submit('draft')}
            disabled={!canSubmit || submitting !== null}
            className="flex items-center gap-1.5 bg-white/10 text-white/70 px-3 py-2 rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-white/15 transition-colors"
          >
            <Save size={13} />
            {submitting === 'draft' ? 'Saving...' : 'Draft'}
          </button>
          <button
            onClick={() => submit('published')}
            disabled={!canSubmit || submitting !== null}
            className="flex items-center gap-1.5 bg-[#e11d48] text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-40 hover:bg-[#be123c] transition-colors"
          >
            <Send size={13} />
            {submitting === 'publish' ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-6 mt-4 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full px-6 py-8 space-y-7 flex-1">
        {/* Title */}
        <input
          value={form.title}
          onChange={set('title')}
          placeholder="Write your headline here..."
          className="w-full bg-transparent text-3xl font-black placeholder:text-white/20 outline-none border-b border-white/10 pb-4"
        />

        {/* Excerpt */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
            Excerpt <span className="text-white/20 normal-case tracking-normal font-normal">(optional summary)</span>
          </label>
          <input
            value={form.excerpt}
            onChange={set('excerpt')}
            placeholder="One-line summary shown in article previews..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#e11d48] transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: f.category === cat ? '' : cat }))}
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
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
            Article Content
          </label>
          <textarea
            value={form.content}
            onChange={set('content')}
            placeholder="Write your gist here... You fit write for Pidgin or English!"
            rows={18}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm outline-none placeholder:text-white/20 focus:border-[#e11d48] transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Tag size={12} /> Tags
            <span className="text-white/20 normal-case tracking-normal font-normal">(comma-separated)</span>
          </label>
          <input
            value={form.tags}
            onChange={set('tags')}
            placeholder="e.g. naija, tech, news"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#e11d48] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
