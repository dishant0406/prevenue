export type PlanFeature = {
    text: string;
};

export type Plan = {
    name: string;
    badge?: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: PlanFeature[];
    buttonText: string;
    popular?: boolean;
    buttonLink?: string;
};

export const PRICING_PLANS: Plan[] = [
    {
        name: "Custom Solution",
        badge: "Tailored for You",
        description: "Every practice is unique. We'll build a solution that fits your specific needs.",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "Custom AI model training for your practice" },
            { text: "Personalized integration with your booking systems" },
            { text: "Dedicated setup and onboarding" },
            { text: "Industry-specific optimization" },
            { text: "Ongoing support and optimization" },
            { text: "Revenue recovery guarantee" },
        ],
        buttonText: "Book a Call",
        buttonLink: "/contact",
    }
];

export const MARQUEE_ITEMS = [
    "Prevent No-Shows",
    "Maximize Revenue",
    "AI-Powered Insights",
    "Smart Scheduling",
    "Reduce Lost Income",
    "Predictive Analytics",
    "Automated Solutions"
];
