import type { ResumeData } from '../types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export const defaultSkillCategories = [
  { id: generateId(), name: 'Programming Languages', defaultKey: 'programmingLanguages', skills: [] },
  { id: generateId(), name: 'Frontend', defaultKey: 'frontend', skills: [] },
  { id: generateId(), name: 'Backend', defaultKey: 'backend', skills: [] },
  { id: generateId(), name: 'Databases', defaultKey: 'databases', skills: [] },
  { id: generateId(), name: 'Cloud & Infrastructure', defaultKey: 'cloudInfrastructure', skills: [] },
  { id: generateId(), name: 'Security', defaultKey: 'security', skills: [] },
  { id: generateId(), name: 'APIs & Integrations', defaultKey: 'apisIntegrations', skills: [] },
  { id: generateId(), name: 'Artificial Intelligence', defaultKey: 'artificialIntelligence', skills: [] },
];

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  skills: defaultSkillCategories,
  experience: [],
  projects: [],
  certifications: [],
  leadership: [],
};
