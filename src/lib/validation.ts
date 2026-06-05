import { z } from "zod";

export const emailSchema = z.string().email().max(255);

export const subscribeSchema = z.object({
  email: emailSchema,
  name: z.string().max(80).optional(),
  source: z.string().max(80).optional(),
  website: z.string().max(0).optional()
});

export const commentSchema = z.object({
  postId: z.string().min(1),
  parentId: z.string().optional(),
  authorName: z.string().min(2).max(80).optional(),
  authorEmail: emailSchema.optional(),
  content: z.string().min(3).max(3000),
  website: z.string().max(0).optional()
});

export const postInputSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(["STORY", "BLOG"]),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]),
  accessLevel: z.enum(["FREE", "PREMIUM"]),
  coverImage: z.string().url().or(z.string().startsWith("/")).optional().or(z.literal("")),
  excerpt: z.string().min(20).max(420),
  content: z.string().min(20),
  writerNote: z.string().optional(),
  tags: z.array(z.string().min(1).max(40)).default([]),
  category: z.string().min(1).max(80),
  publishDate: z.string().datetime().optional(),
  scheduledFor: z.string().datetime().optional(),
  featured: z.boolean().default(false)
});

export const donationSchema = z.object({
  amountCents: z.number().int().min(100).max(500000),
  currency: z.string().length(3).default("USD"),
  provider: z.enum(["STRIPE", "RAZORPAY", "PAYPAL"]).default("STRIPE"),
  name: z.string().max(80).optional(),
  email: emailSchema.optional(),
  message: z.string().max(500).optional(),
  visibility: z.enum(["PUBLIC", "ANONYMOUS"]).default("PUBLIC")
});

export const tipSchema = donationSchema.extend({
  postId: z.string().min(1),
  returnPath: z.string().startsWith("/").max(240).optional()
});

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: emailSchema,
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(120)
});
