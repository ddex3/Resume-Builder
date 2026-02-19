import React from 'react';
import type { ResumeData, TemplateName } from '../../types';
import { PureMinimal } from './PureMinimal';
import { SidebarProfessional } from './SidebarProfessional';
import { TechClean } from './TechClean';
import { ElegantTwoColumn } from './ElegantTwoColumn';
import { SoftGray } from './SoftGray';
import { CompactDense } from './CompactDense';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
  template: TemplateName;
}

export const TemplateRenderer: React.FC<Props> = ({ data, template }) => {
  const { t } = useLanguage();

  const resolved: ResumeData = {
    ...data,
    skills: data.skills.map((cat) => {
      if (cat.defaultKey) {
        const key = cat.defaultKey as keyof typeof t.skillCategories;
        const name = t.skillCategories[key];
        if (name) return { ...cat, name };
      }
      return cat;
    }),
  };

  switch (template) {
    case 'pure-minimal':
      return <PureMinimal data={resolved} />;
    case 'sidebar-professional':
      return <SidebarProfessional data={resolved} />;
    case 'tech-clean':
      return <TechClean data={resolved} />;
    case 'elegant-two-column':
      return <ElegantTwoColumn data={resolved} />;
    case 'soft-gray':
      return <SoftGray data={resolved} />;
    case 'compact-dense':
      return <CompactDense data={resolved} />;
    default:
      return <PureMinimal data={resolved} />;
  }
};
