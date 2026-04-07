'use client';
import React from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { motion } from 'framer-motion';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    detailedDescription: string;
    features: string[];
    image: string;
    icon: string;
  } | null;
  onBook: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, service, onBook }) => {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service.title}>
      <div className="flex flex-col">
        {/* Header Image - Full Bleed */}
        <div className="relative h-60 md:h-[400px] w-full overflow-hidden atmospheric-shadow-sm">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            className="object-cover"
          />
          <div className="absolute top-6 left-6 bg-primary/95 text-white p-3 rounded-2xl shadow-xl z-20">
            <span className="material-symbols-outlined text-2xl font-black">{service.icon}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content with Padding */}
        <div className="p-8 md:p-10 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-60">Overview</h3>
            <p className="text-on-surface text-lg leading-relaxed font-semibold opacity-90">
              {service.detailedDescription}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-60">Primary Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/10 group hover:border-primary/20 hover:bg-white transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <span className="material-symbols-outlined text-lg font-black">check_circle</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface-variant leading-snug">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-outline-variant/10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBook}
            className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-dim transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 text-xl"
          >
            <span className="material-symbols-outlined text-2xl font-black">calendar_month</span>
            Book This Service
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetailModal;
