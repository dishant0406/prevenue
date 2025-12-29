import Providers from "@/components/global/providers";
import { agrandir } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata, generateOrganizationJsonLd, generateSoftwareApplicationJsonLd } from "@/utils";
import Script from "next/script";

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
                    "min-h-screen bg-[#0b1011] text-foreground font-base antialiased dark premium-container",
                    agrandir.variable,
                )}
                style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                }}
            >
                <Script
                    src={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_URL}
                    data-token={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_TOKEN}
                    strategy="afterInteractive"
                />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
};
