export type ContentType = "STORY" | "BLOG";
export type ContentStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
export type AccessLevel = "FREE" | "PREMIUM";

export type TalezPost = {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: ContentStatus;
  accessLevel: AccessLevel;
  coverImage?: string;
  excerpt: string;
  content: string;
  writerNote?: string;
  tags: string[];
  category: string;
  publishDate: string;
  readingTime: number;
  wordCount: number;
  featured?: boolean;
  appreciationCount: number;
  viewCount: number;
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
  series?: {
    title: string;
    slug: string;
    order: number;
  };
};

export type SeriesSummary = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  posts: TalezPost[];
  followerCount: number;
};

export type AuthorProfile = {
  name: string;
  title: string;
  image: string;
  bio: string;
  journey: string[];
  quote: string;
  email: string;
  socials: Array<{ label: string; href: string }>;
};

export type DashboardMetric = {
  label: string;
  value: string;
  change?: string;
};

export type ActivityItem = {
  label: string;
  detail: string;
  time: string;
};

export type MembershipPlanView = {
  name: string;
  slug: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};
