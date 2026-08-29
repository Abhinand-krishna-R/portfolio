import React from 'react';
import { motion } from 'framer-motion';
interface SectionDividerProps {
  num: string;
  tag: string;
  id?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ num, tag, id }) => {

  return (
    <div 
      id={id} 
      className="container-main mx-auto w-full relative z-10 pt-24 md:pt-32" 
      style={{ paddingInline: 'var(--page-gutter)' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border-t border-neutral-900/60 pt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase select-none relative"
      >
        <div className="flex items-center gap-3">
          <span className="text-accent-purple font-semibold">{num}</span>
          <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          <span>{tag}</span>
        </div>
        <div className="text-neutral-800 font-light font-mono text-[8px] pointer-events-none hidden sm:block">
          + COORD // {num}.00.0F
        </div>
      </motion.div>
    </div>
  );
};

export default SectionDivider;
