'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Section from '../ui/Section';
import { motion } from 'framer-motion';

import Counter from '../ui/Counter';

const Statistics = () => {
  return (
    <Section background="high" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column: Image + Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group lg:block"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" 
          />
          
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="/technicians.png" 
              alt="RBZ Climate Solutions Technicians" 
              width={600} 
              height={600}
              className="w-full object-cover aspect-square group-hover:scale-105 transition-transform duration-1000"
              unoptimized
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.6 
            }}
            className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl text-white z-20 shadow-2xl hidden md:block"
          >
            <div className="text-4xl font-black mb-1">
              <Counter value={98} duration={2} delay={1} />%
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-black opacity-80">Referral Rate</div>
          </motion.div>
        </motion.div>

        {/* Right column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-6xl font-black text-on-background leading-[1.1] tracking-tight"
            >
              Trust and Reliability <br />
              <span className="text-secondary">in GTA and Ontario</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-xl"
            >
              For over 10 years, RBZ Climate Solutions has been the leading provider of premium HVAC services across the Greater Toronto Area and Ontario.
            </motion.p>
          </div>
          
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg text-on-surface-variant leading-relaxed font-medium"
            >
              We believe that your indoor environment is the foundation of your family's comfort. Our technicians are highly certified, continuously trained on the latest smart climate technology, and committed to transparency in every quote.
            </motion.p>
            
            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
              }}
              className="space-y-5 pt-4"
            >
              {[
                'Serving GTA and Ontario',
                'Licensed & Fully Insured Technicians',
                'Energy-Saving Solutions Experts',
                '24/7 Emergency Response'
              ].map((item) => (
                <motion.li 
                  key={item} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-center gap-4 text-on-background font-bold"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"
                  >
                    <span className="material-symbols-outlined text-base fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </motion.div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* TSSA Trust Badge - Condensed for Home Page */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 p-6 bg-surface-container rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-32 h-32 shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-white mix-blend-multiply border-2 border-white shadow-sm hover:scale-105 transition-transform duration-500">
                  <Image 
                    src="/tssa.png" 
                    alt="TSSA Logo" 
                    width={160} 
                    height={160} 
                    className="w-[110%] h-[110%] object-cover scale-[1.05]"
                    unoptimized
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg md:text-2xl font-black text-on-surface tracking-tight leading-none mb-2">TSSA Certified & Verified</h4>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: 'shield', label: 'Safety Compliant' },
                      { icon: 'verified', label: 'Registered Mechanical Service' }
                    ].map((badge) => (
                      <div key={badge.label} className="flex items-center gap-2.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xl text-secondary font-black">{badge.icon}</span>
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest text-on-surface-variant">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="pt-8"
            >
              <Button size="lg" href="/about">Learn More About Us</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Statistics;
