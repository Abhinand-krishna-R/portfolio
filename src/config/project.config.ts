export interface ProjectConfig {
  id: string;
  repo: string;        // "owner/repo"
  featured: boolean;
  accent: string;
  phone: "iphone" | "android";
  category: string;
  hasAPK: boolean;
  hasWebDemo: boolean;
  order: number;
}

export const projectConfigs: ProjectConfig[] = [
  {
    id: "serenityspace",
    repo: "Abhinand-krishna-R/SerenitySpace",
    featured: true,
    accent: "#7C3AED",
    phone: "iphone",
    category: "Mental Health",
    hasAPK: true,
    hasWebDemo: false,
    order: 1,
  },
  {
    id: "skillsync",
    repo: "Abhinand-krishna-R/SkillSync",
    featured: true,
    accent: "#0EA5E9",
    phone: "android",
    category: "Career Tech",
    hasAPK: true,
    hasWebDemo: true,
    order: 2,
  },
  {
    id: "3d-air-sculpting",
    repo: "Abhinand-krishna-R/3DAirSculpting",
    featured: true,
    accent: "#F43F5E",
    phone: "iphone",
    category: "Computer Vision",
    hasAPK: false,
    hasWebDemo: false,
    order: 3,
  },
  {
    id: "airdrawing",
    repo: "Abhinand-krishna-R/AirDrawing",
    featured: true,
    accent: "#EC4899",
    phone: "android",
    category: "Computer Vision",
    hasAPK: false,
    hasWebDemo: false,
    order: 4,
  }
];
