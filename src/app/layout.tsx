import Providers from "@/components/global/providers";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata, generateOrganizationJsonLd, generateSoftwareApplicationJsonLd } from "@/utils";

export const metadata = generateMetadata({
    title: undefined, // Uses default title
    description: "AI-powered predictive no-show prevention platform that helps practices reduce no-shows by up to 45% and recover lost revenue through intelligent scheduling, automated reminders, and consequence management.",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateOrganizationJsonLd())
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateSoftwareApplicationJsonLd())
                    }}
                />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-[#050505] text-foreground font-base antialiased dark",
                    base.variable,
                    heading.variable,
                )}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
};
