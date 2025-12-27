import IntegrationsHero from "@/components/integrations/integrations-hero";
import IntegrationsSection from "@/components/integrations/integrations-section";
import CTA from "@/components/marketing/cta";
import Stats from "@/components/marketing/stats";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: "Integrations",
    description: "Prevenue seamlessly integrates with popular booking systems including Vagaro, Mindbody, SimplePractice, Square Appointments, and more. Connect your existing workflow with AI-powered no-show prevention.",
    url: "/integrations",
    keywords: [
        "prevenue integrations",
        "vagaro integration",
        "mindbody integration",
        "simplepractice integration",
        "square appointments",
        "booking system integration",
        "healthcare software integration",
        "salon software integration"
    ]
});
const IntegrationsPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <IntegrationsHero />
            <IntegrationsSection />
            <Stats />
            <CTA />
        </div>
    )
};

export default IntegrationsPage
