# Architecture

## Stack

- Next.js App Router with TypeScript.
- Tailwind CSS for the design system.
- Framer Motion for subtle page-section entrance animation.
- Auth.js/NextAuth for authentication.
- Prisma ORM with PostgreSQL.
- Resend for email.
- Stripe and Razorpay payment hooks.
- PWA assets with service worker caching.

## Data Model

The Prisma schema supports:

- Admin and reader users.
- Auth.js accounts, sessions, and verification tokens.
- Posts with story/blog type, draft/published/scheduled status, premium/free access, thumbnails, rich HTML content, SEO fields, reading time, tags, categories, and writer notes.
- Nested comments with moderation, reports, and spam protection fields.
- Subscribers, newsletter campaigns, newsletter recipients, and templates.
- Appreciations, bookmarks, reading history, reading streaks, achievements, and notifications.
- Series, ordered chapters, and series follows.
- Membership plans, subscriptions, donations, tips, and supporter visibility.
- Page views for analytics.
- Content import records for future markdown import/export workflows.

## Request Flow

Public pages call `src/lib/posts.ts`, which reads from Prisma when `DATABASE_URL` exists and falls back to branded demo content otherwise. This keeps local preview quick while preserving a real production data path.

API routes validate inputs with Zod, apply lightweight in-memory rate limiting, sanitize user content, and persist through Prisma when configured. Admin-writing routes use `getAdminAccess()`.

## Security

- Auth.js handles authentication sessions and provider CSRF.
- Custom APIs check same-origin for write routes where useful.
- Zod validates input payloads.
- `sanitize-html` strips unsafe comment and post content.
- Admin pages and write APIs check admin role.
- Comment and subscription endpoints include rate limiting and honeypot fields.
- Scheduled publishing requires `CRON_SECRET` when configured.

## SEO And Performance

- Dynamic sitemap and robots routes.
- Per-post metadata, Open Graph, Twitter cards, and JSON-LD.
- Local branded image assets and lazy-loaded thumbnails.
- Server-rendered public pages.
- Mobile-first responsive layouts.
- PWA manifest and service worker.

## Future AI Features

The post, tag, reading history, analytics, and recommendation helpers are separated so AI summarization, smart tagging, content insights, and reading trend analysis can be added as background jobs without changing the public page model.
