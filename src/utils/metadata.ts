import { COMPANY_INFO } from "@/constants/company";
import { Metadata } from "next";

// Default metadata constants
const DEFAULT_TITLE = process.env.NEXT_PUBLIC_APP_NAME || COMPANY_INFO.name;
const DEFAULT_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || COMPANY_INFO.description;
const DEFAULT_URL = process.env.NEXT_PUBLIC_APP_URL || COMPANY_INFO.domain;
const DEFAULT_IMAGE = "/images/Screenshot/prevenue-og.webp";
const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE || COMPANY_INFO.twitter;

interface GenerateMetadataParams {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
}

export const generateMetadata = ({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url = DEFAULT_URL,
    type = "website",
    icons = [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/icons/apple-touch-icon.png"
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/icons/favicon-32x32.png"
        },
        {
            rel: "icon",
            type: "image/png", 
            sizes: "16x16",
            url: "/icons/favicon-16x16.png"
        },
        {
            rel: "shortcut icon",
            url: "/favicon.ico"
        }
    ],
    noIndex = false,
    keywords = [
        "AI booking management",
        "autonomous appointment scheduling", 
        "no-show prevention",
        "appointment management software",
        "intelligent call handling",
        "automated follow-ups",
        "revenue protection",
        "practice automation",
        "healthcare booking software",
        "salon management platform",
        "veterinary appointment system"
    ],
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
}: GenerateMetadataParams = {}): Metadata => {
    
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : `${DEFAULT_TITLE} - Autonomous Booking Management with AI-Powered No-Show Prevention`;
    const fullUrl = url?.startsWith('http') ? url : `${DEFAULT_URL}${url}`;
    const imageUrl = image?.startsWith('http') ? image : `${DEFAULT_URL}${image}`;
    const currentDate = new Date().toISOString();

    return {
        title: fullTitle,
        description,
        applicationName: DEFAULT_TITLE,
        keywords: keywords.join(", "),
        authors: authors ? authors.map(name => ({ name })) : [{ name: DEFAULT_TITLE }],
        creator: DEFAULT_TITLE,
        publisher: DEFAULT_TITLE,
        category: 'business',
        classification: 'Business Software',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 1,
            userScalable: false,
            viewportFit: 'cover',
        },
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        metadataBase: new URL(DEFAULT_URL),
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: fullUrl,
            siteName: DEFAULT_TITLE,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${title || DEFAULT_TITLE} - Autonomous booking management with no-show prevention`,
                    type: 'image/webp',
                },
            ],
            locale: "en_US",
            type,
            publishedTime: type === 'article' ? (publishedTime || currentDate) : undefined,
            modifiedTime: type === 'article' ? (modifiedTime || currentDate) : undefined,
            authors: type === 'article' && authors ? authors : undefined,
            section: type === 'article' ? section : undefined,
            tags: type === 'article' ? tags : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: {
                url: imageUrl,
                alt: `${title || DEFAULT_TITLE} - Autonomous booking management with no-show prevention`,
            },
            creator: TWITTER_HANDLE,
            site: TWITTER_HANDLE,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            nocache: false,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            // Add when ready: 
            // google: "verification-code",
            // yandex: "verification-code",
            // yahoo: "verification-code",
            // other: "verification-code",
        },
        other: {
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
        },
    };
};
