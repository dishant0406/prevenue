import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/marketing/cta";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: "Contact Us",
    description: "Book a call with Prevenue's experts to discuss your no-show prevention needs. Get a custom AI-powered solution tailored to your practice's booking system and workflow.",
    url: "/contact",
    keywords: [
        "contact prevenue",
        "book a call",
        "no-show prevention consultation",
        "practice management demo",
        "AI scheduling consultation",
        "healthcare technology support",
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