// These styles apply to every route in the application
import "@/styles/globals.css";
import {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";
import Script from "next/script";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Şah Yapı Hırdavat",
    description: "Şah Yapı Hırdavat",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Şah Yapı Hırdavat",
        description: "Şah Yapı Hırdavat",
    },
    metadataBase: new URL("https://atamep.com"),
    themeColor: "#FFF",
};

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="tr">
            {!(process && process.env.NODE_ENV === 'development') && <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-MWCTXTF8B7"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-MWCTXTF8B7');
            `}
            </Script>
            </>}
            <body className={inter.variable}>
                <Toaster/>
                {children}
            </body>
        </html>
    );
}
