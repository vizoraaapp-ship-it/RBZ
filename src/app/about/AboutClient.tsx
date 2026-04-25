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
    title: 'Built to Last', 
    image: 'https://cdn-icons-png.flaticon.com/512/3259/3259163.png',
    color: '#0EA5E9',
    bgColor: 'bg-sky-500/10',
    desc: 'We never cut corners. Every project is completed using premium materials and precise installation — because your home deserves workmanship that holds up.' 
  },
  { 
    title: 'No Surprise Bills', 
    image: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png',
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    desc: 'Your quote is your invoice. RBZ provides upfront, itemized pricing — no hidden charges, no mystery labour fees tacked on at the end.' 
  },
  { 
    title: 'Trained & Trusted Professionals', 
    image: 'https://cdn-icons-png.flaticon.com/512/7641/7641727.png',
    color: '#8B5CF6',
    bgColor: 'bg-violet-500/10',
    desc: 'Our team undergoes ongoing technical training to stay current with the latest methods so every job is handled with skilled, up-to-date expertise.' 
  },
  { 
    title: 'Greener Homes, Lower Bills', 
    image: 'https://cdn-icons-png.flaticon.com/512/3233/3233514.png',
    attribution: 'Vlad Szirka - Flaticon',
    color: '#10B981',
    bgColor: 'bg-emerald-500/10',
    desc: 'We help Ontario homeowners make smart, sustainable upgrades that cut energy costs month after month — good for your wallet and the environment.' 
  }
];

