'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
  icon: string;
  isFlipped: boolean;
  objectFit?: 'cover' | 'contain';
  onClick: () => void;
  onBook: (e: React.MouseEvent) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  detailedDescription,
  features,
  image, 
  icon,
  isFlipped,
  objectFit = 'contain',
  onClick,
  onBook
}) => {
  return (
    <div 
      className="group outline-none w-full h-[215px] md:h-[520px] cursor-pointer" 
      style={{ perspective: '1200px' }}
      onClick={onClick}
    >
      <motion.div 
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.8, 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 bg-white md:bg-surface-container-lowest rounded-[1.25rem] md:rounded-[2rem] overflow-hidden shadow-sm md:shadow-none atmospheric-shadow-hover flex flex-col border border-outline-variant/10 md:border-outline-variant/10 p-2 md:p-0 group/card"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Image Container - Landscape rectangle */}
          <div className="relative h-28 md:h-64 bg-white rounded-xl md:rounded-none overflow-hidden shrink-0">
             <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} group-hover:scale-105 transition-transform duration-700`}
            />
            {/* Desktop Icon Badge */}
            <div className="hidden md:flex absolute top-6 left-6 bg-secondary/95 text-white p-3 rounded-2xl shadow-xl z-20">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            
            {/* Desktop Hover Glow effect overlay */}
            <div className="hidden md:block absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
          
          {/* Text Content Directly Below Image on Mobile */}
          <div className="p-0 md:p-8 flex flex-col flex-grow relative pt-1.5 md:pt-8 w-full">
            <h3 className="font-headline text-[13px] md:text-2xl font-black mb-0 md:mb-3 text-primary group-hover:text-secondary transition-colors tracking-tight line-clamp-1 md:line-clamp-none leading-tight">{title}</h3>
            
            <p className="hidden md:block text-on-surface-variant mb-6 leading-relaxed flex-grow text-sm font-medium opacity-80">{description}</p>
            
            <motion.div 
              whileHover={{ x: 5 }}
              className="text-secondary font-bold flex items-center gap-0.5 mt-auto transition-colors text-[10px] md:text-sm md:uppercase md:tracking-widest"
            >
              <span className="hidden md:inline">Explore Details</span>
              <span className="md:hidden">Explore Service</span>
              <span className="material-symbols-outlined text-[12px] md:text-lg font-black">arrow_forward</span>
            </motion.div>
          </div>
        </div>

        {/* BACK FACE (Disabled for Mobile via perspective, but kept for Desktop) */}
        <div 
          className="absolute inset-0 bg-surface-container-lowest rounded-[2rem] overflow-hidden atmospheric-shadow-hover flex flex-col border border-primary/20 bg-gradient-to-br from-surface-container-lowest to-surface p-8"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
              </div>
              <h3 className="font-headline text-2xl font-black text-primary tracking-tight">{title}</h3>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-[1.25rem] bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </motion.button>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-3 custom-scrollbar space-y-6">
            <p className="text-on-surface text-base leading-relaxed font-semibold opacity-90">
              {detailedDescription}
            </p>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Service</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-center gap-2 text-sm text-on-surface-variant font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBook}
              className="w-full py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/20 text-lg"
            >
              <span className="material-symbols-outlined text-xl">calendar_month</span>
              Book This Service
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceCard;
