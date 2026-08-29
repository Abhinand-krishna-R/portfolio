import React from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

export const LampGlow: React.FC = () => {
  const bulb = SceneLayout.lampBulb;
  const light = SceneLayout.lampLight;
  const face = SceneLayout.face;

  return (
    <>
      {/* 0. Night/Moon Glow from Window (Cool Ambient Fill) */}
      <motion.div
        animate={{
          opacity: [0.18, 0.26, 0.18],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '40%',
          height: '65%',
          background: 'radial-gradient(circle at 15% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 55%, transparent 85%)',
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* 1. Cone of Warm Light from Lamp Shade to Desk */}
      <motion.div
        animate={{
          opacity: [0.65, 0.72, 0.65],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: '42%',
          top: '39%',
          width: '28%',
          height: '42%',
          clipPath: 'polygon(84% 0%, 0% 100%, 75% 100%)',
          background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.35) 0%, rgba(253, 224, 71, 0.15) 35%, rgba(251, 191, 36, 0.03) 70%, transparent 100%)',
          filter: 'blur(6px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* 2. Large Desk Warm Wash (Ambient Bounce) */}
      <motion.div
        animate={{
          opacity: [0.55, 0.65, 0.55],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: `${light.x * 100}%`,
          top: `${light.y * 100}%`,
          width: `${light.w * 100}%`,
          height: `${light.h * 100}%`,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 45% 15%, rgba(247, 212, 138, 0.24) 0%, rgba(247, 212, 138, 0.08) 55%, rgba(239, 197, 109, 0.01) 85%, rgba(0,0,0,0) 100%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* 3. Laptop Screen Glow on Character's face & headphones (Cyan/Green reflection) */}
      <motion.div
        animate={{
          opacity: [0.38, 0.48, 0.38],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: `${face.x * 100}%`,
          top: `${face.y * 100}%`,
          width: `${face.w * 100}%`,
          height: `${face.h * 100}%`,
          borderRadius: '40%',
          background: 'radial-gradient(circle at 35% 60%, rgba(34, 197, 94, 0.22) 0%, rgba(56, 189, 248, 0.08) 55%, transparent 80%)',
          mixBlendMode: 'screen',
          filter: 'blur(5px)',
          pointerEvents: 'none',
          zIndex: 11,
        }}
      />

      {/* 4. Lamp Glow highlight on character's back/headphones (Orange Rim Light) */}
      <motion.div
        animate={{
          opacity: [0.45, 0.55, 0.45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: `${(face.x - 0.015) * 100}%`,
          top: `${(face.y - 0.01) * 100}%`,
          width: `${face.w * 100}%`,
          height: `${face.h * 100}%`,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 75% 35%, rgba(253, 186, 116, 0.25) 0%, rgba(251, 146, 60, 0.07) 60%, transparent 85%)',
          mixBlendMode: 'screen',
          filter: 'blur(6px)',
          pointerEvents: 'none',
          zIndex: 11,
        }}
      />

      {/* 5. Bulb Glow inside the lampshade */}
      <div
        style={{
          position: 'absolute',
          left: `${bulb.x * 100}%`,
          top: `${bulb.y * 100}%`,
          width: `${bulb.w * 100}%`,
          height: `${bulb.h * 100}%`,
          pointerEvents: 'none',
          zIndex: 12,
        }}
      >
        <motion.div
          animate={{
            opacity: [0.85, 0.95, 0.85],
            scale: [0.97, 1.03, 0.97],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 12px #FFFFFF, 0 0 24px #F7D48A, 0 0 40px #EFC56D',
          }}
        />
      </div>
    </>
  );
};

export default LampGlow;
