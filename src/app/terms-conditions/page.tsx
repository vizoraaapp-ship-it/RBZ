'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsConditions = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-[104px] md:pt-[156px] pb-20">
        <Section background="surface">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button 
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-8 hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                Back
              </button>
              <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tight">Terms & Conditions</h1>
              <div className="prose prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed space-y-6">
                <p>
                  <strong>RBZ Climate Solutions Inc.</strong> By engaging RBZ Climate Solutions Inc. (“Company”, “we”, “us”), you (“Customer”) agree to the following terms:
                </p>

                <h2 className="text-2xl font-black text-primary mt-8">1. Scope of Work</h2>
                <p>All work will be performed as outlined in the approved estimate, quote, or service agreement. Any additional work requested will be subject to separate approval and charges.</p>

                <h2 className="text-2xl font-black text-primary mt-8">2. Pricing & Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due upon completion unless otherwise agreed in writing.</li>
                  <li>Deposits may be required for installations or special-order equipment.</li>
                  <li>Late payments may incur interest of 2% per month (24% annually).</li>
                </ul>

                <h2 className="text-2xl font-black text-primary mt-8">3. Access & Site Conditions</h2>
                <p>Customer must provide safe and reasonable access to the work area. The Company is not responsible for delays or additional costs due to unsafe or restricted conditions.</p>

                <h2 className="text-2xl font-black text-primary mt-8">4. Equipment & Materials</h2>
                <p>All equipment remains the property of the Company until paid in full. Special-order items may be non-refundable.</p>

                <h2 className="text-2xl font-black text-primary mt-8">5. Permits & Compliance</h2>
                <p>Where required, permits and inspections may be arranged at additional cost unless stated otherwise.</p>

                <h2 className="text-2xl font-black text-primary mt-8">6. Warranty</h2>
                <p>Labour warranty (if provided) is limited and specified in writing. Manufacturer warranties apply to equipment and are subject to their terms.</p>

                <h2 className="text-2xl font-black text-primary mt-8">7. Limitation of Liability</h2>
                <p>The Company is not liable for indirect, incidental, or consequential damages, including loss of use, property damage, or business interruption. Liability is limited to the value of the services provided.</p>

                <h2 className="text-2xl font-black text-primary mt-8">8. Cancellations</h2>
                <p>Cancellations may be subject to charges for labour performed, materials ordered, or restocking fees.</p>

                <h2 className="text-2xl font-black text-primary mt-8">9. Governing Law</h2>
                <p>These terms are governed by the laws of Ontario, Canada.</p>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <Footer />
    </main>
  );
};

export default TermsConditions;
