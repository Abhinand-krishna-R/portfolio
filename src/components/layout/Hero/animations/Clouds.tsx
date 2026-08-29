import React from 'react';
import SceneLayout from '../SceneLayout';

export const Clouds: React.FC = () => {
  const area = SceneLayout.window;

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
        opacity: 0.12, // Very subtle, warm moonlit clouds
      }}
    >
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(110%); }
        }
      `}</style>
      
      {/* Cloud 1 */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          width: '70px',
          height: '24px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(4px)',
          animation: 'drift 45s linear infinite',
          animationDelay: '0s',
        }}
      />
      
      {/* Cloud 2 */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          width: '100px',
          height: '30px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)',
          borderRadius: '50%',
          filter: 'blur(6px)',
          animation: 'drift 60s linear infinite',
          animationDelay: '-20s',
        }}
      />

      {/* Cloud 3 */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          width: '50px',
          height: '18px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          animation: 'drift 35s linear infinite',
          animationDelay: '-10s',
        }}
      />
    </div>
  );
};

export default Clouds;
