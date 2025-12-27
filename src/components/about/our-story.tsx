import { COMPANY_INFO } from "@/constants";
import Image from "next/image";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";

const OurStory = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24">
            <Wrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col items-start justify-start md:items-center md:justify-center">
                        <Container>
                            <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                                <Icons.stars className="size-5" />
                                <span className="text-sm text-white">
                                    Our Story
                                </span>
                            </div>
                        </Container>
                        <Container delay={0.1} className="flex grow">
                            <h2 className="text-3xl md:text-4xl font-semibold text-left mt-4">
                                Software Engineers Solving Real Problems
                            </h2>
                        </Container>
                        <Container delay={0.3} className="mt-auto">
                            <div className="flex items-center gap-4">
                                <div className="size-24">
                                    <Image
                                        src="/icons/heart.svg"
                                        alt="Heart"
                                        width={1024}
                                        height={1024}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-base md:text-lg text-muted-foreground text-left mt-2 max-w-2xl">
                                    {COMPANY_INFO.team.expertise} experts founded {COMPANY_INFO.founded.month} {COMPANY_INFO.founded.year} to solve the $150B annual no-show problem
                                </p>
                            </div>
                        </Container>
                    </div>

                    <div className="flex flex-col gap-8">
                        <Container className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    01
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                    Founded July 2025
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                    Founded by a software engineer who discovered the massive no-show problem affecting healthcare clinics, salons, spas, and other appointment-based businesses.
                                </div>
                            </div>
                        </Container>
                        <Container delay={0.1} className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    02
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                    5 months of rapid growth
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                    Since July 2025, we've grown from beta testing to serving {COMPANY_INFO.metrics.practicesServed} practices with {COMPANY_INFO.product.accuracy} prediction accuracy.
                                </div>
                            </div>
                        </Container>
                        <Container delay={0.2} className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    03
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                    {COMPANY_INFO.metrics.revenueRecovered} revenue recovered
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                    In just 5 months, {COMPANY_INFO.name} has protected {COMPANY_INFO.metrics.practicesServed} practices and recovered {COMPANY_INFO.metrics.revenueRecovered} in prevented revenue loss.
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
};

export default OurStory
