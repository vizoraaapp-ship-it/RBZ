'use client';

import React from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import AutoSlider from '../ui/AutoSlider';

const VALUES = [
  {
    title: "Leading Manufacturers",
    description: "Quality work from leading manufacturers.",
    icon: "precision_manufacturing",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Best Solutions",
    description: "Expert advice and best suited solutions.",
    icon: "home_repair_service",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "No Surprises",
    description: "The price we quote is the price you pay.",
    icon: "verified",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Budget Friendly",
    description: "Payment, rental or financing options.",
    icon: "payments",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Proudly Canadian",
    description: "Experts for over 10 years.",
    icon: "maple_leaf",
    color: "bg-red-50 text-red-600"
  }
];

const OurValues = () => {
  return (
    <Section background="surface">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-on-background mb-4 tracking-tight">Experience Global Standards <br className="hidden md:block" /> <span className="text-primary">with Local Care</span></h2>
          <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto font-medium opacity-80">
            RBZ Climate Solutions is built on trust, precision, and a commitment to your comfort.
          </p>
        </motion.div>

        {/* Desktop Grid: 5 Square Boxes */}
        <div className="hidden md:grid grid-cols-5 gap-4 lg:gap-8">
          {VALUES.map((val, index) => (
            <ValueCard key={index} val={val} index={index} />
          ))}
        </div>

        {/* Mobile Grid: 2 columns for space efficiency */}
        <div className="md:hidden grid grid-cols-2 gap-4 pb-8">
          {VALUES.map((val, i) => (
            <ValueCard key={i} val={val} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const ValueCard = ({ val, index = 0 }: { val: any, index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white aspect-square rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/5 p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group hover:shadow-[0_20px_50px_rgba(0,17,168,0.08)] hover:border-primary/10"
  >
    <div className={`w-14 h-14 md:w-20 md:h-20 ${val.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-105`}>
      {val.icon === 'maple_leaf' ? (
        <span className="text-4xl md:text-6xl select-none">🍁</span>
      ) : (
        <span className="material-symbols-outlined text-3xl md:text-5xl font-black">{val.icon}</span>
      )}
    </div>
    
    <h3 className="font-headline text-lg md:text-2xl font-black text-[#0011A8] mb-3 tracking-tight leading-tight group-hover:text-primary transition-colors">
      {val.title}
    </h3>
    
    <p className="font-body text-xs md:text-base text-[#2B5BB5] leading-relaxed font-bold opacity-70 group-hover:opacity-100 italic">
      {val.description}
    </p>
  </motion.div>
);

export default OurValues;
