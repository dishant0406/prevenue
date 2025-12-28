import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prevenue - AI-Powered No-Show Prevention',
    short_name: 'Prevenue',
    description: 'AI-powered predictive no-show prevention platform that helps practices reduce no-shows by up to 45% and recover lost revenue.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1011',
    theme_color: '#18b8b3',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'medical', 'productivity'],
    lang: 'en-US',
    orientation: 'portrait-primary',
  }
}