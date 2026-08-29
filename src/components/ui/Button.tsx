import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
}) => {
  const ref = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Volume III Spring Physics for Buttons
  const springConfig = { stiffness: 420, damping: 32, mass: 0.8 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull interpolation (capped implicitly by the bounding box of the button)
    const distX = (e.clientX - centerX) * 0.25; 
    const distY = (e.clientY - centerY) * 0.25;
    
    // Clamp to max 12px movement as per spec
    x.set(Math.max(-12, Math.min(12, distX)));
    y.set(Math.max(-12, Math.min(12, distY)));
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden';
  
  // Machined metal tactile finishes
  const variants = {
    primary: 'bg-accent-purple text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_2px_8px_rgba(124,58,237,0.25)] border border-[rgba(255,255,255,0.1)]',
    secondary: 'bg-[var(--color-surface)] text-neutral-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_1px_2px_rgba(0,0,0,0.4)] border border-white/[0.06] hover:border-white/[0.12] hover:bg-[var(--color-surface-elevated)]',
    ghost: 'text-neutral-400 hover:text-neutral-100 bg-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[13px] gap-2',
    md: 'px-6 py-3 text-[14px] gap-2.5',
    lg: 'px-8 py-4 text-[16px] gap-3',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Icon Arrow Movement (Max 6px)
  const iconMarkup = icon ? (
    <motion.span 
      className="flex items-center shrink-0"
      animate={{ x: isHovered && iconPosition === 'right' ? 6 : (isHovered && iconPosition === 'left' ? -6 : 0) }}
      transition={springConfig}
    >
      {icon}
    </motion.span>
  ) : null;

  const content = (
    <motion.div 
      className="relative z-10 flex items-center justify-center pointer-events-none"
      style={{ x, y }}
    >
      {icon && iconPosition === 'left' && iconMarkup}
      <span>{children}</span>
      {icon && iconPosition === 'right' && iconMarkup}
    </motion.div>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: springConfig,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  if (to && !disabled) {
    return (
      <Link to={to} className="inline-block" onClick={onClick}>
        <motion.div ref={ref} className={combinedStyles} {...motionProps}>
          {/* Subtle hover gradient reflection */}
          {variant !== 'ghost' && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-300"
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
          )}
          {content}
        </motion.div>
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className="inline-block" onClick={onClick} target="_blank" rel="noopener noreferrer">
        <motion.div ref={ref} className={combinedStyles} {...motionProps}>
          {variant !== 'ghost' && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-300"
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
          )}
          {content}
        </motion.div>
      </a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={combinedStyles}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {variant !== 'ghost' && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      )}
      {content}
    </motion.button>
  );
};

export default Button;
