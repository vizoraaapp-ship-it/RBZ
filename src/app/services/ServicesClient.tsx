'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceDetailModal from '@/components/services/ServiceDetailModal';
import BookingModal from '@/components/ui/BookingModal';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactCTA from '@/components/home/ContactCTA';

const SERVICES_DATA = [
  {
    id: 'ac',
    title: "Air Conditioning",
    description: "Advanced cooling solutions featuring precision multi-stage cooling for optimal energy efficiency and humidity control.",
    detailedDescription: "Our comprehensive Air Conditioning solutions keep your home perfectly chilled during the hottest months. We provide end-to-end services from new installations of high-SEER systems to routine maintenance and emergency repairs.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/airconditioner.jpeg",
    icon: "ac_unit"
  },
  {
    id: 'furnace',
    title: "Furnace",
    description: "Installation and maintenance of high-efficiency gas and electric heating systems designed for maximum reliability.",
    detailedDescription: "Stay warm all winter with our expert furnace services. We specialize in ultra-efficient gas and electric furnace installations, promising lower utility bills and reliable comfort throughout the freezing season.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/furnace.jfif",
    icon: "mode_fan"
  },
  {
    id: 'heat-pump',
    title: "Heat Pump",
    description: "Eco-friendly heating and cooling hybrids that leverage sustainable technology to reduce your carbon footprint.",
    detailedDescription: "Heat pumps offer an incredibly energy-efficient alternative to traditional HVAC systems. Running on electricity, they extract ambient heat to warm your home, and reverse the process to chill it during summer.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/heatpump.jpeg",
    icon: "thermostat"
  },
  {
    id: 'water-tank',
    title: "Water Tank",
    description: "Premium water storage tank systems engineered for thermal retention and long-term durability in any home.",
    detailedDescription: "Ensure your home never runs out of hot water with our premium storage tanks. We provide fast replacements and reliable maintenance to ensure optimal pressure, heating recovery time, and rust prevention.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/watertank.jfif",
    icon: "water_heater"
  },
  {
    id: 'boiler',
    title: "Boiler",
    description: "High-efficiency boiler systems for hydronic heating, providing consistent radiant warmth throughout your home.",
    detailedDescription: "Hydronic heating provides unparalleled comfort. Our boiler services cover everything from baseboard radiators to under-floor radiant heating, guaranteeing a draft-free, comfortable winter.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/boiler.jpeg",
    icon: "hvac"
  },
  {
    id: 'duct-work',
    title: "Duct Work",
    description: "Professional cleaning and airtight sealing services to ensure your air quality and system efficiency remain peaked.",
    detailedDescription: "Leaky or dirty ducts can reduce your HVAC efficiency by up to 30%. We design, install, repair, and clean custom ductwork to perfectly balance airflow throughout every room in your home.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/duckwork.jfif",
    icon: "air"
  },
  {
    id: 'repair',
    title: "Repair",
    description: "Expert repair services for all major brands, utilizing genuine parts and advanced diagnostic equipment.",
    detailedDescription: "HVAC emergencies don't wait for convenient times. Our rapid-response repair teams arrive with fully stocked trucks, ready to diagnose and restore your comfort systems 24/7.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/repair.jfif",
    icon: "build"
  },
  {
    id: 'accessories',
    title: "Accessories",
    description: "Essential accessories and components for HVAC and water systems.",
    detailedDescription: "Enhance your existing systems with our collection of high-quality accessories, from advanced filtration media to UV purifiers, ensuring maximum operational efficiency and air quality.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/accessories.jpeg",
    icon: "settings"
  },
  {
    id: 'smart-home',
    title: "Smart Home",
    description: "Smart home automation integration for intelligent temperature scheduling and remote climate control.",
    detailedDescription: "Take total control of your home's ecosystem. We install and configure top-tier smart thermostats that learn your routine, allowing remote control and maximizing energy efficiency.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/smarthome.jfif",
    icon: "smart_home"
  },
  {
    id: 'ductless',
    title: "Ductless Heat Pump",
    description: "Ductless mini-split systems for efficient heating and cooling without ductwork.",
    detailedDescription: "Perfect for additions, sunrooms, or older homes, our ductless mini-split systems provide hyper-efficient, whisper-quiet zoning without the need to tear open walls for ductwork.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/ducklessheatpump.jfif",
    icon: "heat_pump"
  },
  {
    id: 'air-quality',
    title: "Humidifier / Air Quality",
    description: "Whole-home humidifiers and air quality solutions for improved indoor comfort and health.",
    detailedDescription: "Indoor air can be 5x more polluted than outside air. We deploy whole-home humidifiers and HEPA filtration systems to eliminate dry winter air, allergens, and airborne pathogens.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/humidifier.jfif",
    icon: "air_purifier"
  },
  {
    id: 'tankless',
    title: "Tankless Water Heater",
    description: "Energy-efficient tankless water heaters providing endless hot water on demand with a compact footprint.",
    detailedDescription: "Reclaim your utility space and never run out of hot water again. Our tankless systems heat water strictly on-demand, lowering gas bills by up to 40% while lasting roughly twice as long as traditional tanks.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/tanklesswaterheater.jpeg",
    icon: "water_damage"
  }
];

export default function ServicesClient() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleCardClick = (service: any) => {
    if (window.innerWidth < 768) {
      setSelectedService(service);
      setIsDetailModalOpen(true);
    } else {
      setActiveCardId(prev => (prev === service.id ? null : service.id));
    }
  };

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <header className="relative w-full h-[60vh] min-h-[500px] md:h-[calc(100vh-156px)] md:min-h-[700px] flex items-center justify-center overflow-hidden mt-[104px] md:mt-[156px]">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/service-hero.png" 
            alt="HVAC Services Hero" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 text-left space-y-6 md:space-y-8 w-full"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-8xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl text-left drop-shadow-lg opacity-80"
          >
            Professional solutions for your home comfort needs, delivered with atmospheric precision and technical mastery.
          </motion.p>
          <div className="pt-4 md:pt-6">
            <Button size="xl" href="#services-grid">Explore Solutions ↓</Button>
          </div>
        </motion.div>
      </header>

      <Section background="surface" id="services-grid" containerClassName="py-12 md:py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {SERVICES_DATA.map((service) => (
             <ServiceCardWrapper key={service.id} service={service} activeCardId={activeCardId} handleCardClick={handleCardClick} handleBook={handleBook} />
          ))}
        </motion.div>

        <div className="md:hidden grid grid-cols-2 gap-4">
          {SERVICES_DATA.map((service) => (
            <ServiceCardWrapper 
              key={service.id} 
              service={service} 
              activeCardId={activeCardId} 
              handleCardClick={() => handleCardClick(service)} 
              handleBook={handleBook} 
            />
          ))}
        </div>
      </Section>

      <ContactCTA />

      <Footer />

      <ServiceDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        service={selectedService}
        onBook={() => {
          setIsDetailModalOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}

const ServiceCardWrapper = ({ service, activeCardId, handleCardClick, handleBook }: { service: any, activeCardId: string | null, handleCardClick: (id: any) => void, handleBook: (e: React.MouseEvent) => void }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 20 }
      }
    }}
  >
    <ServiceCard 
      {...service} 
      isFlipped={activeCardId === service.id}
      onClick={() => handleCardClick(service)}
      onBook={handleBook}
    />
  </motion.div>
);
