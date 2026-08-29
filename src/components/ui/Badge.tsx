import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'emerald' | 'rose' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-mono text-[11px] font-medium px-2 py-0.5 rounded border leading-none tracking-tight';

  const variants = {
    default: 'bg-neutral-900 border-neutral-800 text-neutral-400',
    blue: 'bg-blue-500/5 border-blue-500/10 text-blue-400',
    emerald: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400',
    rose: 'bg-rose-500/5 border-rose-500/10 text-rose-400',
    outline: 'bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-300 hover:border-neutral-700 transition-colors',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
