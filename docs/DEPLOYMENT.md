# Deployment Guide

## Vercel

1. Push the project to GitHub.
2. Create a Vercel project from the repository.
3. Add environment variables from `.env.example`.
4. Use a hosted PostgreSQL provider such as Neon, Supabase, Railway, or Vercel Postgres.
5. Run Prisma migration:

```bash
npm run db:migrate
```

For production migration workflows, prefer:

```bash
npx prisma migrate deploy
```

6. Seed the first admin once:

```bash
npm run db:seed
```

7. Deploy.

## Scheduled Publishing

Create a Vercel Cron job that calls:

```text
POST /api/cron/publish-scheduled
Authorization: Bearer <CRON_SECRET>
```

This publishes scheduled posts and marks scheduled newsletters as sent-ready. Add a mail queue or background worker for high-volume newsletter delivery.

## Email

Configure Resend:

```text
RESEND_API_KEY=
EMAIL_FROM=Talez <hello@yourdomain.com>
```

Set up domain authentication in Resend before sending production newsletters.

## Payments

Stripe donations and tips use Checkout Sessions. Configure:

```text
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Razorpay order creation is wired through:

```text
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Add provider webhooks to mark donations, tips, and memberships as paid.

## Storage

The schema stores thumbnail URLs. For production uploads, connect the admin upload UI to Cloudinary or Supabase Storage using the environment variables already listed in `.env.example`.

## Production Checklist

- Set a strong `AUTH_SECRET`.
- Use HTTPS domain values for `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`.
- Run `npm run build`.
- Run Prisma migrations against production.
- Seed or manually create the first admin.
- Configure provider webhooks.
- Configure Resend domain authentication.
- Enable Vercel Cron for scheduled publishing.
- Review robots/sitemap output after setting the final domain.
