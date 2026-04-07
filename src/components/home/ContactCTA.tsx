'use client';

import React, { useState } from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import BookingModal from '../ui/BookingModal';
import { motion } from 'framer-motion';

const ContactCTA = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Section background="primary" className="py-32 text-center relative overflow-hidden">
        {/* Animated background highlights */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px] pointer-events-none" 
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 md:px-8 space-y-12 relative z-10"
        >
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight"
            >
              Ready to improve <br className="hidden md:block" /> your home comfort?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary-fixed max-w-2xl mx-auto mb-10 font-medium opacity-90 leading-relaxed"
            >
              Our expert technicians are ready to help with all your heating and cooling needs. Experience the RBZ difference today.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center gap-6"
          >
            <Button
              variant="surface"
              size="md"
              onClick={() => setBookingOpen(true)}
              className="md:size-xl shadow-2xl"
            >
              Book Service Now
            </Button>
            
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-10 py-5 rounded-[1.5rem] font-black text-xl transition-colors flex items-center justify-center gap-3 shadow-xl group"
              href="tel:+16472999648"
            >
              <motion.span 
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="material-symbols-outlined text-2xl"
              >
                phone_in_talk
              </motion.span>
              Call: +1 647 299 9648
            </motion.a>
          </motion.div>
        </motion.div>
      </Section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default ContactCTA;
