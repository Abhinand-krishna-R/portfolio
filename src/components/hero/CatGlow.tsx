import React, { useEffect, useState } from 'react';

interface CatGlowProps {
  debug?: boolean;
}

export const CatGlow: React.FC<CatGlowProps> = ({ debug }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div 
      className="absolute hidden md:flex"
      style={{
        left: '92%',
        top: '52%',
        width: '5%',
        height: '10%',
        outline: debug ? '2px solid purple' : 'none',
        backgroundColor: debug ? 'rgba(128, 0, 128, 0.2)' : 'transparent',
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 6,
      }}
    >
      <style>
        {`
          @keyframes catPulse {
            0% { opacity: 0.65; transform: scale(0.98); }
            100% { opacity: 0.9; transform: scale(1.02); }
          }
          .animate-cat-glow {
            animation: catPulse 6s ease-in-out infinite alternate;
          }
        `}
      </style>
      <div 
        className={prefersReducedMotion ? '' : 'animate-cat-glow'}
        style={{
          width: '150%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 40%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          opacity: prefersReducedMotion ? 0.75 : undefined,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default CatGlow;
