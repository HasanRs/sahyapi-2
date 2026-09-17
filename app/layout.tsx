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
    title: "Şah Yapı | Hırdavat ve Tadilat",
    description: "Şah Yapı — Hırdavat malzemeleri, tadilat, boya dekorasyon ve yenileme hizmetleri.",
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
        title: "Şah Yapı | Hırdavat ve Tadilat",
        description: "Hırdavat malzemeleri ve profesyonel tadilat hizmetleri.",
    },
    metadataBase: new URL("https://sahyapihirdavat.com"),
    themeColor: "#FFF",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="tr">
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
            `}
                    </Script>
                </>
            )}
            <body className={inter.variable}>
                <Toaster/>
                {children}
            </body>
        </html>
    );
}
