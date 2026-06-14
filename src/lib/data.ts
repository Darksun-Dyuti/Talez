import type { AuthorProfile, MembershipPlanView, SeriesSummary, TalezPost } from "@/types/content";

export const authorProfile: AuthorProfile = {
  name: "The Talez Author",
  title: "Storyteller, essayist, and builder of quiet reading rooms.",
  image: "/images/author-portrait.png",
  email: "hello@talez.example",
  quote: "A good page should feel like a lamp left on for someone coming home late.",
  bio: "Talez is a home for intimate fiction, reflective essays, practical notes, and a reader community built around attention rather than noise.",
  journey: [
    "Started with handwritten short stories and notebooks full of half-lit scenes.",
    "Moved into essays about technology, creativity, and the rituals that help people keep making things.",
    "Built Talez as a calm publishing home where stories, memberships, newsletters, and community can grow together."
  ],
  socials: [
    { label: "Twitter/X", href: "https://x.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "GitHub", href: "https://github.com" }
  ]
};

export const demoPosts: TalezPost[] = [];

export const demoSeries: SeriesSummary[] = [];

export const membershipPlans: MembershipPlanView[] = [
  {
    name: "Supporter",
    slug: "supporter",
    price: "$5",
    interval: "monthly",
    description: "For readers who want premium stories and early releases.",
    features: ["Premium stories and exclusive blogs", "Early releases", "Premium badge", "Ad-free reading"],
    highlighted: true
  },
  {
    name: "Patron",
    slug: "patron",
    price: "$50",
    interval: "yearly",
    description: "For readers who want the full archive and behind-the-scenes notes.",
    features: ["Everything in Supporter", "Writing roadmap", "Monthly process notes", "Supporter wall recognition"]
  }
];

export const adminMetrics = [
  { label: "Stories", value: "18", change: "+3 this month" },
  { label: "Blogs", value: "26", change: "+5 this month" },
  { label: "Subscribers", value: "4.8k", change: "+12%" },
  { label: "Revenue", value: "$2.4k", change: "+9%" }
];

export const readerHighlights = [
  { label: "Reading streak", value: "6 days", change: "Best: 18 days" },
  { label: "Bookmarks", value: "14", change: "3 premium" },
  { label: "Achievements", value: "5", change: "Early Supporter unlocked" }
];
