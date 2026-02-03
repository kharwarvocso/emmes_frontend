import { z } from "zod";

const MediaFileSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    url: z.string().nullable().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    alternativeText: z.string().nullable().optional(),
    mime: z.string().nullable().optional(),
    formats: z
      .object({
        large: z.object({ url: z.string().nullable().optional() }).optional(),
        medium: z.object({ url: z.string().nullable().optional() }).optional(),
        small: z.object({ url: z.string().nullable().optional() }).optional(),
        thumbnail: z.object({ url: z.string().nullable().optional() }).optional(),
      })
      .nullable()
      .optional(),
  })
  .passthrough();

const MediaSingleSchema = z.preprocess((val) => {
  if (val === null || val === undefined) return val;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val[0] ?? null;
  if (typeof val === "object" && val !== null && "data" in (val as object)) {
    const data = (val as { data?: unknown }).data;
    if (Array.isArray(data)) return data[0] ?? null;
    return data ?? null;
  }
  return val;
}, z.union([MediaFileSchema, z.string()]).nullable().optional());

const MediaArraySchema = z.preprocess((val) => {
  if (val === null || val === undefined) return val;
  if (typeof val === "object" && val !== null && "data" in (val as object)) {
    return (val as { data?: unknown }).data;
  }
  return val;
}, z.array(z.union([MediaFileSchema, z.string()])).nullable().optional());

export const SiteConfigSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    site_name: z.string().nullable().optional(),
    tagline: z.string().nullable().optional(),
    site_description: z.unknown().nullable().optional(),
    meta_title: z.string().nullable().optional(),
    meta_description: z.string().nullable().optional(),
    logo: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaSingleSchema,
      )
      .optional(),
    favicon: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaSingleSchema,
      )
      .optional(),
    og_image: z
      .preprocess(
        (val) =>
          typeof val === "object" && val !== null && "data" in (val as object)
            ? (val as { data?: unknown }).data
            : val,
        MediaSingleSchema,
      )
      .optional(),
    footer: z
      .object({
        cta_title: z.string().nullable().optional(),
        cta_description: z.string().nullable().optional(),
        cta_button: z.lazy(() => ButtonSchema).nullable().optional(),
        footer_title: z.string().nullable().optional(),
        footer_description: z.string().nullable().optional(),
        footer_newsletter_cta: z.lazy(() => ButtonSchema).nullable().optional(),
        is_ctahidden: z.boolean().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
  })
  .passthrough();

export const SiteConfigResponseSchema = z.preprocess((val) => {
  if (!val || typeof val !== "object") return val;
  const raw = val as { data?: unknown };
  const unwrapped =
    raw.data && typeof raw.data === "object" && "data" in (raw.data as object)
      ? (raw.data as { data?: unknown }).data
      : raw.data ?? val;
  const normalized = Array.isArray(unwrapped) ? unwrapped[0] ?? null : unwrapped;
  if (normalized && typeof normalized === "object" && "attributes" in normalized) {
    return (normalized as { attributes?: unknown }).attributes ?? normalized;
  }
  return normalized;
}, SiteConfigSchema.nullable());

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

export const MatrixSchema = z
  .object({
    value: z.union([z.number(), z.string()]).nullable().optional(),
    suffix: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    icon: MediaSingleSchema.optional(),
  })
  .passthrough();

export const MetrixSectionSchema = z
  .object({
    __component: z.literal("section.metrix").optional(),
    subtitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    button: ButtonSchema.nullable().optional(),
    metrix: z.preprocess(
      (val) => (val === null ? [] : val),
      z.array(MatrixSchema).optional(),
    ),
    ishidden: z.boolean().optional(),
  })
  .passthrough();

export type MetrixSection = z.infer<typeof MetrixSectionSchema>;

export const MemeberSectionSchema = z
  .object({
    __component: z.literal("section.memeber-section").optional(),
    subtitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    ishidden: z.boolean().optional(),
    button: ButtonSchema.nullable().optional(),
  })
  .passthrough();

export type MemeberSection = z.infer<typeof MemeberSectionSchema>;

export const TestimonialSchema = z.preprocess((val) => {
  if (!val || typeof val !== "object") return val;
  const raw = val as { id?: unknown; documentId?: unknown; attributes?: unknown };
  if (raw.attributes && typeof raw.attributes === "object") {
    return {
      ...(raw.attributes as object),
      id: raw.id,
      documentId: raw.documentId,
    };
  }
  return val;
}, z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    name: z.string().nullable().optional(),
    profession: z.string().nullable().optional(),
    image: MediaSingleSchema.optional(),
    order: z.number().nullable().optional(),
  })
  .passthrough());

export const TestimonialsResponseSchema = z.preprocess((val) => {
  if (!val || typeof val !== "object") return val;
  const raw = val as { data?: unknown };
  if (raw.data && typeof raw.data === "object" && "data" in (raw.data as object)) {
    return { ...(val as object), data: (raw.data as { data?: unknown }).data };
  }
  return val;
}, z
  .object({
    data: z.array(TestimonialSchema).optional(),
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
  .passthrough());

export type Testimonial = z.infer<typeof TestimonialSchema>;

export const CaseStudyItemSchema = z
  .object({
    id: z.number().optional(),
    documentId: z.string().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
  })
  .passthrough();

export const CaseStudySectionSchema = z
  .object({
    __component: z.literal("section.case-study").optional(),
    subtitle: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    ishidden: z.boolean().optional(),
    button: ButtonSchema.nullable().optional(),
    case_studies: z.preprocess(
      (val) =>
        typeof val === "object" && val !== null && "data" in (val as object)
          ? (val as { data?: unknown }).data
          : val,
      z.array(CaseStudyItemSchema).nullable().optional(),
    ),
  })
  .passthrough();

export type CaseStudySection = z.infer<typeof CaseStudySectionSchema>;

export const ServicesSectionSchema = z
  .object({
    __component: z.literal("section.services-section").optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    button: ButtonSchema.nullable().optional(),
    is_hidden: z.boolean().optional(),
  })
  .passthrough();

export type ServicesSection = z.infer<typeof ServicesSectionSchema>;

export const OfferingSchema = z.preprocess(
  (val) => {
    if (!val || typeof val !== "object") return val;
    const raw = val as { id?: unknown; documentId?: unknown; attributes?: unknown };
    if (raw.attributes && typeof raw.attributes === "object") {
      return {
        ...(raw.attributes as object),
        id: raw.id,
        documentId: raw.documentId,
      };
    }
    return val;
  },
  z
    .object({
      id: z.number().optional(),
      documentId: z.string().optional(),
      title: z.string().nullable().optional(),
      short_description: z.string().nullable().optional(),
      image: MediaSingleSchema.optional(),
      order: z.number().nullable().optional(),
    })
    .passthrough(),
);

export type Offering = z.infer<typeof OfferingSchema>;

export const OfferingsResponseSchema = z.preprocess(
  (val) => {
    if (!val || typeof val !== "object") return val;
    const raw = val as { data?: unknown };
    if (raw.data && typeof raw.data === "object" && "data" in (raw.data as object)) {
      return { ...(val as object), data: (raw.data as { data?: unknown }).data };
    }
    return val;
  },
  z
    .object({
      data: z.array(OfferingSchema).optional(),
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
    .passthrough(),
);
