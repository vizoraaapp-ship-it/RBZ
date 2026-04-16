'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tonal' | 'surface';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: string;
  href?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none gap-2 rounded-xl';
  
  const variants = {
    primary: 'bg-accent text-white hover:brightness-90 shadow-lg shadow-accent/20',
    secondary: 'border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10',
    outline: 'border-2 border-primary/30 text-primary hover:bg-primary/5',
    ghost: 'text-primary hover:bg-primary/5',
    tonal: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
    surface: 'bg-surface-container-lowest text-primary hover:bg-surface-container-low shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl font-black',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const motionProps: any = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const content = (
    <>
      {icon && <span className="material-symbols-outlined text-[inherit]">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    const MotionLink = motion.create(Link as any);
    return (
      <MotionLink href={href} className={combinedClasses} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      className={combinedClasses} 
      {...motionProps}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};

export default Button;
