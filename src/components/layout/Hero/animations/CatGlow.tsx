import React from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

export const CatGlow: React.FC = () => {
  const area = SceneLayout.catLamp;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${area.x * 100}%`,
        top: `${area.y * 100}%`,
        width: `${area.w * 100}%`,
        height: `${area.h * 100}%`,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          opacity: [0.35, 0.52, 0.35],
          scale: [0.96, 1.04, 0.96],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '110%',
          borderRadius: '40%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, rgba(139, 92, 246, 0.08) 55%, rgba(0,0,0,0) 80%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
};

export default CatGlow;
