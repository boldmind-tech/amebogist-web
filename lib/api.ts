

import { boldMindAPI, type ArticleListParams, type CreateArticlePayload } from '@boldmind-tech/api-client';

/**
 * Amebogist API Client
 * Centralizes API calls using the central @boldmind/api-client hub
 */
export const amebogistAPI = {
    /**
     * Articles management
     */
    articles: {
        /** GET /amebogist/articles */
        list: (params?: ArticleListParams) => boldMindAPI.amebogist.list(params),
        
        /** GET /amebogist/articles/:slug */
        get: (slug: string) => boldMindAPI.amebogist.getBySlug(slug),
        
        /** POST /amebogist/articles */
        create: (data: CreateArticlePayload) => boldMindAPI.amebogist.create(data),
        
        /** PATCH /amebogist/articles/:id */
        update: (id: string, data: Partial<CreateArticlePayload>) => 
            boldMindAPI.amebogist.update(id, data),
        
        /** DELETE /amebogist/articles/:id */
        delete: (id: string) => boldMindAPI.amebogist.delete(id),
        
        /** PATCH /amebogist/articles/:id/publish */
        publish: (id: string) => boldMindAPI.amebogist.publish(id),
        
        /** PATCH /amebogist/articles/:id/archive */
        archive: (id: string) => boldMindAPI.amebogist.archive(id),
        
        /** PATCH /amebogist/articles/:id/feature */
        feature: (id: string) => boldMindAPI.amebogist.feature(id),
        
        /** GET /amebogist/articles/trending */
        getTrending: (limit?: number) => boldMindAPI.amebogist.trending(limit),
        
        /** GET /amebogist/articles/featured */
        getFeatured: () => boldMindAPI.amebogist.featured(),
        
        /** GET /amebogist/search */
        search: (query: string, page?: number) => 
            boldMindAPI.amebogist.search(query, page),
        
        /** GET /amebogist/articles/trends */
        getTrends: () => boldMindAPI.amebogist.trends(),
        
        /** POST /amebogist/articles/:id/react */
        react: (id: string, reaction: string) => 
            boldMindAPI.amebogist.react(id, reaction),
        
        /** POST /amebogist/articles/:slug/view */
        recordView: (slug: string) => boldMindAPI.amebogist.recordView(slug),
        
        /** POST /amebogist/articles/generate-ai */
        generateAI: (prompt: string) => boldMindAPI.amebogist.generateAI(prompt),
        
        /** POST /amebogist/articles/:id/video-factory */
        triggerVideoFactory: (id: string) => boldMindAPI.amebogist.videoFactory(id),
        
        /** GET /amebogist/articles/:id/comments */
        getComments: (articleId: string, page?: number) => 
            boldMindAPI.amebogist.comments.list(articleId, page),
        
        /** POST /amebogist/articles/:id/comments */
        createComment: (articleId: string, content: string) => 
            boldMindAPI.amebogist.comments.create(articleId, content),
    },

    /**
     * Comments management
     */
    comments: {
        /** DELETE /amebogist/comments/:id */
        delete: (commentId: string) => boldMindAPI.amebogist.comments.delete(commentId),
        
        /** PATCH /amebogist/comments/:id/react */
        react: (commentId: string, reaction: string) => 
            boldMindAPI.amebogist.comments.react(commentId, reaction),
        
        /** PATCH /amebogist/comments/:id/flag */
        flag: (commentId: string) => boldMindAPI.amebogist.comments.flag(commentId),
    },

    /**
     * Categories
     */
    getCategories: () => boldMindAPI.amebogist.categories(),

    /**
     * Creator Dashboard
     */
    creator: {
        /** GET /amebogist/creator/my-articles */
        getMyArticles: (params?: ArticleListParams) => 
            boldMindAPI.amebogist.creator.myArticles(params),
        
        /** GET /amebogist/creator/stats */
        getStats: () => boldMindAPI.amebogist.creator.stats(),
        
        /** GET /amebogist/me/stats */
        getMyStats: () => boldMindAPI.amebogist.creator.meStats(),
    },

    /**
     * RSS Feeds
     */
    rss: {
        /** GET /amebogist/rss */
        feed: () => boldMindAPI.amebogist.rss.feed(),
        
        /** GET /amebogist/rss/:category */
        categoryFeed: (category: string) => boldMindAPI.amebogist.rss.categoryFeed(category),
    },

    /**
     * Hub & Core modules access
     */
    hub: boldMindAPI.planai,
    users: boldMindAPI.users,
    auth: boldMindAPI.auth,
};

export default amebogistAPI;