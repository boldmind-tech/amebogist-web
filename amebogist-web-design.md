# amebogist-web — Design Document + UX Upgrade Plan

Pillar: **Awareness** · Domain: `amebogist.ng` · Colors: primary `#065F46`, secondary `#DC2626`, background `#FFFBEB`, foreground `#1C1917`
Source: `amebogist-web-project-tree.md`, canonical §4.12, `products.ts` `amebogist`.

---

## Part 1 — Design Document

## 1. Overview

- **Purpose:** Nigeria's Pidgin-English media platform — AI/tech, sports, politics, entertainment, creator content. AdSense + subscription monetized, the "top of funnel" for the whole ecosystem.
- **Personas:** casual readers (stranger→reader stage of the flywheel), creators/writers earning via the platform, advertisers.
- **Primary goals:** read/discover gist fast, react/comment, for creators: write and publish; for the ecosystem: convert readers into VillageCircle/EduCenter/PlanAI traffic.

## 2. Page/Routing Map

**Auth** (`app/(auth)/`): `/change-password`, `/login`, `/register`, `/reset-password`, `/verify-email`
**Dashboard** (`app/(dashboard)/`, creator-role gated): `/dashboard`, `/write`
**Public** (`app/(public)/`): `/`, `/category/[slug]`, `/posts`, `/posts/[slug]`, `/pricing`, `/privacy`, `/search`, `/terms`
**API:** `app/api/auth/logout`, `app/api/auth/sso/relay`, `app/api/health`

## 3. Layout Architecture

```text
app/layout.tsx           → root providers (Providers.tsx), ClientErrorBoundary
app/amebogistLayout.tsx  → SuperNavbar + SuperFooter + CookieBar, awareness tokens
(public) routes           → amebogistLayout, PWA-installable, offline reading cache
(dashboard) routes         → creator-only gate via usePermissions('content:create')
SSO: app/api/auth/sso/relay/route.ts (separate TLD — always relay-token based,
     never shares a cookie with any other ecosystem domain)
```

## 4. State Management

- `useUser`, `usePermissions` for creator/admin gating on `/write` and `AdminArticleTable`.
- Server state: `amebogistApi.{getPosts, getPost, getCategories, getTrending, react, getComments, postComment, createPost, updatePost, publishPost, getCreatorStats, getCreatorPosts}`.
- `useOffline` (from `@boldmindng/utils`) drives the PWA offline-reading banner.
- `SearchBar.tsx` holds local query state, debounced (`useDebounce`) before hitting `/amebogist/posts?search=`.

## 5. Data Flow (representative)

```text
Home feed → GET /amebogist/posts?page=&category= → PostCard[] + TrendingCarousel
            (GET /amebogist/trending)
Post view → GET /amebogist/posts/:slug (increments views) → GET /amebogist/posts/:id/comments
React     → POST /amebogist/posts/:id/react → optimistic count bump
Write     → POST /amebogist/posts (draft) → PATCH updates → POST /amebogist/posts/:id/publish
Creator dashboard → GET /amebogist/creator/stats + GET /amebogist/creator/posts
```

## 6. Key Components

| Component               | Responsibility                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| `PostCard.tsx`          | feed/list item — headline, excerpt, category tag, reaction counts |
| `TrendingCarousel.tsx`  | horizontal trending-posts strip                                   |
| `PopularPosts.tsx`      | sidebar/related module                                            |
| `SearchBar.tsx`         | debounced search input                                            |
| `ShareButtons.tsx`      | social share incl. WhatsApp deep link                             |
| `NewsletterForm.tsx`    | "Wetin Happen" digest signup                                      |
| `AdBanner.tsx`          | AdSense + local-ads slot                                          |
| `AdminArticleTable.tsx` | creator/admin post management table                               |
| `CookieBar.tsx`         | consent banner gating analytics init                              |

## 7. Dependencies

`@boldmindng/{ui, auth, api-client, utils, analytics, pwa, deploy-config}`. No `wallet`/`api-docs` here.

## 8. Environment Variables

Common set + `NEXT_PUBLIC_APP_URL=https://amebogist.ng`, `NEXT_PUBLIC_PRODUCT_SLUG=amebogist`. AdSense publisher ID (client-safe) if not already folded into `AdBanner.tsx` config.

## 9. Testing Strategy

E2E: anonymous read → react (should prompt login) → login → react succeeds; creator draft → publish; search debounce doesn't double-fire; offline banner appears when `useOffline()` flips.

## 10. Performance

This is the highest-traffic, most SEO-dependent app in the ecosystem — ISR on `/posts/[slug]` and `/category/[slug]`, `next/image` with explicit dimensions on every `PostCard` thumbnail (CLS risk), RSS/sitemap already server-rendered per canonical §4.12. Lighthouse target ≥90 on `/` and `/posts/[slug]` specifically — this is the flywheel's entry point, slow-loading here costs the whole ecosystem's top-of-funnel.

