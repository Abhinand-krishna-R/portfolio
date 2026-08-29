import React from 'react';

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <p className="text-[15px] sm:text-[17px] font-bold uppercase tracking-[0.18em] text-[#9F7AEA]">
        {label}
      </p>
      <h2 className="mt-3 sm:mt-4 font-display font-black leading-[1.04] tracking-tight text-neutral-50 text-[38px] xs:text-[44px] sm:text-6xl lg:text-[68px] xl:text-[72px]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;

