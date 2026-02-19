import React from 'react';
import { TEMPLATES, type TemplateName } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  selected: TemplateName;
  onChange: (template: TemplateName) => void;
}

export const TemplateSelector: React.FC<Props> = ({ selected, onChange }) => {
  const { t } = useLanguage();
  return (
    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {TEMPLATES.map((tmpl) => {
        const info = t.templates[tmpl.id] ?? { name: tmpl.name, description: tmpl.description };
        return (
          <button
            key={tmpl.id}
            onClick={() => onChange(tmpl.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all border touch-manipulation ${
              selected === tmpl.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-surface text-fg-muted border-stroke hover:border-blue-300 hover:text-blue-600'
            }`}
            title={info.description}
          >
            {info.name}
          </button>
        );
      })}
    </div>
  );
};
