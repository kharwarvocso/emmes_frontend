import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blog",
    short_name: "Blog",
    description: "Thoughtful writing on building, design, and the web.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    screenshots: [
      {
        src: "screenshots/homePage.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    categories: ["blog"],
    lang: "en",
  };
}
