import React from 'react';

export interface HeadingProps {
  children: React.ReactNode;
  level?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  id?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 'h2',
  className = '',
  id,
}) => {
  const styles = {
    display: 'font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-50 leading-[1.1]',
    h1: 'font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-50 leading-tight',
    h2: 'font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-50 leading-snug',
    h3: 'font-display text-xl sm:text-2xl font-semibold tracking-tight text-neutral-50 leading-normal',
    h4: 'font-display text-lg sm:text-xl font-medium tracking-tight text-neutral-200 leading-normal',
  };

  const Component = level === 'display' ? 'h1' : level;

  return (
    <Component id={id} className={`${styles[level]} ${className}`}>
      {children}
    </Component>
  );
};

export default Heading;
