import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from '../ui/BrandIcons';
import type { Project } from '../../types';
import PhoneMockup from '../ui/PhoneMockup';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export interface ProjectPreviewProps {
  project: Project;
  index: number;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 py-12 border-b border-neutral-900 last:border-0`}>
      {/* Mockup Container */}
      <div className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        {project.platform.toLowerCase().includes('python') || project.platform.toLowerCase().includes('desktop') ? (
          /* Desktop representation */
          <div className="relative w-full max-w-[340px] aspect-[16/10] bg-neutral-950 border-[6px] border-neutral-900 rounded-lg shadow-2xl shadow-black/85 overflow-hidden ring-1 ring-neutral-800">
            <div className="absolute top-0 left-0 right-0 h-4 bg-neutral-900 flex items-center px-2 gap-1 z-25">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            </div>
            <div className="w-full h-full pt-4">
              <img
                src={project.mockupImage}
                alt={project.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>
        ) : (
          /* Mobile Device Frame */
          <PhoneMockup imageSrc={project.mockupImage} alt={project.title} />
        )}
      </div>

      {/* Copywriting Section */}
      <div className={`w-full md:w-1/2 flex flex-col items-start ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        {/* Category Badge */}
        <Badge variant="blue" className="mb-3">
          {project.platform}
        </Badge>
        
        {/* Project Name */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-50 tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-neutral-400 mb-4">{project.subtitle}</p>

        {/* Project Bullet Summary */}
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack Badge List */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.techBadges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>

        {/* CTA Button Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Button href={project.github} variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
            View on GitHub
          </Button>
          <Button href={project.github} variant="ghost" size="sm" icon={<Github className="w-3.5 h-3.5" />}>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
