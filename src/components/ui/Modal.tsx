'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" 
          />

          {/* Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full md:max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-xl md:rounded-[2.5rem] shadow-2xl border border-white/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-10 border-b border-outline-variant/10 shrink-0 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
              <motion.h2 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-4xl font-black text-on-surface tracking-tight"
              >
                {title}
              </motion.h2>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant ml-4 shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl md:text-2xl">close</span>
              </motion.button>
            </div>

            {/* Body */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-grow overflow-y-auto px-6 py-8 md:px-10 md:py-10 custom-scrollbar"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
