import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/useMediaQuery';
import SectionHeading from '../ui/SectionHeading';

const ROADMAP_ITEMS = [
  {
    id: 'exp-1',
    period: 'Feb 2026 – Present',
    company: 'Cynosylix Technology',
    role: 'Flutter Developer',
    summary: 'Developing production-ready Flutter applications and engineering scalable UI layouts. Focused on optimizing rendering performance, preventing state rebuilding loops, and collaborating within strict Git-based workflows.',
    tech: ['Flutter', 'Dart', 'Git', 'State Management'],
  },
  {
    id: 'exp-2',
    period: 'Mar 2025 – Apr 2025',
    company: 'Luminar Technolab',
    role: 'Mobile App Developer',
    summary: 'Built cross-platform iOS and Android applications utilizing clean architecture and MVC design patterns. Integrated Firebase Authentication and cloud databases for real-time data syncing.',
    tech: ['Flutter', 'Firebase', 'Dart', 'REST API'],
  },
  {
    id: 'exp-3',
    period: 'Apr 2024 – May 2024',
    company: 'Wahy Lab Solutions',
    role: 'Backend Developer',
    summary: 'Engineered scalable backend service APIs and designed relational database schemas. Implemented secure role-based access control (RBAC) and optimized SQL queries for high-throughput routes.',
    tech: ['Python', 'Django', 'SQL', 'REST API'],
  },
];

export const CareerRoadmap: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative w-full">
      <div className="container-main relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Experience"
          title="My experience."
          className="mb-10 sm:mb-14 max-w-2xl"
        />

        <div className="flex flex-col w-full relative z-10">
          {ROADMAP_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 35, filter: reducedMotion ? 'blur(0px)' : 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: reducedMotion ? 0.01 : 0.7, delay: reducedMotion ? 0 : idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="experience-card relative flex flex-col items-start gap-6 pb-10 md:flex-row md:items-center md:gap-16 md:pb-12 last:pb-0"
            >
              {/* Period & Company */}
              <div className="md:w-1/2 flex flex-col gap-1.5 md:text-right">
                <span className="text-[#9F7AEA] font-mono text-xs tracking-wider uppercase font-semibold">
                  {item.period}
                </span>
                <span className="text-[#F5F5F5] font-display font-bold text-xl md:text-2xl">
                  {item.company}
                </span>
              </div>

              <div className="hidden md:flex items-center justify-center shrink-0 w-8 h-8 relative z-20">
                <div className="w-5 h-5 rounded-full bg-[#9F7AEA]/20 border border-[#9F7AEA] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9F7AEA] shadow-md shadow-[#9F7AEA]/50" />
                </div>
              </div>

              {/* Role & Summary */}
              <div className="md:w-1/2 flex flex-col items-start text-left">
                <h3 className="font-display font-bold text-[#F5F5F5] text-lg md:text-xl mb-3">
                  {item.role}
                </h3>
                
                <p className="text-[#A0A0AB] font-normal leading-relaxed text-sm md:text-base mb-4 max-w-xl">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-[#B794F4] px-3 py-1 rounded-full bg-[#121217] border border-[#9F7AEA]/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerRoadmap;
