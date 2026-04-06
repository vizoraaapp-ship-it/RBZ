"use client";

import React, { useState } from 'react';

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
    <div className="max-w-4xl mx-auto space-y-4">
      {FAQS_DATA.map((faq, index) => (
        <div 
          key={index} 
          className={`bg-white rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_32px_rgba(0,17,168,0.03)] overflow-hidden transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-primary/10 shadow-[0_12px_48px_rgba(0,17,168,0.08)]' : 'hover:bg-surface-container-lowest'}`}
        >
          <button 
            className="w-full text-left p-8 md:p-10 flex justify-between items-center group outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={`font-headline text-xl md:text-2xl font-bold transition-all duration-300 ${activeIndex === index ? 'text-primary' : 'text-on-background group-hover:text-primary/70'}`}>
              {faq.question}
            </h3>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${activeIndex === index ? 'bg-primary text-white rotate-180' : 'bg-surface-container text-primary group-hover:bg-primary/5'}`}>
              <span className="material-symbols-outlined text-2xl font-bold">
                {activeIndex === index ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </button>
          
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="px-8 md:px-10 pb-10 pt-2 text-lg text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/5">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
