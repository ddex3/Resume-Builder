export type Lang = 'en' | 'he';

export interface Translations {
  appTitle: string;
  autosaved: string;
  reset: string;
  exportPDF: string;
  generating: string;
  confirmReset: string;
  zoomIn: string;
  zoomOut: string;

  sectionPersonal: string;
  sectionSummary: string;
  sectionSkills: string;
  sectionExperience: string;
  sectionProjects: string;
  sectionCertifications: string;
  sectionLeadership: string;

  fullName: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  optional: string;

  professionalSummary: string;
  summaryPlaceholder: string;

  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere: string;
  responsibilitiesLabel: string;
  addBullet: string;
  addExperience: string;
  newExperience: string;
  atCompany: string;

  empFullTime: string;
  empPartTime: string;
  empContract: string;
  empFreelance: string;
  empInternship: string;

  projectName: string;
  projectType: string;
  projectLink: string;
  technologies: string;
  description: string;
  addProjectBullet: string;
  addProject: string;
  newProject: string;
  addTechPlaceholder: string;
  projectTypePlaceholder: string;
  descriptionPlaceholder: string;

  certificationName: string;
  issuer: string;
  year: string;
  addCertification: string;

  addSkillPlaceholder: string;
  categoryNamePlaceholder: string;
  addCategory: string;
  add: string;
  cancel: string;

  leadershipPlaceholder: string;
  addItem: string;

  skillCategories: {
    programmingLanguages: string;
    frontend: string;
    backend: string;
    databases: string;
    cloudInfrastructure: string;
    security: string;
    apisIntegrations: string;
    artificialIntelligence: string;
  };

  templates: Record<string, { name: string; description: string }>;

  ph: {
    fullName: string;
    city: string;
    country: string;
    phone: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    expBullet: string;
    projectName: string;
  };

  previewEmpty: string;

  doc: {
    contact: string;
    summary: string;
    summarySlash: string;
    skills: string;
    skillsShort: string;
    techStack: string;
    experience: string;
    experienceSlash: string;
    projects: string;
    projectsSlash: string;
    certifications: string;
    certificationsSlash: string;
    leadership: string;
    leadershipShort: string;
    leadershipMore: string;
    technologiesLabel: string;
    present: string;
    workExperience: string;
    technicalSkills: string;
    leadershipFull: string;
  };
}

