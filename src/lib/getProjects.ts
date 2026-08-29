import { projectConfigs } from "../config/project.config";
import generated from "../generated/projects.json";

export interface Project extends ReturnType<typeof mergeOne> {}

function mergeOne(config: typeof projectConfigs[number]) {
  const data = (generated as Record<string, any>)[config.id];
  if (!data) {
    throw new Error(`No generated data for "${config.id}" — did you run npm run sync?`);
  }

  // Map portfolio.json fields to what the React UI consumes
  const title = data.title || "";
  const subtitle = data.tagline || "";
  const summary = data.description || "";
  const platform = data.platform || (config.phone === "iphone" ? "Android & iOS (Flutter)" : "Desktop (Python, OpenCV)");
  
  const challenges = Array.isArray(data.challenges) 
    ? data.challenges 
    : typeof data.challenges === 'string'
      ? [{ challenge: "Engineering Challenge", solution: data.challenges }]
      : [];
      
  const lessons = Array.isArray(data.lessonsLearned)
    ? data.lessonsLearned
    : typeof data.lessonsLearned === 'string'
      ? [data.lessonsLearned]
      : [];
      
  const features = Array.isArray(data.keyFeatures)
    ? data.keyFeatures
    : typeof data.keyFeatures === 'string'
      ? [data.keyFeatures]
      : [];

  const stack = Array.isArray(data.technologies) ? data.technologies : [];
  const techBadges = Array.isArray(data.technologies) ? data.technologies : [];
  const github = `https://github.com/${config.repo}`;
  const apkUrl = data.apkUrl || "#";
  const liveDemo = data.liveDemo || "#";
  
  const role = data.role || (config.id === "serenityspace" ? "Solo Mobile Architect" : config.id === "skillsync" ? "Flutter Developer Intern" : "Independent Developer");
  const timeline = data.timeline || (config.id === "serenityspace" ? "2 Months (Independent)" : config.id === "skillsync" ? "3 Weeks" : "1 Month");
  
  const mockupImage = data.mockupImage || `/assets/project-${config.order}.png`;

  return {
    ...config,
    ...data,
    title,
    subtitle,
    summary,
    platform,
    challenges,
    lessons,
    features,
    stack,
    techBadges,
    github,
    apkUrl,
    liveDemo,
    role,
    timeline,
    mockupImage
  };
}

export function getProjects() {
  return projectConfigs.map(mergeOne).sort((a, b) => a.order - b.order);
}
