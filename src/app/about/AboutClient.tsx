'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Counter from '@/components/ui/Counter';

const VALUES = [
  { 
    title: 'Quality Workmanship', 
    icon: 'handyman', 
    desc: 'No cutting corners. Every installation and repair is executed with surgical precision and lasting integrity.' 
  },
  { 
    title: 'Transparent Pricing', 
    icon: 'payments', 
    desc: 'Honest estimates without hidden fees. We build trust through clarity in every line item of our billing.' 
  },
  { 
    title: 'Certified Team', 
    icon: 'verified', 
    desc: 'Our technicians are TSSA certified and undergo continuous training to master the latest climate technologies.' 
  },
  { 
    title: 'Eco-Friendly', 
    icon: 'eco', 
    desc: 'Committed to Ontario\'s greener future through high-efficiency heat pumps and energy-saving audits.' 
  }
];

const STATS = [
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Skilled Technicians', value: 30, suffix: '+' },
  { label: 'Solutions Delivered', value: 5000, suffix: '+' },
  { label: 'Customer Trust', value: 98, suffix: '%' }
];

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <header className="relative w-full h-[60vh] min-h-[500px] md:h-screen md:min-h-[800px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/about-hero.jpeg" 
            alt="About RBZ Climate Solutions" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-4xl mx-auto px-6 md:px-8 text-center space-y-6 md:space-y-8"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] md:text-xs tracking-[0.2em] uppercase shadow-xl"
          >
            Established 2009
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-4xl md:text-8xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            About RBZ <br /> Climate Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-base md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg opacity-80"
          >
            Trusted by homeowners and businesses across Ontario to deliver precise atmospheric mastery and mechanical reliability.
          </motion.p>
        </motion.div>
      </header>

      <Section id="who-we-are">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-on-surface leading-tight">Who We Are</h2>
            <div className="space-y-6 text-lg text-on-surface-variant font-medium leading-relaxed opacity-90">
              <p>
                At RBZ Climate Solutions, we believe that the environment you live and work in dictates your quality of life. For over 15 years, our team has been the cornerstone of HVAC reliability throughout Ontario, blending technical expertise with white-glove service.
              </p>
              <p>
                What started as a small family-focused repair shop has evolved into a leading architectural partner for environmental control. We don't just install units; we design sustainable systems that optimize comfort, air purity, and energy efficiency.
              </p>
              <p>
                Our mission is to elevate the standard of living across Ontario by providing superior heating, cooling, and water solutions that prioritize precision, sustainability, and human comfort.
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 shadow-xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl flex items-center justify-center p-4 shadow-sm shrink-0 transition-transform duration-500"
                  >
                    <Image 
                      src="/tssa.png" 
                      alt="TSSA Certification Logo" 
                      width={140} 
                      height={140} 
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>

                  <div className="space-y-4 text-center md:text-left">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black text-on-surface tracking-tight">TSSA Certified & Verified</h3>
                       <p className="text-sm text-on-surface-variant font-medium leading-relaxed opacity-80">
                         We are fully certified and verified by TSSA, ensuring all our HVAC and mechanical services meet the highest safety and regulatory standards.
                       </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                       {[
                         { icon: 'shield_lock', label: 'Safety Compliant' },
                         { icon: 'verified_user', label: 'Licensed Professionals' },
                         { icon: 'assignment_turned_in', label: 'Regulatory Approved' }
                       ].map((indicator) => (
                         <div key={indicator.label} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-outline-variant/10 shadow-sm transition-all hover:bg-primary/5 hover:border-primary/20">
                            <span className="material-symbols-outlined text-primary text-sm font-black">{indicator.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{indicator.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group lg:block"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-4 scale-105 transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src="/technicians.png" 
                alt="HVAC Technicians" 
                width={800} 
                height={800} 
                className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section background="primary" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" 
          />
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10"
        >
          {STATS.map((stat, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="space-y-2 border-r border-white/10 last:border-0"
            >
              <div className="text-4xl md:text-6xl font-black tracking-tighter">
                <Counter value={stat.value} duration={2} delay={0.2 * index} />{stat.suffix}
              </div>
              <div className="text-primary-fixed-dim text-[10px] md:text-xs uppercase tracking-[0.3em] font-black opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section background="surface">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-24 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-on-surface tracking-tight">The Foundation of RBZ</h2>
          <p className="text-base md:text-lg text-on-surface-variant font-medium opacity-80 max-w-lg mx-auto">Our core values drive every interaction and installation.</p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {VALUES.map((value, index) => (
             <AboutValueCard key={index} value={value} />
          ))}
        </motion.div>

        <div className="md:hidden relative -mx-4 px-4 mt-8">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
            {VALUES.map((value, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
                <AboutValueCard value={value} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-blue-950 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 text-center relative overflow-hidden text-white shadow-2xl border border-white/5"
          >
            <motion.div 
              animate={{ 
                rotate: 360,
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg className="w-[150%] h-[150%] animate-pulse-slow" viewBox="0 0 100 100">
                <path d="M0 100 Q 25 0 50 100 Q 75 200 100 100" fill="none" stroke="white" strokeWidth="0.05" opacity="0.3"></path>
                <path d="M0 50 Q 50 150 100 50" fill="none" stroke="white" strokeWidth="0.05" opacity="0.2"></path>
              </svg>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 space-y-10 md:space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">Ready to work with <br /> a team you can trust?</h2>
                <p className="text-primary-fixed text-base md:text-2xl max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">
                  Contact us today for a diagnostic audit or to discuss your upcoming installation project. Expert care is just a click away.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-4 md:pt-8">
                <Button variant="surface" size="xl" href="/contact" fullWidth className="sm:w-auto shadow-2xl">Book Service Now</Button>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 backdrop-blur-sm" 
                  href="tel:+16472999648"
                >
                  <span className="material-symbols-outlined text-2xl">phone_in_talk</span>
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const AboutValueCard = ({ value }: { value: any }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, scale: 0.9, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0 }
    }}
    whileHover={{ 
      y: -10,
      boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.15)",
      borderColor: "rgba(var(--primary), 0.2)"
    }}
    className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-outline-variant/10 transition-all duration-500 overflow-hidden relative group h-full flex flex-col"
  >
    <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary transition-transform relative z-10 flex-shrink-0">
      <span className="material-symbols-outlined text-3xl font-black">{value.icon}</span>
    </div>
    
    <div className="relative z-10 flex-grow">
      <h3 className="text-2xl font-black text-on-surface mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">{value.title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity">{value.desc}</p>
    </div>
  </motion.div>
);
