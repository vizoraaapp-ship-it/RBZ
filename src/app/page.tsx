import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesBento from '@/components/home/ServicesBento';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import OurValues from '@/components/home/OurValues';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <ServicesBento />
      <Statistics />
      <Testimonials />
      <FAQ />
      <OurValues />
      <ContactCTA />
      <Footer />
    </main>
  );
}
