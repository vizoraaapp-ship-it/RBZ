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
    description: "Central AC installation and repair in Ontario — precision multi-stage cooling for optimal energy efficiency and humidity control across GTA homes.",
    detailedDescription: "Our comprehensive Air Conditioning services keep Ontario homes perfectly cool during the hottest months. From new central AC installations and ductless mini-split systems to routine maintenance and emergency AC repair in Toronto and across the GTA — we deliver end-to-end cooling solutions.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/airconditioner.jpeg",
    objectFit: "cover",
    icon: "ac_unit"
  },
  {
    id: 'furnace',
    title: "Furnace",
    description: "Gas furnace installation, repair, and maintenance across Ontario — high-efficiency heating systems built for Canadian winters.",
    detailedDescription: "Stay warm all winter with expert furnace services across Ontario and the GTA. We specialize in high-efficiency gas and electric furnace installations, emergency furnace repair, and annual furnace tune-ups to keep your home comfortable throughout Canada's freezing season.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/furnace.jfif",
    icon: "mode_fan"
  },
  {
    id: 'heat-pump',
    title: "Heat Pump",
    description: "Cold-climate heat pump installation in Ontario — eco-friendly, energy-efficient heating and cooling for Canadian homes.",
    detailedDescription: "Heat pumps offer an incredibly energy-efficient alternative to traditional HVAC systems for Ontario homes. Our cold-climate heat pumps operate efficiently even in extreme Canadian winters. We install ductless and central heat pump systems across Toronto, Scarborough, Mississauga, and all GTA regions — and help you maximize heat pump rebates in Ontario.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/heatpump.jpeg",
    icon: "thermostat"
  },
  {
    id: 'water-tank',
    title: "Water Tank",
    description: "Hot water tank installation and repair in Ontario — reliable storage systems engineered for long-term durability in any home.",
    detailedDescription: "Ensure your Ontario home never runs out of hot water with our premium storage tank services. We provide fast hot water tank replacements and reliable maintenance to ensure optimal pressure, heating recovery time, and rust prevention — serving all GTA communities.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/watertank.jfif",
    icon: "water_heater"
  },
  {
    id: 'boiler',
    title: "Boiler",
    description: "High-efficiency boiler installation and repair in Ontario — consistent radiant heating solutions for GTA homes and businesses.",
    detailedDescription: "Hydronic boiler heating provides unparalleled comfort for Ontario homes. Our boiler services cover everything from baseboard radiators to under-floor radiant heating systems — guaranteeing a draft-free, comfortable Canadian winter for residential and commercial properties across the GTA.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/boiler.jpeg",
    icon: "hvac"
  },
  {
    id: 'duct-work',
    title: "Duct Work",
    description: "Professional air duct cleaning and custom ductwork installation in Ontario — improve HVAC efficiency and indoor air quality across GTA homes.",
    detailedDescription: "Leaky or dirty ducts can reduce your HVAC efficiency by up to 30%. We design, install, repair, and clean custom ductwork to perfectly balance airflow throughout every room in your Ontario home — serving Toronto, Scarborough, Mississauga, and the entire GTA.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/duckwork.jfif",
    objectFit: "cover",
    icon: "air"
  },
  {
    id: 'repair',
    title: "Repair",
    description: "24/7 emergency HVAC repair in Ontario — expert diagnostics and same-day service across Toronto and GTA.",
    detailedDescription: "HVAC emergencies don't wait for convenient times. Our rapid-response emergency repair teams serve Toronto, Scarborough, Mississauga, Brampton, Vaughan, and all of the GTA — arriving with fully stocked trucks ready to diagnose and restore your heating and cooling systems 24/7.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/repair.jfif",
    objectFit: "cover",
    icon: "build"
  },
  {
    id: 'accessories',
    title: "Accessories",
    description: "HVAC accessories, filters, and air quality components for Ontario homes — maximize your system performance.",
    detailedDescription: "Enhance your existing HVAC systems with high-quality accessories — from advanced filtration media and UV air purifiers to smart thermostats and humidifiers. We supply and install premium HVAC accessories across Ontario and the GTA to improve indoor air quality and system efficiency.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/accessories.jpeg",
    icon: "settings"
  },
  {
    id: 'smart-home',
    title: "Smart Home",
    description: "Smart thermostat and home automation HVAC integration in Ontario — intelligent climate control for GTA homes.",
    detailedDescription: "Take total control of your Ontario home's climate. We install and configure WiFi-connected smart thermostats and HVAC home automation systems that learn your routine, allow remote control from anywhere, and maximize energy efficiency — serving Toronto, Scarborough, and all GTA communities.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/smarthome.jfif",
    objectFit: "cover",
    icon: "smart_home"
  },
  {
    id: 'ductless',
    title: "Ductless Heat Pump",
    description: "Ductless mini-split heat pump installation in Ontario — efficient zoned heating and cooling for GTA homes without ductwork.",
    detailedDescription: "Perfect for additions, sunrooms, or older Ontario homes without ductwork, our ductless mini-split heat pump systems provide hyper-efficient, whisper-quiet zoned heating and cooling. We install leading brands across Toronto, Scarborough, Mississauga, and the entire GTA.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/ducklessheatpump.jfif",
    icon: "heat_pump"
  },
  {
    id: 'air-quality',
    title: "Humidifier / Air Quality",
    description: "Whole-home humidifier and indoor air quality solutions in Ontario — breathe cleaner, healthier air in your GTA home.",
    detailedDescription: "Indoor air in Ontario can be 5x more polluted than outdoor air. We deploy whole-home humidifiers, HEPA air filtration systems, and UV air purifiers to eliminate dry winter air, allergens, and airborne pathogens — serving all GTA communities for healthier indoor environments.",
    features: ["Install", "Repair", "Maintenance"],
    image: "/service/humidifier.jfif",
    icon: "air_purifier"
  },
  {
    id: 'tankless',
    title: "Tankless Water Heater",
    description: "Tankless water heater installation in Ontario — on-demand hot water, energy savings, and a compact footprint for GTA homes.",
    detailedDescription: "Reclaim your utility space and never run out of hot water again. Our tankless water heater installations across Ontario heat water strictly on-demand, lowering gas bills by up to 40% while lasting roughly twice as long as traditional hot water tanks — serving all GTA communities.",
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
            alt="Professional HVAC services in Ontario — furnace repair, AC installation, heat pump services, and duct cleaning across Toronto, Scarborough, and GTA by RBZ Climate Solutions" 
            fill 
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-6 md:px-8 text-left space-y-6 md:space-y-8 w-full"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-8xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            HVAC Services Ontario
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl text-left drop-shadow-lg opacity-80"
          >
            Licensed HVAC contractors serving Toronto, Scarborough, Mississauga, Brampton, Vaughan, Markham, and all of Ontario. Expert heating and cooling services delivered with precision.
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
