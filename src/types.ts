export interface PersonalInfo {
  fullName: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  defaultKey?: string;
  skills: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  location: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  bullets: string[];
  technologies: string[];
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  leadership: string[];
}

export type TemplateName =
  | 'pure-minimal'
  | 'sidebar-professional'
  | 'tech-clean'
  | 'elegant-two-column'
  | 'soft-gray'
  | 'compact-dense';

export interface TemplateInfo {
  id: TemplateName;
  name: string;
  description: string;
}

export const TEMPLATES: TemplateInfo[] = [
  { id: 'pure-minimal', name: 'Pure Minimal', description: 'Single column, clean black & white' },
  { id: 'sidebar-professional', name: 'Sidebar Professional', description: 'Left sidebar with contact & skills' },
  { id: 'tech-clean', name: 'Tech Clean', description: 'Developer-friendly typography' },
  { id: 'elegant-two-column', name: 'Elegant Two Column', description: 'Balanced professional layout' },
  { id: 'soft-gray', name: 'Soft Gray Sections', description: 'Light gray section backgrounds' },
  { id: 'compact-dense', name: 'Compact Dense', description: 'Content-heavy optimized spacing' },
];

export type ResumeAction =
  | { type: 'SET_PERSONAL'; field: keyof PersonalInfo; value: string }
  | { type: 'SET_SUMMARY'; value: string }
  | { type: 'ADD_SKILL_CATEGORY'; category: SkillCategory }
  | { type: 'REMOVE_SKILL_CATEGORY'; categoryId: string }
  | { type: 'RENAME_SKILL_CATEGORY'; categoryId: string; name: string }
  | { type: 'ADD_SKILL'; categoryId: string; skill: string }
  | { type: 'REMOVE_SKILL'; categoryId: string; skillIndex: number }
  | { type: 'REORDER_SKILL'; categoryId: string; fromIndex: number; toIndex: number }
  | { type: 'ADD_EXPERIENCE'; experience: WorkExperience }
  | { type: 'UPDATE_EXPERIENCE'; id: string; field: keyof WorkExperience; value: string | boolean | string[] }
  | { type: 'REMOVE_EXPERIENCE'; id: string }
  | { type: 'REORDER_EXPERIENCE'; fromIndex: number; toIndex: number }
  | { type: 'ADD_EXPERIENCE_BULLET'; experienceId: string; bullet: string }
  | { type: 'UPDATE_EXPERIENCE_BULLET'; experienceId: string; bulletIndex: number; value: string }
  | { type: 'REMOVE_EXPERIENCE_BULLET'; experienceId: string; bulletIndex: number }
  | { type: 'REORDER_EXPERIENCE_BULLET'; experienceId: string; fromIndex: number; toIndex: number }
  | { type: 'ADD_PROJECT'; project: Project }
  | { type: 'UPDATE_PROJECT'; id: string; field: keyof Project; value: string | string[] }
  | { type: 'REMOVE_PROJECT'; id: string }
  | { type: 'REORDER_PROJECT'; fromIndex: number; toIndex: number }
  | { type: 'ADD_PROJECT_BULLET'; projectId: string; bullet: string }
  | { type: 'UPDATE_PROJECT_BULLET'; projectId: string; bulletIndex: number; value: string }
  | { type: 'REMOVE_PROJECT_BULLET'; projectId: string; bulletIndex: number }
  | { type: 'REORDER_PROJECT_BULLET'; projectId: string; fromIndex: number; toIndex: number }
  | { type: 'ADD_PROJECT_TECH'; projectId: string; tech: string }
  | { type: 'REMOVE_PROJECT_TECH'; projectId: string; techIndex: number }
  | { type: 'ADD_CERTIFICATION'; certification: Certification }
  | { type: 'UPDATE_CERTIFICATION'; id: string; field: keyof Certification; value: string }
  | { type: 'REMOVE_CERTIFICATION'; id: string }
  | { type: 'ADD_LEADERSHIP'; bullet: string }
  | { type: 'UPDATE_LEADERSHIP'; index: number; value: string }
  | { type: 'REMOVE_LEADERSHIP'; index: number }
  | { type: 'REORDER_LEADERSHIP'; fromIndex: number; toIndex: number }
  | { type: 'LOAD_STATE'; data: ResumeData }
  | { type: 'RESET' };
