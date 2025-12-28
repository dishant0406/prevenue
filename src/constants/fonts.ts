import localFont from "next/font/local";

// Agrandir font with regular and bold weights
export const agrandir = localFont({
    src: [
        {
            path: "../../public/Fonts/Agrandir-Regular.otf",
            weight: "400", 
            style: "normal",
        },
        {
            path: "../../public/Fonts/Agrandir-Text-Bold-700.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-agrandir",
    display: "swap",
});

// Individual font exports
export const agrandirRegular = localFont({
    src: "../../public/Fonts/Agrandir-Regular.otf", 
    variable: "--font-agrandir-regular",
    display: "swap",
});

export const agrandirBold = localFont({
    src: "../../public/Fonts/Agrandir-Text-Bold-700.otf",
    variable: "--font-agrandir-bold", 
    display: "swap",
});

// Aliases for backward compatibility
export const heading = agrandir;
export const base = agrandir;
