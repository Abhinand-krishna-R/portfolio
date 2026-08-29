import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneLayout from '../SceneLayout';

interface Star {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
}

export const ShootingStar: React.FC = () => {
  const area = SceneLayout.window;
  const [star, setStar] = useState<Star | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const triggerStar = () => {
      const newStar: Star = {
        id: counter,
        startX: 10 + Math.random() * 50,
        startY: 5 + Math.random() * 25,
        angle: 35 + Math.random() * 15,
        length: 40 + Math.random() * 30,
      };
      setCounter((c) => c + 1);
      setStar(newStar);

      setTimeout(() => {
        setStar(null);
      }, 1200);
    };

    const initialDelay = 8000 + Math.random() * 6000;
    let timer = setTimeout(function run() {
      triggerStar();
      const nextInterval = 16000 + Math.random() * 14000;
      timer = setTimeout(run, nextInterval);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${area.x * 100}%`,
        top: `${area.y * 100}%`,
        width: `${area.w * 100}%`,
        height: `${area.h * 100}%`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {star && (
          <motion.div
            key={star.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              x: [0, 140],
              y: [0, 140 * Math.tan((star.angle * Math.PI) / 180)],
              opacity: [0, 0.95, 0.95, 0],
              scaleX: [0.2, 1, 1, 0.1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.95,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${star.length}px`,
              height: '1.2px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(186,230,253,1) 90%, rgba(255,255,255,0) 100%)',
              transformOrigin: 'left center',
              rotate: `${star.angle}deg`,
              boxShadow: '0 0 5px rgba(186, 230, 253, 0.7)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShootingStar;
