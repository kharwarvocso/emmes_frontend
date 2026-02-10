// @ts-check
import { z } from "zod";

export const mediaSchema = z
  .object({
    url: z.string().optional(),
    alternativeText: z.string().nullable().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })
  .passthrough();

export const seoSchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    canonicalUrl: z.string().nullable().optional(),
    metaRobots: z.string().nullable().optional(),
    keywords: z.array(z.any()).nullable().optional(),
    ogImage: z.any().nullable().optional(),
  })
  .passthrough();

export const blogHomeSchema = z
  .object({
    metaData: seoSchema.nullish(),
    pageSections: z.array(z.object({ __component: z.string() }).passthrough()).default([]),
  })
  .passthrough();

export const blogPostSchema = z
  .object({
    documentId: z.string().optional(),
    id: z.union([z.string(), z.number()]).optional(),
    slug: z.string(),
    title: z.string(),
    excerpt: z.string().nullable().optional(),
    content: z.union([z.string(), z.array(z.any())]).nullable().optional(),
    publishedAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    coverImage: z.any().nullish(),
    author: z.any().nullish(),
    category: z.any().nullish(),
    seo: seoSchema.nullish(),
  })
  .passthrough();

export const blogPostsCollectionSchema = z.array(blogPostSchema);
