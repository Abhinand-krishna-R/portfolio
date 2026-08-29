import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div 
      className={`mx-auto ${className}`}
      style={{ width: 'min(90%, 1500px)' }}
    >
      {children}
    </div>
  );
};

export default Container;
