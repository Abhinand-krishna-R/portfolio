import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export interface TimelineItem {
  id: string;
  title: string;       // e.g., role or degree
  subtitle: string;    // e.g., company or school
  period: string;      // e.g., 2025 - 2026
  details: string[];   // bullets
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of the entire timeline element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  // Apply a smooth spring transition to the scroll line scaling
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className={`relative pl-8 md:pl-12 ${className}`}>
      
      {/* Background Track Line */}
      <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-[2px] bg-neutral-900 rounded-full" />

      {/* Scroll-Drawn Glowing Active Line */}
      <motion.div 
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent-purple via-secondary-cyan to-highlight-pink rounded-full shadow-lg shadow-accent-purple/20"
      />

      <div className="space-y-10">
        {items.map((item, idx) => (
          <div key={item.id} className="relative">
            
            {/* Node Dot indicator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute -left-[32px] md:-left-[40px] top-5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center z-10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            </motion.div>

            {/* Premium Milestone Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -2, scale: 1.01 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 p-6 rounded-xl shadow-xl transition-all group relative overflow-hidden cursor-default"
            >
              {/* Subtle accent hover indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-purple opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-semibold text-neutral-50 text-base leading-snug group-hover:text-secondary-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-500 bg-neutral-900 border border-neutral-850 px-2.5 py-1 rounded w-fit shrink-0">
                  {item.period}
                </span>
              </div>

              {/* Bullet Descriptions */}
              <ul className="list-disc list-outside pl-4 space-y-2 text-xs sm:text-sm text-neutral-450 leading-relaxed">
                {item.details.map((detail, index) => (
                  <li key={index} className="marker:text-neutral-700">
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
