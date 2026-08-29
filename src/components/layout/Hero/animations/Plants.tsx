import React from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

interface PlantsProps {
  dimFactor: number;
}

export const Plants: React.FC<PlantsProps> = ({ dimFactor }) => {
  const left = SceneLayout.leftPlant;
  const middle = SceneLayout.middlePlant;
  const succulent = SceneLayout.succulent;

  return (
    <>
      {/* 1. Left Plant Sway */}
      <div
        style={{
          position: 'absolute',
          left: `${left.x * 100}%`,
          top: `${left.y * 100}%`,
          width: `${left.w * 100}%`,
          height: `${left.h * 100}%`,
          overflow: 'hidden',
          pointerEvents: 'none',
          transformOrigin: 'bottom center',
        }}
      >
        <motion.div
          animate={{
            rotate: [-1.2, 1.2, -1.2],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src="/assets/hero.png"
            alt=""
            style={{
              position: 'absolute',
              left: `-${(left.x / left.w) * 100}%`,
              top: `-${(left.y / left.h) * 100}%`,
              width: `${(1 / left.w) * 100}%`,
              height: `${(1 / left.h) * 100}%`,
              objectFit: 'cover',
              maxWidth: 'none',
              filter: `brightness(${dimFactor * 0.95}) contrast(1.1)`,
            }}
          />
        </motion.div>
      </div>

      {/* 2. Middle (Desk) Plant Sway */}
      <div
        style={{
          position: 'absolute',
          left: `${middle.x * 100}%`,
          top: `${middle.y * 100}%`,
          width: `${middle.w * 100}%`,
          height: `${middle.h * 100}%`,
          overflow: 'hidden',
          pointerEvents: 'none',
          transformOrigin: 'bottom center',
        }}
      >
        <motion.div
          animate={{
            rotate: [-1.5, 1.5, -1.5],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src="/assets/hero.png"
            alt=""
            style={{
              position: 'absolute',
              left: `-${(middle.x / middle.w) * 100}%`,
              top: `-${(middle.y / middle.h) * 100}%`,
              width: `${(1 / middle.w) * 100}%`,
              height: `${(1 / middle.h) * 100}%`,
              objectFit: 'cover',
              maxWidth: 'none',
              filter: `brightness(${dimFactor * 0.95}) contrast(1.1)`,
            }}
          />
        </motion.div>
      </div>

      {/* 3. Succulent Sway */}
      <div
        style={{
          position: 'absolute',
          left: `${succulent.x * 100}%`,
          top: `${succulent.y * 100}%`,
          width: `${succulent.w * 100}%`,
          height: `${succulent.h * 100}%`,
          overflow: 'hidden',
          pointerEvents: 'none',
          transformOrigin: 'bottom center',
        }}
      >
        <motion.div
          animate={{
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src="/assets/hero.png"
            alt=""
            style={{
              position: 'absolute',
              left: `-${(succulent.x / succulent.w) * 100}%`,
              top: `-${(succulent.y / succulent.h) * 100}%`,
              width: `${(1 / succulent.w) * 100}%`,
              height: `${(1 / succulent.h) * 100}%`,
              objectFit: 'cover',
              maxWidth: 'none',
              filter: `brightness(${dimFactor * 0.95}) contrast(1.1)`,
            }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Plants;
