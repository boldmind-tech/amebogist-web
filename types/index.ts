// Re-export canonical types from the shared api-client so the frontend
// has a single source of truth and stays in sync automatically.
export type {
  Article as AmebogistArticle,
  ArticleContent,
  ArticleMedia,
  ArticleEngagement,
  ArticleAuthor,
  ArticleSeo,
  ArticleCategorySlug,
  ArticleStatus,
  ArticleSource,
  ReactionType,
  ArticleComment as AmebogistComment,
  CommentReactions,
  CommentAuthor,
  CommentLanguage,
  CreatorStats,
} from '@boldmind-tech/api-client';

// Re-export payload + param types used in forms / fetch calls
export type {
  ArticleListParams,
  CreateArticlePayload,
  GenerateAIPayload,
  GeneratedArticle,
  VideoFactoryResult,
} from '@boldmind-tech/api-client';

// AmebogistCategory keeps its extended form (the API can return richer data
// for the categories admin page that isn't in the shared ArticleCategory type).
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

/** Helper — resolves the cover image whether the post is old (imageUrl) or new (media.featuredImage) */
export function resolveArticleImage(article: import('@boldmind-tech/api-client').Article): string | undefined {
  return article.media?.featuredImage ?? article.imageUrl ?? undefined;
}
