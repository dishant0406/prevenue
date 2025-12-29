"use client";

import { ClientButton } from "@/components/ui/client-button";
import { LogoLink, NavLink } from "@/components/ui/nav-links";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import MobileMenu from "./mobile-menu";

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={cn(
            "fixed top-0 inset-x-0 z-50 w-full h-16 transition-all duration-300 safe-area-inset",
            isScrolled ? "glass-effect" : "bg-transparent",
        )}>

            <Wrapper className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="navbar-logo"
                >
                    <LogoLink className="flex items-center gap-2 w-max h-6">
                        <Icons.logo className="w-max h-6" />
                    </LogoLink>
                </motion.div>

                <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-3 text-sm text-muted-foreground font-medium">
                    <AnimatePresence>
                        {NAV_LINKS.map((link, index) => (
                            <Container
                                key={index}
                                animation="fadeDown"
                                delay={0.1 * index}
                            >
                                <div className="relative">
                                    <NavLink 
                                        href={link.link}
                                        name={link.name}
                                        className="hover:text-foreground transition-all duration-500 px-1.5"
                                    >
                                        {link.name}
                                    </NavLink>
                                </div>
                            </Container>
                        ))}
                    </AnimatePresence>
                </div>

                <Container animation="fadeLeft" delay={0.1}>
                    <div className="flex items-center gap-x-4">
                        <Link href="/contact" className="hidden lg:block">
                            <ClientButton size="sm" variant="outline" trackingSource="navbar_contact">
                                Contact Sales
                            </ClientButton>
                        </Link>
                        <div className="lg:hidden">
                            <MobileMenu />
                        </div>
                    </div>
                </Container>
            </Wrapper>

        </header>
    );
};

export default Navbar;
