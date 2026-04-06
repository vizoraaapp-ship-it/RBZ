import React from 'react';
import Section from '../ui/Section';

const VALUES = [
  {
    title: "Genuine Second Opinion",
    description: "Honest, unbiased advice to help you make the right HVAC decisions. We prioritize your needs over sales targets.",
    icon: "verified_user",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "No Gender Discrimination Policy",
    description: "Equal respect and opportunities for everyone, without bias. We foster an inclusive environment for our team and clients.",
    icon: "diversity_3",
    color: "bg-purple-50 text-purple-600"
  }
];

const OurValues = () => {
  return (
    <Section background="surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h2 className="font-headline text-4xl md:text-5xl font-black text-on-surface mb-4">Our Core Values</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            More than just a service provider, we are committed to integrity, equality, and professional honesty in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((val, index) => (
            <div 
              key={index} 
              className="group p-8 md:p-12 bg-white rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_rgba(43,91,181,0.08)] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 ${val.color} rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                <span className="material-symbols-outlined text-3xl font-bold">{val.icon}</span>
              </div>
              
              <h3 className="font-headline text-2xl md:text-3xl font-black text-on-surface mb-6 group-hover:text-primary transition-colors">
                {val.title}
              </h3>
              
              <p className="font-body text-lg text-on-surface-variant leading-relaxed font-semibold opacity-90">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default OurValues;
