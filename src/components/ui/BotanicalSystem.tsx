import React from 'react';
import { motion } from 'framer-motion';
import { useVines } from '../../lib/useVines';

interface SecondaryBranchProps {
  d: string;
  duration: number;
  delay: number;
}

interface LeafProps {
  cx: number;
  cy: number;
  rotate: number;
  delay: number;
  scale?: number;
}

interface BranchProps {
  d: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  secondaryBranches?: SecondaryBranchProps[];
  leaves?: LeafProps[];
}

const Leaf: React.FC<LeafProps> = ({ cx, cy, rotate, delay, scale = 1 }) => {
  const { shouldAnimate } = useVines();
  return (
    <motion.g
      transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})`}
      initial={{ scale: shouldAnimate ? 0 : scale, opacity: shouldAnimate ? 0 : 0.65 }}
      animate={{ scale: scale, opacity: 0.65 }}
      transition={{ delay: shouldAnimate ? delay : 0, duration: 0.6, ease: "easeOut" }}
    >
      {/* Soft Purple Glow backing the leaf */}
      <circle cx={0} cy={0} r={4} fill="#7C3AED" opacity={0.3} style={{ filter: 'blur(2px)' }} />
      {/* Custom Minimalist Ink Leaf Path */}
      <path d="M 0,0 C 3,-5 8,-5 10,-2 C 7,2 2,2 0,0" fill="#C084FC" />
    </motion.g>
  );
};

const Branch: React.FC<BranchProps> = ({
  d,
  strokeWidth = 1.2,
  duration = 2.2,
  delay = 0,
  secondaryBranches = [],
  leaves = []
}) => {
  const { shouldAnimate } = useVines();

  const transition = {
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <g>
      {/* Soft Purple Glow Path */}
      <motion.path
        d={d}
        stroke="#7C3AED"
        strokeWidth={strokeWidth + 2.5}
        strokeLinecap="round"
        style={{ filter: 'blur(3px)' }}
        opacity={0.12}
        initial={{ pathLength: shouldAnimate ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />
      {/* core hairline branch */}
      <motion.path
        d={d}
        stroke="#A78BFA"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.45}
        initial={{ pathLength: shouldAnimate ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      />

      {/* Secondary branches */}
      {secondaryBranches.map((sec, idx) => {
        const secTransition = {
          duration: shouldAnimate ? sec.duration : 0,
          delay: shouldAnimate ? (delay + sec.delay) : 0,
          ease: [0.16, 1, 0.3, 1] as const,
        };
        return (
          <g key={idx}>
            <motion.path
              d={sec.d}
              stroke="#7C3AED"
              strokeWidth={strokeWidth + 1.5}
              strokeLinecap="round"
              style={{ filter: 'blur(2.5px)' }}
              opacity={0.1}
              initial={{ pathLength: shouldAnimate ? 0 : 1 }}
              animate={{ pathLength: 1 }}
              transition={secTransition}
            />
            <motion.path
              d={sec.d}
              stroke="#A78BFA"
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
              opacity={0.4}
              initial={{ pathLength: shouldAnimate ? 0 : 1 }}
              animate={{ pathLength: 1 }}
              transition={secTransition}
            />
          </g>
        );
      })}

      {/* Leaves */}
      {leaves.map((leaf, idx) => (
        <Leaf
          key={idx}
          cx={leaf.cx}
          cy={leaf.cy}
          rotate={leaf.rotate}
          delay={delay + leaf.delay}
          scale={leaf.scale}
        />
      ))}
    </g>
  );
};

export const BotanicalSystem: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      
      {/* 1. Top-Left System */}
      <div className="absolute left-0 top-0 w-[50vw] max-w-[700px] h-[1200px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 1200" fill="none" preserveAspectRatio="xMinYMin meet">
          <Branch
            d="M -50,-50 C 40,80 80,180 120,280 C 150,350 200,420 180,560 C 160,700 240,820 250,940 C 260,1040 180,1100 120,1180"
            strokeWidth={1.4}
            duration={2.2}
            delay={0}
            secondaryBranches={[
              {
                d: "M 120,280 C 180,290 260,240 340,250",
                duration: 1.2,
                delay: 1.2
              },
              {
                d: "M 250,940 C 310,950 360,930 420,960",
                duration: 1.2,
                delay: 2.0
              }
            ]}
            leaves={[
              { cx: 120, cy: 1180, rotate: 135, delay: 2.2, scale: 0.95 },
              { cx: 340, cy: 250, rotate: 15, delay: 2.4, scale: 0.9 },
              { cx: 420, cy: 960, rotate: 45, delay: 3.2, scale: 0.9 },
              { cx: 180, cy: 560, rotate: 90, delay: 1.6, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

      {/* 2. Top-Right System */}
      <div className="absolute right-0 top-0 w-[50vw] max-w-[700px] h-[1200px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 1200" fill="none" preserveAspectRatio="xMaxYMin meet">
          <Branch
            d="M 750,-50 C 660,80 620,180 580,280 C 550,350 500,420 520,560 C 540,700 460,820 450,940 C 440,1040 520,1100 580,1180"
            strokeWidth={1.4}
            duration={2.2}
            delay={0}
            secondaryBranches={[
              {
                d: "M 580,280 C 520,290 440,240 360,250",
                duration: 1.2,
                delay: 1.2
              },
              {
                d: "M 450,940 C 390,950 340,930 280,960",
                duration: 1.2,
                delay: 2.0
              }
            ]}
            leaves={[
              { cx: 580, cy: 1180, rotate: 45, delay: 2.2, scale: 0.95 },
              { cx: 360, cy: 250, rotate: 165, delay: 2.4, scale: 0.9 },
              { cx: 280, cy: 960, rotate: 135, delay: 3.2, scale: 0.9 },
              { cx: 520, cy: 560, rotate: -45, delay: 1.6, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

      {/* 3. Left-Middle System */}
      <div className="absolute left-0 top-[30%] w-[50vw] max-w-[600px] h-[1000px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 1000" fill="none" preserveAspectRatio="xMinYMin meet">
          <Branch
            d="M -50,150 C 60,180 120,250 160,380 C 200,510 170,680 230,820 C 260,890 220,950 150,990"
            strokeWidth={1.2}
            duration={2.2}
            delay={1.0}
            secondaryBranches={[
              {
                d: "M 160,380 C 220,390 280,370 340,390",
                duration: 1.2,
                delay: 1.2
              }
            ]}
            leaves={[
              { cx: 150, cy: 990, rotate: 120, delay: 2.2, scale: 0.9 },
              { cx: 340, cy: 390, rotate: 10, delay: 2.4, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

      {/* 4. Right-Middle System */}
      <div className="absolute right-0 top-[52%] w-[50vw] max-w-[600px] h-[1000px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 1000" fill="none" preserveAspectRatio="xMaxYMin meet">
          <Branch
            d="M 650,150 C 540,180 480,250 440,380 C 400,510 430,680 370,820 C 340,890 380,950 450,990"
            strokeWidth={1.2}
            duration={2.2}
            delay={1.4}
            secondaryBranches={[
              {
                d: "M 440,380 C 380,390 320,370 260,390",
                duration: 1.2,
                delay: 1.2
              }
            ]}
            leaves={[
              { cx: 450, cy: 990, rotate: 60, delay: 2.2, scale: 0.9 },
              { cx: 260, cy: 390, rotate: 170, delay: 2.4, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

      {/* 5. Bottom-Left System */}
      <div className="absolute left-0 bottom-0 w-[50vw] max-w-[700px] h-[1000px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 1000" fill="none" preserveAspectRatio="xMinYMax meet">
          <Branch
            d="M -50,950 C 60,920 120,850 180,720 C 240,590 210,420 280,280 C 310,220 270,140 180,80"
            strokeWidth={1.3}
            duration={2.2}
            delay={1.8}
            secondaryBranches={[
              {
                d: "M 180,720 C 240,730 300,710 360,750",
                duration: 1.2,
                delay: 1.2
              }
            ]}
            leaves={[
              { cx: 180, cy: 80, rotate: -45, delay: 2.2, scale: 0.9 },
              { cx: 360, cy: 750, rotate: 30, delay: 2.4, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

      {/* 6. Bottom-Right System */}
      <div className="absolute right-0 bottom-0 w-[50vw] max-w-[700px] h-[1000px] overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 1000" fill="none" preserveAspectRatio="xMaxYMax meet">
          <Branch
            d="M 750,950 C 640,920 580,850 520,720 C 460,590 490,420 420,280 C 390,220 430,140 520,80"
            strokeWidth={1.3}
            duration={2.2}
            delay={2.0}
            secondaryBranches={[
              {
                d: "M 520,720 C 460,730 400,710 340,750",
                duration: 1.2,
                delay: 1.2
              }
            ]}
            leaves={[
              { cx: 520, cy: 80, rotate: -135, delay: 2.2, scale: 0.9 },
              { cx: 340, cy: 750, rotate: 150, delay: 2.4, scale: 0.85 }
            ]}
          />
        </svg>
      </div>

    </div>
  );
};

export default BotanicalSystem;
