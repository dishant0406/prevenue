export type Integration = {
    name: string;
    description: string;
    icon: string;
    category: "booking" | "communication" | "analytics" | "all";
};

export const INTEGRATION_CATEGORIES = [
    {
        label: "All Integrations",
        value: "all"
    },
    {
        label: "Booking Systems",
        value: "booking"
    },
    {
        label: "Communication",
        value: "communication" 
    },
    {
        label: "Analytics",
        value: "analytics"
    }
] as const;

export const INTEGRATIONS: Integration[] = [
    {
        name: "Vagaro",
        description: "Seamlessly integrate with Vagaro's salon and spa booking platform to predict and prevent no-shows.",
        icon: "/images/integration/vagaro.webp",
        category: "booking"
    },
    {
        name: "Mindbody",
        description: "Connect with Mindbody's wellness business management software for comprehensive no-show prevention.",
        icon: "/images/integration/mindbody.webp",
        category: "booking"
    },
    {
        name: "SimplePractice",
        description: "Integrate with SimplePractice's healthcare practice management system for predictive appointment analytics.",
        icon: "/images/integration/simplepractice.webp",
        category: "booking"
    },
    {
        name: "Square Appointments",
        description: "Sync with Square's appointment booking system to automatically prevent revenue loss from no-shows.",
        icon: "/images/integration/squareappointments.webp",
        category: "booking"
    },
    {
        name: "SMS & Email",
        description: "Send intelligent, escalating reminders via SMS and email based on client risk profiles.",
        icon: "/images/integration/gmail.webp",
        category: "communication"
    },
    {
        name: "WhatsApp Business",
        description: "Reach high-risk clients through WhatsApp with personalized no-show prevention messages.",
        icon: "/images/integration/whatsappbusiness.webp",
        category: "communication"
    },
    {
        name: "Slack",
        description: "Get real-time notifications about high-risk appointments and revenue protection alerts.",
        icon: "/images/integration/slack.webp",
        category: "communication"
    },
    {
        name: "Custom API",
        description: "Build custom integrations with your existing systems using Prevenue's comprehensive API.",
        icon: "/images/integration/postman.webp",
        category: "analytics"
    }
]; 