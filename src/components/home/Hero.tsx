'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ExtendedBanner {
  id: string;
  image_url: string;
  banner_type: 'image_only' | 'with_text';
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  stats: { v: string; l: string }[];
  accent_color: string;
}

const DEFAULT_BANNERS: ExtendedBanner[] = [
  {
    id: 'furnace',
    image_url: '/hero-furnace.png',
    banner_type: 'with_text',
    badge: '#1 Rated HVAC Service in GTA and Ontario',
    title: 'Install, Repair \nand Maintenance',
    description: 'Precision climate control solutions for your home and business. Delivering excellence and comfort for over 10 years.',
    cta_text: 'Get a Free Quote',
    cta_link: '/contact',
    secondary_cta_text: 'Explore Services',
    secondary_cta_link: '/services',
    stats: [{v: '10+', l: 'Years Exp.'}, {v: '5k+', l: 'Happy Clients'}, {v: '24/7', l: 'Emergency'}],
    accent_color: 'from-primary to-primary-dim'
  },
  {
    id: 'kitchen',
    image_url: '/service-hero.png',
    banner_type: 'with_text',
    badge: 'New Professional Service',
    title: 'Commercial \nKitchen Excellence',
    description: 'Expert ventilation and climate solutions for professional kitchens. Ensure peak performance and safety.',
    cta_text: 'View Commercial',
    cta_link: '/services/commercial-kitchens',
    secondary_cta_text: 'Contact Us',
    secondary_cta_link: '/contact',
    stats: [{v: '100%', l: 'Compliance'}, {v: 'Fast', l: 'Install'}, {v: 'Pro', l: 'Grade'}],
    accent_color: 'from-slate-900 to-primary-dim'
  },
  {
    id: 'gasline',
    image_url: '/service-ac.png',
    banner_type: 'with_text',
    badge: 'Certified Gas Experts',
    title: 'Barbeque & Gas \nLine Installations',
    description: 'Safe and certified gas line installations for your home, BBQ, or pool heaters. Reliable energy solutions.',
    cta_text: 'Book Inspection',
    cta_link: '/contact',
    secondary_cta_text: 'Our Expertise',
    secondary_cta_link: '/services',
    stats: [{v: 'Safe', l: 'Certified'}, {v: 'Clean', l: 'Work'}, {v: 'All', l: 'Seasons'}],
    accent_color: 'from-primary to-primary-dim'
  }
];

const Hero = () => {
  const [banners, setBanners] = useState<ExtendedBanner[]>(DEFAULT_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map DB banners to our ExtendedBanner structure
        const mappedBanners: ExtendedBanner[] = data.map(d => ({
          id: d.id,
          image_url: d.image_url,
          banner_type: d.banner_type || 'with_text',
          badge: d.badge || DEFAULT_BANNERS[0].badge,
          title: d.title || 'Welcome to RBZ',
          description: d.description || '',
          cta_text: d.cta_text || 'Contact Us',
          cta_link: d.cta_link || '/contact',
          secondary_cta_text: d.secondary_cta_text || 'View Services',
          secondary_cta_link: d.secondary_cta_link || '/services',
          stats: DEFAULT_BANNERS[0].stats, // Default stats for now
          accent_color: d.accent_color || 'from-primary to-primary-dim'
        }));
        setBanners(mappedBanners);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 1.1,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.8, ease: "easeOut" },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      scale: 0.9,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.8, ease: "easeIn" },
        opacity: { duration: 0.4 }
      }
    })
  };

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative h-[90vh] lg:h-[calc(100vh-156px)] min-h-[600px] overflow-hidden bg-neutral-950 text-white mt-[104px] md:mt-[156px]">
      {/* Background Image Layer (Cross-fade for seamless transitions) */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src={currentBanner.image_url}
            alt=""
            fill
            className="object-cover blur-3xl opacity-30 scale-110"
            priority
            quality={10}
            sizes="100vw"
          />
          <Image
            src={currentBanner.image_url}
            alt="RBZ Premium Service"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer (Slide transition for text and buttons) */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`content-${currentIndex}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-20 h-full flex items-center pt-[80px] md:pt-0"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Text Content */}
              <div className="space-y-4 md:space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-white whitespace-pre-line"
                >
                  {currentBanner.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                >
                  {currentBanner.description}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8 md:mt-10"
              >
                <Button variant="surface" size="lg" href={currentBanner.cta_link} className="h-14 px-8 text-base">
                  {currentBanner.cta_text}
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-base text-white border-white/30" href={currentBanner.secondary_cta_link}>
                  {currentBanner.secondary_cta_text}
                </Button>
              </motion.div>

              {/* Quick Stats Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 mt-8 md:pt-12 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 md:gap-16 border-t border-white/10"
              >
                {currentBanner.stats.map((stat, i) => (
                  <div key={i} className="group flex-1 min-w-[25%] sm:min-w-0 text-center lg:text-left">
                    <div className="text-lg sm:text-xl md:text-3xl font-black group-hover:text-secondary transition-colors duration-300 break-words">{stat.v}</div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-white/70 uppercase tracking-[0.1em] md:tracking-[0.2em] font-black mt-1 md:mt-2 leading-tight break-words">{stat.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side Indicators */}
      {banners.length > 1 && (
        <div className="absolute right-8 md:right-12 top-[60%] -translate-y-1/2 z-40 flex flex-col gap-6">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group flex items-center justify-end gap-4"
            >
              <span className={`text-[10px] font-black tracking-widest uppercase transition-all duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${index === currentIndex ? 'text-white opacity-100 translate-x-0' : 'text-white/40'}`}>
                0{index + 1}
              </span>
              <div className={`relative h-12 w-1 transition-all duration-500 rounded-full overflow-hidden ${index === currentIndex ? 'h-20 bg-white/20' : 'bg-white/40 group-hover:bg-white/60'}`}>
                {index === currentIndex && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 bg-secondary"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

    </section>
  );
};

export default Hero;
