import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ResumeAction, Certification } from '../../types';
import { generateId } from '../../utils/defaults';
import { FormField } from '../ui/FormField';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  certifications: Certification[];
  dispatch: React.Dispatch<ResumeAction>;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, dispatch }) => {
  const { t } = useLanguage();

  const addCertification = () => {
    dispatch({
      type: 'ADD_CERTIFICATION',
      certification: { id: generateId(), name: '', issuer: '', year: '' },
    });
  };

  return (
    <div className="space-y-3">
      {certifications.map((cert) => (
        <div
          key={cert.id}
          className="border border-stroke-faint rounded-lg p-3 bg-surface space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <FormField
                label={t.certificationName}
                value={cert.name}
                onChange={(v) =>
                  dispatch({ type: 'UPDATE_CERTIFICATION', id: cert.id, field: 'name', value: v })
                }
                placeholder="AWS Solutions Architect"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label={t.issuer}
                  value={cert.issuer}
                  onChange={(v) =>
                    dispatch({
                      type: 'UPDATE_CERTIFICATION',
                      id: cert.id,
                      field: 'issuer',
                      value: v,
                    })
                  }
                  placeholder="Amazon Web Services"
                />
                <FormField
                  label={t.year}
                  value={cert.year}
                  onChange={(v) =>
                    dispatch({
                      type: 'UPDATE_CERTIFICATION',
                      id: cert.id,
                      field: 'year',
                      value: v,
                    })
                  }
                  placeholder="2024"
                />
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', id: cert.id })}
              className="p-1.5 text-fg-subtle hover:text-red-500 ml-2 mt-4"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-stroke rounded-lg text-sm text-fg-muted hover:text-blue-600 hover:border-blue-300 transition-colors"
      >
        <Plus size={16} />
        {t.addCertification}
      </button>
    </div>
  );
};
