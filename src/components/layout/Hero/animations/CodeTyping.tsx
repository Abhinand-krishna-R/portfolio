import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SceneLayout from '../SceneLayout';

export const CodeTyping: React.FC = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const area = SceneLayout.laptopScreen;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % 5);
    }, 6000);
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
        transform: 'rotate(-1.2deg) skewY(1.2deg)',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'hidden',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2px',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Editor Content */}
      <motion.div
        animate={{
          y: -scrollIndex * 2.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 14,
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
        }}
      >
        {Array.from({ length: 9 }).map((_, idx) => {
          const widths = [16, 26, 34, 12, 22, 28, 14, 25, 18];
          const colors = [
            'rgba(34, 197, 94, 0.8)', // Green
            'rgba(168, 85, 247, 0.75)', // Purple
            'rgba(244, 114, 182, 0.75)', // Pink
            'rgba(255, 255, 255, 0.65)', // White
          ];
          const width = widths[idx % widths.length];
          const color = colors[idx % colors.length];

          return (
            <div
              key={idx}
              style={{
                height: '1.2px',
                width: `${width}%`,
                backgroundColor: color,
                borderRadius: '0.2px',
                marginLeft: idx % 3 === 2 ? '4px' : '1px',
              }}
            />
          );
        })}
      </motion.div>

      {/* Blinking terminal cursor */}
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '2px',
          width: '2px',
          height: '2px',
          backgroundColor: '#22C55E',
          boxShadow: '0 0 2px #22C55E',
          animation: 'cursorBlink 900ms steps(1) infinite',
        }}
      />
    </div>
  );
};

export default CodeTyping;
