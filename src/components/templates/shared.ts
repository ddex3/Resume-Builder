import type { ResumeData } from '../../types';

export function formatDateRange(start: string, end: string, isPresent: boolean, present = 'Present'): string {
  if (!start) return '';
  const endStr = isPresent ? present : end;
  return endStr ? `${start} – ${endStr}` : start;
}

export function hasContent(data: ResumeData): boolean {
  return !!(
    data.personal.fullName ||
    data.summary ||
    data.skills.some((c) => c.skills.length > 0) ||
    data.experience.length > 0 ||
    data.projects.length > 0 ||
    data.certifications.length > 0 ||
    data.leadership.length > 0
  );
}

export function contactLine(data: ResumeData): string[] {
  const parts: string[] = [];
  const p = data.personal;
  if (p.city && p.country) parts.push(`${p.city}, ${p.country}`);
  else if (p.city) parts.push(p.city);
  else if (p.country) parts.push(p.country);
  if (p.email) parts.push(p.email);
  if (p.phone) parts.push(p.phone);
  if (p.github) parts.push(p.github);
  if (p.linkedin) parts.push(p.linkedin);
  if (p.portfolio) parts.push(p.portfolio);
  return parts;
}

export function filteredSkills(data: ResumeData) {
  return data.skills.filter((c) => c.skills.length > 0);
}
