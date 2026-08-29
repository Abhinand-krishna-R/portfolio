export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  platform: string;
  stack: string[];
  techBadges: string[];
  summary: string;
  features: string[];
  problem: string;
  goals: string[];
  architecture: string;
  databaseDesign?: string;
  challenges: {
    challenge: string;
    solution: string;
  }[];
  lessons: string[];
  codeHighlights?: {
    title: string;
    description: string;
    language: string;
    code: string;
  }[];
  futureWork?: string[];
  github: string;
  apkUrl?: string;
  demoVideo?: string;
  liveDemo?: string;
  figmaPrototype?: string;
  mockupImage: string;
  category?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface LearningItem {
  topic: string;
  category: 'learning' | 'exploring' | 'building' | 'reading';
}

export interface Socials {
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  resumeUrl: string;
  location: string;
  name: string;
  title: string;
  subtitle: string;
}
