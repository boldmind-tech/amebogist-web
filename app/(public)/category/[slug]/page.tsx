import Link from "next/link";
import { amebogistAPI } from "../../../../lib/api";

// Components
import PostCard from "../../../../components/PostCard";
import { SuperNavbar, SuperFooter } from "@boldmind-tech/ui";
import { TrendingUp, Brain, Users, ChevronRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";

// Types
import type { AmebogistCategory } from "../../../../types/index";

export const revalidate = 60;

// Fetch categories from API
async function fetchCategories(): Promise<AmebogistCategory[]> {
    try {
        const response = await amebogistAPI.getCategories();
        return (response.data || []).map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Fetch posts from API
async function fetchPosts(params: any = {}) {
    try {
        const response = await amebogistAPI.articles.list(params);
        const articles = response.data || [];
        const total = response.meta?.total || articles.length;

        return {
            posts: articles.map((post: any) => ({
                _id: post._id || post.id,
                title: post.title,
                excerpt: post.excerpt || (typeof post.content === 'string' ? post.content.substring(0, 160) : (post.content?.pidgin ?? '').substring(0, 160)) + "...",
                category: typeof post.category === 'string'
                    ? { name: post.category, slug: post.category.toLowerCase() }
                    : (post.category ?? { name: 'Gist', slug: 'gist' }),
                author: {
                    id:     post.author?.id ?? '',
                    name:   post.author?.fullName || post.author?.name || 'Amebo Master',
                    avatar: post.author?.avatar,
                },
                imageUrl: post.coverImage || post.imageUrl || "/placeholder.svg",
                slug: post.slug,
                views: post.viewCount ?? post.views ?? post.engagement?.views ?? 0,
                createdAt: post.createdAt,
            })),
            total,
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], total: 0 };
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [categories, postsData, trendingPostsRes] = await Promise.all([
        fetchCategories(),
        fetchPosts({ category: slug, limit: 12 }),
        amebogistAPI.articles.getTrending(5)
    ]);

    const categoryObject = categories.find((c: any) => c.slug === slug);
    const categoryName = categoryObject?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
    const { posts } = postsData;
    const trendingPosts = (trendingPostsRes.data || []).map((p: any) => ({
        ...p,
        category: typeof p.category === 'string'
            ? { name: p.category, slug: p.category.toLowerCase() }
            : p.category
    }));

    const navLinks = [
        { href: "/", label: "Home" },
        ...categories.filter((cat: any) => cat.slug).map((cat:any) => ({
            href: `/category/${cat.slug}`,
            label: cat.name,
        })),
    ];

    const footerSections = [
        {
            title: "Navigation",
            links: [
                { href: "/", label: "Home" },
                ...categories.filter((cat: any) => cat.slug).map((cat:any) => ({
                    href: `/category/${cat.slug}`,
                    label: cat.name,
                })),
            ],
        },
        {
            title: "Support",
            links: [
                { href: "mailto:hello@boldmind.ng", label: "Email Us" },
                { href: "https://wa.me/2349138349271", label: "WhatsApp Support", isExternal: true },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
          

            <main className="container mx-auto px-4 py-12 max-w-7xl pt-32">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amebogreen-50 text-amebogreen-700 font-black text-[10px] uppercase tracking-widest mb-6">
                        Category
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 tracking-tight">
                        {categoryName} <span className="text-amebogreen-600">Gists</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-serif">
                        {categoryObject?.description || `Fresh updates and trending stories in ${categoryName.toLowerCase()}.`}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {posts.map((post: any) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-[3rem] p-16 text-center border border-gray-100">
                                <h2 className="text-3xl font-bold font-serif mb-4 text-gray-900">No Gists here yet</h2>
                                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">We're still cooking some fresh stories for this category. Stay tuned!</p>
                                <Button asChild className="bg-amebogreen-600 hover:bg-amebogreen-700 text-white rounded-full px-12 py-6">
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Trending Section */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-premium">
                            <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amebogreen-600" />
                                Trending Now
                            </h3>
                            <div className="space-y-6">
                                {trendingPosts.map((post: any, idx: number) => (
                                    <Link key={post._id} href={`/posts/${post.slug}`} className="flex items-start gap-4 group">
                                        <span className="text-2xl font-black text-gray-100 group-hover:text-amebogreen-500/20 transition-colors">0{idx + 1}</span>
                                        <div>
                                            <h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-amebogreen-600 transition-colors font-serif">{post.title}</h4>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                                                <span className="text-amebogreen-600">{post.category.name}</span>
                                                <span>•</span>
                                                <span>{(post.engagement?.views || post.views || 0).toLocaleString()} Views</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Ecosystem Teaser */}
                        <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 space-y-10">
                                <header>
                                    <p className="text-xs text-amebogreen-400 font-black uppercase tracking-[0.25em] mb-2 leading-none">Global Impact</p>
                                    <h3 className="text-3xl font-bold font-serif leading-none">Ecosystem Stats</h3>
                                </header>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                            <Brain className="h-7 w-7 text-amebogreen-400" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black">18+</p>
                                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">AI Powerhouses</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                            <Users className="h-7 w-7 text-amebogreen-400" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black">12.5k</p>
                                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Active Members</p>
                                        </div>
                                    </div>
                                </div>
                                <footer className="pt-8 border-t border-white/10">
                                    <Button asChild variant="link" className="text-amebogreen-400 font-black uppercase tracking-widest text-[10px] p-0 h-auto gap-2 hover:no-underline hover:text-white">
                                        <Link href="https://boldmind.ng">Join BoldMind Ecosystem <ChevronRight className="h-3 w-3" /></Link>
                                    </Button>
                                </footer>
                            </div>
                            {/* Background glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amebogreen-500/10 rounded-full blur-[80px]" />
                        </div>
                    </aside>
                </div>
            </main>

          
        </div>
    );
}
