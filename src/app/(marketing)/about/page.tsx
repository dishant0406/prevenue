import AboutHero from "@/components/about/about-hero";
import OurMission from "@/components/about/our-mission";
import OurStart from "@/components/about/our-start";
import OurStory from "@/components/about/our-story";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
    title: "About Us",
    description: "Learn about Prevenue's mission to solve the $150B annual no-show problem across industries. Founded by a software engineer, our AI platform helps healthcare, salons, spas and service businesses prevent revenue loss.",
    url: "/about",
    keywords: [
        "about prevenue",
        "no-show prevention company",
        "AI scheduling solutions",
        "appointment management software",
        "revenue protection platform",
        "cross-industry technology",
        "appointment scheduling AI"
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
