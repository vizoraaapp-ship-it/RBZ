import React from 'react';
import Section from '../ui/Section';

const SERVICES = [
  { name: 'Air Conditioner', icon: 'ac_unit', desc: 'Precision cooling for the hottest Ontario summers.', color: 'bg-blue-50' },
  { name: 'Heat Pump', icon: 'heat_pump', desc: 'Efficient dual-purpose heating and cooling.', color: 'bg-blue-100/50' },
  { name: 'Furnace', icon: 'mode_fan', desc: 'Reliable gas and electric heating solutions.', color: 'bg-blue-50' },
  { name: 'Duct Work', icon: 'air', desc: 'Customized airflow for optimal efficiency.', color: 'bg-blue-100/50' },
  { name: 'Water Tank', icon: 'water_heater', desc: 'Hot water on demand, anytime you need it.', color: 'bg-blue-100/50' },
  { name: 'Boiler', icon: 'hvac', desc: 'Radiant heating expertise for ultimate comfort.', color: 'bg-blue-50' },
  { name: 'Repair', icon: 'build', desc: 'Fast diagnostic and repair services 24/7.', color: 'bg-blue-100/50' },
  { name: 'Accessories', icon: 'settings', desc: 'Filters, parts, and specialized add-ons.', color: 'bg-blue-50' },
];

const ServicesBento = () => {
  return (
    <Section id="services" background="surface">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl lg:text-5xl font-black text-on-background mb-4">Our Services</h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Providing master-level environmental control for every corner of your living space.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => (
          <div 
            key={index} 
            className="bg-surface-container-low p-8 rounded-2xl hover:bg-surface-container transition-all group border border-transparent hover:border-outline-variant/20 atmospheric-shadow-hover animate-in fade-in slide-in-from-bottom duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">{service.icon}</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-on-surface">{service.name}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ServicesBento;
