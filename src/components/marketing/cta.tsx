import { COMPANY_INFO } from "@/constants";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";

const CTA = () => {
    return (
        <div className="flex flex-col items-center justify-center relative w-full py-16 lg:py-24 overflow-hidden">
            <div className="absolute bottom-0 lg:bottom-0 inset-x-0 mx-auto bg-primary/50 lg:bg-primary/70 rounded-full w-1/3 h-1/16 blur-[4rem]"></div>

            <Wrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full py-8">
                    <div className="flex flex-col items-start justify-center w-full">
                        <Container className="w-max mx-auto">
                            <h2 className="text-3xl lg:text-5xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 font-semibold">
                                Ready to Automate Bookings <br /> & Stop Revenue Loss?
                            </h2>
                            <div className="flex items-center gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    <span className="text-sm font-medium">
                                        Custom setup included
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    <span className="text-sm font-medium">
                                        Revenue recovery guarantee
                                    </span>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="flex flex-col justify-center w-full mt-8 lg:mt-0">
                        <Container className="w-max mx-auto">
                            <div className="flex size-20">
                                <Image
                                    src="/icons/heart.svg"
                                    alt="Heart"
                                    width={1024}
                                    height={1024}
                                    className="object-cover size-full"
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                <Button href="/contact" size="lg" trackingSource="cta_section">
                                    Book a Call
                                </Button>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">
                                        {COMPANY_INFO.metrics.revenueRecovered} Revenue <br /> Recovered for {COMPANY_INFO.metrics.practicesServed} Practices
                                    </span>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
};

export default CTA
