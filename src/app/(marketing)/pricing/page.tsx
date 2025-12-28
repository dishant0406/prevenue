import CTA from "@/components/marketing/cta"
import Faq from "@/components/marketing/faq"
import PricingHero from "@/components/pricing/pricing-hero"
import PricingQuestions from "@/components/pricing/pricing-questions"
import { generateMetadata } from "@/utils"

export const metadata = generateMetadata({
    title: "Custom Pricing",
    description: "Book a call to discuss custom Prevenue solutions for your practice. Our autonomous booking management platform with advanced no-show prevention offers personalized pricing based on your needs.",
    url: "/pricing",
    keywords: [
        "prevenue pricing",
        "booking management cost",
        "no-show prevention pricing",
        "custom AI solutions",
        "practice automation pricing",
        "appointment management cost",
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