import React from 'react';
import { motion } from 'framer-motion';

export const AssemblingPhone: React.FC = () => {
  return (
    <div className="relative w-[260px] sm:w-[290px] aspect-[9/19] select-none flex items-center justify-center">
      
      {/* Layer 1: Shadow - fades and scales in first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, filter: "blur(20px)" }}
        animate={{ opacity: 0.75, scale: 1, filter: "blur(24px)" }}
        transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
        className="absolute -bottom-8 w-[95%] h-[20px] bg-black/90 rounded-full z-0"
      />

      {/* Layer 2: Phone Outer Frame - rotates and slides in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotateY: 85 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-neutral-900 border-[10px] border-neutral-950 rounded-[44px] ring-1 ring-neutral-800/80 z-10 shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Layer 3: Screen Background - expands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute inset-0 bg-[#0c0d14] z-11"
        />

        {/* Layer 4: Screen Content UI - slides up from below */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-12 overflow-hidden"
        >
          <img
            src="assets/project-1.png"
            alt="SerenitySpace HUD"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </motion.div>

        {/* Layer 5: Dynamic Island Notch - appears */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-950 rounded-full z-20 flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full absolute right-3" />
        </motion.div>

        {/* Layer 6: Glass Reflection Overlay - sweeps and sweeps across */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-30 pointer-events-none z-15"
        />
      </motion.div>

      {/* Floating HUD ambient grid lines behind */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.25, scale: 1.05 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute inset-0 -m-8 border border-dashed border-accent-purple/20 rounded-[52px] pointer-events-none -z-10"
      />
    </div>
  );
};

export default AssemblingPhone;
