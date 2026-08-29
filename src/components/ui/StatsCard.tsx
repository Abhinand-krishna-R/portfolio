import React from 'react';
import Card from './Card';

export interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  description,
  icon,
  className = '',
}) => {
  return (
    <Card hoverable={true} padding="sm" className={`flex flex-col justify-between h-full ${className}`}>
      <div className="flex justify-between items-start gap-4">
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">{label}</span>
        {icon && <span className="text-neutral-500">{icon}</span>}
      </div>
      <div className="mt-4">
        <span className="font-display text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight leading-none">
          {value}
        </span>
        {description && (
          <p className="mt-1 text-xs text-neutral-500 leading-normal">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
