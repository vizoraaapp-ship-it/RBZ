"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS_DATA = [
  {
    question: "How often should I service my furnace in Ontario?",
    answer: "We recommend servicing your furnace at least once a year in Ontario — ideally before the winter season hits. Annual furnace maintenance ensures safe and efficient operation, helps you avoid emergency furnace breakdowns during the coldest months, and can significantly lower your heating bills. Our licensed HVAC technicians serve all GTA communities including Toronto, Scarborough, Mississauga, and Markham."
  },
  {
    question: "What is the best heat pump for Canadian winters?",
    answer: "Cold-climate heat pumps from brands like Mitsubishi, Fujitsu, and Daikin are engineered for Canadian winters and operate efficiently down to -30°C. These hyper-heat systems are perfect for Ontario homeowners who want energy-efficient year-round comfort. As a licensed heat pump installer in Ontario, RBZ Climate Solutions can help you choose the right system and maximize available government rebates."
  },
  {
    question: "How much does AC installation cost in Toronto?",
    answer: "Central air conditioning installation in Toronto typically ranges from $3,000 to $7,000, depending on your home size, the SEER efficiency rating, and any required ductwork modifications. Ductless mini-split AC systems typically cost $1,500–$4,000 per zone. Contact us for a free, no-obligation AC installation quote in Toronto or anywhere in the GTA."
  },
  {
    question: "Are there government rebates for heat pump installation in Ontario?",
    answer: "Yes! Ontario homeowners can access rebates through programs like the Canada Greener Homes Grant and Ontario Energy Board initiatives. Heat pump rebates in Canada can range from $1,000 to $7,000 or more. RBZ Climate Solutions stays up-to-date on all available heat pump rebates and can guide you through the process to ensure your installation qualifies."
  },
  {
    question: "What are the signs that my AC needs repair in Ontario?",
    answer: "Common signs your air conditioner needs professional repair include: weak or warm airflow, unusual noises (rattling, banging, or hissing), ice forming on the unit, higher than normal energy bills, and the system not cooling your home properly. If you notice any of these issues, contact RBZ Climate Solutions for prompt AC repair in Toronto and across the GTA."
  },
  {
    question: "Do you offer 24/7 emergency HVAC services in the GTA?",
    answer: "Yes, RBZ Climate Solutions provides emergency HVAC repair services across the Greater Toronto Area including Toronto, Scarborough, Mississauga, Brampton, Vaughan, and Markham. Whether it's an emergency furnace failure in winter or an AC breakdown in summer, our HVAC technicians respond quickly to restore your home comfort."
  },
  {
    question: "What is the benefit of a tankless water heater for Canadian homes?",
    answer: "Tankless water heaters provide on-demand hot water, eliminating the wait and the standby heat loss of traditional storage tanks. They are 20–40% more energy-efficient, take up far less space, and last 20+ years — ideal for Ontario homes. RBZ Climate Solutions provides expert tankless water heater installation across Ontario and GTA regions."
  },
  {
    question: "How much does duct cleaning cost in Ontario?",
    answer: "Professional air duct cleaning in Ontario typically costs between $300 and $600 for a residential home, depending on the size of the ductwork system and the level of contamination. Regular duct cleaning every 3–5 years improves indoor air quality, reduces allergens, and keeps your HVAC system running efficiently. RBZ Climate Solutions offers comprehensive duct cleaning services across Toronto and GTA."
  },
  {
    question: "How long does a furnace last in Ontario?",
    answer: "A well-maintained gas furnace in Ontario typically lasts 15–20 years. If your furnace is over 15 years old, frequently breaking down, or causing unusually high heating bills, it may be time to consider furnace replacement. RBZ Climate Solutions offers expert furnace replacement and new high-efficiency furnace installation across Ontario and the Greater Toronto Area."
  },
  {
    question: "Do you provide commercial HVAC services in Ontario?",
    answer: "Absolutely. RBZ Climate Solutions provides a full range of commercial HVAC services in Ontario, including commercial furnace installation and repair, commercial air conditioning services, commercial boiler systems, and specialized HVAC for small commercial kitchens. We serve businesses across Toronto, Scarborough, Mississauga, and all of the GTA."
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
          className={`bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-[0_8px_32_rgba(0,17,168,0.03)] overflow-hidden transition-all duration-500 ${activeIndex === index ? 'ring-4 ring-secondary/5 shadow-[0_20px_60px_rgba(0,17,168,0.12)] border-secondary/20' : 'hover:bg-secondary/5'}`}
        >
          <button 
            className={`w-full text-left px-6 md:px-8 pt-4 md:pt-6 flex justify-between items-center group outline-none transition-all duration-300 ${activeIndex === index ? 'pb-2 md:pb-2' : 'pb-4 md:pb-6'}`}
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={`font-headline text-2xl md:text-3xl font-black transition-all duration-300 pr-8 ${activeIndex === index ? 'text-primary' : 'text-on-background group-hover:text-secondary'}`}>
              {faq.question}
            </h3>
            <motion.div 
              animate={{ 
                rotate: activeIndex === index ? 180 : 0,
                backgroundColor: activeIndex === index ? "#FF6B00" : "#E0F2FE"
              }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-shadow shadow-sm shrink-0 ${activeIndex === index ? 'text-white' : 'text-secondary group-hover:bg-secondary/10'}`}
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
                <div className="px-6 md:px-8 pb-4 md:pb-6 pt-0 text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/5">
                  <motion.div 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="opacity-90"
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
