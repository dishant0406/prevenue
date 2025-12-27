import { COMPANY_INFO, FOUNDER_STORY } from "@/constants";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";

const OurStart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24">
            <Wrapper>
                <div className="flex flex-col items-start justify-start md:items-center md:justify-center">
                    <Container>
                        <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                            <Icons.stars className="size-5" />
                            <span className="text-sm text-white">
                                Our Start
                            </span>
                        </div>
                    </Container>
                    <Container delay={0.1} className="flex grow">
                        <h2 className="text-3xl md:text-4xl font-semibold text-left md:text-center mt-4">
                            How {COMPANY_INFO.name} got Started
                        </h2>
                    </Container>
                    <Container delay={0.3} className="max-w-2xl mx-auto">
                        <p className="text-base md:text-lg text-muted-foreground text-left md:text-center mt-4 max-w-2xl">
                            <span className="text-balance">
                                {FOUNDER_STORY.inspiration} Founded in {COMPANY_INFO.founded.month} {COMPANY_INFO.founded.year}, we&apos;ve rapidly grown to serve {COMPANY_INFO.metrics.practicesServed} practices.
                            </span>
                            <br />
                            <br />
                            <span className="mt-4 text-balance">
                                Our {COMPANY_INFO.team.size}-person team of {COMPANY_INFO.team.expertise} experts has recovered {COMPANY_INFO.metrics.revenueRecovered} in just 5 months, proving AI can solve real healthcare problems.
                            </span>
                        </p>
                    </Container>

                    <Container delay={0.5} className="w-full max-w-4xl mx-auto">
                        <div className="mt-10 w-full">
                            <div className="flex flex-col items-center justify-center text-center h-80 w-full bg-primary rounded-xl lg:rounded-2xl p-6">
                                <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight text-black">
                                    Join {COMPANY_INFO.metrics.practicesServed} practices <br className="hidden lg:block" /> already protecting their revenue
                                </h3>
                                <Button href="/integrations"  size="md" variant="black" className="mt-6">
                                    See Our Integrations
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
};

export default OurStart
