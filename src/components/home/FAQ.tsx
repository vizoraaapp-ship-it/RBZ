'use client';

import React from 'react';
import Section from '../ui/Section';
import FAQAccordion from './FAQAccordion';
import { motion } from 'framer-motion';

const FAQ = () => {
  return (
    <Section background="high" id="faq">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 space-y-4"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-black text-xs tracking-[0.2em] uppercase shadow-sm"
        >
          Expert Answers
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-black text-on-background mb-6 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed font-bold opacity-80">
          Clear and efficient answers to your climate control and HVAC equipment queries, delivered with precision.
        </p>
      </motion.div>

      <FAQAccordion />
    </Section>
  );
};

export default FAQ;
