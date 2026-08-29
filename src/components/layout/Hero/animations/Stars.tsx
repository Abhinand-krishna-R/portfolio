import React, { useMemo } from 'react';
import SceneLayout from '../SceneLayout';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export const Stars: React.FC = () => {
  const area = SceneLayout.window;
  const stars = useMemo(() => {
    const starList: Star[] = [];
    const colors = ['#FFFFFF', '#FFFFFF', '#BAE6FD', '#E9D5FF'];
    for (let i = 0; i < 48; i++) {
      starList.push({
        id: i,
        x: Math.random() * 96 + 2, // 2% to 98%
        y: Math.random() * 92 + 2, // 2% to 94%
        size: Math.random() < 0.6 ? 1 : Math.random() < 0.9 ? 1.5 : 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 5,
      });
    }
    return starList;
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${area.x * 100}%`,
        top: `${area.y * 100}%`,
        width: `${area.w * 100}%`,
        height: `${area.h * 100}%`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50% { opacity: 0.95; transform: scale(1.15); }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: star.color,
            boxShadow: star.size > 1.5 ? `0 0 4px ${star.color}` : 'none',
            animation: `starTwinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
