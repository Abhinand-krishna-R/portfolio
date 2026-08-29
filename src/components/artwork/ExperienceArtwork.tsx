import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExperienceParticleCanvas } from './ExperienceParticleCanvas';

interface Props {
  isMobile?: boolean;
  isTablet?: boolean;
}

export const ExperienceArtwork: React.FC<Props> = ({ isMobile = false, isTablet = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const uiLinesRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 30]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [isMobile ? 0.55 : 0.6, isMobile ? 0.9 : 1]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 0.98 : 1, isMobile ? 1.015 : 1]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMq = window.matchMedia('(pointer: fine)');
    
    // Disable complex effects on reduced motion, or if we are on mobile (no fine pointer)
    if (mq.matches || isMobile || !pointerMq.matches) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetX = -1000;
    let targetY = -1000;
    let maskOpacity = 0;
    let targetMaskOpacity = 0;
    let isHovering = false;

    // Parallax
    let parallaxX = 0;
    let parallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isHovering = true;
      targetMaskOpacity = 1;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetMaskOpacity = 0;
    };

    // Use global window for mouse move so tracking works even just outside
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const update = (time: number) => {
      // Smooth cursor follow for mask
      if (mouseX === -1000) {
        mouseX = targetX;
        mouseY = targetY;
      } else {
        mouseX += (targetX - mouseX) * 0.15;
        mouseY += (targetY - mouseY) * 0.15;
      }

      maskOpacity += (targetMaskOpacity - maskOpacity) * 0.1;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        
        // Parallax
        if (isHovering && targetX >= -50 && targetX <= rect.width + 50 && targetY >= -50 && targetY <= rect.height + 50) {
           const normX = (targetX / rect.width) * 2 - 1;
           const normY = (targetY / rect.height) * 2 - 1;
           parallaxX += (normX * -4 - parallaxX) * 0.1;
           parallaxY += (normY * -5 - parallaxY) * 0.1;
        } else {
           parallaxX += (0 - parallaxX) * 0.05;
           parallaxY += (0 - parallaxY) * 0.05;
           targetMaskOpacity = 0; // Fade out mask if left the container area broadly
        }

        // Apply parallax and breathing to main container inner
        const inner = containerRef.current.querySelector('.artwork-parallax-inner') as HTMLElement;
        if (inner) {
           const breathingScale = 1 + Math.sin(time * 0.001) * 0.004;
           inner.style.transform = `translate(${parallaxX}px, ${parallaxY}px) rotateZ(${parallaxX * 0.1}deg) scale(${breathingScale})`;
        }

        // Apply mask
        if (maskLayerRef.current) {
           maskLayerRef.current.style.opacity = maskOpacity.toString();
           maskLayerRef.current.style.maskImage = `radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.8) 35%, transparent 75%)`;
           maskLayerRef.current.style.webkitMaskImage = `radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, black 0%, rgba(0,0,0,0.8) 35%, transparent 75%)`;
        }

        // UI lines activation zone logic (approx central region)
        const normY = targetY / rect.height;
        if (isHovering && targetMaskOpacity > 0 && normY > 0.4 && normY < 0.6 && uiLinesRef.current) {
           uiLinesRef.current.style.opacity = '1';
        } else if (uiLinesRef.current) {
           uiLinesRef.current.style.opacity = '0';
        }
      }

      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const drawPulse: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: [0, 1, 1], 
      opacity: [0, 0.8, 0],
      transition: { 
        duration: 1.2, 
        times: [0, 0.6, 1],
        repeat: Infinity, 
        repeatDelay: 6 + Math.random() * 4,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="experience-artwork-root relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      style={{ y: scrollY, opacity: scrollOpacity, scale: scrollScale, maxHeight: isMobile ? 'none' : '850px' }}
    >
      <div className="artwork-parallax-inner relative w-full h-full flex items-center justify-center">
        
        {/* Layer 1: Ambient Glow */}
        <div className={`ambient-glow absolute inset-0 mix-blend-screen filter blur-[60px] rounded-full animate-pulse ${isMobile ? 'bg-purple-900/5' : 'bg-purple-900/10'}`} style={{ animationDuration: '10s' }} />

        {/* Layer 2: Base Artwork Image */}
        <motion.div
           className="artwork-image-wrapper absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
           initial={{ opacity: isMobile ? 0.25 : 0, y: isMobile ? 24 : 20, scale: isMobile ? 0.96 : 1 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative flex justify-center items-center" style={{ width: isMobile ? 'clamp(240px, 68vw, 340px)' : '100%', height: isMobile ? 'auto' : '100%' }}>
            <img
              src="/assets/Expart.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="w-full h-full object-contain filter brightness-[0.82] saturate-[0.9] contrast-[1.05] opacity-80"
            />
            
            {/* Mobile Illumination Sweep */}
            {isMobile && (
              <motion.div 
                 className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent mix-blend-screen"
                 initial={{ top: '100%', bottom: '0%' }}
                 whileInView={{ top: '-20%', bottom: '120%' }}
                 transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                 viewport={{ once: true }}
              />
            )}
          </div>
        </motion.div>

        {/* Layer 3: Localized Cursor Illumination Overlay (Desktop Only) */}
        {!isMobile && (
          <div 
            ref={maskLayerRef}
            className="cursor-light-layer absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0 }}
          >
            <img
              src="/assets/Expart.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="w-full h-full object-contain filter brightness-[1.15] saturate-[1.1] contrast-[1.05]"
            />
          </div>
        )}

        {/* Layer 4: Energy Pulse Overlays (SVG Paths) */}
        <svg className="energy-layer absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid meet">
           <defs>
              <linearGradient id="energy-grad" x1="0" y1="1" x2="0" y2="0">
                 <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0" />
                 <stop offset="50%" stopColor="#2ED3B7" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
           </defs>
           <motion.path 
             d="M 200 700 C 220 600, 180 500, 200 400" 
             stroke="url(#energy-grad)" strokeWidth="2" fill="none"
             variants={drawPulse} initial="hidden" whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
           />
           <motion.path 
             d="M 200 400 C 240 300, 150 200, 200 100" 
             stroke="url(#energy-grad)" strokeWidth="1.5" fill="none"
             variants={drawPulse} initial="hidden" whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             style={{ animationDelay: '2s' }}
           />
        </svg>

        {/* Layer 6: Foreground UI Light Accents */}
        <motion.div 
           ref={uiLinesRef} 
           className={`absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10 transition-opacity duration-[700ms] ${isMobile ? 'opacity-0' : 'opacity-0'}`}
           initial={isMobile ? { opacity: 0 } : undefined}
           whileInView={isMobile ? { opacity: [0, 0.8, 0] } : undefined}
           viewport={{ once: true, amount: 0.5 }}
           transition={isMobile ? { duration: 1.5, delay: 0.5 } : undefined}
        >
           <div className="w-[120px] h-[1px] bg-cyan-400/50 mb-4 shadow-[0_0_8px_#2dd4bf]" />
           <div className="w-[80px] h-[1px] bg-purple-400/50 ml-6 shadow-[0_0_8px_#c084fc]" />
        </motion.div>

        {/* Layer 5: Canvas Particles */}
        <ExperienceParticleCanvas isMobile={isMobile} isTablet={isTablet} />
      </div>
    </motion.div>
  );
};

export default ExperienceArtwork;
