import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

interface Bubble {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

export const Aquarium: React.FC = () => {
  const area = SceneLayout.aquarium;

  const bubbles = useMemo(() => {
    const list: Bubble[] = [];
    for (let i = 0; i < 12; i++) {
      list.push({
        id: i,
        x: 10 + Math.random() * 80,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: 3.5 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 16,
      });
    }
    return list;
  }, []);

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
      }}
    >
      {/* Ambient water shimmer glow */}
      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(72, 187, 120, 0.06) 0%, rgba(49, 151, 149, 0.1) 100%)',
        }}
      />

      {/* Floating Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '105%', x: 0, opacity: 0 }}
          animate={{
            y: '-10%',
            x: [0, b.drift, -b.drift, b.drift / 2],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${b.x}%`,
            bottom: 0,
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default Aquarium;
