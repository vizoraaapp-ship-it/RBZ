'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const BRANDS = [
  { name: 'Goodman', logo: '/brandlogo/image.png' },
  { name: 'LG', logo: '/lg.png' },
  { name: 'Amana', logo: '/brandlogo/image2.png' },
  { name: 'Lennox', logo: '/brandlogo/image3.png' },
  { name: 'Honeywell', logo: '/brandlogo/image4.png' },
  { name: 'Bryant', logo: '/brandlogo/image5.png' },
  { name: 'Rheem', logo: '/brandlogo/image6.png' },
  { name: 'Ruud', logo: '/brandlogo/image7.png' },
  { name: 'American Standard', logo: '/brandlogo/image8.png' },
  { name: 'Payne', logo: '/brandlogo/image9.png' },
  { name: 'Armstrong Air', logo: '/brandlogo/image10.png' },
  { name: 'Toshiba', logo: '/brandlogo/image11.png' },
  { name: 'Frigidaire', logo: '/brandlogo/image12.png' },
  { name: 'Weil-McLain', logo: '/brandlogo/image13.png' },
  { name: 'WeatherKing', logo: '/brandlogo/image14.png' },
  { name: 'Luxaire', logo: '/brandlogo/image15.png' },
  { name: 'Fujitsu', logo: '/fujitsu.png' },
  { name: 'Viessmann', logo: '/brandlogo/image17.png' },
  { name: 'A.O. Smith', logo: '/brandlogo/image18.png' },
  { name: 'Gree', logo: '/brandlogo/image19.png' },
];

const Brands = () => {
  // Triple the brands for a truly seamless infinite loop
  const brandsLoop = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <Section background="surface" className="overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 lg:mb-14 space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-black text-on-background tracking-tight">Brands We Carry</h2>
        <div className="w-20 h-1.5 bg-secondary/20 mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Desktop Layout: Static Grid */}
      <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto items-center">
        {BRANDS.map((brand) => (
          <motion.div 
            key={brand.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center transition-all duration-500 cursor-pointer p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-lg hover:border-secondary/10"
          >
            <div className="relative w-full h-24 md:h-32">
              <Image 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                fill 
                className="object-contain p-2 mix-blend-multiply"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet Layout: Infinite Carousel */}
      <div className="lg:hidden relative">
        <div className="flex overflow-hidden group">
          <motion.div 
            className="flex gap-4 py-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {brandsLoop.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-2xl border border-outline-variant/10 shadow-sm flex items-center justify-center p-4"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    fill 
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Brands;
