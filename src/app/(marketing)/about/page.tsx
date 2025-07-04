import AboutHero from "@/components/about/about-hero";
import OurMission from "@/components/about/our-mission";
import OurStory from "@/components/about/our-story";
import OurStart from "@/components/about/our-start";
import Blogs from "@/components/marketing/blogs";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/how-it-works";
import Stats from "@/components/marketing/stats";
import Testimonials from "@/components/marketing/testimonials";

const AboutPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <AboutHero />
            <OurStory />
            <OurStart />
            <OurMission />
            {/* <Companies /> */}
            {/* <HowItWorks /> */}
            {/* <Features /> */}
            {/* <Faq /> */}
            {/* <Stats /> */}
            {/* <Testimonials /> */}
            {/* <Blogs /> */}
            {/* <CTA /> */}
        </div>
    );
};

export default AboutPage;
