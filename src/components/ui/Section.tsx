import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: 'white' | 'surface' | 'high' | 'highest' | 'primary' | 'primary-dim' | 'secondary' | 'none';
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  id,
  background = 'none',
  fullWidth = false,
}) => {
  const backgrounds = {
    white: 'bg-white',
    surface: 'bg-surface',
    high: 'bg-surface-container-high',
    highest: 'bg-surface-container-highest',
    primary: 'bg-primary text-white',
    'primary-dim': 'bg-primary-dim text-white',
    secondary: 'bg-secondary text-white',
    none: '',
  };

  return (
    <section 
      id={id}
      className={`py-24 md:py-32 overflow-hidden ${backgrounds[background]} ${className}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-6 md:px-8'} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
