import type { BlogPost } from "@/lib/strapi/queries";
import { getFallbackImage } from "@/lib/fallbackImages";

export const mockCategories = [
  { name: "Writing", slug: "writing" },
  { name: "Design", slug: "design" },
  { name: "Engineering", slug: "engineering" },
  { name: "Product", slug: "product" },
  { name: "Leadership", slug: "leadership" },
];

export const mockPosts: BlogPost[] = [
  {
    id: "mock-1",
    slug: "building-a-thoughtful-blog",
    title: "Building a thoughtful blog with clarity and craft",
    excerpt:
      "How we structure stories, set editorial cadence, and keep our writing sharp without losing the human voice.",
    content:
      "Great blogs feel effortless, but they are built with care. We start by understanding who we are writing for, then layer in structure and editorial craft.\n\nThe goal is not to publish more, but to publish with intent - every piece should teach, inspire, or help someone make a decision.",
    publishedAt: "2025-12-15T09:00:00.000Z",
    updatedAt: "2025-12-18T12:00:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-1", "card"),
      alternativeText: "Abstract editorial cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[0],
    author: { name: "Aisha Rahman", slug: "aisha-rahman" },
  },
  {
    id: "mock-2",
    slug: "editorial-rhythm",
    title: "Finding an editorial rhythm that sticks",
    excerpt:
      "A sustainable cadence beats a chaotic sprint. Here is how we plan themes, series, and weekly drops.",
    content:
      "Consistency is a product decision. We align every post with a theme, then plan a simple arc: foundation, depth, and application.\n\nOnce the cadence is clear, the creative energy goes into quality instead of calendar anxiety.",
    publishedAt: "2025-12-05T10:30:00.000Z",
    updatedAt: "2025-12-06T11:00:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-2", "card"),
      alternativeText: "Editorial layout cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[4],
    author: { name: "Leo Walker", slug: "leo-walker" },
  },
  {
    id: "mock-3",
    slug: "designing-for-reading",
    title: "Designing for reading, not just aesthetics",
    excerpt:
      "Typography, spacing, and hierarchy decisions that keep readers engaged from headline to conclusion.",
    content:
      "A reading-first layout uses generous line-height, honest hierarchy, and a clear rhythm. Visual polish is useful only when it supports clarity.\n\nWe test our layouts on real content - long paragraphs, lists, and quotes - before shipping.",
    publishedAt: "2025-11-25T08:00:00.000Z",
    updatedAt: "2025-11-26T12:30:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-3", "card"),
      alternativeText: "Reading experience cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[1],
    author: { name: "Maya Chen", slug: "maya-chen" },
  },
  {
    id: "mock-4",
    slug: "engineering-for-seo",
    title: "Engineering a fast, SEO-first blog",
    excerpt:
      "Server components, static rendering, and structured data that help your writing travel farther.",
    content:
      "Performance is a feature. We keep bundles lean, prefer server rendering, and add structured data early.\n\nWhen content loads instantly and metadata is accurate, discovery becomes much easier.",
    publishedAt: "2025-11-12T09:20:00.000Z",
    updatedAt: "2025-11-12T11:05:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-4", "card"),
      alternativeText: "Technical blog cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[2],
    author: { name: "Noah Patel", slug: "noah-patel" },
  },
  {
    id: "mock-5",
    slug: "product-storytelling",
    title: "Product storytelling that builds trust",
    excerpt:
      "Turn launches into narratives by grounding every post in a customer moment or a real problem.",
    content:
      "Readers respond to stories that feel grounded. We lead with a customer insight, show the journey, and land on the outcome.\n\nThe result is a launch that feels like a conversation instead of a pitch.",
    publishedAt: "2025-10-30T14:00:00.000Z",
    updatedAt: "2025-11-01T09:00:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-5", "card"),
      alternativeText: "Storytelling cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[3],
    author: { name: "Sofia Alvarez", slug: "sofia-alvarez" },
  },
  {
    id: "mock-6",
    slug: "creative-briefs",
    title: "Creative briefs that keep teams aligned",
    excerpt:
      "A short brief with the right questions saves weeks of revisions and keeps writing focused.",
    content:
      "A great brief is short and specific. It answers: who is this for, what should they feel, and what action do we want?\n\nWhen everyone aligns early, writing becomes confident and decisive.",
    publishedAt: "2025-10-10T09:40:00.000Z",
    updatedAt: "2025-10-12T10:15:00.000Z",
    coverImage: {
      url: getFallbackImage("mock-6", "card"),
      alternativeText: "Creative brief cover",
      width: 960,
      height: 640,
    },
    category: mockCategories[0],
    author: { name: "Aisha Rahman", slug: "aisha-rahman" },
  },
];

export const mockHomeSections = [
  {
    __component: "page-components.blog-hero-section",
    eyebrow: "The Journal",
    title: "Stories about building, design, and the web",
    subtitle: "A weekly editorial for curious builders. Practical insights, clear thinking, and calm execution.",
    ctaLabel: "Browse the blog",
    ctaHref: "/blog",
    heroImage: {
      url: getFallbackImage("hero", "hero"),
      alternativeText: "Editorial hero artwork",
      width: 1400,
      height: 900,
    },
    featuredPost: mockPosts[0],
    trendingPosts: mockPosts.slice(1, 4),
  },
  {
    __component: "page-components.featured-posts-section",
    title: "Editor's picks",
    posts: mockPosts.slice(0, 3),
  },
  {
    __component: "page-components.recent-posts-section",
    title: "Recent Posts",
    posts: mockPosts.slice(0, 4),
  },
  {
    __component: "page-components.blog-list-section",
    title: "All Posts",
    posts: mockPosts,
  },
];

export const mockSlugs = mockPosts.map((post) => ({
  slug: post.slug,
  updatedAt: post.updatedAt ?? post.publishedAt ?? null,
}));

export const getMockPostBySlug = (slug: string) => mockPosts.find((post) => post.slug === slug) ?? null;
