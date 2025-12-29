"use client";

import { trackNavigation } from "@/lib/beam-analytics";
import Link from "next/link";

interface LogoLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const LogoLink: React.FC<LogoLinkProps> = ({ children, className }) => {
  return (
    <Link 
      href="/" 
      className={className}
      onClick={() => trackNavigation.logoClick()}
    >
      {children}
    </Link>
  );
};

interface NavLinkProps {
  href: string;
  name: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, name, children, className }) => {
  return (
    <Link 
      href={href} 
      className={className}
      onClick={() => trackNavigation.linkClick(name.toLowerCase(), href)}
    >
      {children}
    </Link>
  );
};