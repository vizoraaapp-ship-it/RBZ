import React from 'react';
import Section from '../ui/Section';
import FAQAccordion from './FAQAccordion';

const FAQ = () => {
  return (
    <Section background="high" id="faq">
      <div className="text-center mb-20 space-y-4 animate-in fade-in slide-in-from-top duration-1000">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs tracking-widest uppercase">Expert Answers</span>
        <h2 className="text-4xl md:text-6xl font-black text-on-background mb-6">Frequently Asked Questions</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Clear and efficient answers to your climate control and HVAC equipment queries, delivered with precision.
        </p>
      </div>

      <FAQAccordion />
    </Section>
  );
};

export default FAQ;
