import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCard {
  title: string;
  description: string;
  image: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCard> = ({ title, description, image, icon }) => {
  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden atmospheric-shadow-hover transition-all duration-300 flex flex-col h-full border border-outline-variant/10">
      <div className="h-64 bg-slate-200 relative overflow-hidden shrink-0">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary/90 text-white p-2 rounded-lg shadow-lg">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-headline text-2xl font-bold mb-3 text-on-surface">{title}</h3>
        <p className="text-on-surface-variant mb-6 leading-relaxed flex-grow">{description}</p>
        <Link href="/contact" className="text-primary font-bold flex items-center group/link mt-auto">
          Explore Service <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
