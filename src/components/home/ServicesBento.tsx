'use client';

import React from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import AutoSlider from '../ui/AutoSlider';

const SERVICES = [
  { name: 'Air Conditioner', icon: 'ac_unit', desc: 'Precision cooling for the hottest GTA summers.', color: 'bg-blue-50' },
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
  const [isPausedRow1, setIsPausedRow1] = React.useState(false);
  const [isPausedRow2, setIsPausedRow2] = React.useState(false);
  // Update rows to include new services
  const row1 = [...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5), ...SERVICES.slice(0, 5)];
  const row2 = [...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11), ...SERVICES.slice(5, 11)];

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
        <div 
          className="relative"
          onMouseEnter={() => setIsPausedRow1(true)}
          onMouseLeave={() => setIsPausedRow1(false)}
          onTouchStart={() => setIsPausedRow1(true)}
          onTouchEnd={() => setIsPausedRow1(false)}
        >
          <div className={`flex gap-4 md:gap-6 w-max animate-marquee-left ${isPausedRow1 ? 'pause-animation' : ''}`}>
            {row1.map((service, index) => (
              <div 
                key={`r1-${index}`} 
                className="flex-shrink-0 w-[280px] md:w-[350px]"
                onClick={() => setIsPausedRow1(true)}
              >
                <BentoServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPausedRow2(true)}
          onMouseLeave={() => setIsPausedRow2(false)}
          onTouchStart={() => setIsPausedRow2(true)}
          onTouchEnd={() => setIsPausedRow2(false)}
        >
          <div className={`flex gap-4 md:gap-6 w-max animate-marquee-right ${isPausedRow2 ? 'pause-animation' : ''}`}>
            {row2.map((service, index) => (
              <div 
                key={`r2-${index}`} 
                className="flex-shrink-0 w-[280px] md:w-[350px]"
                onClick={() => setIsPausedRow2(true)}
              >
                <BentoServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const BentoServiceCard = ({ service, variants }: { service: any, variants?: any }) => (
  <motion.div 
    variants={variants}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.1)",
      borderColor: "rgba(var(--primary), 0.15)"
    }}
    className="bg-white rounded-2xl md:rounded-3xl transition-all group border border-outline-variant/10 shadow-sm relative overflow-hidden flex items-center gap-4 p-4 md:p-6 h-[100px] md:h-[120px]"
  >
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.01] transition-colors pointer-events-none" />
    
    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 transition-transform relative z-10 shrink-0">
      <span className="material-symbols-outlined text-2xl md:text-3xl font-black">{service.icon}</span>
    </div>
    
    <div className="relative z-10 overflow-hidden">
      <h3 className="font-black text-sm md:text-lg text-primary tracking-tight truncate">{service.name}</h3>
      <p className="text-[10px] md:text-xs leading-tight text-on-surface-variant opacity-70 group-hover:opacity-100 transition-opacity font-bold line-clamp-2 mt-1">
        {service.desc}
      </p>
    </div>
  </motion.div>
);

export default ServicesBento;
