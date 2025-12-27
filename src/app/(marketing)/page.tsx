import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/how-it-works";
import Stats from "@/components/marketing/stats";
import Testimonials from "@/components/marketing/testimonials";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: undefined, // Uses default title
    description: "Stop no-shows before they happen with Prevenue's AI-powered predictive platform. Reduce no-shows by 45%, recover lost revenue through intelligent overbooking, and protect your business revenue automatically across healthcare, salons, and service industries.",
    keywords: [
        "no-show prevention",
        "AI appointment scheduling",
        "predictive analytics",
        "appointment reminder software", 
        "business revenue protection",
        "intelligent overbooking",
        "salon appointment software",
        "healthcare scheduling AI",
        "veterinary appointment management",
        "automated appointment system"
    ]
});

const HomePage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <Hero />
            <Companies />
            <HowItWorks />
            <Features />
            <Faq />
            <Stats />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default HomePage;
