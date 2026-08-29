import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ParallaxProps {
  children: (offsets: { x: number; y: number }) => React.ReactNode;
}

export const Parallax: React.FC<ParallaxProps> = ({ children }) => {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const targetOffsets = useRef({ x: 0, y: 0 });
  const currentOffsets = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffsets({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      targetOffsets.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth dampening interpolation loop (60fps)
    const update = () => {
      const dx = targetOffsets.current.x - currentOffsets.current.x;
      const dy = targetOffsets.current.y - currentOffsets.current.y;

      currentOffsets.current.x += dx * 0.08; // Dampening factor
      currentOffsets.current.y += dy * 0.08;

      setOffsets({
        x: currentOffsets.current.x,
        y: currentOffsets.current.y,
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return <>{children(offsets)}</>;
};

export default Parallax;
