'use client';

import React from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import AutoSlider from '../ui/AutoSlider';

const VALUES = [
  {
    title: "Genuine Second Opinion",
    description: "Honest, unbiased advice to help you make the right HVAC decisions. We prioritize your needs over sales targets.",
    icon: "verified_user",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "No Gender Discrimination Policy",
    description: "Equal respect and opportunities for everyone, without bias. We foster an inclusive environment for our team and clients.",
    icon: "diversity_3",
    color: "bg-purple-50 text-purple-600"
  }
];

const OurValues = () => {
  return (
    <Section background="surface">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-3xl md:text-5xl font-black text-on-surface mb-4 tracking-tight">Our Core Values</h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            More than just a service provider, we are committed to integrity, equality, and professional honesty in everything we do.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {VALUES.map((val, index) => (
            <ValueCard key={index} val={val} index={index} />
          ))}
        </div>

        {/* Mobile Slideable Row */}
        <div className="md:hidden relative -mx-4 px-4 mt-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
            {VALUES.map((val, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] snap-center">
                <ValueCard val={val} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const ValueCard = ({ val, index = 0 }: { val: any, index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ 
      duration: 0.8, 
      delay: index * 0.15,
      ease: [0.16, 1, 0.3, 1] 
    }}
    whileHover={{ 
      y: -10, 
      transition: { type: "spring", stiffness: 300, damping: 15 } 
    }}
    className="group p-8 md:p-12 bg-white rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_rgba(43,91,181,0.08)] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 h-full flex flex-col"
  >
    <div className={`w-16 h-16 ${val.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm flex-shrink-0`}>
      <span className="material-symbols-outlined text-3xl font-black">{val.icon}</span>
    </div>
    
    <h3 className="font-headline text-2xl md:text-3xl font-black text-on-surface mb-6 group-hover:text-primary transition-colors tracking-tight leading-tight">
      {val.title}
    </h3>
    
    <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
      {val.description}
    </p>
  </motion.div>
);

export default OurValues;
