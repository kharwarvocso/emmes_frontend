import apiClient from "@/lib/axios";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import qs from "qs";
export const fetchHomepageData = async () => {
  try {
    const queryString = qs.stringify(
      {
        populate: {
          // Populate SEO metadata fully
          metaData: {
            populate: "*",
          },
          // Populate dynamic zone pageSections with nested components
          pageSections: {
            // Use 'on' syntax for dynamic zone components in Strapi v5
            on: {
              // Banner Slider Section
              "page-components.slider-section": {
                populate: {
                  slide: {
                    populate: {
                      backgroundImage: true,
                      productImage: true,
                      button: {
                        populate: {
                          icon: true,
                        },
                      },
                    },
                  },
                  backgroundImage: true,
                },
              },
              // Product Slider Section
              "page-components.product-slider-section": {
                populate: {
                  bannerCard: {
                    populate: {
                      backgroundImage: true,
                      productImage: true,
                      button: {
                        populate: {
                          icon: true,
                        },
                      },
                    },
                  },
                  // Only get documentId and slug from products
                  products: {
                    populate: {
                      categories: true,
                      product_variants: {
                        populate: {
                          size: true,
                          color: true,
                          media: {
                            populate: {
                              image: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  product_variants: {
                    populate: {
                      product: {
                        populate: {
                          categories: true,
                        },
                      },
                      size: true,
                      color: true,
                      media: {
                        populate: {
                          image: true,
                        },
                      },
                    },
                  },
                  button: {
                    populate: {
                      icon: true,
                    },
                  },
                },
              },
              // Offer Section
              "page-components.offer-section": {
                populate: {
                  bannerImage: true,
                  // Only get documentId and slug from products
                  products: {
                    fields: ["documentId", "slug"],
                  },
                  button: {
                    populate: {
                      icon: true,
                    },
                  },
                },
              },
              // Marquee Section
              "page-components.marquee-section": {
                populate: {
                  card: {
                    populate: {
                      image: true,
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

    const { data } = await apiClient.get(`/api/homepage?${queryString}`);
    return data;
  } catch {
    return { data: { pageSections: [], metaData: null } };
  }
};




export const homepageQueryOptions = queryOptions({
  queryKey: ["homepage"],
  queryFn: fetchHomepageData,
  placeholderData: keepPreviousData,
});
