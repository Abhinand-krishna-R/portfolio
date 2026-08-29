import React from 'react';
import { MapPin } from 'lucide-react';
import { socials } from '../../data/socials';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-xs text-neutral-500">
      <div className="container-main mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Copyright */}
        <p className="font-mono">
          &copy; {new Date().getFullYear()} {socials.name} &bull; Built with React + TypeScript
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-neutral-600 font-mono">
          <MapPin className="w-3 h-3" />
          <span>Kochi, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
