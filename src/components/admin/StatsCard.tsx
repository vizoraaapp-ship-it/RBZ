'use client';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  loading?: boolean;
}

export default function StatsCard({ title, value, icon, loading }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">
          {title}
        </h3>
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="h-10 w-24 bg-surface-container-low rounded animate-pulse" />
        ) : (
          <p className="text-4xl font-black text-on-surface">{value}</p>
        )}
      </div>
    </div>
  );
}
