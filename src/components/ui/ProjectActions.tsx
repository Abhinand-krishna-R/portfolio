import type { Project } from "../../lib/getProjects";

export function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex gap-3 font-mono text-xs">
      <a 
        href={`https://github.com/${project.repo}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-neutral-50 hover:bg-neutral-200 text-neutral-950 rounded-lg transition-all shadow-md hover:shadow-white/5"
      >
        View on GitHub
      </a>
      {project.hasWebDemo && project.webDemo && (
        <a 
          href={project.webDemo} 
          className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-lg transition-all"
        >
          Live Demo
        </a>
      )}
      {project.hasAPK && project.apkUrl && (
        <a 
          href={project.apkUrl} 
          className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-lg transition-all"
        >
          Install App
        </a>
      )}
    </div>
  );
}
