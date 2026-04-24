'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: 'white' | 'surface' | 'high' | 'highest' | 'primary' | 'primary-dim' | 'secondary' | 'none';
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  id,
  background = 'none',
  fullWidth = false,
}) => {
  const backgrounds = {
    white: 'bg-white',
    surface: 'bg-surface',
    high: 'bg-surface-container-high',
    highest: 'bg-surface-container-highest',
    primary: 'bg-primary text-white',
    'primary-dim': 'bg-primary-dim text-white',
    secondary: 'bg-secondary text-white',
    none: '',
  };

  return (
    <section 
      id={id}
      className={`py-12 md:py-20 overflow-hidden ${backgrounds[background]} ${className}`}
    >
      <motion.div 
        className={`${fullWidth ? 'w-full' : 'max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-4 md:px-8'} ${containerClassName}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Animated in when 10% visible
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Soft premium slide-up
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
