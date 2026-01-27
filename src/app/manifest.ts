import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "The Emme Group",
        short_name: "TheEmmesGroup",
        description:
            "The Emme Group provides expert fraud prevention, cyber threat protection, and security solutions to safeguard individuals and businesses.",
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#e03944',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
        screenshots: [
            {
                src: "screenshots/homePage.png",
                sizes: "1280x720",
                type: "image/png",
            },
        ],
        categories: [],
        lang: "en",
    }
}
