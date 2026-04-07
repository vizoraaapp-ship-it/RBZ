'use client';

import React from 'react';
import Section from '../ui/Section';
import AutoSlider from '../ui/AutoSlider';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'David Thompson',
    location: 'Scarborough, ON',
    text: "RBZ Climate Solutions fixed our AC during the hottest week of the year. Their technician was professional, masked, and very knowledgeable.",
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    location: 'Markham, ON',
    text: "The best HVAC service in the GTA. They installed our new heat pump system efficiently and helped us navigate the government rebates.",
    rating: 5,
    featured: true,
  },
  {
    name: 'Michael O Reilly',
    location: 'Barrie, ON',
    text: "Fair pricing and honest advice. They didn't try to upsell me on a new furnace when a simple repair was all I needed.",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 }
  }
};

const Testimonials = () => {
  return (
    <Section background="surface">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4"
      >
        <h2 className="text-3xl md:text-5xl font-black text-on-background mb-4 tracking-tight">What Our Customers Say</h2>
        <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto font-medium opacity-80">Exceptional service is the core of our business.</p>
      </motion.div>

      {/* Desktop Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="hidden md:grid grid-cols-3 gap-8 items-stretch"
      >
        {TESTIMONIALS.map((t, index) => (
          <TestimonialCard key={index} t={t} variants={cardVariants} />
        ))}
      </motion.div>

      {/* Mobile Testimonials Slideable Row */}
      <div className="md:hidden relative -mx-4 px-4 mt-8">
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[85vw] snap-center">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const TestimonialCard = ({ t, variants }: { t: any, variants?: any }) => (
  <motion.div 
    variants={variants}
    whileHover={{ 
      y: -10, 
      scale: t.featured ? 1.08 : 1.03,
      boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.15)"
    }}
    className={`p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative transition-all duration-500 overflow-hidden h-full flex flex-col ${t.featured ? 'bg-white z-10 ring-4 ring-primary/5' : 'bg-white/80 backdrop-blur-sm shadow-inner'}`}
  >
    {/* Background design element */}
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
    
    <div className="flex text-primary mb-6">
      {[...Array(t.rating)].map((_, i) => (
        <span 
          key={i} 
          className="material-symbols-outlined fill-1" 
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
    
    <p className="italic text-on-surface-variant mb-10 leading-relaxed text-lg font-medium opacity-90 flex-grow">
      "{t.text}"
    </p>
    
    <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/10">
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl shadow-inner">
        {t.name.charAt(0)}
      </div>
      <div>
        <div className="font-black text-on-surface text-lg leading-tight">{t.name}</div>
        <div className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-black opacity-60 mt-1">{t.location}</div>
      </div>
    </div>
  </motion.div>
);

export default Testimonials;
