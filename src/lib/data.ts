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

export const demoPosts: TalezPost[] = [
  {
    id: "story-lantern-road",
    title: "The Lantern Road",
    slug: "the-lantern-road",
    type: "STORY",
    status: "PUBLISHED",
    accessLevel: "FREE",
    coverImage: "/images/story-cover-embers.png",
    excerpt: "A quiet fantasy about a cartographer who finds roads that appear only when someone remembers them.",
    content: `
      <p>The first lantern appeared after the rain stopped, floating at shoulder height over the old road where no road had been that morning.</p>
      <p>Mira held her map case against her ribs and listened. The valley answered in small sounds: water leaving the leaves, a hinge of wind at the broken shrine, the soft scratch of her pencil wanting to name a thing before she understood it.</p>
      <h2>The Map That Changed</h2>
      <p>By dusk the ink had moved. The straight line she had drawn from the mill to the chapel bent north, toward the amber glow. Cartographers were not supposed to believe in invitations. They were supposed to believe in distance, scale, and the honesty of a measured mile.</p>
      <p>Still, Mira followed.</p>
      <h2>A Road Remembers</h2>
      <p>Every lantern carried a memory: a child laughing with bread in both hands, a soldier returning without his drum, a woman leaving a blue ribbon tied around a branch so her future self would know where courage began.</p>
      <p>When the final light lowered itself into Mira's palm, the map stopped trembling. The road was not new. It had simply been waiting for someone to remember it kindly.</p>
    `,
    writerNote: "This story began with the image of a map correcting itself after rain. I wanted the magic to feel gentle, like memory doing repair work.",
    tags: ["fantasy", "memory", "short fiction"],
    category: "Short Fiction",
    publishDate: "2026-05-18T09:00:00.000Z",
    readingTime: 4,
    wordCount: 780,
    featured: true,
    appreciationCount: 128,
    viewCount: 4200,
    author: authorProfile,
    seo: {
      title: "The Lantern Road | Talez",
      description: "A quiet fantasy about memory, maps, and courage.",
      ogImage: "/images/story-cover-embers.png"
    },
    series: {
      title: "The Atlas of Small Wonders",
      slug: "atlas-of-small-wonders",
      order: 1
    }
  },
  {
    id: "blog-deep-work",
    title: "Notes on Deep Work for Restless Makers",
    slug: "notes-on-deep-work-for-restless-makers",
    type: "BLOG",
    status: "PUBLISHED",
    accessLevel: "FREE",
    coverImage: "/images/blog-cover-desk.png",
    excerpt: "A practical essay on protecting attention, designing rituals, and making progress without turning life into a productivity contest.",
    content: `
      <p>The hardest part of deep work is rarely the work. It is the small negotiation before the work begins: the tab you could check, the message you could answer, the easier task wearing a responsible coat.</p>
      <h2>Build a Starting Ritual</h2>
      <p>A ritual is useful when it removes decisions. Pick a surface, a drink, a playlist or silence, and a first action so small it cannot intimidate you.</p>
      <pre><code>// A tiny ritual can be operational:
open_draft()
set_timer(minutes: 35)
write_next_sentence()
log_one_observation()</code></pre>
      <h2>Keep the Room Humane</h2>
      <p>Attention grows better in rooms that do not punish the person trying to pay attention. Use softer light. Keep the phone away from the desk. Let the first draft be less impressive than the idea that brought you there.</p>
      <h3>Measure Energy, Not Only Output</h3>
      <p>Some days produce pages. Some days produce a clean outline, one honest paragraph, or the courage to delete what was false. All of these are work.</p>
      <h2>End With a Handle</h2>
      <p>Before stopping, leave a visible next step. Your future self should not have to rediscover the doorway.</p>
    `,
    tags: ["writing", "productivity", "creative process"],
    category: "Writing Notes",
    publishDate: "2026-05-25T10:30:00.000Z",
    readingTime: 6,
    wordCount: 1120,
    featured: true,
    appreciationCount: 204,
    viewCount: 8100,
    author: authorProfile,
    seo: {
      title: "Notes on Deep Work for Restless Makers | Talez",
      description: "A practical essay on building better creative focus.",
      ogImage: "/images/blog-cover-desk.png"
    }
  },
  {
    id: "story-hidden-room",
    title: "Letters from the Hidden Room",
    slug: "letters-from-the-hidden-room",
    type: "STORY",
    status: "PUBLISHED",
    accessLevel: "PREMIUM",
    coverImage: "/images/premium-cover.png",
    excerpt: "A premium epistolary mystery about a house that answers only in letters slipped under locked doors.",
    content: `
      <p>The first letter arrived under a door that had been painted shut since my grandmother was a girl.</p>
      <h2>The Door With No Handle</h2>
      <p>I knew the handwriting. Everyone in the family did. It belonged to the house.</p>
      <p>The note asked for tea, patience, and the name of the person we missed most.</p>
    `,
    writerNote: "Premium chapters can include extra author notes, sketches, or behind-the-scenes process material.",
    tags: ["mystery", "premium", "letters"],
    category: "Short Fiction",
    publishDate: "2026-05-29T12:00:00.000Z",
    readingTime: 5,
    wordCount: 920,
    appreciationCount: 96,
    viewCount: 2600,
    author: authorProfile,
    seo: {
      title: "Letters from the Hidden Room | Talez",
      description: "A premium epistolary mystery from Talez.",
      ogImage: "/images/premium-cover.png"
    },
    series: {
      title: "The Atlas of Small Wonders",
      slug: "atlas-of-small-wonders",
      order: 2
    }
  },
  {
    id: "blog-next-platform",
    title: "Designing a Publishing Platform That Respects Readers",
    slug: "designing-a-publishing-platform-that-respects-readers",
    type: "BLOG",
    status: "PUBLISHED",
    accessLevel: "FREE",
    coverImage: "/images/series-cover.png",
    excerpt: "What a solo creator platform needs when it blends essays, fiction, memberships, newsletters, and community.",
    content: `
      <p>A reading platform has two jobs before every other ambition: help the writer publish consistently and help the reader feel welcome enough to stay.</p>
      <h2>Separate Modes</h2>
      <p>Stories and blogs deserve different signals. Fiction asks for atmosphere. Essays ask for structure. The archive should make that distinction obvious without turning the interface into a maze.</p>
      <h2>Design for Return Visits</h2>
      <p>Bookmarks, reading history, recent posts, and recommendations are not decoration. They are promises that the site remembers the reader's path.</p>
      <h2>Monetization Without Pressure</h2>
      <p>Memberships, donations, and tips work best when they feel like invitations. Premium content should be clear, generous, and easy to manage from the admin dashboard.</p>
    `,
    tags: ["platform", "membership", "reader experience"],
    category: "Technology",
    publishDate: "2026-06-01T08:15:00.000Z",
    readingTime: 7,
    wordCount: 1400,
    appreciationCount: 177,
    viewCount: 6900,
    author: authorProfile,
    seo: {
      title: "Designing a Publishing Platform That Respects Readers | Talez",
      description: "A systems essay for creator-owned publishing platforms.",
      ogImage: "/images/series-cover.png"
    }
  }
];

export const demoSeries: SeriesSummary[] = [
  {
    title: "The Atlas of Small Wonders",
    slug: "atlas-of-small-wonders",
    description: "A serialized collection of gentle speculative stories about maps, rooms, and ordinary magic.",
    coverImage: "/images/series-cover.png",
    followerCount: 684,
    posts: demoPosts.filter((post) => post.series?.slug === "atlas-of-small-wonders").sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0))
  }
];

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
