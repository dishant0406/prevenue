import IntegrationsHero from "@/components/integrations/integrations-hero";
import IntegrationsSection from "@/components/integrations/integrations-section";
import CTA from "@/components/marketing/cta";
import Stats from "@/components/marketing/stats";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: "Integrations",
    description: "Prevenue's autonomous booking management platform seamlessly integrates with Vagaro, Mindbody, SimplePractice, Square Appointments, and more while providing advanced no-show prevention.",
    url: "/integrations",
    keywords: [
        "prevenue integrations",
        "booking management integration",
        "vagaro integration",
        "mindbody integration",
        "simplepractice integration",
        "appointment software integration",
        "no-show prevention integration"
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
