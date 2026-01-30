import apiClient from "@/lib/axios";
import { PagesResponseSchema } from "@/lib/strapi/schema";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import qs from "qs";

export const fetchHomepageData = async () => {
  try {
    const queryString = qs.stringify(
      {
        filters: {
          slug: {
            $eq: "home",
          },
        },
        populate: {
          seo: {
            populate: "*",
          },
          hero_section: {
            on: {
              "section.text-media-section": {
                populate: "*",
              },
              "section.services-section": {
                populate: "*",
              },
              "section.metrix": {
                populate: "*",
              },
              "section.memeber-section": {
                populate: "*",
              },
              "section.hero-section": {
                populate: {
                  background_media: true,
                  button: {
                    populate: "*",
                  },
                  cards: {
                    populate: {
                      icon: true,
                      blog: {
                        populate: {
                          coverImage: true,
                        },
                      },
                      our_brand: {
                        populate: {
                          coverImage: true,
                        },
                      },
                    },
                  },
                },
              },
              "section.case-study": {
                populate: "*",
              },
              "section.blog-card-section": {
                populate: "*",
              },
            },
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const { data } = await apiClient.get(`/api/pages?${queryString}`);
    const parsed = PagesResponseSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Invalid pages payload:", parsed.error.flatten());
      return { data: [], meta: {} };
    }
    return parsed.data ?? { data: [], meta: {} };
  } catch {
    return { data: [], meta: {} };
  }
};

export const homepageQueryOptions = queryOptions({
  queryKey: ["homepage", "home"],
  queryFn: fetchHomepageData,
  placeholderData: keepPreviousData,
});
