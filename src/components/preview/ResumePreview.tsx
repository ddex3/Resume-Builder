import React from 'react';
import type { ResumeData, TemplateName } from '../../types';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { hasContent } from '../templates/shared';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
  template: TemplateName;
}

export const ResumePreview: React.FC<Props> = ({ data, template }) => {
  const { t, isRTL } = useLanguage();

  if (!hasContent(data)) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-3 opacity-30">&#128196;</div>
          <p className="text-sm">{t.previewEmpty}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        #resume-preview li,
        #resume-preview p,
        #resume-preview h2,
        #resume-preview h3,
        #resume-preview h4 {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>

      <div
        id="resume-preview"
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: template === 'sidebar-professional' ? '0' : '20mm 18mm',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        }}
      >
        <TemplateRenderer data={data} template={template} />
      </div>
    </>
  );
};
