"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS_DATA = [
  {
    question: "How often should I service my furnace?",
    answer: "It is recommended to service your furnace at least once a year, ideally before the winter season, to ensure safe and efficient operation."
  },
  {
    question: "What are the signs that my AC needs repair?",
    answer: "Common signs include weak airflow, unusual noises, bad odors, higher energy bills, or the unit not cooling properly."
  },
  {
    question: "Are there any government rebates for heat pumps?",
    answer: "Yes, in many regions there are government incentives or rebates available for installing energy-efficient heat pumps. Check with local authorities or energy providers for current programs."
  },
  {
    question: "What is the benefit of a tankless water heater?",
    answer: "Tankless water heaters provide on-demand hot water, are more energy-efficient, take up less space, and have a longer lifespan compared to traditional systems."
  }
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {FAQS_DATA.map((faq, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-[0_8px_32px_rgba(0,17,168,0.03)] overflow-hidden transition-all duration-500 ${activeIndex === index ? 'ring-4 ring-primary/5 shadow-[0_20px_60px_rgba(0,17,168,0.12)] border-primary/20' : 'hover:bg-surface-container-lowest'}`}
        >
          <button 
            className="w-full text-left p-6 md:p-8 flex justify-between items-center group outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={`font-headline text-2xl md:text-3xl font-black transition-all duration-300 pr-8 ${activeIndex === index ? 'text-primary' : 'text-on-background group-hover:text-primary/70'}`}>
              {faq.question}
            </h3>
            <motion.div 
              animate={{ 
                rotate: activeIndex === index ? 180 : 0,
                backgroundColor: activeIndex === index ? "#2B5BB5" : "#EDECFF"
              }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-shadow shadow-sm shrink-0 ${activeIndex === index ? 'text-white' : 'text-primary group-hover:bg-primary/10'}`}
            >
              <span className="material-symbols-outlined text-2xl font-black leading-none">
                expand_more
              </span>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-6 md:px-8 pb-8 pt-0 text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/5">
                  <motion.div 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="opacity-90 pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;