const STATS = [
  { label: 'Years Experience', value: 10, suffix: '+' },
  { label: 'Skilled Technicians', value: 30, suffix: '+' },
  { label: 'Solutions Delivered', value: 5000, suffix: '+' },
  { label: 'Customer Trust', value: 98, suffix: '%' }
];

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <header className="relative w-full h-[60vh] min-h-[500px] md:h-[calc(100vh-156px)] md:min-h-[700px] flex items-center justify-center overflow-hidden mt-[104px] md:mt-[156px]">
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
          className="relative z-20 max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-6 md:px-8 text-left space-y-6 md:space-y-8 w-full"
        >
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
            className="text-base md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl text-left drop-shadow-lg opacity-80"
          >
            Trusted by homeowners and businesses across the GTA to deliver precise atmospheric mastery and mechanical reliability.
          </motion.p>
        </motion.div>
      </header>

      <Section id="who-we-are">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-12 text-center md:text-left"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-on-surface leading-tight">Who We Are</h2>
              <p className="text-lg md:text-xl text-on-surface-variant font-bold leading-relaxed opacity-90">
                At RBZ Climate Solutions, we believe the air you breathe and the warmth of your home define your quality of life. For over 10 years, specializing in the precision installation and emergency repair of high-performance HVAC systems.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-on-surface leading-tight">What We Do</h2>
              <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed opacity-90">
                We don't just swap parts; we provide structural solutions. From installing high-efficiency furnaces and AC units to executing complex boiler and gas piping projects, strict adherence to safety and security regulations directs our work, which is completed with a careful, superior finish.
              </p>
              <p className="text-lg md:text-xl text-primary font-black italic">
                When performance cannot be compromised, the GTA calls upon us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-primary leading-tight">RBZ Mission</h3>
                <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed opacity-90">
                  RBZ Climate Solutions provides a degree of trustworthiness and technological supremacy to offer the most advanced HVAC services to the GTA.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-primary leading-tight">RBZ Vision</h3>
                <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed opacity-90">
                  To set the standard for innovation, mentoring, and a "customer-first" approach to all repairs and installations in the GTA's HVAC sector.
                </p>
              </div>
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

      <Section id="tssa-verification" background="surface">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 md:p-16 border border-outline-variant/10 shadow-xl shadow-primary/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[200px] font-black">verified</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <Image 
              src="/tssa.png" 
              alt="TSSA Certification" 
              width={240} 
              height={240} 
              className="w-40 h-40 md:w-56 md:h-56 object-contain shrink-0 drop-shadow-2xl"
              unoptimized
            />
            <div className="space-y-6 text-center md:text-left">
              <div className="space-y-4">
                <h3 className="text-sm md:text-base font-black text-primary uppercase tracking-[0.3em]">TSSA Certified. Professionally Verified. RBZ Trusted.</h3>
                <h2 className="text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">Safety Without Compromise</h2>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-3xl">
                  RBZ Climate Solutions is fully TSSA Certified, meaning our technicians are rigorously vetted and our work is strictly audited against the GTA’s highest safety regulations. We make sure all our work is done properly and built to last.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {['Licensed Professionals', 'Safety Audited', 'Compliance Verified'].map((tag) => (
                  <div key={tag} className="px-6 py-2 bg-primary/5 rounded-full border border-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="rbz-difference" className="py-0 px-4 md:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-950 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 space-y-12">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl md:text-6xl font-black tracking-tight">The RBZ Difference</h2>
              <p className="text-primary-fixed font-black uppercase tracking-[0.3em] text-xs opacity-60">Engineered for Reliability</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {[
                { 
                  title: '24/7 Technical Readiness', 
                  icon: 'emergency_home', 
                  desc: 'Whether it’s a midnight gas leak or a mid-winter furnace failure, our emergency repair team is on-call to restore your comfort immediately.' 
                },
                { 
                  title: 'Precision Installation', 
                  icon: 'settings_input_component', 
                  desc: 'Every unit we install from water heaters to ERV systems is calibrated for maximum energy efficiency and long-term durability.' 
                },
                { 
                  title: 'Uncompromising Standards', 
                  icon: 'verified', 
                  desc: 'We make sure all our work is done properly and built to last. Professionally verified and audited for excellence.' 
                }
              ].map((item, index) => (
                <div key={index} className="space-y-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary-fixed shadow-inner">
                    <span className="material-symbols-outlined text-3xl font-black">{item.icon}</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-white/70 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
          <h2 className="text-3xl md:text-6xl font-black text-on-surface tracking-tight">The RBZ Standard</h2>
          <p className="text-base md:text-lg text-on-surface-variant font-medium opacity-80 max-w-lg mx-auto">Our four pillars of operational excellence and customer trust.</p>
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
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-blue-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden text-white shadow-2xl border border-white/5"
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
              className="relative z-10 space-y-8 md:space-y-10"
            >
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-black mb-6 tracking-tight leading-[1.3] max-w-3xl mx-auto">
                  Great for people looking to upgrade to newer, greener tech. Reliable, transparent, and just a click away, get the professional support you deserve.
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-4 md:pt-8">
                <Button variant="surface" size="xl" href="/contact" fullWidth className="sm:w-auto shadow-2xl">Book Service Now</Button>
                <motion.a 
                  initial={{ backgroundColor: "#FF6B00" }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#E65C00",
                    boxShadow: "0 0 25px rgba(255, 107, 0, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto text-white px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-accent/20" 
                  href="tel:+16472999648"
                  style={{ backgroundColor: "#FF6B00" }}
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
      borderColor: value.color + "40"
    }}
    className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-outline-variant/10 transition-all duration-500 overflow-hidden relative group h-full flex flex-col"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${value.bgColor}`} />
    
    <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mb-8 transition-transform relative z-10 flex-shrink-0 p-3`} style={{ color: value.color }}>
      {value.image ? (
        <div className="relative w-full h-full">
          <Image 
            src={value.image} 
            alt={value.title} 
            fill 
            className="object-contain"
            unoptimized
          />
        </div>
      ) : (
        <span className="material-symbols-outlined text-3xl font-black">{value.icon}</span>
      )}
    </div>
    
    <div className="relative z-10 flex-grow">
      <h3 className="text-2xl font-black text-on-surface mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight" style={{ color: value.color }}>{value.title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity">{value.desc}</p>
      
      {value.attribution && (
        <p className="mt-4 text-[10px] text-on-surface-variant/40 italic font-medium">
          Icon by <a href="https://www.flaticon.com/free-icons/green-power" className="hover:text-primary transition-colors underline" target="_blank" rel="noopener noreferrer">{value.attribution}</a>
        </p>
      )}
    </div>
  </motion.div>
);
