import React, { useState, useEffect } from 'react';
import SceneLayout from '../SceneLayout';

export const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);
  const area = SceneLayout.clock;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');

  return (
    <div
      style={{
        position: 'absolute',
        left: `${area.x * 100}%`,
        top: `${area.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        color: '#B86CFF',
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(8px, 0.72vw, 15px)',
        letterSpacing: '0.05em',
        textShadow: '0 0 4px #B86CFF, 0 0 8px #B86CFF, 0 0 18px #B86CFF',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 10,
        lineHeight: 1,
      }}
      aria-label="Live local clock"
    >
      <span>{hours}</span>
      <span style={{ opacity: showColon ? 1 : 0, transition: 'opacity 150ms ease-out', margin: '0 0.5px' }}>:</span>
      <span>{minutes}</span>
    </div>
  );
};

export default LiveClock;
