import React from 'react';
import Section from '../ui/Section';

const TESTIMONIALS = [
  {
    name: 'David Thompson',
    location: 'Scarborough, ON',
    text: "RBZ Climate Solutions fixed our AC during the hottest week of the year. Their technician was professional, masked, and very knowledgeable.",
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    location: 'Markham, ON',
    text: "The best HVAC service in the GTA. They installed our new heat pump system efficiently and helped us navigate the government rebates.",
    rating: 5,
    featured: true,
  },
  {
    name: 'Michael O Reilly',
    location: 'Barrie, ON',
    text: "Fair pricing and honest advice. They didn't try to upsell me on a new furnace when a simple repair was all I needed.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <Section background="surface">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-black text-on-background mb-4">What Our Customers Say</h2>
        <p className="text-on-surface-variant max-w-lg mx-auto">Exceptional service is the core of our business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {TESTIMONIALS.map((t, index) => (
          <div 
            key={index} 
            className={`p-10 rounded-2xl border border-outline-variant/10 shadow-sm relative tonal-transition hover:-translate-y-2 duration-500 ${t.featured ? 'bg-white scale-105 z-10 ring-4 ring-primary/5' : 'bg-white'}`}
          >
            <div className="flex text-primary mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            
            <p className="italic text-on-surface-variant mb-8 leading-relaxed text-lg">
              "{t.text}"
            </p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/5">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-secondary font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-on-surface">{t.name}</div>
                <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
