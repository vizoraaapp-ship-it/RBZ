import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import Button from '@/components/ui/Button';

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
    desc: 'Committed to Ontarios greener future through high-efficiency heat pumps and energy-saving audits.' 
  }
];

const STATS = [
  { label: 'Years Experience', value: '15+' },
  { label: 'Skilled Technicians', value: '30+' },
  { label: 'Solutions Delivered', value: '5k+' },
  { label: 'Customer Trust', value: '98%' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-48 bg-gradient-to-br from-primary/10 via-surface to-surface-container-low flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary blur-[120px] rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10 space-y-8 animate-in fade-in slide-in-from-top duration-1000">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-medium text-sm tracking-widest uppercase">Established 2009</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            About RBZ Climate Solutions
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-body leading-relaxed max-w-2xl mx-auto">
            Trusted by homeowners and businesses across Ontario to deliver precise atmospheric mastery and mechanical reliability.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <Section id="who-we-are">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Who We Are</h2>
            <div className="space-y-6 text-lg text-on-surface-variant font-medium leading-relaxed">
              <p>
                At RBZ Climate Solutions, we believe that the environment you live and work in dictates your quality of life. For over 15 years, our team has been the cornerstone of HVAC reliability throughout Ontario, blending technical expertise with white-glove service.
              </p>
              <p>
                What started as a small family-focused repair shop has evolved into a leading architectural partner for environmental control. We don t just install units; we design sustainable systems that optimize comfort, air purity, and energy efficiency.
              </p>
              <p>
                Our mission is to elevate the standard of living across Ontario by providing superior heating, cooling, and water solutions that prioritize precision, sustainability, and human comfort.
              </p>
            </div>
          </div>
          <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 scale-105 transition-transform group-hover:rotate-0 duration-500"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/technicians.png" 
                alt="HVAC Technicians" 
                width={800} 
                height={800} 
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="primary" className="py-20">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
            {STATS.map((stat, index) => (
              <div key={index} className="space-y-2 animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-extrabold">{stat.value}</div>
                <div className="text-primary-fixed-dim text-xs md:text-sm uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
         </div>
      </Section>

      {/* Core Values */}
      <Section background="surface">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-bold text-on-surface">The Foundation of RBZ</h2>
          <p className="text-on-surface-variant text-lg">Our core values drive every interaction and installation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, index) => (
            <div 
              key={index} 
              className="p-10 bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(0,17,168,0.04)] hover:shadow-[0_12px_32px_rgba(0,17,168,0.08)] hover:-translate-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-primary-container rounded-lg flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">{value.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary-dim rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 100 Q 25 0 50 100 Q 75 200 100 100" fill="none" stroke="white" strokeWidth="0.1"></path>
              </svg>
            </div>
            <div className="relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to work with a team you can trust?</h2>
              <p className="text-primary-fixed text-xl max-w-2xl mx-auto">
                Contact us today for a diagnostic audit or to discuss your upcoming installation project. Expert care is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Button variant="surface" size="xl" href="/contact">Book Service</Button>
                <Button variant="outline" size="xl" className="text-white border-white/30 hover:bg-white/10" href="tel:+16472999648">Call Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
