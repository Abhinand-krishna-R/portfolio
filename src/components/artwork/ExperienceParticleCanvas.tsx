import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  color: string;
}

interface Props {
  isMobile?: boolean;
  isTablet?: boolean;
}

export const ExperienceParticleCanvas: React.FC<Props> = ({ isMobile = false, isTablet = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let rafId: number;
    let particles: Particle[] = [];
    let isVisible = true;
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;

    const colors = ['#7C5CFF', '#2ED3B7', 'rgba(220, 210, 255, 0.6)'];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      const becameVisible = !isVisible && entry.isIntersecting;
      isVisible = entry.isIntersecting;
      
      // Mobile entrance burst
      if (becameVisible && isMobile && width > 0) {
        for (let i = 0; i < 8; i++) {
          particles.push({
            x: width * 0.2 + Math.random() * (width * 0.6),
            y: height - 20 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 1.5,
            life: 0,
            maxLife: 150 + Math.random() * 100,
            radius: 0.8 + Math.random() * 1.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    });
    io.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Emit particle on move occasionally
      if (Math.random() > 0.6 && particles.length < 35) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 40,
          y: mouseY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1.5 - 0.5,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          radius: 0.5 + Math.random() * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    const handleMouseLeave = () => {
      // Nothing needed
    };

    // Only track if pointer is fine
    const pointerMq = window.matchMedia('(pointer: fine)');
    const handlePointerMq = (e: MediaQueryListEvent) => {
        if (!e.matches) handleMouseLeave();
    };
    pointerMq.addEventListener('change', handlePointerMq);

    if (pointerMq.matches) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Ambient particles
        const maxParticles = isMobile ? 6 : (isTablet ? 12 : 8);
        if (particles.length < maxParticles && Math.random() > (isMobile ? 0.99 : 0.98)) {
           particles.push({
             x: Math.random() * width,
             y: height + 10,
             vx: (Math.random() - 0.5) * 0.5,
             vy: -Math.random() * 0.5 - 0.2,
             life: 0,
             maxLife: 150 + Math.random() * 100,
             radius: 0.5 + Math.random() * 1,
             color: colors[Math.floor(Math.random() * colors.length)]
           });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          
          const progress = p.life / p.maxLife;
          const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha * 0.7;
          ctx.fill();

          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
        ctx.globalAlpha = 1;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      io.disconnect();
      pointerMq.removeEventListener('change', handlePointerMq);
      if (pointerMq.matches) {
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, isTablet]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
    />
  );
};

export default ExperienceParticleCanvas;
