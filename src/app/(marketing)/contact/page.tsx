import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/marketing/cta";
import { generateMetadata } from "@/utils";
import { Suspense } from "react";

export const metadata = generateMetadata({
    title: "Contact Us",
    description: "Book a call with Prevenue's experts to discuss your autonomous booking management and no-show prevention needs. Get a custom AI-powered solution for your practice.",
    url: "/contact",
    keywords: [
        "contact prevenue",
        "book a call",
        "booking management consultation",
        "no-show prevention demo",
        "practice automation consultation",
        "AI scheduling consultation",
        "custom solution inquiry"
    ]
});

const ContactPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <ContactHero />
            <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                <ContactForm />
            </Suspense>
            <CTA />
        </div>
    )
};

export default ContactPage 