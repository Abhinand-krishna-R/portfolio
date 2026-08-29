import React from 'react';
import { motion } from 'framer-motion';

interface DiagramProps {
  projectId: string;
}

export const ArchitectureDiagram: React.FC<DiagramProps> = ({ projectId }) => {
  // SVG drawing configuration based on the project architecture
  const renderDiagram = () => {
    switch (projectId) {
      case 'serenityspace':
        return (
          <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 200" fill="none">
            {/* Definitions for arrow markers */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#7C3AED" />
              </marker>
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#06B6D4" />
              </marker>
            </defs>

            {/* Nodes */}
            {/* Node 1: Flutter Client View */}
            <rect x="20" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="70" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Flutter UI</text>
            <text x="70" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(View Layer)</text>

            {/* Node 2: Stream Controller */}
            <rect x="190" y="70" width="120" height="60" rx="8" fill="#101827" stroke="#7C3AED" strokeWidth="1.5" />
            <text x="250" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Provider Service</text>
            <text x="250" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Controller Stream)</text>

            {/* Node 3: Firestore DB */}
            <rect x="380" y="30" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="430" y="60" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Firestore DB</text>
            <text x="430" y="75" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Multi-Tenant)</text>

            {/* Node 4: Firebase Auth */}
            <rect x="380" y="110" width="100" height="60" rx="8" fill="#101827" stroke="#06B6D4" strokeWidth="1.5" />
            <text x="430" y="140" fill="#06B6D4" fontSize="10" fontFamily="monospace" textAnchor="middle">Security Rules</text>
            <text x="430" y="155" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Auth Guards)</text>

            {/* self-drawing pipelines */}
            {/* View to Controller */}
            <motion.path 
              d="M 120 100 L 190 100" 
              stroke="#7C3AED" 
              strokeWidth="2" 
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Controller to DB */}
            <motion.path 
              d="M 310 90 L 380 60" 
              stroke="#7C3AED" 
              strokeWidth="2" 
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />

            {/* Controller to Auth */}
            <motion.path 
              d="M 310 110 L 380 140" 
              stroke="#06B6D4" 
              strokeWidth="2" 
              markerEnd="url(#arrow-cyan)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        );

      case 'skillsync':
        return (
          <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 200" fill="none">
            <defs>
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#06B6D4" />
              </marker>
            </defs>

            {/* Nodes */}
            <rect x="20" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="70" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Flutter App</text>
            <text x="70" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Client Frame)</text>

            <rect x="190" y="70" width="120" height="60" rx="8" fill="#101827" stroke="#06B6D4" strokeWidth="1.5" />
            <text x="250" y="100" fill="#06B6D4" fontSize="10" fontFamily="monospace" textAnchor="middle">Match Scoring</text>
            <text x="250" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Client Indexing)</text>

            <rect x="380" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="430" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Firestore DB</text>
            <text x="430" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Jobs/Profiles)</text>

            {/* self-drawing pipelines */}
            <motion.path 
              d="M 120 100 L 190 100" 
              stroke="#06B6D4" 
              strokeWidth="2" 
              markerEnd="url(#arrow-cyan)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.path 
              d="M 310 100 L 380 100" 
              stroke="#06B6D4" 
              strokeWidth="2" 
              markerEnd="url(#arrow-cyan)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        );

      case '3d-air-sculpting':
        return (
          <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 200" fill="none">
            <defs>
              <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#F43F5E" />
              </marker>
            </defs>

            {/* Nodes */}
            <rect x="20" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="70" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">Hand Nodes</text>
            <text x="70" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(MediaPipe X,Y)</text>

            <rect x="190" y="70" width="120" height="60" rx="8" fill="#101827" stroke="#F43F5E" strokeWidth="1.5" />
            <text x="250" y="100" fill="#F43F5E" fontSize="10" fontFamily="monospace" textAnchor="middle">Z-Depth Calc</text>
            <text x="250" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Distance Ratio)</text>

            <rect x="380" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="430" y="100" fill="#F3F4F6" fontSize="10" fontFamily="monospace" textAnchor="middle">OBJ Exporter</text>
            <text x="430" y="115" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(3D Mesh Vector)</text>

            {/* self-drawing pipelines */}
            <motion.path 
              d="M 120 100 L 190 100" 
              stroke="#F43F5E" 
              strokeWidth="2" 
              markerEnd="url(#arrow-rose)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.path 
              d="M 310 100 L 380 100" 
              stroke="#F43F5E" 
              strokeWidth="2" 
              markerEnd="url(#arrow-rose)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        );

      default: // airdrawing
        return (
          <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 200" fill="none">
            <defs>
              <marker id="arrow-pink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#F472B6" />
              </marker>
            </defs>

            {/* Nodes */}
            <rect x="10" y="70" width="80" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="50" y="100" fill="#F3F4F6" fontSize="9" fontFamily="monospace" textAnchor="middle">Webcam</text>
            <text x="50" y="113" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Frames Feed)</text>

            <rect x="130" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#F472B6" strokeWidth="1.5" />
            <text x="180" y="100" fill="#F472B6" fontSize="9" fontFamily="monospace" textAnchor="middle">OpenCV Engine</text>
            <text x="180" y="113" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Image Matrix)</text>

            <rect x="270" y="70" width="100" height="60" rx="8" fill="#101827" stroke="#06B6D4" strokeWidth="1.5" />
            <text x="320" y="100" fill="#06B6D4" fontSize="9" fontFamily="monospace" textAnchor="middle">MediaPipe</text>
            <text x="320" y="113" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Skeletal Nodes)</text>

            <rect x="410" y="70" width="80" height="60" rx="8" fill="#101827" stroke="#374151" strokeWidth="1.5" />
            <text x="450" y="100" fill="#F3F4F6" fontSize="9" fontFamily="monospace" textAnchor="middle">3D Canvas</text>
            <text x="450" y="113" fill="#9CA3AF" fontSize="8" fontFamily="monospace" textAnchor="middle">(Render Loop)</text>

            {/* self-drawing pipelines */}
            <motion.path 
              d="M 90 100 L 130 100" 
              stroke="#F472B6" 
              strokeWidth="2" 
              markerEnd="url(#arrow-pink)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            <motion.path 
              d="M 230 100 L 270 100" 
              stroke="#F472B6" 
              strokeWidth="2" 
              markerEnd="url(#arrow-pink)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />

            <motion.path 
              d="M 370 100 L 410 100" 
              stroke="#06B6D4" 
              strokeWidth="2" 
              markerEnd="url(#arrow-pink)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-[#101827]/40 border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center shadow-xl">
      <div className="w-full border-b border-neutral-900 pb-3 mb-6 flex justify-between items-center">
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          Dynamic Architecture Node Map
        </span>
        <span className="font-mono text-[10px] text-[#7C3AED] animate-pulse">SELF-DRAWING SYSTEM</span>
      </div>
      {renderDiagram()}
    </div>
  );
};

export default ArchitectureDiagram;
