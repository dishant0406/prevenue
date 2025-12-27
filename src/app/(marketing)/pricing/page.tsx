import CTA from "@/components/marketing/cta"
import Faq from "@/components/marketing/faq"
import PricingHero from "@/components/pricing/pricing-hero"
import PricingQuestions from "@/components/pricing/pricing-questions"
import { generateMetadata } from "@/utils"

export const metadata = generateMetadata({
    title: "Custom Pricing",
    description: "Book a call to discuss custom Prevenue solutions tailored for your practice. Our AI-powered no-show prevention platform offers personalized pricing based on your specific needs and practice size.",
    url: "/pricing",
    keywords: [
        "prevenue pricing",
        "no-show prevention cost",
        "custom AI solutions",
        "practice management pricing",
        "healthcare software cost",
        "appointment scheduling pricing",
        "revenue protection investment"
    ]
});

const PricingPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <PricingHero />
            <PricingQuestions />
            <Faq />
            <CTA />
        </div>
    )
}

export default PricingPage 