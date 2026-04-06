import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Page Header */}
      <header className="w-full bg-gradient-to-b from-primary-container/30 to-surface py-32 md:py-48 px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface">Get in Touch</h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto">
            Ready to schedule a service or get a free estimate? Our team is available 24/7 for all your comfort needs.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <Section className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative overflow-hidden">
          
          {/* Left Column: Info */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-on-surface uppercase tracking-widest text-xs">Reach Our Experts</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Whether it s an emergency repair or a consultation for a new installation, we re just a call or message away.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Our Office</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    #220, 205 Morningside Avenue<br />
                    Scarborough, Ontario, M1E 3E2
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Contact Details</h3>
                  <div className="space-y-1">
                    <p className="text-on-surface-variant font-medium">Main: +1 647 299 9648</p>
                    <p className="text-on-surface-variant font-medium">Email: info@rbzclimate.ca</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">schedule</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Business Hours</h3>
                  <div className="space-y-1">
                    <p className="text-on-surface-variant font-medium">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-on-surface-variant font-medium text-primary font-black">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-80 bg-surface-container rounded-3xl overflow-hidden relative shadow-inner animate-pulse group hover:animate-none transition-all duration-500">
               <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary/30">map</span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      View On Google Maps
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-right duration-1000 border border-outline-variant/10">
            <h2 className="text-3xl font-bold mb-8 text-on-surface">Request a Consultation</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name *</label>
                   <input type="text" id="name" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="John Doe" required />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address *</label>
                   <input type="email" id="email" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="john@example.com" required />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Phone Number *</label>
                   <input type="tel" id="phone" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="+1 000 000 0000" required />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Service Type</label>
                   <select id="service" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all">
                      <option>Air Conditioning</option>
                      <option>Furnace / Heating</option>
                      <option>Heat Pump</option>
                      <option>Water Systems</option>
                      <option>Emergency Repair</option>
                      <option>Other</option>
                   </select>
                 </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Additional Message</label>
                <textarea id="message" rows={4} className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="Tell us more about your needs..."></textarea>
              </div>

              <Button size="xl" fullWidth type="button">Submit Request</Button>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
