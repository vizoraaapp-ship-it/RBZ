'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface AutoSliderProps {
  children: React.ReactNode[];
  interval?: number;
  className?: string;
  itemClassName?: string;
  showDots?: boolean;
}

const AutoSlider: React.FC<AutoSliderProps> = ({ 
  children, 
  interval = 4000, 
  className = "",
  itemClassName = "w-[85vw]", 
  showDots = true
}) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % children.length);
  }, [children.length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + children.length) % children.length);
  }, [children.length]);

  // Handle timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, interval]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
    // Briefly pause after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div 
      className={`relative overflow-hidden w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        className="flex"
        animate={{ x: `calc(-${index * 85}vw - ${index * 1}rem)` }} // 85vw width + 1rem gap
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ gap: "1rem" }}
      >
        {children.map((child, i) => (
          <div 
            key={i} 
            className={`flex-shrink-0 select-none ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </motion.div>

      {showDots && children.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 2000);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === i ? "w-8 bg-primary" : "w-1.5 bg-primary/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoSlider;
