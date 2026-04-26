"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Eye, Search, Filter, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { analyzeSEO } from "../lib/seo-analyzer";

interface ArticleTableProps {
    articles: any[];
    onDelete: (id: string) => void;
}

export default function AdminArticleTable({ articles, onDelete }: ArticleTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || article.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getSEOBadge = (article: any) => {
        const { score } = analyzeSEO(article);
        if (score >= 80) return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">{score}% Good</Badge>;
        if (score >= 50) return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-bold">{score}% Fair</Badge>;
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-bold">{score}% Poor</Badge>;
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                        className="p-2 rounded-lg border border-gray-200 outline-none focus:border-green-500 transition-colors bg-white text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Drafts</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-black uppercase tracking-widest text-muted-foreground">
                            <th className="px-6 py-4">Article</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">SEO Health</th>
                            <th className="px-6 py-4">Stats</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredArticles.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    No articles found matching your criteria.
                                </td>
                            </tr>
                        ) : filteredArticles.map((article) => (
                            <tr key={article._id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 line-clamp-1">{article.title}</span>
                                        <span className="text-xs text-muted-foreground">{article.slug}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {article.status === 'published' ? (
                                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs uppercase">
                                            <CheckCircle2 className="h-3.5 w-3.5" /> Published
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs uppercase">
                                            <AlertCircle className="h-3.5 w-3.5" /> Draft
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {getSEOBadge(article)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-xs font-medium">
                                        <span className="text-gray-900">{(article.views || 0).toLocaleString()} views</span>
                                        <span className="text-muted-foreground">Updated {new Date(article.updatedAt || article.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild title="View Link">
                                            <Link href={`/posts/${article.slug}`}>
                                                <Eye className="h-4 w-4 text-blue-600" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild title="Edit Content">
                                            <Link href={`/admin/edit/${article.slug}`}>
                                                <Edit className="h-4 w-4 text-green-600" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                if (confirm(`Are you sure you want to delete "${article.title}"?`)) {
                                                    onDelete(article._id);
                                                }
                                            }}
                                            title="Delete Permanently"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
