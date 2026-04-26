export interface AmebogistCategory {
    id: string;
    name: string;
    slug: string;
    count?: number;
    metaTitle?: string;
    metaDescription?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AmebogistArticle {
    _id: string;
    title: string;
    content: string | { pidgin: string; english?: string; yoruba?: string, igbo?: string; hausa?: string };
    excerpt: string;
    slug: string;
    category: AmebogistCategory | string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    imageUrl?: string;
    tags?: string[];
    views: number;
    engagement?: {
        views: number;
        likes: number;
        shares: number;
        commentsCount: number;
    };
    createdAt: string;
    status: 'draft' | 'published';
}

// NEW: Add AmebogistComment interface
export interface AmebogistComment {
    id: string;
    content: string;
    author?: {
        id: string;
        fullName?: string;
        avatar?: string;
    };
    reactions?: Record<string, number>;
    isFlagged?: boolean;
    createdAt: string;
}