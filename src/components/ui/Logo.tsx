import React from 'react';

interface LogoProps {
  size?: 'nav' | 'hero';
  className?: string;
}

/**
 * "Abhinand" wordmark — Caveat 600 cursive.
 * "Abh" + "nand" in #FAFAFA, the letter "i" in #7C3AED (purple).
 * No floating dot, no underline, no decorative extras.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'nav', className = '' }) => {
  const fontSize = size === 'hero' ? '64px' : '30px';

  return (
    <span
      aria-label="Abhinand"
      className={`select-none leading-none ${className}`}
      style={{
        fontFamily: "'Caveat', cursive",
        fontWeight: 600,
        fontSize,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      <span style={{ color: '#FAFAFA' }}>Abh</span>
      <span style={{ color: '#7C3AED' }}>i</span>
      <span style={{ color: '#FAFAFA' }}>nand</span>
    </span>
  );
};

/**
 * Favicon / app icon mark — dark rounded square with purple "A" in Caveat.
 */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    aria-label="Abhinand logo mark"
  >
    <rect width="40" height="40" rx="16" fill="#131316" stroke="#2A2A2E" strokeWidth="0.5" />
    <text
      x="50%"
      y="52%"
      dominantBaseline="central"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontWeight="600"
      fontSize="26"
      fill="#7C3AED"
    >
      A
    </text>
  </svg>
);

export default Logo;
