import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/marketing/cta";
import { generateMetadata } from "@/utils";

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
            <ContactForm />
            <CTA />
        </div>
    )
};

export default ContactPage 