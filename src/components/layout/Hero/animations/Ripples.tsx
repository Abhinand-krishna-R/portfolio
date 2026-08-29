import React from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

export const Ripples: React.FC = () => {
  const area = SceneLayout.waterSurface;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${area.x * 100}%`,
        top: `${area.y * 100}%`,
        width: `${area.w * 100}%`,
        height: `${area.h * 100}%`,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.35,
      }}
    >
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        style={{
          width: '200%',
          height: '100%',
        }}
      >
        {/* Base water wave filled shape */}
        <motion.path
          d="M 0 10 Q 12.5 6, 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10 L 200 20 L 0 20 Z"
          fill="rgba(49, 151, 149, 0.18)"
          animate={{
            x: [0, -100],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Highlight line overlay */}
        <motion.path
          d="M 0 11 Q 12.5 7, 25 11 T 50 11 T 75 11 T 100 11 T 125 11 T 150 11 T 175 11 T 200 11"
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="0.8"
          animate={{
            x: [-100, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
};

export default Ripples;
