# Talez - Tales, Thoughts, and Beyond

Talez is a full-stack storytelling, blogging, membership, newsletter, and reader-community platform built with Next.js, TypeScript, Tailwind CSS, Prisma, Auth.js, PostgreSQL-ready data models, Resend email hooks, and Stripe/Razorpay payment hooks.

## What Is Included

- Public website with separate Stories and Blogs sections.
- Responsive reading experience with progress bar, sticky table of contents, readable prose, code blocks, related posts, sharing, bookmarks, tips, and comments.
- Light, dark, and system theme modes with saved preference.
- Reader accounts with email/password plus Google and GitHub provider wiring.
- Reader dashboard with history, bookmarks, achievements, membership status, notifications, and recommendations UI.
- Secure admin dashboard with content, subscribers, comments, newsletters, memberships, and analytics screens.
- Prisma schema for admins, users, posts, categories, tags, comments, subscribers, appreciations, bookmarks, reading history, series, achievements, donations, tips, memberships, notifications, and analytics.
- API routes for auth, registration, subscriptions, comments, appreciation, bookmarks, reading history, posts, newsletters, memberships, donations, tips, follow-author, RSS, and scheduled publishing.
- PWA manifest, service worker, favicons, app icons, Open Graph/Twitter images, sitemap, robots.txt, and structured data.
- Branded assets generated from the supplied TaleZ logo in `public/brand` and `public`.

## Local Setup

1. Install dependencies:

```bash
npm install
```

On Windows PowerShell, use `npm.cmd install` if script execution blocks `npm`.

2. Create environment file:

```bash
cp .env.example .env
```

3. Set at minimum:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/talez?schema=public
AUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@talez.local
ADMIN_PASSWORD=change-this-password
```

4. Generate Prisma client and migrate:

```bash
npm run db:generate
npm run db:migrate
```

5. Seed the first admin:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin Credentials

The admin account is created by `npm run db:seed` using:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

After seeding, sign in at `/sign-in`, then open `/admin`.

## Provider Setup

- Email: set `RESEND_API_KEY` and `EMAIL_FROM`.
- Google login: set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- GitHub login: set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
- Stripe: set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- Razorpay: set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
- Storage: configure Cloudinary or Supabase variables and connect upload handling to your chosen provider.

When provider keys are missing, many routes return safe demo responses so the UI remains explorable.

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
npm run db:studio
```

## Important Files

- `prisma/schema.prisma` - production database schema.
- `src/app` - App Router pages and API routes.
- `src/components` - reusable site, post, form, dashboard, and admin components.
- `src/lib` - data access, validation, auth, email, payments, SEO, security, and reading helpers.
- `public/brand/talez-logo.png` - official supplied TaleZ logo.
- `public/og-image.png`, `public/icon-192.png`, `public/icon-512.png` - generated brand assets.

## Deployment

See `docs/DEPLOYMENT.md`.
