'use client';

import React from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import AutoSlider from '../ui/AutoSlider';
import { motion } from 'framer-motion';

const FINANCING_FEATURES = [
  {
    title: "0% Interest Plans",
    description: "Qualified buyers can enjoy no-interest financing for up to 18 months on approved credit.",
    icon: "percent"
  },
  {
    title: "Low Monthly Payments",
    description: "Flexible payment options to fit your budget with terms up to 120 months.",
    icon: "payments"
  },
  {
    title: "Instant Approval",
    description: "Quick and easy application process with decisions often available in minutes.",
    icon: "speed"
  }
];

const Financing = () => {
  return (
    <Section background="high" id="financing" className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-20 space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-[0.3em] uppercase"
          >
            Financing Available
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-on-background tracking-tight leading-tight">
            Flexible Financing Options
          </h2>
          <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
            Don't postpone your comfort. Our financing solutions make it easy to get the HVAC or water treatment system you need with payments that fit your budget.
          </p>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16 lg:mb-24">
          {FINANCING_FEATURES.map((feature, index) => (
            <FinancingCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Mobile Slider Layout */}
        <div className="md:hidden w-full mb-12 -mx-4">
          <AutoSlider interval={5000}>
            {FINANCING_FEATURES.map((feature, index) => (
              <FinancingCard key={`mobile-${index}`} feature={feature} index={index} isMobile />
            ))}
          </AutoSlider>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-primary p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dim opacity-50" />
          <div className="relative z-10 space-y-4 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">Pre-qualify in Minutes</h3>
            <p className="text-white/80 font-bold max-w-xl text-sm md:text-lg">
              Complete our simple financing application to see your available options without affecting your credit score.
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
             <Button variant="surface" size="xl" className="shadow-2xl w-full md:w-auto">
                Explore Financing Options
             </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const FinancingCard = ({ feature, index, isMobile = false }: { feature: any, index: number, isMobile?: boolean }) => (
  <motion.div
    initial={isMobile ? {} : { opacity: 0, y: 20 }}
    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={isMobile ? {} : { y: -10, backgroundColor: "rgba(255, 255, 255, 1)" }}
    className={`bg-white p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all duration-300 group h-full flex flex-col ${isMobile ? 'mx-2' : 'bg-white/60 backdrop-blur-sm'}`}
  >
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shrink-0">
      <span className="material-symbols-outlined text-3xl font-black">{feature.icon}</span>
    </div>
    <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
      {feature.title}
    </h3>
    <p className="text-on-surface-variant font-bold opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed flex-grow">
      {feature.description}
    </p>
  </motion.div>
);

export default Financing;

