import qs from "qs";
import { strapiFetch, withStrapiBase } from "./client";
import { blogHomeSchema, blogPostSchema } from "./schema";

export type MediaAsset = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type BlogCategory = {
  name?: string;
  slug?: string;
};

export type BlogAuthor = {
  name?: string;
  slug?: string;
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null | unknown[];
  publishedAt?: string | null;
  updatedAt?: string | null;
  coverImage?: MediaAsset | null;
  category?: BlogCategory | null;
  author?: BlogAuthor | null;
  seo?: unknown;
};

const BLOG_POST_API_ID = "blog-posts";
const REVALIDATE_DEFAULT = 300;

const unwrapData = (value: any) => {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: unknown }).data;
  }
  return value;
};

const unwrapAttributes = (value: any) => {
  if (!value || typeof value !== "object") return value;
  if ("attributes" in value && value.attributes && typeof value.attributes === "object") {
    return { ...value.attributes, id: value.id ?? value.documentId };
  }
  return value;
};

const normalizeEntity = (value: any) => unwrapAttributes(unwrapData(value));

const normalizeMedia = (value: any): MediaAsset | null => {
  const media = normalizeEntity(value);
  if (!media || typeof media !== "object") return null;
  const url = typeof media.url === "string" ? media.url : null;
  if (!url) return null;
  return {
    url: withStrapiBase(url) || url,
    alternativeText: typeof media.alternativeText === "string" ? media.alternativeText : null,
    width: typeof media.width === "number" ? media.width : null,
    height: typeof media.height === "number" ? media.height : null,
  };
};

const normalizeCategories = (value: any): BlogCategory[] => {
  const data = unwrapData(value);
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => {
      const category = normalizeEntity(item);
      if (!category || typeof category !== "object") return null;
      return {
        name: typeof category.name === "string" ? category.name : undefined,
        slug: typeof category.slug === "string" ? category.slug : undefined,
      };
    })
    .filter(Boolean) as BlogCategory[];
};

function normalizeSeo(metaData: any) {
  if (!metaData || typeof metaData !== "object") return null;
  return {
    ...metaData,
    ogImage: normalizeMedia((metaData as any).ogImage),
  };
}

const normalizePost = (value: any): BlogPost | null => {
  const entity = normalizeEntity(value);
  const parsed = blogPostSchema.safeParse(entity);
  if (!parsed.success) return null;
  const post = parsed.data;
  const categoryFromList = normalizeCategories((post as any).categories)[0];
  const category = normalizeEntity(post.category) || categoryFromList || null;
  const author = normalizeEntity(post.author);

  return {
    id: post.documentId ?? (post.id ? String(post.id) : undefined),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? null,
    content: post.content ?? null,
    publishedAt: post.publishedAt ?? null,
    updatedAt: post.updatedAt ?? null,
    coverImage: normalizeMedia(post.coverImage),
    category: category
      ? {
          name: typeof category.name === "string" ? category.name : undefined,
          slug: typeof category.slug === "string" ? category.slug : undefined,
        }
      : null,
    author: author
      ? {
          name: typeof (author as any)?.name === "string" ? (author as any).name : undefined,
          slug: typeof (author as any)?.slug === "string" ? (author as any).slug : undefined,
        }
      : null,
    seo: normalizeSeo(post.seo),
  };
};

const normalizePosts = (value: any): BlogPost[] => {
  const data = unwrapData(value);
  if (!Array.isArray(data)) return [];
  return data.map(normalizePost).filter(Boolean) as BlogPost[];
};

const normalizeSections = (sections: any[]) =>
  sections.map((section) => {
    const normalized = { ...section };

    if (section.heroImage || section.image) {
      normalized.heroImage = normalizeMedia(section.heroImage || section.image);
    }

    if (section.posts) {
      normalized.posts = normalizePosts(section.posts);
    }

    if (section.categories) {
      normalized.categories = normalizeCategories(section.categories);
    }

    return normalized;
  });

