import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Eye, MessageSquare, ThumbsUp, Heart, ChevronRight, Share2, Zap } from "lucide-react";
import { amebogistAPI } from "../../../../lib/api";
import { Button } from "../../../../components/ui/button";
// import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { SuperNavbar, SuperFooter } from "@boldmindng/ui";

import AdBanner from "../../../../components/AdBanner";
import ShareButtons from "../../../../components/ShareButtons";
import PostCard from "../../../../components/PostCard";
import { AmebogistComment, AmebogistCategory } from "../../../../types/index";

export const revalidate = 60;

// Fetch categories for navbar
async function fetchCategories(): Promise<AmebogistCategory[]> {
    try {
        const response = await amebogistAPI.getCategories();
        return response.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;

    let post;
    try {
        const response = await amebogistAPI.articles.get(slug);
        post = response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        return notFound();
    }

    if (!post) {
        return notFound();
    }

    type MultiLangContent = { pidgin?: string; english?: string; igbo?: string; hausa?: string };
    const postContent = post.content as string | MultiLangContent | undefined;

    // Fetch categories and related posts
    const [categories, trendingPostsRes] = await Promise.all([
        fetchCategories(),
        amebogistAPI.articles.getTrending(4)
    ]);

    // Normalize category
    const postCategory = typeof post.category === 'string'
        ? { name: post.category, slug: post.category.toLowerCase() }
        : post.category;

    let comments: AmebogistComment[] = [];
    try {
        const commentsRes = await amebogistAPI.articles.getComments(post.id);
        comments = commentsRes.data || [];
    } catch {
        // comments are non-critical — page still renders without them
    }

    const relatedPosts = (trendingPostsRes.data || [])
        .filter((p: any) => (p._id || p.id) !== (post.id || (post as any).id))
        .slice(0, 3);

  

  

    return (
        <div className="min-h-screen bg-white">
         

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-12">
                        <Link href="/" className="hover:text-amebogreen-600 transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href={`/category/${postCategory?.slug}`} className="hover:text-amebogreen-600 transition-colors">
                            {postCategory?.name}
                        </Link>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-12">
                        <Badge className="bg-amebogreen-600 hover:bg-amebogreen-700 text-white border-none px-4 py-1 text-[10px] uppercase font-black tracking-widest mb-6">
                            {postCategory?.name}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8 leading-[1.1] tracking-tight text-gray-900">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-amebogreen-50 flex items-center justify-center text-amebogreen-600 font-bold border border-amebogreen-100">
                                    {(post?.author?.fullName || "A").charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 leading-none mb-1">{post?.author?.fullName || "Anonymous"}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Verified Author</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-amebogreen-600" />
                                    <span>
                                        {new Date(post.createdAt).toLocaleDateString("en-NG", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-amebogreen-600" />
                                    <span>{(post.viewCount || 0).toLocaleString()} Views</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative rounded-[3rem] overflow-hidden h-[400px] md:h-[600px] mb-16 shadow-2xl border border-gray-100">
                        <Image
                            src={(post as any).coverImage || (post as any).imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar Share */}
                        <aside className="lg:col-span-1 hidden lg:flex flex-col items-center gap-6 sticky top-40 h-fit">
                            <p className="text-[10px] font-black uppercase tracking-widest vertical-text mb-4 text-gray-400">Share Gist</p>
                            <ShareButtons
                                url={`https://amebogist.ng/posts/${post.slug}`}
                                title={post.title}
                                vertical={true}
                            />
                        </aside>

                        {/* Article Content */}
                        <div className="lg:col-span-11">
                            <article className="prose prose-xl prose-amebo prose-headings:font-serif prose-p:font-serif prose-p:leading-[1.8] prose-p:text-gray-700 max-w-none mb-16">
                                {typeof postContent === 'string' ? (
                                    <div dangerouslySetInnerHTML={{ __html: postContent || '' }} />
                                ) : (
                                    <div>
                                        {(postContent as MultiLangContent)?.pidgin && (
                                            <div className="mb-8 p-8 bg-amebogreen-50/50 rounded-[2.5rem] border border-amebogreen-100 shadow-sm relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <h3 className="text-amebogreen-900 font-bold flex items-center gap-2 mb-4 text-xl">
                                                        🇳🇬 Pidgin Version
                                                    </h3>
                                                    <p className="italic text-amebogreen-800 text-lg leading-relaxed">{(postContent as MultiLangContent).pidgin}</p>
                                                </div>
                                                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform">
                                                    <Zap className="h-32 w-32 text-amebogreen-600" />
                                                </div>
                                            </div>
                                        )}
                                        {(postContent as MultiLangContent)?.igbo && (
                                            <div className="mb-8 p-8 bg-purple-50/50 rounded-[2.5rem] border border-purple-100 shadow-sm relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <h3 className="text-purple-900 font-bold flex items-center gap-2 mb-4 text-xl">
                                                        🇳🇬 Igbo Version
                                                    </h3>
                                                    <p className="italic text-purple-800 text-lg leading-relaxed">{(postContent as MultiLangContent).igbo}</p>
                                                </div>
                                            </div>
                                        )}
                                        {(postContent as MultiLangContent)?.hausa && (
                                            <div className="mb-8 p-8 bg-red-50/50 rounded-[2.5rem] border border-red-100 shadow-sm relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <h3 className="text-red-900 font-bold flex items-center gap-2 mb-4 text-xl">
                                                        🇳🇬 Hausa Version
                                                    </h3>
                                                    <p className="italic text-red-800 text-lg leading-relaxed">{(postContent as MultiLangContent).hausa}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div dangerouslySetInnerHTML={{ __html: (postContent as MultiLangContent).english ?? '' }} />
                                    </div>
                                )}
                            </article>

                            {/* Tags & Action Bar */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-y border-gray-100 mb-16">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags?.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="bg-gray-50 text-gray-500 hover:bg-amebogreen-600 hover:text-white border-none py-1.5 px-4 text-[10px] font-black uppercase tracking-widest transition-all">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" className="rounded-full border-2 border-gray-100 h-12 px-6 gap-2 font-black uppercase tracking-widest text-[10px]">
                                        <Share2 className="h-4 w-4" /> Share Story
                                    </Button>
                                </div>
                            </div>

                            {/* Ad Block */}
                            <div className="mb-20">
                                <AdBanner slot="article-bottom" />
                            </div>

                            {/* Comments Section */}
                            <section id="comments" className="mb-24 pt-8">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-amebogreen-50 flex items-center justify-center">
                                            <MessageSquare className="h-6 w-6 text-amebogreen-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold font-serif text-gray-900">
                                            Amebo Box <span className="text-muted-foreground font-normal">({comments.length})</span>
                                        </h2>
                                    </div>
                                    <Button className="bg-amebogreen-600 hover:bg-amebogreen-700 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest text-[10px]">
                                        Drop Gist
                                    </Button>
                                </div>

                                <div className="space-y-8">
                                    {comments.length > 0 ? (
                                        comments.map((comment: AmebogistComment) => (
                                            <div key={comment.id} className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-amebogreen-100 transition-all hover:shadow-premium">
                                                <div className="flex items-start gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-amebogreen-600 font-bold shrink-0 border border-gray-100">
                                                        {(comment.author?.fullName || 'A').charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div>
                                                                <p className="font-bold text-gray-900">{comment.author?.fullName || 'Anonymous'}</p>
                                                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed mb-6 font-serif">
                                                            {comment.content}
                                                        </p>
                                                        <div className="flex items-center gap-6">
                                                            <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-amebogreen-600 transition-colors">
                                                                <ThumbsUp className="h-3.5 w-3.5" /> {comment.reactions?.like || 0}
                                                            </button>
                                                            <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors">
                                                                <Heart className="h-3.5 w-3.5" /> {comment.reactions?.love || 0}
                                                            </button>
                                                            <button className="text-[10px] font-black uppercase tracking-widest text-amebogreen-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                            <p className="text-muted-foreground text-lg mb-8 font-serif italic">Nobody don drop gist yet. Be the first!</p>
                                            <Button size="lg" className="bg-amebogreen-600 hover:bg-amebogreen-700 text-white rounded-full px-12 py-8 font-black uppercase tracking-widest text-[10px]">
                                                Start Conversation
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <div className="bg-gray-50 py-24 border-t border-gray-100">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.25em] text-amebogreen-600 mb-4 leading-none">Up Next</h3>
                                    <h2 className="text-4xl font-bold font-serif text-gray-900 leading-none">
                                        More Hot <span className="text-amebogreen-600">Amebo</span>
                                    </h2>
                                </div>
                                <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-amebogreen-600 border-b-2 border-current pb-1 transition-colors">Explore All Gists</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {relatedPosts.map((post: any) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </div>
    );
}
