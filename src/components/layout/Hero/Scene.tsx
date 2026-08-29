import React from 'react';
import './Scene.css';
import DebugOverlay from './DebugOverlay';

interface SceneProps {
  scrollProgress: number;
}

// Toggle to true to inspect alignment of bounding boxes in red outlines
const DEBUG = false;

export const Scene: React.FC<SceneProps> = ({ scrollProgress }) => {
  const dimFactor = 1 - scrollProgress * 0.65;

  return (
    <div className="scene-container">
      {/* Background Image (Never moves, static layer) */}
      <img
        src="/assets/hero.png"
        alt="Studio workspace background illustration"
        className="room-image"
        style={{
          filter: `brightness(${dimFactor * 0.95}) contrast(1.1) saturate(0.85)`,
        }}
      />

      {/* Debug calibration boxes */}
      <DebugOverlay active={DEBUG} />
    </div>
  );
};

export default Scene;