const en: Translations = {
  appTitle: 'Resume Builder',
  autosaved: 'Autosaved',
  reset: 'Reset',
  exportPDF: 'Export PDF',
  generating: 'Generating...',
  confirmReset: 'Are you sure you want to reset all data? This cannot be undone.',
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',

  sectionPersonal: 'Personal Information',
  sectionSummary: 'Professional Summary',
  sectionSkills: 'Technical Skills',
  sectionExperience: 'Work Experience',
  sectionProjects: 'Projects',
  sectionCertifications: 'Certifications',
  sectionLeadership: 'Leadership & Additional Skills',

  fullName: 'Full Name',
  city: 'City',
  country: 'Country',
  email: 'Email',
  phone: 'Phone',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  portfolio: 'Portfolio',
  optional: '(optional)',

  professionalSummary: 'Professional Summary',
  summaryPlaceholder: 'Experienced software engineer with expertise in building scalable web applications...',

  company: 'Company',
  role: 'Role',
  employmentType: 'Employment Type',
  location: 'Location',
  startDate: 'Start Date',
  endDate: 'End Date',
  currentlyWorkingHere: 'Currently working here',
  responsibilitiesLabel: 'Responsibilities & Achievements',
  addBullet: 'Add Bullet',
  addExperience: 'Add Experience',
  newExperience: 'New Experience',
  atCompany: 'at',

  empFullTime: 'Full-time',
  empPartTime: 'Part-time',
  empContract: 'Contract',
  empFreelance: 'Freelance',
  empInternship: 'Internship',

  projectName: 'Project Name',
  projectType: 'Project Type',
  projectLink: 'Link',
  technologies: 'Technologies',
  description: 'Description',
  addProjectBullet: 'Add Bullet',
  addProject: 'Add Project',
  newProject: 'New Project',
  addTechPlaceholder: 'Add technology...',
  projectTypePlaceholder: 'Personal / Open Source / Client',
  descriptionPlaceholder: 'Describe what the project does...',

  certificationName: 'Certification Name',
  issuer: 'Issuer',
  year: 'Year',
  addCertification: 'Add Certification',

  addSkillPlaceholder: 'Add skill...',
  categoryNamePlaceholder: 'Category name...',
  addCategory: 'Add Category',
  add: 'Add',
  cancel: 'Cancel',

  leadershipPlaceholder: 'Leadership experience or additional skill...',
  addItem: 'Add Item',

  skillCategories: {
    programmingLanguages: 'Programming Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Databases',
    cloudInfrastructure: 'Cloud & Infrastructure',
    security: 'Security',
    apisIntegrations: 'APIs & Integrations',
    artificialIntelligence: 'Artificial Intelligence',
  },

  templates: {
    'pure-minimal':         { name: 'Pure Minimal',         description: 'Single column, clean black & white' },
    'sidebar-professional': { name: 'Sidebar Professional', description: 'Left sidebar with contact & skills' },
    'tech-clean':           { name: 'Tech Clean',           description: 'Developer-friendly typography' },
    'elegant-two-column':   { name: 'Elegant Two Column',   description: 'Balanced professional layout' },
    'soft-gray':            { name: 'Soft Gray Sections',   description: 'Light gray section backgrounds' },
    'compact-dense':        { name: 'Compact Dense',        description: 'Content-heavy optimized spacing' },
  },

  ph: {
    fullName: 'John Doe',
    city: 'San Francisco',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    role: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: 'Jan 2022',
    endDate: 'Dec 2023',
    expBullet: 'Describe a responsibility or achievement...',
    projectName: 'E-commerce Platform',
  },

  previewEmpty: 'Start filling in your details to see a live preview',

  doc: {
    contact: 'Contact',
    summary: 'Professional Summary',
    summarySlash: '// Summary',
    skills: 'Skills',
    skillsShort: 'Skills',
    techStack: '// Tech Stack',
    experience: 'Experience',
    experienceSlash: '// Experience',
    projects: 'Projects',
    projectsSlash: '// Projects',
    certifications: 'Certifications',
    certificationsSlash: '// Certifications',
    leadership: 'Leadership',
    leadershipShort: 'Leadership & Additional',
    leadershipMore: '// Leadership & More',
    technologiesLabel: 'Technologies',
    present: 'Present',
    workExperience: 'Work Experience',
    technicalSkills: 'Technical Skills',
    leadershipFull: 'Leadership & Additional Skills',
  },
};

