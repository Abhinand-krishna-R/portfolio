import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

export const LearningNotebook: React.FC = () => {
  // Sort learning items by their category or simply show the sequential path
  const notebookEntries = [
    { month: 'June', topic: 'Riverpod State Management', details: 'De-coupling UI widgets from global application providers.' },
    { month: 'June', topic: 'Flutter Testing', details: 'Mocking device interfaces and component integration checks.' },
    { month: 'June', topic: 'CI/CD & Fastlane Setup', details: 'Automated package signing and play store beta pipeline seeding.' },
    { month: 'June', topic: 'Firebase Performance', details: 'Reducing cold startup latency and index optimization.' },
    { month: 'June', topic: 'AI Workflows', details: 'Integrating local LLMs via JSON API schemas.' },
  ];

  return (
    <div className="relative w-full bg-neutral-900 border border-neutral-850 rounded-2xl p-6 pl-10 shadow-2xl overflow-hidden backdrop-blur-md">
      
      {/* Skeuomorphic Lab Binder Rings */}
      <div className="absolute left-3 top-0 bottom-0 w-2 flex flex-col justify-around py-6 z-25 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="w-5 h-2.5 bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 rounded-full border border-neutral-750 shadow-md shadow-black/50 -ml-2" 
          />
        ))}
      </div>

      {/* Lined Notebook Paper Aesthetics */}
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-rose-500/25 z-10 pointer-events-none" />
      
      {/* Background Horizontal lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_31px,#ffffff_31px)] bg-[size:100%_32px] pointer-events-none" 
      />

      <div className="relative z-10 pl-2">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-purple" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              Active Learning Logbook
            </h4>
          </div>
          <span className="font-mono text-[10px] text-neutral-500">LAB-RECORDS // 2026</span>
        </div>

        {/* Notebook entries sequence */}
        <div className="relative space-y-6">
          {notebookEntries.map((entry, index) => {
            const isLast = index === notebookEntries.length - 1;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative pl-6 flex flex-col items-start group"
              >
                {/* Connecting glowing path */}
                {!isLast && (
                  <div className="absolute left-1.5 top-3.5 bottom-0 w-[1px] bg-gradient-to-b from-accent-purple/50 to-neutral-800" />
                )}

                {/* Bullets/Indicators */}
                <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-neutral-900 border-2 border-accent-purple group-hover:border-secondary-cyan group-hover:scale-110 transition-all z-20 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-accent-purple group-hover:bg-secondary-cyan" />
                </span>

                {/* Entry header */}
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase">
                    {entry.month}
                  </span>
                  <ArrowRight className="w-2.5 h-2.5 text-neutral-600" />
                  <span className="text-sm font-semibold text-neutral-250 font-display group-hover:text-secondary-cyan transition-colors">
                    {entry.topic}
                  </span>
                </div>

                {/* Details subtext */}
                <p className="text-[11px] text-neutral-500 font-mono mt-1 font-light leading-relaxed">
                  {entry.details}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningNotebook;
