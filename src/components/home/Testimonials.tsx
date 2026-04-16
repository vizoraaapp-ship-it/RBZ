'use client';

import React from 'react';
import Section from '../ui/Section';
import AutoSlider from '../ui/AutoSlider';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    location: 'Markham, ON',
    text: "The best HVAC service in the GTA. They installed our new heat pump system efficiently and helped us navigate the government rebates.",
    rating: 5,
  },
  {
    name: 'David Thompson',
    location: 'Scarborough, ON',
    text: "RBZ Climate Solutions fixed our AC during the hottest week of the year. Their technician was professional, masked, and very knowledgeable.",
    rating: 5,
  },
  {
    name: 'Michael O Reilly',
    location: 'Barrie, ON',
    text: "Fair pricing and honest advice. They didn't try to upsell me on a new furnace when a simple repair was all I needed.",
    rating: 5,
  },
  {
    name: 'Linda Rossi',
    location: 'Hamilton, ON',
    text: "Professional and punctual. They explain everything clearly and don't push for unnecessary replacements. Highly recommended for any HVAC needs.",
    rating: 5,
  },
  {
    name: 'Kevin Zhang',
    location: 'Richmond Hill, ON',
    text: "Great experience with their team. Very patient with my questions about ductwork. The installation was clean and efficient.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [isPaused, setIsPaused] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const nextSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    if (!isPaused) {
      const timer = setInterval(prevSlide, 2000);
      return () => {
        clearInterval(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [isPaused, prevSlide]);

  return (
    <Section background="surface" className="overflow-hidden py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 lg:mb-24 space-y-4"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-black text-xs tracking-[0.2em] uppercase shadow-sm"
        >Client Experiences</motion.span>
        <h2 className="text-3xl md:text-6xl font-black text-on-background mb-4 tracking-tighter">What Our Customers Say</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
      </motion.div>

      {/* 3D Pyramid Slider Container */}
      <div 
        className="relative h-[650px] md:h-[750px] flex flex-col items-center justify-start overflow-visible pt-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-full max-w-7xl relative h-full">
          {TESTIMONIALS.map((t, index) => {
            // Calculate relative position to active index
            let position = index - activeIndex;
            
            // Handle wrapping for circular feel
            if (position < -2) position += TESTIMONIALS.length;
            if (position > 2) position -= TESTIMONIALS.length;

            const MathAbsPosition = Math.abs(position);
            const isActive = position === 0;
            const isVisible = MathAbsPosition <= 2;

            if (!isVisible) return null;

            // Define responsive offsets
            const xOffset = windowWidth < 768 ? 160 : 400;
            const yOffset = windowWidth < 768 ? 80 : 150;

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  // Center-Top alignment for active, below/side for others
                  x: position * xOffset,
                  y: MathAbsPosition * yOffset,
                  scale: 1 - MathAbsPosition * 0.15,
                  opacity: 1 - MathAbsPosition * 0.4,
                  zIndex: 10 - MathAbsPosition,
                  rotateY: position * -10,
                  rotateX: MathAbsPosition * 10,
                  filter: `blur(${MathAbsPosition * 4}px)`,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 150, 
                  damping: 25,
                  mass: 0.8
                }}
                className="absolute left-1/2 -translate-x-1/2 w-[280px] md:w-[600px] cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <TestimonialCard t={t} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>

        {/* Global Slide Navigation Dot Indicator (Optional for premium feel) */}
        <div className="flex gap-3 justify-center mt-auto pb-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-secondary' : 'w-2 bg-secondary/20 hover:bg-secondary/40'}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TestimonialCard = ({ t, isActive }: { t: any, isActive: boolean }) => (
  <div 
    className={`p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative transition-all duration-500 overflow-hidden h-full flex flex-col bg-white ${isActive ? 'ring-4 ring-secondary/5 shadow-2xl' : 'shadow-inner'}`}
  >
    {/* Background design element */}
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
    
    <div className="flex text-yellow-400 mb-6">
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
    
    <p className="italic text-on-surface-variant mb-10 leading-relaxed text-sm md:text-xl font-medium opacity-90 flex-grow">
      "{t.text}"
    </p>
    
    <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/10">
      <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-black text-xl shadow-inner">
        {t.name.charAt(0)}
      </div>
      <div>
        <div className="font-black text-on-surface text-lg leading-tight">{t.name}</div>
        <div className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-black opacity-60 mt-1">{t.location}</div>
      </div>
    </div>
  </div>
);

export default Testimonials;