const he: Translations = {
  appTitle: 'בונה קורות חיים',
  autosaved: 'נשמר אוטומטית',
  reset: 'איפוס',
  exportPDF: 'ייצוא PDF',
  generating: 'מייצר...',
  confirmReset: 'האם אתה בטוח שברצונך לאפס את כל הנתונים? לא ניתן לבטל פעולה זו.',
  zoomIn: 'הגדל',
  zoomOut: 'הקטן',

  sectionPersonal: 'פרטים אישיים',
  sectionSummary: 'תקציר',
  sectionSkills: 'כישורים טכניים',
  sectionExperience: 'ניסיון תעסוקתי',
  sectionProjects: 'פרויקטים',
  sectionCertifications: 'הסמכות',
  sectionLeadership: 'מנהיגות ומיומנויות נוספות',

  fullName: 'שם מלא',
  city: 'עיר',
  country: 'מדינה',
  email: 'אימייל',
  phone: 'טלפון',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  portfolio: 'פורטפוליו',
  optional: '(אופציונלי)',

  professionalSummary: 'תקציר',
  summaryPlaceholder: 'מהנדס תוכנה מנוסה עם מומחיות בפיתוח יישומי ווב מדרגיים...',

  company: 'חברה',
  role: 'תפקיד',
  employmentType: 'סוג העסקה',
  location: 'מיקום',
  startDate: 'תאריך התחלה',
  endDate: 'תאריך סיום',
  currentlyWorkingHere: 'עובד/ת כאן כיום',
  responsibilitiesLabel: 'אחריות והישגים',
  addBullet: 'הוסף סעיף',
  addExperience: 'הוסף ניסיון',
  newExperience: 'ניסיון חדש',
  atCompany: 'ב-',

  empFullTime: 'משרה מלאה',
  empPartTime: 'משרה חלקית',
  empContract: 'חוזה',
  empFreelance: 'פרילנס',
  empInternship: 'התמחות',

  projectName: 'שם הפרויקט',
  projectType: 'סוג הפרויקט',
  projectLink: 'קישור',
  technologies: 'טכנולוגיות',
  description: 'תיאור',
  addProjectBullet: 'הוסף סעיף',
  addProject: 'הוסף פרויקט',
  newProject: 'פרויקט חדש',
  addTechPlaceholder: 'הוסף טכנולוגיה...',
  projectTypePlaceholder: 'אישי / קוד פתוח / לקוח',
  descriptionPlaceholder: 'תאר את הפרויקט...',

  certificationName: 'שם ההסמכה',
  issuer: 'גוף מנפיק',
  year: 'שנה',
  addCertification: 'הוסף הסמכה',

  addSkillPlaceholder: 'הוסף כישור...',
  categoryNamePlaceholder: 'שם הקטגוריה...',
  addCategory: 'הוסף קטגוריה',
  add: 'הוסף',
  cancel: 'ביטול',

  leadershipPlaceholder: 'ניסיון מנהיגות או מיומנות נוספת...',
  addItem: 'הוסף פריט',

  skillCategories: {
    programmingLanguages: 'שפות תכנות',
    frontend: 'פרונטאנד',
    backend: 'בקאנד',
    databases: 'מסדי נתונים',
    cloudInfrastructure: 'ענן ותשתיות',
    security: 'אבטחה',
    apisIntegrations: 'ממשקי API ואינטגרציות',
    artificialIntelligence: 'בינה מלאכותית',
  },

  templates: {
    'pure-minimal':         { name: 'מינימלי נקי',         description: 'עמודה אחת, שחור ולבן נקי' },
    'sidebar-professional': { name: 'סרגל צד מקצועי',      description: 'סרגל צד עם פרטי קשר וכישורים' },
    'tech-clean':           { name: 'טכנולוגי נקי',         description: 'טיפוגרפיה ידידותית למפתחים' },
    'elegant-two-column':   { name: 'אלגנטי דו-עמודי',      description: 'פריסה מקצועית מאוזנת' },
    'soft-gray':            { name: 'קטעים אפור עדין',      description: 'רקע אפור בהיר לקטעים' },
    'compact-dense':        { name: 'קומפקטי וצפוף',        description: 'ריווח ממוטב לתוכן עשיר' },
  },

  ph: {
    fullName: 'ישראל ישראלי',
    city: 'תל אביב',
    country: 'ישראל',
    phone: '+972-50-123-4567',
    role: 'מהנדס תוכנה בכיר',
    location: 'תל אביב, ישראל',
    startDate: 'ינואר 2022',
    endDate: 'דצמבר 2023',
    expBullet: 'תאר אחריות או הישג...',
    projectName: 'פלטפורמת מסחר',
  },

  previewEmpty: 'התחל למלא את הפרטים שלך לצפייה בתצוגה המקדימה',

  doc: {
    contact: 'פרטי קשר',
    summary: 'תקציר',
    summarySlash: '// תקציר',
    skills: 'כישורים',
    skillsShort: 'כישורים',
    techStack: '// טכנולוגיות',
    experience: 'ניסיון',
    experienceSlash: '// ניסיון',
    projects: 'פרויקטים',
    projectsSlash: '// פרויקטים',
    certifications: 'הסמכות',
    certificationsSlash: '// הסמכות',
    leadership: 'מנהיגות',
    leadershipShort: 'מנהיגות ונוסף',
    leadershipMore: '// מנהיגות ועוד',
    technologiesLabel: 'טכנולוגיות',
    present: 'היום',
    workExperience: 'ניסיון תעסוקתי',
    technicalSkills: 'כישורים טכניים',
    leadershipFull: 'מנהיגות ומיומנויות נוספות',
  },
};

export const translations: Record<Lang, Translations> = { en, he };