## 11. Deployment

Vercel project `amebogist-web`, own domain (not a `.boldmind.ng` subdomain) — CORS + SSO relay both matter here more than for planai-suite. Build: `pnpm turbo build --filter=amebogist-web`.

---

## Part 2 — UX Upgrade Plan

## 1. UX Audit

| Issue                                                                        | Page                    | Impact                                                                                        |
| ---------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| No confirmed distinction between AI-summarized vs human-written posts        | feed/`/posts/[slug]`    | Pidgin authenticity concern (canonical challenge) — readers should be able to tell            |
| Feed likely airy/card-with-shadow instead of dense newsstand grid            | `/`, `/category/[slug]` | Wrong pillar personality — awareness should feel like a newsstand at 7am, not a blog template |
| No visible read-progress or "still reading" state on long posts              | `/posts/[slug]`         | Users lose place on mobile scroll                                                             |
| Comment section likely flat list, no nesting visual hierarchy for replies    | `/posts/[slug]`         | Reply threads (per canonical, `parentId` supported) hard to follow if unstyled                |
| No creator earnings visibility beyond raw stats                              | `/dashboard`            | Creators can't quickly gauge "is this worth writing for"                                      |
| WhatsApp share exists but no visible cross-link into VillageCircle/EduCenter | tagged posts            | The flywheel handoff (JAMB tag→EduCenter, business tag→PlanAI) isn't visually present         |

## 2. User Journey Map (Reader persona)

Arrives via search/social → `/` or `/category/[slug]` (wants: scan headlines fast, dense not sparse) → `/posts/[slug]` (wants: read, react, maybe comment) → tagged content nudges to EduCenter/PlanAI/VillageCircle → optionally signs up for creator access.

**Friction points:** feed density, missing pillar-handoff visibility, comment thread readability.

## 3. Page-by-Page Recommendations

### 3.1 Home feed (`/`) and `/category/[slug]`

- **Upgrade:** dense scannable grid (3–4 col desktop, 1 col mobile) over airy card-with-shadow — newsprint-adjacent contrast (`#FFFBEB` background, high-contrast `#1C1917` headlines), category tag as a small colored label not a full pill-badge, thumbnail aspect-ratio locked to avoid CLS.

### 3.2 `/posts/[slug]`

- **Upgrade:** sticky reading-progress bar (thin, `secondary` `#DC2626` fill) at top; visible source tag if AI-assisted-summary vs full human byline; inline `CrossLink` after tagged posts using the flywheel routing rules (JAMB/WAEC/exam → EduCenter CTA card; business/startup → PlanAI CTA card) — this makes the existing routing _rules_ in the brand manual actually visible in-product, not just backend logic.

### 3.3 Comments

- **Upgrade:** visual indent + connecting line for replies (`parentId`), reaction counts per comment rendered compactly (not full-width reaction bar per comment).

### 3.4 `/dashboard` (creator)

- **Upgrade:** earnings-forward stat cards (tips via Paystack per canonical features list, ad rev share if applicable) above raw view/engagement counts — creators care about "did this pay" first.

## 4. Accessibility

Newsprint-contrast palette must still clear WCAG AA — verify `#1C1917` on `#FFFBEB` (should easily pass) and `#DC2626` badge text doesn't rely on color alone (add icon/label). Pidgin-mode and dyslexia-mode both apply here — this app has the widest general-audience reach in the ecosystem, accessibility matters most here.

## 5. Performance UX

Skeleton feed cards (shape-matched grid) while `GET /amebogist/posts` loads — never a full-page spinner on the highest-traffic route. Optimistic reaction counts.

## 6. Mobile Experience

Feed collapses to 1 column, thumbnail-left/text-right compact rows (not full-bleed cards) to keep density on small screens. Bottom-anchored share/react bar on `/posts/[slug]` for thumb reach. `SearchBar` becomes a top-bar icon that expands, not a persistent full-width input eating vertical space.

## 7. Implementation Plan

| Priority | Task                                            | Page(s)                 | Effort | Owner    |
| -------- | ----------------------------------------------- | ----------------------- | ------ | -------- |
| P0       | Dense newsstand feed grid                       | `/`, `/category/[slug]` | 3d     | Frontend |
| P0       | Inline flywheel CrossLink cards on tagged posts | `/posts/[slug]`         | 2d     | Frontend |
| P1       | Comment thread visual nesting                   | `/posts/[slug]`         | 1d     | Frontend |
| P1       | Reading-progress bar                            | `/posts/[slug]`         | 1d     | Frontend |
| P1       | Creator earnings-forward dashboard              | `/dashboard`            | 2d     | Frontend |
| P2       | Mobile compact feed rows                        | `/`                     | 1d     | Frontend |
| P2       | Accessibility contrast audit                    | all                     | 1d     | Frontend |
