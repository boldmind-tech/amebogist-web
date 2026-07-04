# 02 — Target Project Structure (Next.js 16.2 App Router)


```
amebogist-web/
├── .gitignore                                    ✅
├── .npmrc                                        ✅
├── .vercelignore                                 ✅
├── proxy.ts                                      
├── instrumentation.ts                            (APP_ENV_SCHEMAS['amebogist-web'])
├── next.config.mjs                               delegate headers() to deploy-config
├── package.json                                 deploy-config
├── tailwind.config.js                            ✅ (no change needed)
├── postcss.config.js                             ✅
├── tsconfig.json                                 ✅
├── global.d.ts                                   ✅
├── project-tree.md                               ✅ (this doc supersedes for planning)
│
├── app/
│   ├── layout.tsx                                
│   ├── globals.css                               ✅
│   ├── manifest.ts                               
│   ├── sitemap.ts                              
│   ├── robots.ts                                 
│   │
│   ├── components/
│   │   └── ClientErrorBoundary.tsx               ✅
│   │
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts                         
│   │   └── auth/
│   │       ├── sso/
│   │       │   └── relay/
│   │       │       └── route.ts                  cookies (see doc 03)
│   │       └── logout/
│   │           └── route.ts                      ✨authApi.logout
│   │
│   ├── amebogistLayout.tsx                       ✅ (kept as the Awrapper source)
│   │
│   ├── (public)/
│   │   ├── layout.tsx                            ✅
│   │   ├── page.tsx                              ✅ — home feed (GET /atrending)
│   │   ├── posts/
│   │   │   ├── page.tsx                          ✅ — all posts, paginated
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                      ✏️ EDIT — add <CommentSectio
│   │   │       └── opengraph-image.tsx           ✨ NEW —media.featuredImage
│   │   ├── category/
│   │   │   └── [slug]/page.tsx                   ✅
│   │   ├── search/page.tsx                       ✅
│   │   ├── pricing/page.tsx                      ✅ — renderproductSlug="amebogist" />
│   │   ├── privacy/page.tsx                      ✅ — <PrivacyPolicy 
│   │   ├── terms/page.tsx                        ✅ — <TermsAndConditions 
│   │   └── concepts/
│   │       └── [productSlug]/page.tsx            ✨ NEW (optional) — VillageCircle 
│   │
│   ├── (auth)/
│   │   ├── layout.tsx                            ✅
│   │   ├── login/page.tsx                        ✅
│   │   ├── register/page.tsx                     ✅
│   │   ├── verify-email/page.tsx                 ✅
│   │   ├── reset-password/page.tsx               ✅
│   │   └── change-password/page.tsx              ✅
│   │
│   └── (dashboard)/
│       ├── layout.tsx                            ✏️ EDIT — wrap with usePermissions
│       ├── dashboard/page.tsx                    ✏️ EDIT — pulls creator/stats via 
│       ├── write/page.tsx                        ✅ — create/edit post (also covers 
│       ├── my-articles/
│       │   └── page.tsx                          ✨ NEW — amebogistApi.getCreatorPosts 
│       ├── analytics/
│       │   └── page.tsx                          ✨ NEW — creator stats breakdown 
│       ├── comments/
│       │   └── page.tsx                          ✨ NEW (optional) — moderation queue 
│       └── settings/
│           ├── page.tsx                          ✨ NEW — profile (usersApi.getProfile/
│           └── notifications/page.tsx            ✨ NEW — push opt-in toggle 
│
├── components/
│   ├── AdBanner.tsx                              ✅
│   ├── AdminArticleTable.tsx                     ✅
│   ├── CookieBar.tsx                             ✏️ EDIT or REMOVE — replace with 
│   ├── NewsletterForm.tsx                        ✅
│   ├── PopularPosts.tsx                          ✅
│   ├── PostCard.tsx                              ✏️ EDIT — use formatRelativeTime, 
│   ├── Providers.tsx                             ✏️ EDIT — compose AuthProvider + 
│   ├── SearchBar.tsx                             ✅
│   ├── ShareButtons.tsx                          ✅
│   ├── TrendingCarousel.tsx                      ✅
│   ├── CommentSection.tsx                        ✨ NEW — thread + reply + reactions 
│   ├── ReactionBar.tsx                           ✨ NEW — like/love/laugh/fire/sad/
│   ├── CreatorStatsCard.tsx                      ✨ NEW — used in dashboard + analytics
│   ├── PushNotificationToggle.tsx                ✨ NEW — wraps @boldmindng/pwa 
│   └── ui/
│       ├── badge.tsx                             ✅
│       ├── button.tsx                            ✅
│       ├── card.tsx                              ✅
│       └── tabs.tsx                              ✅
│
├── lib/
│   ├── api.ts                                    ✏️ EDIT — createClient
│   ├── analytics.ts                              ✨ NEW — thin re-export of track/
│   ├── seo-analyzer.ts                           ✅
│   ├── user-api-adapter.ts                       ✅
│   └── utils.ts                                  ✅
│
├── types/
│   └── index.ts                                  ✅
│
└── public/
    ├── manifest.webmanifest                      ➡️ superseded by app/manifest.ts 
    ├── site.webmanifest                          ➡️ same as above — consolidate to one
    ├── sw.js                                     ✏️ EDIT — generated from @boldmindng/
    ├── sitemap.xml                               ➡️ superseded by app/sitemap.ts 
    ├── ads.txt                                   ✅
    ├── favicon* / icons/* / social/*             ✅ (unchanged)
    └── browserconfig.xml                         ✅
```

---

## Notes on Route-Group Reconciliation

The current tree has the creator workspace at `app/(dashboard)/write/page.tsx`, but `proxy.ts`'s `matcher` protects `/create/:path*`. **Pick one** (recommended: keep `/write` as the canonical URL, since it's already shipped and bookmarkable):

- Update `proxy.ts` matcher to `/write/:path*`, `/my-articles/:path*`, `/dashboard/:path*`, `/analytics/:path*`, `/settings/:path*`, `/profile/edit/:path*` — **not** `/create/:path*`.
- `/profile/edit/:path*` currently has no corresponding page in the confirmed tree — added above as `app/(dashboard)/settings/page.tsx`. If `/profile/edit` is a real route elsewhere, fold it into `(dashboard)/settings`.

## Notes on PWA / TWA Files

- `app/manifest.ts` (Next.js Metadata API `MetadataRoute.Manifest`) replaces the two static webmanifest files. Built from `generateManifest(getProductBySlug('amebogist'))` per `@boldmindng/pwa` — this automatically pulls `theme_color`/`background_color`/icons from `colors.ts` + `products.ts.twa`.
- `public/sw.js` should be generated by a `build:sw` Turbo task (per `@boldmindng/pwa` `SW_TEMPLATE`) using `cacheStrategies.staleWhileRevalidate(['/posts/*', '/category/*'])` for offline reading — this is the "AmeboGist NG PWA offline reading mode" feature listed in `products.ts`.
- `amebogist-twa` (Android Trusted Web Activity) is **the same `amebogist-web` app** (`products.ts` → `app: 'amebogist-web'`), built via `generateTwaConfig()` + Bubblewrap as a separate CI artifact — **no separate repo**, no separate Next.js project. This doc's structure already supports it via `app/manifest.ts`.