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
    default: "HVAC Services Ontario | Heating & Cooling Experts | RBZ Climate Solutions",
    template: "%s | RBZ Climate Solutions"
  },
  description: "RBZ Climate Solutions provides professional HVAC services in Ontario including furnace repair, AC installation, heat pumps, ductwork, and emergency heating & cooling solutions. Serving Toronto, Scarborough, Mississauga, Brampton, Vaughan, Markham, and all GTA regions.",
  keywords: [
    // General HVAC
    "HVAC services Canada", "HVAC services Ontario", "HVAC services Toronto", "HVAC services GTA",
    "HVAC contractors Canada", "HVAC contractors Ontario", "HVAC company Toronto",
    "best HVAC company Ontario", "licensed HVAC contractor Canada",
    "heating and cooling services Canada", "heating and cooling contractors Ontario",
    "residential HVAC services", "commercial HVAC services", "industrial HVAC services Canada",
    "HVAC maintenance services", "HVAC repair services", "HVAC installation services",
    "24/7 HVAC services", "emergency HVAC services", "same day HVAC repair Ontario",
    "HVAC technicians near me", "HVAC near me", "local HVAC experts Ontario",
    "affordable HVAC services Ontario", "professional HVAC installation Canada",
    "home comfort systems Ontario", "energy efficient HVAC systems Canada",
    "indoor comfort solutions Ontario", "climate control solutions Canada",

    // Furnace
    "furnace repair Ontario", "furnace repair Toronto", "furnace installation GTA",
    "gas furnace installation Ontario", "high efficiency furnace Canada",
    "furnace maintenance services", "furnace replacement Ontario", "emergency furnace repair",
    "furnace tune-up GTA", "furnace cleaning services", "residential furnace repair",
    "commercial furnace services", "furnace inspection Ontario",
    "furnace troubleshooting services", "heating repair services Canada",

    // Air Conditioning
    "air conditioning installation Ontario", "AC repair Toronto", "central AC installation Canada",
    "central air conditioning services", "ductless AC installation Ontario",
    "split AC installation Canada", "AC maintenance services", "AC tune-up Ontario",
    "air conditioner replacement GTA", "emergency AC repair Canada",
    "commercial AC services", "residential air conditioning services",
    "air conditioning contractors Ontario", "air conditioning repair near me",
    "home cooling systems Canada",

    // Heat Pump
    "heat pump installation Ontario", "heat pump repair Canada", "ductless heat pump Ontario",
    "cold climate heat pump Canada", "air source heat pump GTA",
    "heat pump maintenance services", "heat pump replacement Ontario",
    "energy efficient heat pump systems", "mini split heat pump Canada",
    "residential heat pump services", "commercial heat pump installation",
    "heat pump contractors Ontario", "heat pump rebates Canada",

    // Boiler
    "boiler installation Ontario", "boiler repair Toronto", "combi boiler installation Canada",
    "high efficiency boiler systems", "boiler maintenance services",
    "boiler replacement Ontario", "residential boiler repair",
    "commercial boiler services", "radiant heating systems Canada",

    // Water Heater
    "water heater installation Ontario", "tankless water heater Canada",
    "hot water tank installation GTA", "water heater repair Ontario",
    "tankless water heater installation", "electric water heater services",
    "gas water heater installation", "hot water tank replacement Ontario",
    "water heater maintenance services", "on demand water heater Canada",

    // Ductwork
    "duct cleaning services Ontario", "air duct cleaning Toronto",
    "duct repair services Canada", "custom ductwork installation",
    "HVAC duct installation Ontario", "duct modification services",
    "airflow optimization HVAC", "ventilation services Ontario",
    "duct sealing services Canada", "indoor air quality solutions",

    // Emergency
    "24 hour furnace repair Ontario", "emergency heating repair GTA",
    "24/7 air conditioning repair", "urgent HVAC repair Canada",
    "weekend HVAC services Ontario", "after hours HVAC repair",

    // Local SEO
    "HVAC services Scarborough", "HVAC services North York",
    "HVAC services Mississauga", "HVAC services Brampton",
    "HVAC services Vaughan", "HVAC services Markham",
    "HVAC services Richmond Hill", "HVAC services Ajax",
    "HVAC services Pickering", "HVAC services Oshawa",
    "HVAC services Simcoe County", "HVAC services Barrie",
    "HVAC services Hamilton", "HVAC services Oakville",
    "HVAC services Burlington", "HVAC services Whitby",
    "HVAC services Milton", "HVAC services Etobicoke",

    // Buyer Intent
    "best HVAC contractor near me", "top HVAC company Ontario",
    "HVAC installation cost Canada", "furnace repair cost Toronto",
    "heat pump installation cost Ontario", "air conditioner installation price GTA",
    "affordable furnace installation Ontario", "best heating and cooling company Canada",
    "trusted HVAC company Toronto", "reliable HVAC services Ontario"
  ],
  authors: [{ name: "RBZ Climate Solutions" }],
  verification: {
    google: "6JLaB7TnCMvwzUJjFWts5cf0XlutPIymFuGiKna4DFk",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://rbzclimatesolutions.com",
    title: "HVAC Services Ontario | Heating & Cooling Experts | RBZ Climate Solutions",
    description: "RBZ Climate Solutions provides professional HVAC services in Ontario including furnace repair, AC installation, heat pumps, ductwork, and emergency heating & cooling solutions across Toronto, Scarborough, GTA and surrounding areas.",
    siteName: "RBZ Climate Solutions",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 142,
        alt: "RBZ Climate Solutions - HVAC Experts Ontario",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Services Ontario | RBZ Climate Solutions",
    description: "Professional HVAC services in Ontario – furnace, AC, heat pump, ductwork & more. Serving Toronto, GTA, and all of Ontario.",
    images: ["/logo.png"],
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
  alternates: {
    canonical: "https://rbzclimatesolutions.com",
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
    <html lang="en-CA" className={`${inter.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
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
