import { z } from "zod";

const MediaFileSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    url: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    alternativeText: z.string().nullable().optional(),
    mime: z.string().optional(),
    formats: z
      .object({
        large: z.object({ url: z.string().optional() }).optional(),
        medium: z.object({ url: z.string().optional() }).optional(),
        small: z.object({ url: z.string().optional() }).optional(),
        thumbnail: z.object({ url: z.string().optional() }).optional(),
      })
      .optional(),
  })
  .passthrough();

const MediaSingleSchema = z.preprocess(
  (val) =>
    typeof val === "object" && val !== null && "data" in (val as object)
      ? (val as { data?: unknown }).data
      : val,
  z.union([MediaFileSchema, z.string()]).nullable().optional(),
);

const MediaArraySchema = z.preprocess(
  (val) =>
    typeof val === "object" && val !== null && "data" in (val as object)
      ? (val as { data?: unknown }).data
      : val,
  z.array(z.union([MediaFileSchema, z.string()])).nullable().optional(),
);

export const SiteConfigSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    site_name: z.string().optional(),
    tagline: z.string().nullable().optional(),
    site_description: z.string().nullable().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    logo: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaFileSchema.nullable().optional(),
      )
      .optional(),
    favicon: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaFileSchema.nullable().optional(),
      )
      .optional(),
    og_image: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaFileSchema.nullable().optional(),
      )
      .optional(),
  })
  .passthrough();

export const SiteConfigResponseSchema = z.preprocess(
  (val) =>
    typeof val === "object" && val !== null && "data" in (val as object)
      ? (val as { data?: unknown }).data
      : val,
  SiteConfigSchema.nullable(),
);

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

const DynamicZoneItemSchema = z
  .object({
    __component: z.string().optional(),
    id: z.number().optional(),
  })
  .passthrough();

export const PageSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    slug: z.string().optional(),
    hero_section: z.array(DynamicZoneItemSchema).optional(),
    seo: z
      .object({
        id: z.number().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const PagesResponseSchema = z
  .object({
    data: z.array(PageSchema).optional(),
    meta: z
      .object({
        pagination: z
          .object({
            page: z.number().optional(),
            pageSize: z.number().optional(),
            pageCount: z.number().optional(),
            total: z.number().optional(),
          })
          .optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export type Page = z.infer<typeof PageSchema>;

export const ButtonSchema = z
  .object({
    name: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    icon: MediaSingleSchema.optional(),
    icon_position: z.string().nullable().optional(),
  })
  .passthrough();

export const BlogCategorySchema = z
  .object({
    name: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    image: MediaArraySchema.optional(),
  })
  .passthrough();

export const BlogSchema = z
  .object({
    title: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    coverImage: MediaSingleSchema.optional(),
    blog_categories: z.preprocess(
      (val) =>
        typeof val === "object" && val !== null && "data" in (val as object)
          ? (val as { data?: unknown }).data
          : val,
      z.array(BlogCategorySchema).nullable().optional(),
    ),
    publishedAt: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .passthrough();

export const FeatureCardSchema = z
  .object({
    sub_tittle: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.unknown().optional(),
    bg_media: MediaSingleSchema.optional(),
    button: ButtonSchema.optional(),
    ishidden: z.boolean().optional(),
  })
  .passthrough();

export const BlogCardSectionSchema = z
  .object({
    __component: z.literal("section.blog-card-section").optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    bg_media: MediaArraySchema.optional(),
    blogs: z.preprocess(
      (val) =>
        typeof val === "object" && val !== null && "data" in (val as object)
          ? (val as { data?: unknown }).data
          : val,
      z.array(BlogSchema).nullable().optional(),
    ),
    is_hidden: z.boolean().optional(),
    is_latest_blog_required: z.boolean().optional(),
    common_btn_name: z.string().nullable().optional(),
    common_btn_icon: MediaSingleSchema.optional(),
    common_btn_position: z.enum(["left", "right"]).nullable().optional(),
    featured_card: FeatureCardSchema.optional(),
  })
  .passthrough();

export type BlogCardSection = z.infer<typeof BlogCardSectionSchema>;
