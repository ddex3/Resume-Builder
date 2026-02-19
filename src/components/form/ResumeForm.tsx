import React, { useState } from 'react';
import type { ResumeData, ResumeAction } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { SkillsForm } from './SkillsForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { LeadershipForm } from './LeadershipForm';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
}

type SectionKey = 'personal' | 'summary' | 'skills' | 'experience' | 'projects' | 'certifications' | 'leadership';

export const ResumeForm: React.FC<Props> = ({ data, dispatch }) => {
  const { t } = useLanguage();
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['personal', 'summary', 'skills', 'experience', 'projects', 'certifications', 'leadership'])
  );

  const toggle = (section: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <div className="space-y-4 pb-8">
      <div className="space-y-2">
        <SectionHeader
          title={t.sectionPersonal}
          isOpen={openSections.has('personal')}
          onToggle={() => toggle('personal')}
        />
        {openSections.has('personal') && (
          <div className="px-1 pt-2">
            <PersonalInfoForm data={data.personal} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionSummary}
          isOpen={openSections.has('summary')}
          onToggle={() => toggle('summary')}
        />
        {openSections.has('summary') && (
          <div className="px-1 pt-2">
            <SummaryForm summary={data.summary} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionSkills}
          isOpen={openSections.has('skills')}
          onToggle={() => toggle('skills')}
          count={data.skills.reduce((acc, c) => acc + c.skills.length, 0)}
        />
        {openSections.has('skills') && (
          <div className="px-1 pt-2">
            <SkillsForm skills={data.skills} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionExperience}
          isOpen={openSections.has('experience')}
          onToggle={() => toggle('experience')}
          count={data.experience.length}
        />
        {openSections.has('experience') && (
          <div className="px-1 pt-2">
            <ExperienceForm experience={data.experience} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionProjects}
          isOpen={openSections.has('projects')}
          onToggle={() => toggle('projects')}
          count={data.projects.length}
        />
        {openSections.has('projects') && (
          <div className="px-1 pt-2">
            <ProjectsForm projects={data.projects} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionCertifications}
          isOpen={openSections.has('certifications')}
          onToggle={() => toggle('certifications')}
          count={data.certifications.length}
        />
        {openSections.has('certifications') && (
          <div className="px-1 pt-2">
            <CertificationsForm certifications={data.certifications} dispatch={dispatch} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <SectionHeader
          title={t.sectionLeadership}
          isOpen={openSections.has('leadership')}
          onToggle={() => toggle('leadership')}
          count={data.leadership.length}
        />
        {openSections.has('leadership') && (
          <div className="px-1 pt-2">
            <LeadershipForm leadership={data.leadership} dispatch={dispatch} />
          </div>
        )}
      </div>
    </div>
  );
};
