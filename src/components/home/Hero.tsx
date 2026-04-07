'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface Banner {
  id: string;
  image_url: string;
}

const Hero = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('id, image_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setBanners(data);
      } else {
        // Fallback default image if no active banners exist in DB yet
        setBanners([{ id: 'default', image_url: '/hero-furnace.png' }]);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-60 lg:pb-36 bg-gradient-to-br from-primary to-primary-dim text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <motion.div 
          className="space-y-8 lg:space-y-12 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl mx-auto lg:mx-0"
          >
            <span className="material-symbols-outlined text-secondary-fixed fill-1 text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-[10px] md:text-sm font-black tracking-widest uppercase">#1 Rated HVAC Service in Ontario</span>
          </motion.div>
          
          <div className="space-y-4 lg:space-y-6">
            <motion.h1 
              variants={itemVariants}
              className="text-[2.2rem] md:text-8xl font-black tracking-tight leading-[1] md:leading-[0.95]"
            >
              Install, Repair <br />
              <span className="text-primary-fixed block mt-2 text-[1.8rem] md:text-8xl">and Maintenance</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-2xl text-primary-fixed/90 max-w-xl lg:mx-0 mx-auto leading-relaxed font-bold opacity-80"
            >
              Precision climate control solutions for your home and business. Delivering excellence and comfort with over 9 years of technical mastery.
            </motion.p>
          </div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button variant="surface" size="xl" href="/contact" fullWidth className="sm:w-auto">Get a Free Quote</Button>
            <Button variant="outline" size="xl" className="text-white border-white/30 hover:bg-white/10 sm:w-auto" fullWidth href="/services">Explore Services</Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-8 lg:pt-10 flex justify-center lg:justify-start gap-8 lg:gap-12 border-t border-white/10">
            {[{v: '9+', l: 'Years Exp.'}, {v: '5k+', l: 'Happy Clients'}, {v: '24/7', l: 'Emergency'}].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-4xl font-black">{stat.v}</div>
                <div className="text-[9px] md:text-xs text-primary-fixed/70 uppercase tracking-widest font-bold mt-1">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative group lg:block"
        >
          <div className="absolute -inset-8 bg-white/10 rounded-[3rem] blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-[3rem] shadow-2xl border border-white/20"
          >
            <div className="rounded-[2rem] overflow-hidden aspect-square relative bg-slate-100 shadow-inner">
              <AnimatePresence mode="wait">
                {banners.map((banner, index) => (
                  index === currentIndex && (
                    <motion.div 
                      key={banner.id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={banner.image_url} 
                        alt="Premium HVAC Hero Image" 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority={index === 0}
                      />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            {/* Dots Indicator */}
            {banners.length > 1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/60 w-1.5'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 hidden md:block border border-outline-variant/10"
          >
             <div className="text-primary font-black text-5xl tracking-tighter">98%</div>
             <div className="text-on-surface-variant text-xs font-black uppercase tracking-widest mt-1">Referral Rate</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,88.75,117.05,82.34,175.75,82.34,228.61,82.34,281,89.5,321.39,56.44Z" fill="#fbf8ff"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
