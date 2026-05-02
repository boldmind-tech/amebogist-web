// APPS/WEB_APPS/amebogist/app/search/page.tsx
import Link from "next/link";
import { amebogistAPI } from "../../../lib/api";

// Components
import PostCard from "../../../components/PostCard";
import SearchBar from "../../../components/SearchBar";
import { SuperNavbar, SuperFooter } from "@boldmind-tech/ui";
import { TrendingUp } from "lucide-react";

// Types
import type { AmebogistCategory } from "../../../types/index";

export const revalidate = 60;

// Fetch categories from API
async function fetchCategories(): Promise<AmebogistCategory[]> {
    try {
        const response = await amebogistAPI.getCategories();
        return response.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Fetch search results
async function searchPosts(query: string) {
    try {
        const response = await amebogistAPI.articles.list({ search: query });
        const articles = response.data || [];

        return articles.map((post: any) => ({
            _id: post._id,
            title: post.title,
            excerpt: post.excerpt || (typeof post.content === 'string' ? post.content.substring(0, 160) : post.content.pidgin.substring(0, 160)) + "...",
            category: typeof post.category === 'string'
                ? { name: post.category, slug: post.category.toLowerCase() }
                : post.category,
            author: post.author,
            imageUrl: post.imageUrl || "/placeholder.svg",
            slug: post.slug,
            views: post.views || post.engagement?.views || 0,
            createdAt: post.createdAt,
        }));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";

    const [categories, posts, trendingRes] = await Promise.all([
        fetchCategories(),
        query ? searchPosts(query) : Promise.resolve([]),
        amebogistAPI.articles.getTrending(5)
    ]);

    const trendingPosts = (trendingRes.data || []).map((p: any) => ({
        ...p,
        category: typeof p.category === 'string'
            ? { name: p.category, slug: p.category.toLowerCase() }
            : p.category
    }));

    const navLinks = [
        { href: "/", label: "Home" },
        ...categories.filter((cat: any) => cat.slug).map((cat: any) => ({
            href: `/category/${cat.slug}`,
            label: cat.name,
        })),
    ];

    const footerSections = [
        {
            title: "Navigation",
            links: [
                { href: "/", label: "Home" },
                ...categories.filter((cat: any) => cat.slug).map((cat: any) => ({
                    href: `/category/${cat.slug}`,
                    label: cat.name,
                })),
            ],
        },
        {
            title: "Support",
            links: [
                { href: "mailto:hello@boldmind.ng", label: "Email Us" },
                { href: "https://whatsapp.com/channel/0029Vb8JrT172WTo9CpI3T1o", label: "WhatsApp Channel", isExternal: true },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
           
            <main className="container mx-auto px-4 py-12 max-w-7xl pt-32">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 tracking-tight">
                        Search Results for <span className="text-amebogreen-600">"{query}"</span>
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        <SearchBar showTrending={false} initialValue={query} />
                    </div>
                </div>

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
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 rounded-full bg-amebogreen-50 flex items-center justify-center">
                                        <TrendingUp className="h-10 w-10 text-amebogreen-600 opacity-20" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold font-serif mb-4 text-gray-900">No matching Gists found</h2>
                                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">Try searching for broader terms like "Politics", "Entertainment", or "AI".</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {["Tinubu", "Afrobeats", "AI", "Nollywood"].map(term => (
                                        <Link key={term} href={`/search?q=${term}`} className="px-5 py-2 rounded-full border border-gray-200 bg-white hover:bg-amebogreen-600 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                                            #{term}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-premium">
                            <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amebogreen-600" />
                                Trending Instead
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
                    </aside>
                </div>
            </main>

        
        </div>
    );
}
