# Graph Report - nes-hatamar  (2026-08-12)

## Corpus Check
- 99 files · ~307,321 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 626 nodes · 1030 edges · 39 communities (31 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1f217d44`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- purchase/page.tsx
- create-order/route.ts
- [locale]/layout.tsx
- coupon-validator.ts
- client.ts
- dependencies
- compilerOptions
- devDependencies
- Taskmaster Tool & Command Reference
- session-auth.ts
- lead-capture/route.ts
- admin/layout.tsx
- app/layout.tsx
- HeadstartEmbed.tsx
- next.config.ts
- test-map-order.mjs
- vercel.json
- eslint.config.mjs
- postcss.config.mjs
- Nes Hatamar - Design Principles & Checklist
- Nes Hatamar - Brand Style Guide
- Taskmaster Development Workflow
- נס התמר | Nes HaTamar
- media/page.tsx
- Icons.tsx
- generatePageMetadata
- [locale]/page.tsx
- HFD Courier Integration Runbook
- contact/page.tsx

## God Nodes (most connected - your core abstractions)
1. `generatePageMetadata()` - 23 edges
2. `Taskmaster Development Workflow` - 19 edges
3. `POST()` - 16 edges
4. `getDb()` - 16 edges
5. `compilerOptions` - 16 edges
6. `Taskmaster Tool & Command Reference` - 13 edges
7. `Nes Hatamar - Design Principles & Checklist` - 13 edges
8. `dispatchOrderToHfd()` - 10 edges
9. `Nes Hatamar - Brand Style Guide` - 10 edges
10. `Header()` - 9 edges

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

## Communities (39 total, 8 thin omitted)

### Community 0 - "purchase/page.tsx"
Cohesion: 0.12
Nodes (17): generateMetadata(), generateMetadata(), ProductType, AnimateOnScroll(), AnimateOnScrollProps, AnimalIcon(), BookIcon(), CalendarIcon() (+9 more)

### Community 1 - "create-order/route.ts"
Cohesion: 0.06
Nodes (64): checkRateLimit(), generateOrderId(), isValidEmail(), maxDuration, POST(), rateLimitMap, resend, maxDuration (+56 more)

### Community 2 - "[locale]/layout.tsx"
Cohesion: 0.10
Nodes (17): LocaleLayout(), LanguageSwitcher(), StructuredData(), StructuredDataProps, WhatsAppFAB(), defaultLocale, Locale, locales (+9 more)

### Community 3 - "coupon-validator.ts"
Cohesion: 0.08
Nodes (44): AdminDashboard(), CouponStatus, getCouponStatus(), DELETE(), GET(), POST(), PUT(), requireAuth() (+36 more)

### Community 4 - "client.ts"
Cohesion: 0.17
Nodes (19): buildHeaders(), cancelShipment(), createShipment(), getLabelPdf(), getShipment(), getHfdConfig(), HfdConfig, clamp() (+11 more)

### Community 5 - "dependencies"
Cohesion: 0.06
Nodes (30): bcryptjs, @neondatabase/serverless, next, next-intl, dependencies, bcryptjs, @neondatabase/serverless, next (+22 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "devDependencies"
Cohesion: 0.09
Nodes (23): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+15 more)

### Community 8 - "Taskmaster Tool & Command Reference"
Cohesion: 0.04
Nodes (46): 10. Update Subtask (`update_subtask`), 11. Set Task Status (`set_task_status`), 12. Remove Task (`remove_task`), 13. Expand Task (`expand_task`), 14. Expand All Tasks (`expand_all`), 15. Clear Subtasks (`clear_subtasks`), 16. Remove Subtask (`remove_subtask`), 17. Move Task (`move_task`) (+38 more)

### Community 9 - "session-auth.ts"
Cohesion: 0.21
Nodes (14): checkLoginRateLimit(), DELETE(), GET(), loginAttempts, POST(), ADMIN_SECRET_PATH, createSessionToken(), getAdminPassword() (+6 more)

### Community 10 - "lead-capture/route.ts"
Cohesion: 0.29
Nodes (10): checkRateLimit(), escapeHtml(), generateEmailHTML(), generateSubject(), isValidEmail(), isValidPhone(), LeadData, POST() (+2 more)

### Community 25 - "Nes Hatamar - Design Principles & Checklist"
Cohesion: 0.05
Nodes (40): Bilingual Support, Brand Identity, Comprehensive Design Review, Design Principles, Development Server, Nes Hatamar Project - Claude Code Configuration, Project-Specific Considerations, Quick Visual Check (+32 more)

### Community 26 - "Nes Hatamar - Brand Style Guide"
Cohesion: 0.06
Nodes (33): Accent Color, Accessibility Standards, Bidirectional Design (RTL/LTR), Brand Identity, Brand Voice, Breakpoints (Tailwind Defaults), Buttons, Cards (+25 more)

### Community 27 - "Taskmaster Development Workflow"
Cohesion: 0.06
Nodes (30): Advanced Workflow (Tag-Based & PRD-Driven), Code Analysis & Refactoring Techniques, Configuration Management (Updated), Determining the Next Task, How the Tag System Works (For Your Reference), Implementation Drift Handling, Iterative Subtask Implementation, Leveling Up: Agent-Led Multi-Context Workflows (+22 more)

### Community 28 - "נס התמר | Nes HaTamar"
Cohesion: 0.09
Nodes (22): Adding Real Images, Authors, 🌐 Bilingual Support, Building for Production, 🎨 Classic Design, Contact Form Integration, Customization, Deployment (+14 more)

### Community 29 - "media/page.tsx"
Cohesion: 0.17
Nodes (16): MediaPage(), revalidate, videos, ArrowRightIcon(), CloseIcon(), LaunchEventCard(), ScheduleItem, hasSeenPopup() (+8 more)

### Community 30 - "Icons.tsx"
Cohesion: 0.29
Nodes (13): Footer(), Header(), AboutIcon(), ArrowUpIcon(), EmailIcon(), HomeIcon(), IconProps, LeafIcon() (+5 more)

### Community 31 - "generatePageMetadata"
Cohesion: 0.16
Nodes (10): generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata() (+2 more)

### Community 32 - "[locale]/page.tsx"
Cohesion: 0.18
Nodes (11): HomePage(), GalleryIcon(), OrnamentIcon(), PaletteIcon(), TorahScrollIcon(), Divider(), Testimonial, TestimonialsCarousel() (+3 more)

### Community 33 - "HFD Courier Integration Runbook"
Cohesion: 0.25
Nodes (7): Credentials, Edge cases, HFD Courier Integration Runbook, How it works, Local smoke test, Manual operations, Verifying a dispatch

### Community 34 - "contact/page.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), WhatsAppIcon(), FormData, LeadCaptureForm()

## Knowledge Gaps
- **255 isolated node(s):** `revalidate`, `videos`, `ProductType`, `metadata`, `CouponStatus` (+250 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generatePageMetadata()` connect `generatePageMetadata` to `purchase/page.tsx`, `[locale]/page.tsx`, `contact/page.tsx`, `[locale]/layout.tsx`, `media/page.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `SINGLE_BOOK_PRICE` connect `purchase/page.tsx` to `create-order/route.ts`, `coupon-validator.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Nes Hatamar - Brand Style Guide` connect `Nes Hatamar - Brand Style Guide` to `Nes Hatamar - Design Principles & Checklist`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `revalidate`, `videos`, `ProductType` to the rest of the system?**
  _255 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `purchase/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `create-order/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055379746835443035 - nodes in this community are weakly interconnected._
- **Should `[locale]/layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._