import { z } from "zod";

const MediaFileSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    url: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    alternativeText: z.string().nullable().optional(),
  })
  .passthrough();

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
