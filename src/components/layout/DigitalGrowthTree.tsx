import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DigitalGrowthTree: React.FC = () => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    // We select elements by class
    const leaves = Array.from(document.querySelectorAll('.interactive-leaf')) as SVGGElement[];
    const nodes = Array.from(document.querySelectorAll('.circuit-node')) as SVGGElement[];
    const paths = Array.from(document.querySelectorAll('.circuit-path')) as SVGPathElement[];

    const leafStates = leaves.map(() => ({
      x: 0, y: 0, scale: 1, rot: 0,
      vx: 0, vy: 0, vscale: 0, vrot: 0,
      idleTime: Math.random() * 100 // for idle breathing offset
    }));

    const nodeStates = nodes.map(() => ({
      lastPulse: 0,
      brightness: 1,
      vBrightness: 0
    }));

    const handleMouseMove = (e: MouseEvent) => {
      isHovering = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // For touch devices, disable proximity tracking
    const handleTouch = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    const update = (time: number) => {
      const stiffness = 0.12;
      const damping = 0.82;

      // Update leaves
      leaves.forEach((leaf, i) => {
        const state = leafStates[i];
        let targetX = 0, targetY = 0, targetScale = 1, targetRot = 0;

        // Idle animation
        const idleMotion = Math.sin(time * 0.001 + state.idleTime) * 1.5;
        targetX += idleMotion * 0.5;
        targetY += idleMotion;
        targetRot += idleMotion * 0.5;

        if (isHovering && containerRef.current) {
          const rect = leaf.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = 120;
          if (dist < interactionRadius) {
            const intensity = Math.pow(1 - dist / interactionRadius, 1.5);
            targetX += (dx / dist) * intensity * -3; 
            targetY += -8 * intensity; 
            targetScale += 0.03 * intensity;
            targetRot += (dx > 0 ? -4 : 4) * intensity;
          }
        }

        state.vx += (targetX - state.x) * stiffness;
        state.vy += (targetY - state.y) * stiffness;
        state.vscale += (targetScale - state.scale) * stiffness;
        state.vrot += (targetRot - state.rot) * stiffness;

        state.vx *= damping;
        state.vy *= damping;
        state.vscale *= damping;
        state.vrot *= damping;

        state.x += state.vx;
        state.y += state.vy;
        state.scale += state.vscale;
        state.rot += state.vrot;

        leaf.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale}) rotate(${state.rot}deg)`;
      });

      // Update nodes (circuit pulses)
      nodes.forEach((node, i) => {
        const state = nodeStates[i];
        let targetBrightness = 1;

        // Idle breathing
        targetBrightness += Math.sin(time * 0.002 + i) * 0.2;

        if (isHovering && containerRef.current) {
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
          
          if (dist < 100) {
            targetBrightness += 0.8;
            
            // Trigger pulse if cooldown passed
            if (time - state.lastPulse > 1500) {
              state.lastPulse = time;
              // Animate corresponding path if exists
              if (paths[i]) {
                const path = paths[i];
                path.style.transition = 'none';
                path.style.strokeDashoffset = '100';
                path.style.opacity = '1';
                
                // Force reflow
                void path.getBoundingClientRect();
                
                path.style.transition = 'stroke-dashoffset 0.8s ease-out, opacity 0.8s ease-in';
                path.style.strokeDashoffset = '0';
                setTimeout(() => {
                  if (path) path.style.opacity = '0';
                }, 800);
              }
            }
          }
        }

        state.vBrightness += (targetBrightness - state.brightness) * 0.1;
        state.vBrightness *= 0.8;
        state.brightness += state.vBrightness;

        const circle = node.querySelector('circle');
        if (circle) {
          circle.style.opacity = Math.max(0, Math.min(1, state.brightness * 0.6)).toString();
          circle.setAttribute('r', (4 + state.brightness * 1.5).toString());
        }
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Framer motion variants for scroll entrance
  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-end select-none pointer-events-auto">
      <svg
        ref={containerRef}
        viewBox="0 0 350 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[850px] overflow-visible"
        style={{ filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.15))' }}
      >
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="stem-gradient" x1="0" y1="800" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="circuit-pulse-grad" x1="0%" y1="100%" x2="0%" y2="0%">
             <stop offset="0%" stopColor="transparent" />
             <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.g
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-10%" }}
           transition={{ staggerChildren: 0.2 }}
        >
          {/* Particles Background */}
          <motion.g variants={fadeIn} transition={{ duration: 2, delay: 1 }} className="opacity-50">
            <circle cx="280" cy="150" r="1.5" fill="#a855f7" className="animate-pulse" style={{ animationDuration: '4s' }} />
            <circle cx="100" cy="250" r="1" fill="#2dd4bf" className="animate-pulse" style={{ animationDuration: '5s' }} />
            <circle cx="200" cy="450" r="2" fill="#7c3aed" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <circle cx="250" cy="650" r="1.5" fill="#a855f7" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }} />
            <circle cx="80" cy="100" r="1" fill="#8b5cf6" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
            <circle cx="150" cy="300" r="1.5" fill="#2dd4bf" className="animate-pulse" style={{ animationDuration: '7s' }} />
          </motion.g>

          {/* Base soft glow */}
          <motion.circle 
            variants={fadeIn} 
            transition={{ duration: 2 }}
            cx="220" cy="780" r="60" 
            fill="#7c3aed" opacity="0.05" filter="url(#node-glow)" 
          />

          {/* MAIN STEM */}
          <motion.path
            variants={drawLine}
            transition={{ duration: 1.8, ease: "easeOut" }}
            d="M 220 800 C 220 700, 190 600, 200 450 C 210 300, 260 200, 230 50"
            stroke="url(#stem-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* BOTTOM SECTION (Learning) - Simple organic branches */}
          <g id="bottom-section">
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "easeOut" }} d="M 206 650 Q 250 620, 270 590" stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "easeOut" }} d="M 197 580 Q 140 570, 120 540" stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 270 590 Q 285 580, 290 565 Q 275 570, 270 590" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 120 540 Q 100 525, 95 505 Q 110 520, 120 540" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1" />
            </motion.g>
          </g>

          {/* MIDDLE SECTION (Building/Experience) - Organic transforming to tech */}
          <g id="middle-section">
            <motion.path variants={drawLine} transition={{ duration: 1.2, ease: "easeOut" }} d="M 203 480 C 260 450, 270 380, 290 350" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
            <motion.path variants={drawLine} transition={{ duration: 1.2, ease: "easeOut" }} d="M 202 400 C 140 390, 110 330, 90 280" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            
            {/* Circuit traces growing from branches */}
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "linear" }} d="M 290 350 L 310 330 L 310 290" stroke="#a855f7" strokeWidth="1" fill="none" strokeLinecap="square" />
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "linear" }} d="M 90 280 L 70 260 L 50 260" stroke="#8b5cf6" strokeWidth="1" fill="none" strokeLinecap="square" />
            
            {/* Pulse Paths (hidden by default) */}
            <path className="circuit-path" d="M 290 350 L 310 330 L 310 290" stroke="url(#circuit-pulse-grad)" strokeWidth="2" fill="none" opacity="0" strokeDasharray="100" strokeDashoffset="100" />
            <path className="circuit-path" d="M 90 280 L 70 260 L 50 260" stroke="url(#circuit-pulse-grad)" strokeWidth="2" fill="none" opacity="0" strokeDasharray="100" strokeDashoffset="100" />

            {/* Circuit Nodes */}
            <motion.g variants={fadeIn} transition={{ duration: 0.5 }} className="circuit-node">
               <circle cx="310" cy="290" r="4" fill="#09070f" stroke="#a855f7" strokeWidth="2" filter="url(#node-glow)" />
               <circle cx="310" cy="290" r="2" fill="#c084fc" opacity="0.6" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.5 }} className="circuit-node">
               <circle cx="50" cy="260" r="4" fill="#09070f" stroke="#a855f7" strokeWidth="2" filter="url(#node-glow)" />
               <circle cx="50" cy="260" r="2" fill="#2dd4bf" opacity="0.6" />
            </motion.g>

            {/* Middle Leaves */}
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 270 380 Q 280 350, 305 345 Q 285 365, 270 380" fill="rgba(168, 85, 247, 0.4)" stroke="#a855f7" strokeWidth="1" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 110 330 Q 90 300, 75 310 Q 95 320, 110 330" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="1" />
            </motion.g>
          </g>

          {/* TOP SECTION (Professional Growth) - Complex, geometric and organic blend */}
          <g id="top-section">
            <motion.path variants={drawLine} transition={{ duration: 1.4, ease: "easeOut" }} d="M 215 250 C 270 230, 290 150, 270 90" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <motion.path variants={drawLine} transition={{ duration: 1.4, ease: "easeOut" }} d="M 230 180 C 160 160, 130 100, 140 50" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "linear" }} d="M 270 90 L 290 70 L 320 70" stroke="#2dd4bf" strokeWidth="1.5" fill="none" strokeLinecap="square" />
            <motion.path variants={drawLine} transition={{ duration: 1, ease: "linear" }} d="M 140 50 L 120 30 L 120 10" stroke="#c084fc" strokeWidth="1" fill="none" strokeLinecap="square" />
            
            <path className="circuit-path" d="M 270 90 L 290 70 L 320 70" stroke="url(#circuit-pulse-grad)" strokeWidth="2.5" fill="none" opacity="0" strokeDasharray="100" strokeDashoffset="100" />
            <path className="circuit-path" d="M 140 50 L 120 30 L 120 10" stroke="url(#circuit-pulse-grad)" strokeWidth="2" fill="none" opacity="0" strokeDasharray="100" strokeDashoffset="100" />

            <motion.g variants={fadeIn} transition={{ duration: 0.5 }} className="circuit-node">
               <circle cx="320" cy="70" r="5" fill="#09070f" stroke="#2dd4bf" strokeWidth="2" filter="url(#node-glow)" />
               <circle cx="320" cy="70" r="2.5" fill="#2dd4bf" opacity="0.8" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.5 }} className="circuit-node">
               <circle cx="120" cy="10" r="4" fill="#09070f" stroke="#c084fc" strokeWidth="2" filter="url(#node-glow)" />
               <circle cx="120" cy="10" r="2" fill="#c084fc" opacity="0.6" />
            </motion.g>

            {/* Top Leaves */}
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 270 150 Q 300 130, 310 100 Q 285 110, 270 150" fill="rgba(45, 212, 191, 0.25)" stroke="#2dd4bf" strokeWidth="1" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 160 110 Q 130 90, 110 70 Q 140 75, 160 110" fill="rgba(192, 132, 252, 0.3)" stroke="#c084fc" strokeWidth="1" />
            </motion.g>
            <motion.g variants={fadeIn} transition={{ duration: 0.8 }} className="interactive-leaf" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
               <path d="M 230 50 Q 250 20, 240 0 Q 220 20, 230 50" fill="rgba(168, 85, 247, 0.35)" stroke="#a855f7" strokeWidth="1" />
            </motion.g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
};

export default DigitalGrowthTree;
