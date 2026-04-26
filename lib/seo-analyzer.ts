export interface SEOScore {
    score: number; // 0 to 100
    details: {
        label: string;
        passed: boolean;
        importance: 'high' | 'medium' | 'low';
        message: string;
    }[];
}

export function analyzeSEO(article: {
    title: string;
    content: string | { pidgin: string; english?: string };
    slug: string;
    tags?: string[];
    imageUrl?: string;
    excerpt?: string;
}): SEOScore {
    const details: SEOScore['details'] = [];
    let score = 100;

    const contentText = typeof article.content === 'string'
        ? article.content
        : (article.content.english || article.content.pidgin || "");

    // 1. Title Length (High)
    if (!article.title || article.title.length < 30) {
        details.push({
            label: 'Title Length',
            passed: false,
            importance: 'high',
            message: 'Title is too short (aim for 50-60 characters).'
        });
        score -= 15;
    } else if (article.title.length > 70) {
        details.push({
            label: 'Title Length',
            passed: false,
            importance: 'medium',
            message: 'Title is a bit long (aim for 50-60 characters).'
        });
        score -= 5;
    } else {
        details.push({
            label: 'Title Length',
            passed: true,
            importance: 'high',
            message: 'Title length is optimal.'
        });
    }

    // 2. Content Depth (High)
    const wordCount = contentText.split(/\s+/).length;
    if (wordCount < 300) {
        details.push({
            label: 'Content Depth',
            passed: false,
            importance: 'high',
            message: `Content is thin (${wordCount} words). Aim for at least 600 words.`
        });
        score -= 20;
    } else {
        details.push({
            label: 'Content Depth',
            passed: true,
            importance: 'high',
            message: 'Content depth is good.'
        });
    }

    // 3. Featured Image (Medium)
    if (!article.imageUrl) {
        details.push({
            label: 'Featured Image',
            passed: false,
            importance: 'medium',
            message: 'Article is missing a featured image.'
        });
        score -= 10;
    } else {
        details.push({
            label: 'Featured Image',
            passed: true,
            importance: 'medium',
            message: 'Featured image present.'
        });
    }

    // 4. Tags (Low)
    if (!article.tags || article.tags.length < 3) {
        details.push({
            label: 'Tags',
            passed: false,
            importance: 'low',
            message: 'Use at least 3 relevant tags.'
        });
        score -= 5;
    } else {
        details.push({
            label: 'Tags',
            passed: true,
            importance: 'low',
            message: 'Sufficient tags used.'
        });
    }

    // 5. Slug match (Medium)
    const slugKeywords = article.slug.split('-');
    const titleKeywords = article.title.toLowerCase().split(/\s+/);
    const matchCount = slugKeywords.filter(kw => titleKeywords.includes(kw)).length;

    if (matchCount < 2) {
        details.push({
            label: 'URL Structure',
            passed: false,
            importance: 'medium',
            message: 'Slug doesn\'t match title keywords well.'
        });
        score -= 5;
    } else {
        details.push({
            label: 'URL Structure',
            passed: true,
            importance: 'medium',
            message: 'Slug is keyword-rich.'
        });
    }

    // 6. Excerpt (Medium)
    if (!article.excerpt || article.excerpt.length < 50) {
        details.push({
            label: 'Meta Description',
            passed: false,
            importance: 'medium',
            message: 'Excerpt/Meta description is missing or too short.'
        });
        score -= 10;
    } else {
        details.push({
            label: 'Meta Description',
            passed: true,
            importance: 'medium',
            message: 'Excellent meta description.'
        });
    }

    return {
        score: Math.max(0, score),
        details
    };
}
