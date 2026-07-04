"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Eye, TrendingUp } from 'lucide-react';

export default function PopularPosts() {
  // Mock popular posts for initial UI
  const popularPosts = [
    {
      _id: '1',
      title: 'Top 10 AI Tools Every Nigerian Entrepreneur Needs in 2026',
      slug: 'top-10-ai-tools-nigerian-entrepreneur-2026',
      views: 12500,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      _id: '2',
      title: 'New Policy: How the Central Bank Migration Impacts Your Fintech Startups',
      slug: 'cbn-policy-impact-fintech-startups',
      views: 9800,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      _id: '3',
      title: 'Why Afrobeats is the Next Big Tech Investment Frontier',
      slug: 'afrobeats-tech-investment-frontier',
      views: 8200,
      imageUrl: '/og-image.png',
    },
  ];

  return (
    <div className="space-y-6">
      {popularPosts.map((post, index) => (
        <Link
          key={post?._id || index}
          href={`/posts/${post?.slug || '#'}`}
          className="flex gap-4 group hover:bg-white p-3 rounded-2xl transition-all duration-300 hover:shadow-premium border border-transparent hover:border-gray-100"
        >
          <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={post?.imageUrl || '/placeholder.svg'}
              alt={post?.title || 'Popular Post'}
              fill
              sizes="112px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h4 className="text-sm font-bold font-serif line-clamp-2 group-hover:text-amebogreen-600 transition-colors leading-snug mb-2">
              {post?.title || 'Popular Story'}
            </h4>
            <div className="flex items-center gap-3 text-[9px] text-gray-400 uppercase tracking-widest font-black">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-amebogreen-600" /> {(post?.views || 0).toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-amebogreen-600">
                <TrendingUp className="h-3 w-3" /> Trending
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
