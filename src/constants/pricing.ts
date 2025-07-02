export type PlanFeature = {
    text: string;
};

export type Plan = {
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: PlanFeature[];
    popular?: boolean;
};

export const PRICING_PLANS: Plan[] = [
    {
        name: "Basic",
        description: "All you need to get started",
        price: {
            monthly: 12,
            yearly: 10,
        },
        features: [
            { text: "Developer docs" },
            { text: "Submit cases to support" },
            { text: "API status notifications" },
            { text: "Troubleshooting" },
        ],
    },
    {
        name: "Popular",
        description: "Unlock more for your growing team",
        price: {
            monthly: 40,
            yearly: 32,
        },
        popular: true,
        features: [
            { text: "Developer docs" },
            { text: "Submit cases to support" },
            { text: "API status notifications" },
            { text: "Troubleshooting" },
        ],
    },
];
