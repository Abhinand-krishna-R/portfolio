import React, { useEffect, useRef } from 'react';

interface AquariumCanvasProps {
  debug?: boolean;
}

export const AquariumCanvas: React.FC<AquariumCanvasProps> = ({ debug }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastTime = 0;

    // Entity definition
    interface Bubble {
      x: number; 
      y: number;
      radius: number; 
      speed: number;
      driftPhase: number;
      driftSpeed: number;
      opacity: number;
    }

    const bubbles: Bubble[] = [];
    
    // Initialize exactly 8 bubbles
    const initBubbles = (width: number, height: number) => {
      bubbles.length = 0; // Clear
      for (let i = 0; i < 8; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.5 + 1.5, // 1.5 to 4 pixels (unscaled)
          speed: Math.random() * 0.35 + 0.15, // 0.15 to 0.5 px/frame at 30 FPS
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.03 + 0.01,
          opacity: Math.random() * 0.3 + 0.25, // 0.25 to 0.55
        });
      }
    };

    // Handle canvas resizing based on CSS size & devicePixelRatio
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Reset transform before applying scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      initBubbles(rect.width, rect.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (timestamp: number) => {
      if (!isVisible) return;
      
      // Throttle to approx 30fps
      if (timestamp - lastTime < 33) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      const rect = canvas.getBoundingClientRect();
      
      // Clear canvas (using unscaled coordinates because ctx is scaled)
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw bubbles
      bubbles.forEach(bubble => {
        bubble.y -= bubble.speed;
        bubble.driftPhase += bubble.driftSpeed;
        const currentX = bubble.x + Math.sin(bubble.driftPhase) * (bubble.radius * 1.5); // Drift amount

        // Bubble body
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.1})`; // Transparent interior
        ctx.strokeStyle = `rgba(180, 240, 255, ${bubble.opacity})`; // Soft white/cyan stroke
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.arc(currentX, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Highlight point
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity + 0.15})`;
        ctx.beginPath();
        ctx.arc(currentX - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Reset if at top
        if (bubble.y < -bubble.radius) {
          bubble.y = rect.height + bubble.radius;
          bubble.x = Math.random() * rect.width;
          bubble.radius = Math.random() * 2.5 + 1.5;
          bubble.speed = Math.random() * 0.35 + 0.15;
          bubble.opacity = Math.random() * 0.3 + 0.25;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Visibility handlers
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute hidden md:block"
      style={{
        // Move top boundary downward to actual water region
        left: '12.5%',
        top: '54%', // adjusted down from 52%
        width: '23%',
        height: '30%', // adjusted down slightly
        outline: debug ? '2px solid cyan' : 'none',
        backgroundColor: debug ? 'rgba(0, 255, 255, 0.08)' : 'transparent',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ display: 'block' }} // Prevent inline margin
        aria-hidden="true"
      />
    </div>
  );
};

export default AquariumCanvas;
