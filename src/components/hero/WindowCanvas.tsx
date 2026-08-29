import React, { useEffect, useRef } from 'react';

interface WindowCanvasProps {
  debug?: boolean;
}

export const WindowCanvas: React.FC<WindowCanvasProps> = ({ debug }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastTime = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Star {
      x: number; y: number;
      size: number;
      baseOpacity: number;
      phase: number; speed: number;
    }

    interface ShootingStar {
      active: boolean;
      x: number; y: number;
      length: number; angle: number;
      speed: number; opacity: number;
    }

    const stars: Star[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.8, // keep mostly in upper sky
      size: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    const shootingStar: ShootingStar = {
      active: false,
      x: 0, y: 0,
      length: 0, angle: 0,
      speed: 0, opacity: 0
    };

    let nextShootingStarTime = performance.now() + (Math.random() * 30000 + 30000); // 30-60s

    const draw = (timestamp: number) => {
      if (!isVisible) return;
      
      // Throttle to approx 30fps
      if (timestamp - lastTime < 33) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach(star => {
        star.phase += star.speed;
        const twinkle = Math.sin(star.phase) * 0.4 + 0.6; // 0.2 to 1.0 multiplier
        const currentOpacity = star.baseOpacity * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Handle shooting star
      if (!shootingStar.active && timestamp > nextShootingStarTime) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * canvas.width * 0.5;
        shootingStar.y = Math.random() * canvas.height * 0.3;
        shootingStar.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // mostly 45 deg down-right
        shootingStar.speed = Math.random() * 15 + 15;
        shootingStar.length = Math.random() * 40 + 30;
        shootingStar.opacity = 1;
        
        nextShootingStarTime = timestamp + (Math.random() * 30000 + 30000);
      }

      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.05;

        if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar.active = false;
        } else {
          const grad = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y, 
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length, 
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

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
      className="absolute"
      style={{
        left: '5%',
        top: '10%',
        width: '15%',
        height: '35%',
        outline: debug ? '2px solid yellow' : 'none',
        backgroundColor: debug ? 'rgba(255, 255, 0, 0.08)' : 'transparent',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
};

export default WindowCanvas;
