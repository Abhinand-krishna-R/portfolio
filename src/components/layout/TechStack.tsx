import React from 'react';
import SectionHeading from '../ui/SectionHeading';

interface TechCategory {
  id: string;
  mark: string;
  title: string;
  items: string[];
  accentGlow: string;
  iconColor: string;
}

const techCategories: TechCategory[] = [
  {
    id: 'dev',
    mark: '◈',
    title: 'Development',
    items: ['Flutter', 'Dart', 'React', 'TypeScript'],
    accentGlow: 'from-purple-500/20 via-purple-900/5 to-transparent',
    iconColor: 'text-[#9F7AEA]',
  },
  {
    id: 'ai',
    mark: '✦',
    title: 'AI & Vision',
    items: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow'],
    accentGlow: 'from-cyan-500/20 via-purple-900/5 to-transparent',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'backend',
    mark: '◇',
    title: 'Backend & Data',
    items: ['Firebase', 'SQL', 'REST APIs', 'Django'],
    accentGlow: 'from-blue-500/20 via-indigo-900/5 to-transparent',
    iconColor: 'text-blue-400',
  },
  {
    id: 'workflow',
    mark: '⌘',
    title: 'Workflow',
    items: ['Git', 'GitHub', 'Android Studio', 'VS Code'],
    accentGlow: 'from-amber-500/18 via-orange-900/5 to-transparent',
    iconColor: 'text-amber-400',
  },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative w-full">
      <div className="container-main mx-auto px-4 sm:px-6">
        <SectionHeading
          label="What I work with"
          title="Tools behind the work."
          className="max-w-3xl"
        />

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
          {techCategories.map((category) => (
            <article
              key={category.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0D14]/90 p-6 sm:p-8 shadow-elevation-1 transition-all duration-300 hover:border-white/20"
            >
              {/* Subtle Corner Glow Reflecting Light */}
              <div
                aria-hidden="true"
                className={`absolute -top-14 -right-14 h-44 w-44 rounded-full bg-gradient-to-br ${category.accentGlow} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Category Mark + Title */}
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <span className={`text-2xl font-bold ${category.iconColor}`}>
                  {category.mark}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-50 tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Tech Items List */}
              <div className="relative z-10 flex flex-wrap gap-2.5 sm:gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-200 transition-colors duration-200 group-hover:border-white/15 group-hover:bg-white/[0.07]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

