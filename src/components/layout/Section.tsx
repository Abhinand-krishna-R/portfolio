import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  id,
  className = '',
  icon,
}) => {
  return (
    <motion.section
      id={id}
      className={`py-12 md:py-20 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {(title || subtitle) && (
        <div className="mb-8 flex flex-col items-start max-w-xl">
          {title && (
            <Heading level="h2" className="flex items-center gap-2 mb-1.5">
              {icon && <span className="text-accent-purple shrink-0">{icon}</span>}
              {title}
            </Heading>
          )}
          {subtitle && (
            <Paragraph size="md" className="text-neutral-500">
              {subtitle}
            </Paragraph>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
};

export default Section;
