import { COMPANY_INFO } from "@/constants/company";
import { Metadata } from "next";

// Default metadata constants
const DEFAULT_TITLE = process.env.NEXT_PUBLIC_APP_NAME || COMPANY_INFO.name;
const DEFAULT_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || COMPANY_INFO.description;
const DEFAULT_URL = process.env.NEXT_PUBLIC_APP_URL || COMPANY_INFO.domain;
const DEFAULT_IMAGE = "/thumbnail.png";
const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE || COMPANY_INFO.twitter;

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
    ]
}: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
} = {}): Metadata => {
    
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : `${DEFAULT_TITLE} - Autonomous Booking Management with AI-Powered No-Show Prevention`;
    const fullUrl = url.startsWith('http') ? url : `${DEFAULT_URL}${url}`;
    const imageUrl = image?.startsWith('http') ? image : `${DEFAULT_URL}${image}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(", "),
        authors: [{ name: DEFAULT_TITLE }],
        creator: DEFAULT_TITLE,
        publisher: DEFAULT_TITLE,
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
                },
            ],
            locale: "en_US",
            type,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [imageUrl],
            creator: TWITTER_HANDLE,
            site: TWITTER_HANDLE,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            // Add when ready: google: "verification-code",
        },
    };
};
