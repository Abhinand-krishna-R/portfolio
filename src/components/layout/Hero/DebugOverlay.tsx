import React from 'react';
import SceneLayout from './SceneLayout';

interface DebugOverlayProps {
  active: boolean;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {Object.entries(SceneLayout).map(([key, area]) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            left: `${area.x * 100}%`,
            top: `${area.y * 100}%`,
            width: `${area.w * 100}%`,
            height: `${area.h * 100}%`,
            border: '2px solid rgba(239, 68, 68, 0.85)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            boxSizing: 'border-box',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: 2,
              background: 'rgba(0,0,0,0.8)',
              color: '#EF4444',
              fontSize: '9px',
              fontFamily: 'monospace',
              padding: '1px 3px',
              borderRadius: '2px',
              fontWeight: 'bold',
            }}
          >
            {key}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DebugOverlay;
