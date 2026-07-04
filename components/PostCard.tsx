
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface PostCardProps {
    post: {
        _id: string;
        title: string;
        excerpt: string;
        slug: string;
        category: { name: string; slug: string } | string;
        author: { name: string; avatar?: string };
        imageUrl?: string;
        views: number;
        createdAt: string | Date;
    };
    featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
    const categoryName = typeof post.category === 'string' ? post.category : post.category.name;
    const _d = post.createdAt ? new Date(post.createdAt) : null;
    const date = _d && !isNaN(_d.getTime())
        ? _d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Recent';

    if (featured) {
        return (
            <Card className="group relative overflow-hidden rounded-[2rem] border-none shadow-premium hover:shadow-premium-hover transition-all duration-500 h-[500px]">
                <Link href={`/posts/${post.slug}`} className="block h-full">
                    <div className="absolute inset-0">
                        <Image
                            src={post.imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-amebogreen-600 hover:bg-amebogreen-700 text-white border-none px-4 py-1 text-xs uppercase font-black tracking-widest">
                                {categoryName}
                            </Badge>
                            <span className="flex items-center gap-1.5 text-white/70 text-xs font-bold uppercase tracking-wider">
                                <Clock className="h-3 w-3" /> {date}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight group-hover:text-amebogreen-400 transition-colors line-clamp-2">
                            {post.title}
                        </h2>

                        <p className="text-white/70 line-clamp-2 text-lg max-w-2xl mb-8 font-serif leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-amebogreen-400 font-bold border border-white/20">
                                    {post?.author?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="font-bold text-sm tracking-tight">{post?.author?.name || 'Amebo Master'}</p>
                                    <p className="text-[10px] text-white/50 uppercase font-black tracking-widest">Amebo Master</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 group/btn font-bold text-amebogreen-400">
                                Read More <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    }

    return (
        <Card className="group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-premium transition-all duration-300 overflow-hidden h-full">
            <Link href={`/posts/${post.slug}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 backdrop-blur-md text-amebogreen-700 hover:bg-white border-none shadow-sm font-black text-[10px] uppercase tracking-wider px-3 py-1">
                            {categoryName}
                        </Badge>
                    </div>
                    {/* View Count Overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {(post.views || 0).toLocaleString()}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">
                        <span className="text-amebogreen-600">Hot Gist</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif leading-tight group-hover:text-amebogreen-600 transition-colors line-clamp-2 mb-3">
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6 font-serif">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amebogreen-50 flex items-center justify-center text-amebogreen-600 font-bold text-xs">
                                {post?.author?.name || 'A'}
                            </div>
                            <span className="text-xs font-bold text-gray-700">{post?.author?.name || 'Amebo Master'}</span>
                        </div>

                        <div className="text-amebogreen-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all group-hover:gap-2">
                            Read Gist <ChevronRight className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}
