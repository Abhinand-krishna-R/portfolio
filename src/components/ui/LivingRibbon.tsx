import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// ── Catmull-Rom → Cubic Bezier path builder ───────────────────────────────────
interface Pt { x: number; y: number; }

function catmullRom(pts: Pt[], tension = 0.4): string {
  if (pts.length < 2) return '';
  const d: string[] = [`M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) * tension / 3;
    const cp1y = p1.y + (p2.y - p0.y) * tension / 3;
    const cp2x = p2.x - (p3.x - p1.x) * tension / 3;
    const cp2y = p2.y - (p3.y - p1.y) * tension / 3;
    d.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
  }
  return d.join(' ');
}

function getAbsTop(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  return { top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight };
}

// ── Component ─────────────────────────────────────────────────────────────────
export const LivingRibbon: React.FC = () => {
  const [path, setPath]         = useState('');
  const [trackPath, setTrack]   = useState('');
  const [dims, setDims]         = useState({ w: 0, h: 0 });
  const [nodes, setNodes]       = useState<Pt[]>([]);
  const [terminalNode, setTerminalNode] = useState<Pt | null>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });

  const compute = useCallback(() => {
    const W = window.innerWidth;
    const H = document.documentElement.scrollHeight;
    setDims({ w: W, h: H });

    const cx = W * 0.5;
    const L  = W * 0.24;
    const R  = W * 0.76;

    const hero    = getAbsTop('about');
    const proj    = getAbsTop('projects');
    const exp     = getAbsTop('experience');
    const tech    = getAbsTop('tech');
    const contact = getAbsTop('contact');

    const pts: Pt[] = [];
    const newNodes: Pt[] = [];

    // ── Start ──
    pts.push({ x: cx, y: 40 });

    // ── Hero → About ──
    const heroEnd = hero ? hero.top + hero.h : H * 0.22;
    pts.push({ x: cx, y: Math.max(heroEnd - 120, 200) });
    pts.push({ x: cx, y: heroEnd });

    if (proj) {
      const pH = proj.h;
      pts.push({ x: cx, y: proj.top + 60 });
      pts.push({ x: cx + 40, y: proj.top + pH * 0.18 });
      pts.push({ x: R, y: proj.top + pH * 0.28 });
      pts.push({ x: cx, y: proj.top + pH * 0.42 });
      pts.push({ x: cx - 40, y: proj.top + pH * 0.56 });
      pts.push({ x: L, y: proj.top + pH * 0.68 });
      pts.push({ x: cx, y: proj.top + pH * 0.84 });
      pts.push({ x: cx, y: proj.top + pH });
    }

    // ── Experience: nodes on spine ──
    if (exp) {
      const eH = exp.h;
      pts.push({ x: cx, y: exp.top + 40 });
      const n1: Pt = { x: cx, y: exp.top + eH * 0.22 };
      const n2: Pt = { x: cx, y: exp.top + eH * 0.55 };
      const n3: Pt = { x: cx, y: exp.top + eH * 0.84 };
      pts.push(n1); newNodes.push(n1);
      pts.push(n2); newNodes.push(n2);
      pts.push(n3); newNodes.push(n3);
      pts.push({ x: cx, y: exp.top + eH });
    }

    // ── Tech / Skills: subtle wave ──
    if (tech) {
      pts.push({ x: cx, y: tech.top + 40 });
      pts.push({ x: cx + 50, y: tech.top + tech.h * 0.35 });
      pts.push({ x: cx - 30, y: tech.top + tech.h * 0.65 });
      pts.push({ x: cx, y: tech.top + tech.h });
    }

    // ── Contact: terminal node ──
    if (contact) {
      pts.push({ x: cx, y: contact.top + 30 });
      const terminalPt: Pt = { x: cx, y: contact.top + 90 };
      pts.push(terminalPt);
      setTerminalNode(terminalPt);
    } else {
      setTerminalNode(null);
    }

    const mainPath  = catmullRom(pts, 0.45);
    // Faint full track (always visible so user sees the ghost path)
    const trackFull = catmullRom(pts, 0.45);
    setPath(mainPath);
    setTrack(trackFull);
    setNodes(newNodes);
  }, []);

  useEffect(() => {
    // Small timeout lets the DOM settle before measuring
    const id = setTimeout(compute, 120);
    window.addEventListener('resize', compute);
    return () => { clearTimeout(id); window.removeEventListener('resize', compute); };
  }, [compute]);

  if (!path || dims.w === 0) return null;

  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 left-0 pointer-events-none select-none"
      width={dims.w}
      height={dims.h}
      style={{ zIndex: 2 }}
    >
      <defs>
        {/* Vertical gradient along the ribbon */}
        <linearGradient id="lr-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#9F7AEA" stopOpacity="0.2" />
          <stop offset="30%"  stopColor="#9F7AEA" stopOpacity="0.9" />
          <stop offset="65%"  stopColor="#B794F4" stopOpacity="1"   />
          <stop offset="100%" stopColor="#9F7AEA" stopOpacity="0.6" />
        </linearGradient>

        {/* Outer glow */}
        <filter id="lr-glow" x="-50%" y="-5%" width="200%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Node glow */}
        <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Terminal node glow */}
        <filter id="terminal-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ghost track – the future path, always at low opacity */}
      <path
        d={trackPath}
        fill="none"
        stroke="rgba(159,122,234,0.07)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Glow aura behind the drawn ribbon */}
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(159,122,234,0.18)"
        strokeWidth="10"
        strokeLinecap="round"
        filter="url(#lr-glow)"
        style={{ pathLength: springProgress }}
      />

      {/* Main drawn ribbon */}
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="url(#lr-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ pathLength: springProgress }}
      />

      {/* Experience nodes – revealed as ribbon grows through them */}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40%' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          filter="url(#node-glow)"
        >
          {/* Outer ring pulse */}
          <circle cx={n.x} cy={n.y} r={10} fill="none" stroke="rgba(159,122,234,0.2)" strokeWidth="1">
            <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Inner filled dot */}
          <circle cx={n.x} cy={n.y} r={4} fill="#9F7AEA" opacity="0.95" />
          <circle cx={n.x} cy={n.y} r={2} fill="#E9D5FF" />
        </motion.g>
      ))}

      {/* Terminal node at contact */}
      {terminalNode && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          filter="url(#terminal-glow)"
        >
          {/* Pulse rings around the terminal node */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const r = 18;
            return (
              <circle
                key={i}
                cx={terminalNode.x + Math.cos(rad) * r}
                cy={terminalNode.y + Math.sin(rad) * r}
                r={5}
                fill="none"
                stroke="#B794F4"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}
          <circle cx={terminalNode.x} cy={terminalNode.y} r={6} fill="#9F7AEA" opacity="0.9" />
          <circle cx={terminalNode.x} cy={terminalNode.y} r={3} fill="#E9D5FF" />
        </motion.g>
      )}
    </svg>
  );
};

export default LivingRibbon;
