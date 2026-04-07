'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const BRANDS = [
  { name: 'LG', logo: '/lg.png' },
  { name: 'Mitsubishi', logo: '/mistsubishi.png' },
  { name: 'Daikin', logo: '/daikin.png' },
  { name: 'Fujitsu', logo: '/fujitsu.png' }
];

const Brands = () => {
  // Triple the brands for a truly seamless infinite loop
  const brandsLoop = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <Section background="surface" className="py-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-on-background tracking-tight">Brands We Carry</h2>
        <div className="w-20 h-1.5 bg-primary/20 mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Desktop Layout: Static Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-12 max-w-6xl mx-auto items-center">
        {BRANDS.map((brand) => (
          <motion.div 
            key={brand.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer p-6 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/5 shadow-sm hover:shadow-xl hover:border-primary/10"
          >
            <div className="relative w-full h-32 md:h-40">
              <Image 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                fill 
                className="object-contain p-2"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet Layout: Infinite Carousel */}
      <div className="lg:hidden relative -mx-4 px-4">
        <motion.div 
          className="flex gap-4 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
          style={{ width: "fit-content" }}
          initial={{ x: 0 }}
          animate={{ x: [0, -400] }} // Slow continuous movement
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {brandsLoop.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 w-[50vw] aspect-[3/2] bg-white rounded-3xl border border-outline-variant/10 shadow-sm flex items-center justify-center p-6 snap-center"
            >
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default Brands;
