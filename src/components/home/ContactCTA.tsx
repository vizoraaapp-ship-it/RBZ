'use client';
import React, { useState } from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import BookingModal from '../ui/BookingModal';

const ContactCTA = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Section background="primary" className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to improve your home comfort?</h2>
          <p className="text-xl text-primary-fixed block max-w-2xl mx-auto mb-10">
            Our expert technicians are ready to help with all your heating and cooling needs. Experience the RBZ difference today.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button
              variant="surface"
              size="xl"
              onClick={() => setBookingOpen(true)}
            >
              Book Service Now
            </Button>
            <a
              className="border-2 border-white/50 text-white px-10 py-5 rounded-xl font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 shadow-xl"
              href="tel:+16472999648"
            >
              <span className="material-symbols-outlined text-2xl">phone_in_talk</span>
              Call: +1 647 299 9648
            </a>
          </div>
        </div>
      </Section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default ContactCTA;