export async function getBlogHome() {
  const query = qs.stringify(
    {
      populate: {
        metaData: {
          populate: {
            ogImage: true,
          },
        },
        pageSections: {
          on: {
            "page-components.blog-hero-section": {
              populate: {
                heroImage: true,
              },
            },
            "page-components.featured-posts-section": {
              populate: {
                posts: {
                  fields: ["title", "slug", "excerpt", "publishedAt", "updatedAt"],
                  populate: {
                    coverImage: true,
                    category: {
                      fields: ["name", "slug"],
                    },
                  },
                },
              },
            },
            "page-components.blog-list-section": {
              populate: {
                posts: {
                  fields: ["title", "slug", "excerpt", "publishedAt", "updatedAt"],
                  populate: {
                    coverImage: true,
                    category: {
                      fields: ["name", "slug"],
                    },
                    author: {
                      fields: ["name", "slug"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await strapiFetch("/api/homepage", query, {
      revalidate: REVALIDATE_DEFAULT,
      tags: ["homepage"],
    });
    const data = unwrapData(response);
    const parsed = blogHomeSchema.safeParse(data);
    if (!parsed.success) {
      return { metaData: null, pageSections: [] };
    }

    const pageSections = normalizeSections(parsed.data.pageSections || []);
    const metaData = normalizeSeo(parsed.data.metaData);
    return { metaData, pageSections };
  } catch {
    return { metaData: null, pageSections: [] };
  }
}

export async function getLatestPosts({ pageSize = 6 } = {}) {
  const query = qs.stringify(
    {
      sort: ["publishedAt:desc"],
      fields: ["title", "slug", "excerpt", "publishedAt", "updatedAt"],
      populate: {
        coverImage: true,
        category: {
          fields: ["name", "slug"],
        },
        author: {
          fields: ["name", "slug"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await strapiFetch(`/api/${BLOG_POST_API_ID}`, query, {
      revalidate: REVALIDATE_DEFAULT,
      tags: ["blog-posts"],
    });
    const posts = normalizePosts(response?.data ?? response);
    return posts.slice(0, pageSize);
  } catch {
    return [] as BlogPost[];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      fields: ["title", "slug", "excerpt", "content", "publishedAt", "updatedAt"],
      populate: {
        coverImage: true,
        category: {
          fields: ["name", "slug"],
        },
        author: {
          fields: ["name", "slug"],
        },
        seo: {
          populate: {
            ogImage: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await strapiFetch(`/api/${BLOG_POST_API_ID}`, query, {
      revalidate: REVALIDATE_DEFAULT,
      tags: [`blog-post:${slug}`],
    });
    const posts = normalizePosts(response?.data ?? response);
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getBlogPosts({ page = 1, pageSize = 12 } = {}) {
  const query = qs.stringify(
    {
      sort: ["publishedAt:desc"],
      fields: ["title", "slug", "excerpt", "publishedAt", "updatedAt"],
      populate: {
        coverImage: true,
        category: {
          fields: ["name", "slug"],
        },
        author: {
          fields: ["name", "slug"],
        },
      },
      pagination: {
        page,
        pageSize,
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await strapiFetch(`/api/${BLOG_POST_API_ID}`, query, {
      revalidate: REVALIDATE_DEFAULT,
      tags: ["blog-posts"],
    });
    const posts = normalizePosts(response?.data ?? response);
    return posts;
  } catch {
    return [] as BlogPost[];
  }
}

export async function getAllBlogSlugs() {
  const query = qs.stringify(
    {
      fields: ["slug", "updatedAt", "publishedAt"],
      pagination: { page: 1, pageSize: 100 },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await strapiFetch(`/api/${BLOG_POST_API_ID}`, query, {
      revalidate: REVALIDATE_DEFAULT,
      tags: ["blog-posts"],
    });
    const data = unwrapData(response);
    if (!Array.isArray(data)) return [] as { slug: string; updatedAt?: string | null }[];
    return data
      .map((item) => {
        const entity = normalizeEntity(item);
        if (!entity || typeof entity.slug !== "string") return null;
        return {
          slug: entity.slug,
          updatedAt: entity.updatedAt ?? entity.publishedAt ?? null,
        };
      })
      .filter(Boolean) as { slug: string; updatedAt?: string | null }[];
  } catch {
    return [] as { slug: string; updatedAt?: string | null }[];
  }
}
