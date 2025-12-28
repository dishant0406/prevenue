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
    description: "Autonomous AI booking management platform that handles calls, inquiries, appointments, and follow-ups while preventing no-shows through predictive analytics. Reduce no-shows by 45% and automate your entire booking workflow.",
    keywords: [
        "AI booking management",
        "no-show prevention",
        "autonomous appointment scheduling",
        "predictive analytics",
        "appointment management software", 
        "intelligent call handling",
        "automated follow-ups",
        "healthcare scheduling AI",
        "salon management software",
        "business automation platform"
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
