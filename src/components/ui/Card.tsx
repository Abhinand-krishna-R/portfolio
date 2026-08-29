import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  glow = false,
  padding = 'md',
  onClick,
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-[24px]',
    md: 'p-[32px]',
    lg: 'p-[40px]',
  };

  const baseStyles = 'relative bg-[var(--color-surface)] border border-white/[0.06] rounded-[var(--radius-lg)] overflow-hidden transition-colors duration-400 ease-out shadow-elevation-1';
  const hoverStyles = hoverable ? 'hover:border-white/[0.12] hover:bg-[var(--color-surface-elevated)] hover:shadow-elevation-2 cursor-pointer' : '';
  const combinedStyles = `${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`;

  const content = (
    <>
      {glow && (
        <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      {children}
    </>
  );

  if (hoverable && onClick) {
    return (
      <motion.div
        className={`group ${combinedStyles}`}
        onClick={onClick}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {content}
      </motion.div>
    );
  }

  if (hoverable) {
    return (
      <motion.div
        className={`group ${combinedStyles}`}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={combinedStyles}>
      {content}
    </div>
  );
};

export default Card;
