import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { projectsList } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onLinkClick: (e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLinkClick }) => {
  // Format tech line e.g. "Flutter · Dart · Firebase"
  const techLine =
    project.stack && project.stack.length > 0
      ? project.stack.slice(0, 3).join(' · ')
      : project.platform;

  return (
    <article className="group flex flex-col w-[85vw] max-w-[380px] sm:w-[480px] md:w-[500px] lg:w-[520px] xl:w-[540px] flex-shrink-0 snap-start rounded-2xl border border-white/10 bg-[#0C0D14] shadow-elevation-1 transition-all duration-300 hover:border-white/25 hover:shadow-elevation-2 overflow-hidden">
      {/* Fixed 16:9 Image Area */}
      <div className="relative w-full aspect-[16/9] flex-shrink-0 overflow-hidden bg-[#07070B]">
        <img
          src={project.mockupImage}
          alt={`${project.title} preview`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D14] via-transparent to-transparent opacity-75" />

        {project.category && (
          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-neutral-300">
            {project.category}
          </span>
        )}
      </div>

      {/* Uniform Project Info Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-4">
        <div>
          {/* Header Row: Title, Tech Line & Direct Link */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-[#9F7AEA] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#9F7AEA] mt-1 font-medium">
                {techLine}
              </p>
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              title="View Source Code"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-all hover:bg-white/15 hover:border-white/20 hover:text-white active:scale-95"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          {/* Description with Uniform Min Height */}
          <p className="mt-3.5 text-sm sm:text-[15px] text-[#A0A0B0] leading-relaxed line-clamp-3 min-h-[4.25rem]">
            {project.summary}
          </p>
        </div>

        {/* Tag Area - Pinned to Bottom */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
          {project.stack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-[#12131D] px-3 py-1 text-xs font-mono text-[#B794F4]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export const FeaturedProducts: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag States
  const [isMouseDown, setIsMouseDown] = useState(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasMoved = useRef(false);

  const checkScrollBounds = useCallback(() => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollBounds();
    window.addEventListener('resize', checkScrollBounds);
    return () => window.removeEventListener('resize', checkScrollBounds);
  }, [checkScrollBounds]);

  const scroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const scrollAmount = 550;
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    railRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    setIsMouseDown(true);
    hasMoved.current = false;
    startX.current = e.pageX - railRef.current.offsetLeft;
    scrollLeftPos.current = railRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !railRef.current) return;
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }
    railRef.current.scrollLeft = scrollLeftPos.current - walk;
    checkScrollBounds();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!projectsList || projectsList.length === 0) return null;

  return (
    <section className="relative w-full">
      <div className="container-main mx-auto px-4 sm:px-6">
        {/* Header with Title and Nav Controls */}
        <div className="flex items-end justify-between mb-4 sm:mb-6 gap-4">
          <SectionHeading
            label="My work"
            title="Things I've built."
            className="max-w-2xl"
          />

          {/* Nav Controls */}
          <div className="flex items-center gap-2.5 pb-1 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll projects left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll projects right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Rail Container aligned directly to container-main */}
        <div
          ref={railRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onScroll={checkScrollBounds}
          className={`no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-7 sm:gap-8 pb-6 pt-2 w-full ${
            isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {projectsList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLinkClick={handleLinkClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
