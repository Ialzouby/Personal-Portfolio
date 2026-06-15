import { MetadataRoute } from 'next'
import { presentations } from '@/../public/data/PresentationData'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://issam.up.railway.app' // Or whatever the domain is

    // Static routes
    const routes = [
        '',
        '/portfolio',
        '/research',
        '/speaking',
        '/leadership',
        '/presentations',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }))

    // Presentations
    const presentationRoutes = presentations.map((p) => ({
        url: `${baseUrl}/presentations/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...routes, ...presentationRoutes]
}
