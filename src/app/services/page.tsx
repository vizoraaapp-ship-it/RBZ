import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const SERVICES_DATA = [
  {
    title: "Air Conditioning",
    description: "Advanced cooling solutions featuring precision multi-stage cooling for optimal energy efficiency and humidity control.",
    image: "/service-ac.png",
    icon: "ac_unit"
  },
  {
    title: "Furnace",
    description: "Installation and maintenance of high-efficiency gas and electric heating systems designed for maximum reliability.",
    image: "/service-furnace.png",
    icon: "mode_fan"
  },
  {
    title: "Heat Pump",
    description: "Eco-friendly heating and cooling hybrids that leverage sustainable technology to reduce your carbon footprint.",
    image: "/service-heatpump.png",
    icon: "thermostat"
  },
  {
    title: "Water Tank",
    description: "Premium water storage tank systems engineered for thermal retention and long-term durability in any home.",
    image: "/service-watertank.png",
    icon: "water_heater"
  },
  {
    title: "Boiler",
    description: "High-efficiency boiler systems for hydronic heating, providing consistent radiant warmth throughout your home.",
    image: "/service-furnace.png", // Reusing for now
    icon: "hvac"
  },
  {
    title: "Duct Work",
    description: "Professional cleaning and airtight sealing services to ensure your air quality and system efficiency remain peaked.",
    image: "/technicians.png", // Reusing for now
    icon: "air"
  },
  {
    title: "Repair",
    description: "Expert repair services for all major brands, utilizing genuine parts and advanced diagnostic equipment.",
    image: "/service-ac.png", // Reusing for now
    icon: "build"
  },
  {
    title: "Accessories",
    description: "Essential accessories and components for HVAC and water systems.",
    image: "/service-watertank.png", // Reusing for now
    icon: "settings"
  },
  {
    title: "Smart Home",
    description: "Smart home automation integration for intelligent temperature scheduling and remote climate control.",
    image: "/hero-furnace.png", // Reusing for now
    icon: "smart_home"
  },
  {
    title: "Ductless Heat Pump",
    description: "Ductless mini-split systems for efficient heating and cooling without ductwork.",
    image: "/service-heatpump.png", // Reusing for now
    icon: "heat_pump"
  },
  {
    title: "Humidifier / Air Quality",
    description: "Whole-home humidifiers and air quality solutions for improved indoor comfort and health.",
    image: "/service-ac.png", // Reusing for now
    icon: "air_purifier"
  },
  {
    title: "Tankless Water Heater",
    description: "Energy-efficient tankless water heaters providing endless hot water on demand with a compact footprint.",
    image: "/service-watertank.png", // Reusing for now
    icon: "water_damage"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Page Hero Section - Full Screen Height */}
      <header className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/service-hero.png" 
            alt="HVAC Services Hero" 
            fill 
            className="object-cover"
            priority
          />
          {/* Black Shade Filter Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        {/* Content Centered - Matched to About Page Style */}
        <div className="relative z-20 max-w-4xl mx-auto px-8 text-center space-y-8 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Professional solutions for your home comfort needs, delivered with atmospheric precision and technical mastery.
          </p>
          <div className="pt-6">
            <Button size="xl" href="#services-grid">Explore Solutions ↓</Button>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <Section background="surface" id="services-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
          {SERVICES_DATA.map((service, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="w-full bg-blue-950 py-32 px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-1000 relative z-10">
          <h2 className="font-headline text-4xl md:text-6xl font-black mb-6">Ready to improve your home comfort?</h2>
          <p className="text-blue-100/80 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
            Our expert technicians are ready to help with all your heating and cooling needs. Experience the RBZ difference today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
            <Button size="xl" href="/contact">Book Service Now</Button>
            <Button variant="outline" size="xl" className="text-white border-white/20 hover:bg-white/10" href="tel:+16472999648">
              Call: +1 647 299 9648
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
