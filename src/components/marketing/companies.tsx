import { COMPANY_INFO } from "@/constants";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Marquee } from "../ui/marquee";

const Companies = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24">
            <Wrapper>
                <Container>
                    <div className="flex flex-col items-center justify-center px-2 md:px-0">
                        <h4 className="text-xl lg:text-2xl font-semibold text-center tracking-tight">
                            {COMPANY_INFO.metrics.practicesServed} leading practices trust {COMPANY_INFO.name}
                        </h4>
                    </div>
                </Container>

                <Container delay={0.1}>
                    <div className="mt-10 w-full relative overflow-hidden">
                        <Marquee pauseOnHover className="[--duration:30s]">
                            <div className="flex gap-8 md:gap-12">
                                <Image src="/images/company/bloom.png" alt="Bloom" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/elements.png" alt="Elements" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/oakwood.png" alt="Oakwood" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/dental.png" alt="Dental" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/pinnacle.png" alt="Pinnacle" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/urban.png" alt="Urban" width={1024} height={1024} className="w-24 h-8" />
                                <Image src="/images/company/bar.png" alt="Bar" width={1024} height={1024} className="w-24 h-8" />
                            </div>
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                    </div>
                </Container>
            </Wrapper>
        </div>
    )
};

export default Companies
