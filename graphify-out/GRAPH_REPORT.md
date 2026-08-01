# Graph Report - .  (2026-08-01)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 421 nodes · 805 edges · 25 communities (17 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `434639c8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 22
- Community 23

## God Nodes (most connected - your core abstractions)
1. `generatePageMetadata()` - 23 edges
2. `POST()` - 16 edges
3. `getDb()` - 16 edges
4. `compilerOptions` - 16 edges
5. `dispatchOrderToHfd()` - 10 edges
6. `Header()` - 9 edges
7. `Coupon` - 9 edges
8. `AnimateOnScroll()` - 8 edges
9. `LeafIcon()` - 8 edges
10. `CornerOrnament()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `generatePageMetadata()`  [EXTRACTED]
  app/[locale]/about/page.tsx → lib/og-metadata.ts
- `generateMetadata()` --calls--> `generatePageMetadata()`  [EXTRACTED]
  app/[locale]/contact/page.tsx → lib/og-metadata.ts
- `generateMetadata()` --calls--> `generatePageMetadata()`  [EXTRACTED]
  app/[locale]/course/page.tsx → lib/og-metadata.ts
- `generateMetadata()` --calls--> `generatePageMetadata()`  [EXTRACTED]
  app/[locale]/layout.tsx → lib/og-metadata.ts
- `generateMetadata()` --calls--> `generatePageMetadata()`  [EXTRACTED]
  app/[locale]/media/page.tsx → lib/og-metadata.ts

## Import Cycles
- None detected.

## Communities (25 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (43): generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), videos, generateMetadata(), HomePage() (+35 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (50): checkRateLimit(), generateOrderId(), isValidEmail(), maxDuration, POST(), rateLimitMap, resend, checkRateLimit() (+42 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (30): LocaleLayout(), Footer(), Header(), AboutIcon(), ArrowUpIcon(), EmailIcon(), HomeIcon(), LeafIcon() (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (31): AdminDashboard(), CouponStatus, getCouponStatus(), DELETE(), GET(), POST(), PUT(), requireAuth() (+23 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (31): maxDuration, POST(), resend, escapeHtml(), buildHeaders(), cancelShipment(), createShipment(), getLabelPdf() (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (30): bcryptjs, @neondatabase/serverless, next, next-intl, dependencies, bcryptjs, @neondatabase/serverless, next (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (23): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+15 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (16): dynamic, GET(), runtime, createCoupon(), deleteCoupon(), generateId(), getAllCoupons(), getCouponByCode() (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (14): checkLoginRateLimit(), DELETE(), GET(), loginAttempts, POST(), ADMIN_SECRET_PATH, createSessionToken(), getAdminPassword() (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (10): checkRateLimit(), escapeHtml(), generateEmailHTML(), generateSubject(), isValidEmail(), isValidPhone(), LeadData, POST() (+2 more)

## Knowledge Gaps
- **117 isolated node(s):** `videos`, `ProductType`, `metadata`, `CouponStatus`, `loginAttempts` (+112 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generatePageMetadata()` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `SINGLE_BOOK_PRICE` connect `Community 3` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `ProductType` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `videos`, `ProductType`, `metadata` to the rest of the system?**
  _117 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06729264475743349 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06502816180235535 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08350951374207188 - nodes in this community are weakly interconnected._