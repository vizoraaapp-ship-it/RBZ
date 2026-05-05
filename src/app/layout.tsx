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
    default: "HVAC Services in Ontario | Furnace, AC & Heat Pump Experts | RBZ Climate Solutions",
    template: "%s | RBZ Climate Solutions"
  },
  description: "Professional HVAC services in Ontario including furnace repair, AC installation, heat pumps, and water heaters. Serving GTA and surrounding areas.",
  keywords: [
  "HVAC installation Ontario", "HVAC repair Ontario", "HVAC service near me Canada", "HVAC contractors Ontario", "heating and cooling contractors GTA", "HVAC system installation Canada", "HVAC service providers Ontario", "HVAC inspection services", "HVAC system replacement Ontario",

  "gas furnace installation Ontario", "furnace tune-up GTA", "furnace replacement Ontario", "furnace not working repair", "emergency furnace service near me", "residential furnace services", "furnace cleaning services", "high efficiency furnace installation Canada",

  "central AC installation Ontario", "AC tune-up services GTA", "AC not cooling repair", "ductless AC installation Ontario", "split AC installation Canada", "residential AC services Ontario", "commercial AC repair GTA", "AC cleaning services",

  "cold climate heat pump Canada", "heat pump rebates Ontario", "heat pump maintenance services", "best heat pump for Ontario homes", "heat pump system installation GTA", "residential heat pump services", "commercial heat pump installation",

  "hot water tank installation Ontario", "water heater repair near me", "tankless water heater repair GTA", "electric water heater installation", "gas water heater service Canada", "water heater replacement Ontario", "hot water system repair",

  "air duct repair Ontario", "HVAC duct sealing services", "indoor air quality services Canada", "home air purification systems", "HVAC airflow problems solution", "duct inspection services", "ventilation system services Ontario",

  "24 hour HVAC repair Ontario", "emergency heating repair GTA", "emergency AC repair Ontario", "same day HVAC service near me", "urgent furnace repair Canada", "weekend HVAC services Ontario",

  "commercial HVAC services Ontario", "commercial HVAC installation GTA", "commercial heating and cooling systems", "industrial HVAC services Canada", "office HVAC maintenance services",

  "home HVAC services Ontario", "residential heating services Canada", "home air conditioning installation", "HVAC solutions for homes", "home comfort systems Ontario",

  "smart thermostat installation Canada", "smart HVAC systems Ontario", "home automation HVAC solutions", "energy efficient HVAC systems Canada",

  "HVAC services North York", "HVAC services Etobicoke", "HVAC services Vaughan", "HVAC services Richmond Hill", "HVAC services Markham", "HVAC services Ajax", "HVAC services Pickering", "HVAC services Oshawa",

  "HVAC installation cost Ontario", "furnace repair cost GTA", "AC installation price Canada", "heat pump installation cost Ontario", "best HVAC company near me", "affordable heating and cooling services"
],
  authors: [{ name: "RBZ Climate Solutions" }],
  verification: {
    google: "6JLaB7TnCMvwzUJjFWts5cf0XlutPIymFuGiKna4DFk",
  },
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
    icon: "/favicon.jpeg",
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
