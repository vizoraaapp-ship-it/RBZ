'use client';

import React from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import AutoSlider from '../ui/AutoSlider';

const SERVICES = [
  { name: 'Air Conditioner', icon: 'ac_unit', desc: 'Precision cooling for the hottest Ontario summers.', color: 'bg-blue-50' },
  { name: 'Heat Pump', icon: 'heat_pump', desc: 'Efficient dual-purpose heating and cooling.', color: 'bg-blue-100/50' },
  { name: 'Furnace', icon: 'mode_fan', desc: 'Reliable gas and electric heating solutions.', color: 'bg-blue-50' },
  { name: 'Duct Work', icon: 'air', desc: 'Customized airflow for optimal efficiency.', color: 'bg-blue-100/50' },
  { name: 'Water Tank', icon: 'water_heater', desc: 'Hot water on demand, anytime you need it.', color: 'bg-blue-100/50' },
  { name: 'Boiler', icon: 'hvac', desc: 'Radiant heating expertise for ultimate comfort.', color: 'bg-blue-50' },
  { name: 'Repair', icon: 'build', desc: 'Fast diagnostic and repair services 24/7.', color: 'bg-blue-100/50' },
  { name: 'Accessories', icon: 'settings', desc: 'Filters, parts, and specialized add-ons.', color: 'bg-blue-50' },
  { name: 'Commercial', icon: 'kitchen', desc: 'Specialized HVAC for small commercial kitchens.', color: 'bg-blue-100/50' },
  { name: 'Gas Lines', icon: 'outdoor_grill', desc: 'Professional installation for BBQ and appliances.', color: 'bg-blue-50' },
  { name: 'Pool Heaters', icon: 'pool', desc: 'Efficient solutions for year-round swimming comfort.', color: 'bg-blue-100/50' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const ServicesBento = () => {
  // Update rows to include new services
  const row1 = [...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5)];
  const row2 = [...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11)];

  return (
    <Section id="services" background="surface">
      <motion.div 
        className="text-center mb-10 lg:mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-5xl font-black text-on-background mb-4">Our Services</h2>
        <p className="text-base lg:text-xl text-on-surface-variant max-w-2xl mx-auto opacity-80">Providing master-level environmental control for every corner of your living space.</p>
      </motion.div>
      
      {/* Services Infinite Marquee */}
      <div className="mt-12 space-y-6 md:space-y-10 py-4 relative overflow-hidden">
        {/* Row 1: Left to Right */}
        <div className="relative">
          <motion.div 
            className="flex gap-4 md:gap-6 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {row1.map((service, index) => (
              <div key={`r1-${index}`} className="flex-shrink-0 w-[60vw] md:w-[35vw] lg:w-[25vw]">
                <BentoServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative">
          <motion.div 
            className="flex gap-4 md:gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {row2.map((service, index) => (
              <div key={`r2-${index}`} className="flex-shrink-0 w-[60vw] md:w-[35vw] lg:w-[25vw]">
                <BentoServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

const BentoServiceCard = ({ service, variants }: { service: any, variants?: any }) => (
  <motion.div 
    variants={variants}
    whileHover={{ 
      y: -8, 
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      borderColor: "rgba(var(--primary), 0.2)"
    }}
    className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] transition-all group border border-outline-variant/10 shadow-sm relative overflow-hidden h-full flex flex-col p-6 md:p-10"
  >
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors pointer-events-none" />
    
    <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary transition-transform relative z-10">
      <span className="material-symbols-outlined text-2xl md:text-3xl font-black">{service.icon}</span>
    </div>
    
    <div className="relative z-10 flex-grow">
      <h3 className="font-black text-lg md:text-2xl mb-1 md:mb-3 text-on-surface group-hover:text-primary transition-colors tracking-tight">{service.name}</h3>
      <p className="text-xs md:text-base leading-snug md:leading-relaxed text-on-surface-variant opacity-70 group-hover:opacity-100 transition-opacity font-bold">
        {service.desc}
      </p>
    </div>
  </motion.div>
);

export default ServicesBento;
