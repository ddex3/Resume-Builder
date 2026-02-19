import { useReducer, useEffect, useCallback } from 'react';
import type { ResumeData, ResumeAction, SkillCategory } from '../types';
import { defaultResumeData } from '../utils/defaults';

const LEGACY_NAME_TO_KEY: Record<string, string> = {
  'Programming Languages': 'programmingLanguages',
  'Frontend': 'frontend',
  'Backend': 'backend',
  'Databases': 'databases',
  'Cloud & Infrastructure': 'cloudInfrastructure',
  'Security': 'security',
  'APIs & Integrations': 'apisIntegrations',
  'Artificial Intelligence': 'artificialIntelligence',
};

function migrateSkillCategories(skills: SkillCategory[]): SkillCategory[] {
  return skills.map((cat) => {
    if (!cat.defaultKey && LEGACY_NAME_TO_KEY[cat.name]) {
      return { ...cat, defaultKey: LEGACY_NAME_TO_KEY[cat.name] };
    }
    return cat;
  });
}

const STORAGE_KEY = 'resume-builder-data';

function reorder<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'SET_PERSONAL':
      return {
        ...state,
        personal: { ...state.personal, [action.field]: action.value },
      };

    case 'SET_SUMMARY':
      return { ...state, summary: action.value };

    case 'ADD_SKILL_CATEGORY':
      return { ...state, skills: [...state.skills, action.category] };

    case 'REMOVE_SKILL_CATEGORY':
      return {
        ...state,
        skills: state.skills.filter((c) => c.id !== action.categoryId),
      };

    case 'RENAME_SKILL_CATEGORY':
      return {
        ...state,
        skills: state.skills.map((c) =>
          c.id === action.categoryId ? { ...c, name: action.name, defaultKey: undefined } : c
        ),
      };

    case 'ADD_SKILL':
      return {
        ...state,
        skills: state.skills.map((c) =>
          c.id === action.categoryId
            ? { ...c, skills: [...c.skills, action.skill] }
            : c
        ),
      };

    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.map((c) =>
          c.id === action.categoryId
            ? { ...c, skills: c.skills.filter((_, i) => i !== action.skillIndex) }
            : c
        ),
      };

    case 'REORDER_SKILL':
      return {
        ...state,
        skills: state.skills.map((c) =>
          c.id === action.categoryId
            ? { ...c, skills: reorder(c.skills, action.fromIndex, action.toIndex) }
            : c
        ),
      };

    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.experience] };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.id ? { ...e, [action.field]: action.value } : e
        ),
      };

    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((e) => e.id !== action.id),
      };

    case 'REORDER_EXPERIENCE':
      return {
        ...state,
        experience: reorder(state.experience, action.fromIndex, action.toIndex),
      };

    case 'ADD_EXPERIENCE_BULLET':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.experienceId
            ? { ...e, bullets: [...e.bullets, action.bullet] }
            : e
        ),
      };

    case 'UPDATE_EXPERIENCE_BULLET':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.experienceId
            ? {
                ...e,
                bullets: e.bullets.map((b, i) =>
                  i === action.bulletIndex ? action.value : b
                ),
              }
            : e
        ),
      };

    case 'REMOVE_EXPERIENCE_BULLET':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.experienceId
            ? { ...e, bullets: e.bullets.filter((_, i) => i !== action.bulletIndex) }
            : e
        ),
      };

    case 'REORDER_EXPERIENCE_BULLET':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.experienceId
            ? { ...e, bullets: reorder(e.bullets, action.fromIndex, action.toIndex) }
            : e
        ),
      };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.project] };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, [action.field]: action.value } : p
        ),
      };

    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
      };

    case 'REORDER_PROJECT':
      return {
        ...state,
        projects: reorder(state.projects, action.fromIndex, action.toIndex),
      };

    case 'ADD_PROJECT_BULLET':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, bullets: [...p.bullets, action.bullet] }
            : p
        ),
      };

    case 'UPDATE_PROJECT_BULLET':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? {
                ...p,
                bullets: p.bullets.map((b, i) =>
                  i === action.bulletIndex ? action.value : b
                ),
              }
            : p
        ),
      };

    case 'REMOVE_PROJECT_BULLET':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, bullets: p.bullets.filter((_, i) => i !== action.bulletIndex) }
            : p
        ),
      };

    case 'REORDER_PROJECT_BULLET':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, bullets: reorder(p.bullets, action.fromIndex, action.toIndex) }
            : p
        ),
      };

    case 'ADD_PROJECT_TECH':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, technologies: [...p.technologies, action.tech] }
            : p
        ),
      };

    case 'REMOVE_PROJECT_TECH':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? {
                ...p,
                technologies: p.technologies.filter((_, i) => i !== action.techIndex),
              }
            : p
        ),
      };

    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, action.certification],
      };

    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map((c) =>
          c.id === action.id ? { ...c, [action.field]: action.value } : c
        ),
      };

    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((c) => c.id !== action.id),
      };

    case 'ADD_LEADERSHIP':
      return { ...state, leadership: [...state.leadership, action.bullet] };

    case 'UPDATE_LEADERSHIP':
      return {
        ...state,
        leadership: state.leadership.map((l, i) =>
          i === action.index ? action.value : l
        ),
      };

    case 'REMOVE_LEADERSHIP':
      return {
        ...state,
        leadership: state.leadership.filter((_, i) => i !== action.index),
      };

    case 'REORDER_LEADERSHIP':
      return {
        ...state,
        leadership: reorder(state.leadership, action.fromIndex, action.toIndex),
      };

    case 'LOAD_STATE':
      return action.data;

    case 'RESET':
      return defaultResumeData;

    default:
      return state;
  }
}

function loadFromStorage(): ResumeData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ResumeData;
      const merged = { ...defaultResumeData, ...parsed };
      merged.skills = migrateSkillCategories(merged.skills);
      return merged;
    }
  } catch {
  }
  return defaultResumeData;
}

export function useResumeState() {
  const [data, dispatch] = useReducer(resumeReducer, null, loadFromStorage);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  const resetData = useCallback(() => {
    dispatch({ type: 'RESET' });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, dispatch, resetData };
}
