import AboutHero from "@/components/about/about-hero";
import OurMission from "@/components/about/our-mission";
import OurStart from "@/components/about/our-start";
import OurStory from "@/components/about/our-story";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: "About Us",
    description: "Learn about Prevenue's autonomous booking management platform with advanced no-show prevention. Founded by software engineers, we help appointment-based businesses automate workflows while protecting revenue from no-shows.",
    url: "/about",
    keywords: [
        "about prevenue",
        "AI booking management platform",
        "no-show prevention company",
        "autonomous scheduling software",
        "appointment management solutions",
        "revenue protection technology",
        "booking automation platform"
    ]
});

const AboutPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <AboutHero />
            <OurStory />
            <OurStart />
            <OurMission />
            <Faq />
            <CTA />
        </div>
    );
};

export default AboutPage;
