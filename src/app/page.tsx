import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesBento from '@/components/home/ServicesBento';
import Statistics from '@/components/home/Statistics';
import Brands from '@/components/home/Brands';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import OurValues from '@/components/home/OurValues';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RBZ Climate Solutions",
    "image": "https://rbzclimatesolutions.com/logo.png",
    "telephone": "+16472999648",
    "email": "rbzclimatesolutions@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#220, 205 Morningside Avenue",
      "addressLocality": "Scarborough",
      "addressRegion": "Ontario",
      "postalCode": "M1E 3E2",
      "addressCountry": "CA"
    },
    "areaServed": "Ontario",
    "url": "https://rbzclimatesolutions.com",
    "sameAs": []
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often should I service my furnace?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is recommended to service your furnace once a year to ensure safety and efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide emergency HVAC repairs in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RBZ Climate Solutions offers efficient HVAC repair services across Ontario."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <Hero />
      <ServicesBento />
      <Statistics />
      <Brands />
      <Testimonials />
      <FAQ />
      <OurValues />
      <ContactCTA />
      <Footer />
    </main>
  );
}
