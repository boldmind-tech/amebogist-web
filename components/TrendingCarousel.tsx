"use client";

import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function TrendingCarousel({ posts }: { topics?: any[], posts?: any[] }) {
  // Use provided posts or mock if empty
  const displayPosts = (posts && posts.length > 0) ? posts.slice(0, 5) : [
    { _id: 't1', title: 'AI Regulation in Nigeria', slug: 'ai-regulation-nigeria', views: 5400, category: { name: 'Tech' } },
    { _id: 't2', title: 'Fuel Prices Today', slug: 'fuel-prices-lagos-abuja', views: 12000, category: { name: 'Politics' } },
    { _id: 't3', title: 'Davido vs Wizkid: The Tech Angle', slug: 'davido-wizkid-tech-angle', views: 8900, category: { name: 'Entertainment' } },
  ];

  return (
    <div className="space-y-4">
      {displayPosts.map((post, index) => (
        <Link key={post?._id || index} href={`/posts/${post?.slug || '#'}`}>
          <div className="flex items-center justify-between group p-3 rounded-2xl border border-transparent hover:border-amebogreen-100 hover:bg-amebogreen-50/50 transition-all duration-300">
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex-shrink-0 text-2xl font-black text-gray-100 group-hover:text-amebogreen-200 transition-colors italic">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold font-serif line-clamp-1 group-hover:text-amebogreen-700 transition-colors">
                  {post?.title || 'Trending Story'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[9px] text-amebogreen-600 font-black uppercase tracking-widest">
                    {post?.category?.name || 'Gist'}
                  </p>
                  <span className="text-[9px] text-gray-300">•</span>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                    {(post?.views || post?.engagement?.views || 0).toLocaleString()} READS
                  </p>
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-amebogreen-500 transform group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      ))}
      <div className="pt-4 border-t border-gray-100 mt-4">
        <Link href="/trending" className="text-[10px] font-black text-amebogreen-600 hover:text-amebogreen-700 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
          <Sparkles className="h-3 w-3" /> View All Hot Gist <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
