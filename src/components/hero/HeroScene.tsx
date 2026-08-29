import React from 'react';
import { AquariumCanvas } from './AquariumCanvas';
import { CatGlow } from './CatGlow';

export const DEBUG_HOTSPOTS = false;

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-[100vh] md:h-auto overflow-hidden bg-[#09070F] flex items-center justify-center">
      {/* 
        On mobile: forces the scene height to 100vh, aspect ratio dictates width, 
        and it gets centered horizontally, creating a clean crop.
        On desktop (md+): fits naturally.
      */}
      <div className="relative h-full md:h-auto md:w-full aspect-[1624/920] max-h-screen shrink-0">
        <img 
          src="/assets/hero.png" 
          alt="Developer Workspace" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        <AquariumCanvas debug={DEBUG_HOTSPOTS} />
        <CatGlow debug={DEBUG_HOTSPOTS} />
      </div>
    </div>
  );
};

export default HeroScene;
