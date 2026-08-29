import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

export const CharacterBlink: React.FC = () => {
  const area = SceneLayout.face;
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
        setTimeout(() => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
          }, 110);
        }, 70);
      }, 110);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        triggerBlink();
      }
    }, 2800);

    return () => clearInterval(interval);
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
        userSelect: 'none',
      }}
    >
      {/* Eyelash overlay positioned relative to face area */}
      <div
        style={{
          position: 'absolute',
          left: '13%',
          top: '20%',
          width: '12%',
          height: '5.7%',
        }}
      >
        <motion.svg
          viewBox="0 0 10 6"
          style={{
            width: '100%',
            height: '100%',
            opacity: blink ? 1 : 0,
          }}
          transition={{ duration: 0.04 }}
        >
          <path
            d="M 1,3 Q 5,6 9,3"
            fill="none"
            stroke="#1F1A24"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default CharacterBlink;
