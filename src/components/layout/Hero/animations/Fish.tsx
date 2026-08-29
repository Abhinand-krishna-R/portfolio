import React from 'react';
import SceneLayout from '../SceneLayout';

export const Fish: React.FC = () => {
  const area = SceneLayout.fishArea;

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
      <style>{`
        @keyframes swimRight {
          0% { left: -15%; transform: scaleX(1) translateY(0); }
          45% { transform: scaleX(1) translateY(-6px); }
          50% { left: 115%; transform: scaleX(-1) translateY(0); }
          95% { transform: scaleX(-1) translateY(6px); }
          100% { left: -15%; transform: scaleX(1) translateY(0); }
        }
        @keyframes swimLeft {
          0% { right: -15%; transform: scaleX(1) translateY(0); }
          45% { transform: scaleX(1) translateY(4px); }
          50% { right: 115%; transform: scaleX(-1) translateY(0); }
          95% { transform: scaleX(-1) translateY(-4px); }
          100% { right: -15%; transform: scaleX(1) translateY(0); }
        }
      `}</style>

      {/* Fish 1 (Neon Cyan) */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          width: '16px',
          height: '8px',
          animation: 'swimRight 18s linear infinite',
          willChange: 'left, transform',
        }}
      >
        <svg viewBox="0 0 20 10" width="100%" height="100%">
          {/* Tail Fin */}
          <path d="M 4 5 L 0 2 L 0 8 Z" fill="#319795" />
          {/* Fish Body */}
          <path d="M 4 5 C 8 2, 16 2, 20 5 C 16 8, 8 8, 4 5 Z" fill="#4FD1C5" />
          {/* Glowing Stripe */}
          <path d="M 8 5 L 16 5" stroke="#E6FFFA" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Fish 2 (Warm Orange) */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          width: '14px',
          height: '7px',
          animation: 'swimLeft 26s linear infinite',
          willChange: 'right, transform',
        }}
      >
        <svg viewBox="0 0 20 10" width="100%" height="100%">
          {/* Tail Fin */}
          <path d="M 16 5 L 20 2 L 20 8 Z" fill="#DD6B20" />
          {/* Fish Body */}
          <path d="M 16 5 C 12 2, 4 2, 0 5 C 4 8, 12 8, 16 5 Z" fill="#ED8936" />
          {/* Glowing Stripe */}
          <path d="M 12 5 L 4 5" stroke="#FFFAF0" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default Fish;
