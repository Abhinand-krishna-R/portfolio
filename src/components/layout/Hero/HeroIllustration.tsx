import React from 'react';
import Scene from './Scene';

interface HeroIllustrationProps {
  scrollProgress: number;
  shiftRight?: boolean;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ scrollProgress, shiftRight = false }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#09070F',
        userSelect: 'none',
      }}
    >
      <div
        className="scene-cover-container"
        style={{
          transform: shiftRight ? 'translate(-50%, -50%) translateX(10%)' : 'translate(-50%, -50%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Scene scrollProgress={scrollProgress} />
      </div>
    </div>
  );
};

export default HeroIllustration;
