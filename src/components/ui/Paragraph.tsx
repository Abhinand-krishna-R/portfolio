import React from 'react';

export interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = '',
  size = 'md',
}) => {
  const sizes = {
    sm: 'text-xs sm:text-sm text-neutral-500 leading-normal',
    md: 'text-sm sm:text-base text-neutral-400 leading-relaxed',
    lg: 'text-base sm:text-lg text-neutral-300 leading-relaxed',
  };

  return (
    <p className={`${sizes[size]} ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;
