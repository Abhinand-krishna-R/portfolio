import React, { useEffect, useState, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const requestRef = useRef<number>(0);
  const mouseCoords = useRef({ targetX: -1000, targetY: -1000, currentX: -1000, currentY: -1000 });
  const initialized = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.targetX = e.clientX;
      mouseCoords.current.targetY = e.clientY;
      
      if (!initialized.current) {
        initialized.current = true;
        mouseCoords.current.currentX = e.clientX;
        mouseCoords.current.currentY = e.clientY;
        setIsHovering(true);
      }
    };

    const updateGlowPosition = () => {
      if (initialized.current) {
        const coords = mouseCoords.current;
        coords.currentX += (coords.targetX - coords.currentX) * 0.08;
        coords.currentY += (coords.targetY - coords.currentY) * 0.08;
        setMousePos({ x: coords.currentX, y: coords.currentY });
      }
      requestRef.current = requestAnimationFrame(updateGlowPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updateGlowPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 w-screen h-screen overflow-hidden bg-[var(--color-bg-primary)] pointer-events-none">
      
      {/* Layer 2 & Layer 6: Vignette and Soft Gradients */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      />

      {/* Faint ambient grid layer (10% opacity) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ambient-grid" width="180" height="180" patternUnits="userSpaceOnUse">
            <path d="M 0 90 Q 45 45 90 90 T 180 90" fill="none" stroke="#9F7AEA" strokeWidth="0.75" />
            <path d="M 90 0 Q 135 45 90 90 T 90 180" fill="none" stroke="#B794F4" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="90" cy="90" r="2" fill="#9F7AEA" />
            <circle cx="45" cy="45" r="1" fill="#B794F4" />
            <circle cx="135" cy="135" r="1" fill="#B794F4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ambient-grid)" />
        </svg>
      </div>

      {/* Layer 3: Subtle Noise */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        style={{
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 5: Cursor Lighting - Drastically reduced */}
      {isHovering && (
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-10"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.03) 0%, transparent 70%)',
            left: mousePos.x,
            top: mousePos.y,
            opacity: 1,
          }}
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
