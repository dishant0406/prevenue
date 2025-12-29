"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

import { trackCTA } from "@/lib/beam-analytics";
import { cn } from "@/lib/index";

const buttonVariants = cva(
  "premium-button touch-target inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive select-none cursor-pointer transform-gpu will-change-transform",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:scale-[1.02] active:scale-[0.98]",
        outline: "border glass-effect hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.02] active:scale-[0.98]",
        black: "bg-black text-white hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        md: "h-9 px-4 py-2",
        lg: "h-11 px-8",
        icon: "size-8",
        iconlg: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ClientButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
  asChild?: boolean
  href?: string
  trackingSource?: string
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ClientButton = React.forwardRef<
  HTMLButtonElement,
  ClientButtonProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ClientButtonProps>
>(({ className, variant, size, asChild = false, href, children, trackingSource, onClick, ...props }, ref) => {
  
  // Enhanced click handler with tracking
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track CTA clicks when href is present (indicates it's a CTA)
    if (href && trackingSource) {
      if (href === '/contact' || href.includes('contact')) {
        trackCTA.bookCall(trackingSource);
      } else {
        trackCTA.generalClick(trackingSource, href);
      }
    }
    
    // Call original onClick if provided
    onClick?.(event);
  };

  if (href && !asChild) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={() => {
          // Track navigation clicks for links
          if (trackingSource) {
            if (href === '/contact' || href.includes('contact')) {
              trackCTA.bookCall(trackingSource);
            } else {
              trackCTA.generalClick(trackingSource, href);
            }
          }
        }}
      >
        {children}
      </Link>
    )
  }

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Comp>
  )
})

ClientButton.displayName = "ClientButton"

export { buttonVariants, ClientButton };
