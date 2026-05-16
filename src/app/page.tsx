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
import Blogs from '@/components/home/Blogs';
import Financing from '@/components/home/Financing';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "name": "RBZ Climate Solutions",
    "image": "https://rbzclimatesolutions.com/logo.png",
    "logo": "https://rbzclimatesolutions.com/logo.png",
    "telephone": "+16472999648",
    "email": "rbzclimatesolutions@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "205 Morningside Avenue",
      "addressLocality": "Scarborough",
      "addressRegion": "Ontario",
      "postalCode": "M1E 3E2",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.7735,
      "longitude": -79.2245
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Toronto", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Scarborough", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Mississauga", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Brampton", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Vaughan", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Markham", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Richmond Hill", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Ajax", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Pickering", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Oshawa", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Oakville", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Burlington", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Hamilton", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Barrie", "addressRegion": "Ontario" },
      { "@type": "City", "name": "North York", "addressRegion": "Ontario" },
      { "@type": "City", "name": "Etobicoke", "addressRegion": "Ontario" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HVAC Services Ontario",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Furnace Repair & Installation Ontario",
            "description": "Professional gas furnace repair, installation, and maintenance services in Ontario and GTA. Emergency furnace repair available 24/7."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Air Conditioning Installation & Repair Ontario",
            "description": "Central AC installation, ductless AC, and air conditioner repair services across Toronto, Scarborough, and GTA."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Heat Pump Installation Ontario",
            "description": "Cold-climate heat pump installation and repair in Ontario. Energy-efficient ductless and central heat pump systems."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tankless Water Heater Installation Canada",
            "description": "Tankless and traditional water heater installation, repair, and maintenance services in Ontario and GTA."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Duct Cleaning & Ductwork Services Ontario",
            "description": "Professional air duct cleaning, custom ductwork installation, and HVAC duct sealing services in Toronto and Ontario."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency HVAC Services Ontario",
            "description": "24/7 emergency HVAC repair, emergency furnace repair, and urgent AC repair across GTA and Ontario."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "url": "https://rbzclimatesolutions.com",
    "sameAs": [
      "https://www.instagram.com/rbzclimatesolutions",
      "https://www.facebook.com/profile.php?id=61585673990442",
      "https://www.linkedin.com/in/rbz-climatesolutions-6b98273b5/",
      "https://www.tiktok.com/@rbzclimatesolutions"
    ],
    "description": "RBZ Climate Solutions is a licensed HVAC contractor in Ontario providing expert furnace repair, AC installation, heat pump services, duct cleaning, water heater installation, and emergency HVAC repairs across Toronto, Scarborough, Mississauga, Brampton, Vaughan, Markham, and all of the GTA."
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often should I service my furnace in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is recommended to service your furnace at least once a year in Ontario, ideally before the winter season. Regular annual furnace maintenance ensures safe and efficient operation, reduces your heating bills, and extends the life of your system. RBZ Climate Solutions offers professional furnace tune-up services across the GTA."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best heat pump for Canadian winters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For Canadian winters, we recommend cold-climate heat pumps (also called hyper-heat systems) from brands like Mitsubishi, Fujitsu, and Daikin. These units operate efficiently down to -30°C, making them ideal for Ontario winters. RBZ Climate Solutions specializes in cold-climate heat pump installation across Ontario and the GTA, and can help you take advantage of government rebates."
        }
      },
      {
        "@type": "Question",
        "name": "How much does AC installation cost in Toronto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of central air conditioning installation in Toronto typically ranges from $3,000 to $7,000, depending on the size of your home, the SEER rating of the unit, and whether existing ductwork needs modification. Ductless mini-split AC systems can range from $1,500 to $4,000 per zone. Contact RBZ Climate Solutions for a free, no-obligation quote for AC installation in Toronto and GTA."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer emergency HVAC repairs in the GTA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RBZ Climate Solutions offers emergency HVAC repair services across the Greater Toronto Area including Toronto, Scarborough, Mississauga, Brampton, Vaughan, and Markham. We respond quickly to emergency furnace breakdowns, emergency AC failures, and urgent HVAC issues to restore your home comfort as fast as possible."
        }
      },
      {
        "@type": "Question",
        "name": "Are there government rebates for heat pump installation in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Ontario homeowners can access government rebates for heat pump installation through the Canada Greener Homes Grant and various Ontario Energy Board programs. Rebates can range from $1,000 to $7,000 or more depending on the system. RBZ Climate Solutions can help you navigate available heat pump rebates in Canada and ensure your installation qualifies."
        }
      },
      {
        "@type": "Question",
        "name": "What are the signs that my furnace needs repair or replacement in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common signs your furnace needs repair include: unusual noises (banging, rattling, or squealing), uneven heating throughout your home, a yellow pilot light (instead of blue), skyrocketing energy bills, frequent cycling on and off, and a furnace that is over 15 years old. If your furnace is showing these signs, contact RBZ Climate Solutions for professional furnace repair in Ontario."
        }
      },
      {
        "@type": "Question",
        "name": "What is the benefit of a tankless water heater in Canada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tankless water heaters provide on-demand hot water, are 20–40% more energy-efficient than traditional tank systems, take up significantly less space, and have a longer lifespan of 20+ years. They are ideal for Canadian homes where reliable hot water supply is essential year-round. RBZ Climate Solutions provides professional tankless water heater installation across Ontario and the GTA."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve indoor air quality in my Ontario home?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improving indoor air quality in your Ontario home involves regular air duct cleaning, installing whole-home humidifiers, UV air purification systems, and HEPA air filtration. RBZ Climate Solutions provides comprehensive indoor air quality services including duct cleaning in Toronto, humidifier installation, and air purifier installation across the GTA."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a furnace last in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A well-maintained furnace typically lasts 15–20 years in Ontario. However, older furnaces become less efficient and more prone to breakdowns, especially during harsh Canadian winters. If your furnace is approaching 15 years old, it is wise to start planning for furnace replacement. RBZ Climate Solutions offers furnace replacement services across Ontario and GTA."
        }
      },
      {
        "@type": "Question",
        "name": "Do you service commercial HVAC systems in Ontario?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RBZ Climate Solutions provides commercial HVAC services across Ontario including commercial furnace installation, commercial air conditioning repair, commercial boiler services, and small commercial kitchen HVAC systems. We serve businesses across Toronto, Scarborough, Mississauga, and the Greater Toronto Area."
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
      <Blogs />
      <FAQ />
      <Financing />
      <OurValues />
      <ContactCTA />
      <Footer />
    </main>
  );
}
