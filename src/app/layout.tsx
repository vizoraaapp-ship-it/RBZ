import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/components/ui/VisitorTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rbzclimatesolutions.com'),
  title: {
    default: "RBZ Climate Solutions | Premium HVAC Services GTA",
    template: "%s | RBZ Climate Solutions"
  },
  description: "Expert HVAC services in the GTA including furnace, AC, heat pumps, and repairs. Reliable and affordable solutions.",
  keywords: ["HVAC GTA", "Furnace Repair GTA", "AC Installation Canada", "Heat Pump GTA", "RBZ Climate Solutions", "HVAC repair"],
  authors: [{ name: "RBZ Climate Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://rbzclimatesolutions.com",
    title: "RBZ Climate Solutions",
    description: "Trusted premium HVAC services across the GTA.",
    siteName: "RBZ Climate Solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-primary-container selection:text-on-primary-container">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
