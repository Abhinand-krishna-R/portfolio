import React from 'react';
import { motion } from 'framer-motion';

export interface PhoneMockupProps {
  imageSrc: string;
  alt: string;
  className?: string;
  animate?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  imageSrc,
  alt,
  className = '',
  animate = true,
}) => {
  const mockupProps = animate
    ? {
        animate: { y: [0, -6, 0] },
        transition: {
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  return (
    <motion.div
      className={`relative mx-auto w-[250px] sm:w-[280px] aspect-[9/19] bg-neutral-950 border-[10px] border-neutral-900 rounded-[36px] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-neutral-800 ${className}`}
      {...mockupProps}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-neutral-950 rounded-full absolute right-3" />
      </div>

      {/* Screen Content Wrapper */}
      <div className="relative w-full h-full bg-neutral-900 overflow-hidden z-10">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
        />
        {/* Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-60 pointer-events-none z-15" />
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-neutral-800 rounded-full z-20" />
    </motion.div>
  );
};

export default PhoneMockup;
