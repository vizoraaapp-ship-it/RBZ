'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../ui/Counter';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  loading?: boolean;
}

export default function StatsCard({ title, value, icon, loading }: StatsCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-8 rounded-[2rem] border border-outline-variant/10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-sm"
    >
      <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <h3 className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">
          {title}
        </h3>
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-inner transition-colors group-hover:bg-primary group-hover:text-white"
        >
          <span className="material-symbols-outlined text-2xl font-black">{icon}</span>
        </motion.div>
      </div>
      
      <div className="relative z-10">
        {loading ? (
          <div className="h-12 w-24 bg-surface-container-low rounded-xl animate-pulse" />
        ) : (
          <div className="text-5xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">
            {typeof value === 'number' ? (
              <Counter value={value} duration={2} />
            ) : (
              value
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
