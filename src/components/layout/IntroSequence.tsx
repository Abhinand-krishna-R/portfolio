import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import { useReducedMotion } from '../../lib/useMediaQuery';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const overlayDelay = reducedMotion ? 0.16 : 1.15;
  const overlayDuration = reducedMotion ? 0.01 : 0.45;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: overlayDuration, delay: overlayDelay, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      aria-hidden="true"
      className="fixed inset-0 z-[500] bg-[#030305] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center select-none">
        <motion.div
          initial={{
            opacity: 0,
            y: reducedMotion ? 0 : 32,
            scale: reducedMotion ? 1 : 0.96,
            filter: reducedMotion ? "blur(0px)" : "blur(18px)",
          }}
          animate={{ 
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{ 
            duration: reducedMotion ? 0.01 : 0.8,
            delay: reducedMotion ? 0 : 0.24,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="filter drop-shadow-[0_0_35px_rgba(124,58,237,0.35)]"
        >
          <Logo size="hero" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroSequence;
