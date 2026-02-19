import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import type { WorkExperience, ResumeAction } from '../../types';
import { generateId } from '../../utils/defaults';
import { FormField } from '../ui/FormField';
import { BulletList } from '../ui/BulletList';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  experience: WorkExperience[];
  dispatch: React.Dispatch<ResumeAction>;
}

export const ExperienceForm: React.FC<Props> = ({ experience, dispatch }) => {
  const { t } = useLanguage();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const EMPLOYMENT_TYPES = [
    { value: 'Full-time', label: t.empFullTime },
    { value: 'Part-time', label: t.empPartTime },
    { value: 'Contract', label: t.empContract },
    { value: 'Freelance', label: t.empFreelance },
    { value: 'Internship', label: t.empInternship },
  ];

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addExperience = () => {
    const id = generateId();
    dispatch({
      type: 'ADD_EXPERIENCE',
      experience: {
        id,
        company: '',
        role: '',
        employmentType: 'Full-time',
        startDate: '',
        endDate: '',
        isPresent: false,
        location: '',
        bullets: [],
      },
    });
    setOpenIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-3">
      {experience.map((exp, index) => (
        <div key={exp.id} className="border border-stroke-faint rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-canvas">
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() =>
                  index > 0 &&
                  dispatch({ type: 'REORDER_EXPERIENCE', fromIndex: index, toIndex: index - 1 })
                }
                disabled={index === 0}
                className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
              >
                <ArrowUp size={12} />
              </button>
              <button
                onClick={() =>
                  index < experience.length - 1 &&
                  dispatch({ type: 'REORDER_EXPERIENCE', fromIndex: index, toIndex: index + 1 })
                }
                disabled={index === experience.length - 1}
                className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
              >
                <ArrowDown size={12} />
              </button>
            </div>
            <button
              onClick={() => toggleOpen(exp.id)}
              className="flex-1 text-left"
            >
              <span className="text-sm font-medium text-fg">
                {exp.role || exp.company || t.newExperience}
              </span>
              {exp.company && exp.role && (
                <span className="text-xs text-fg-muted ml-2">{t.atCompany} {exp.company}</span>
              )}
            </button>
            <button onClick={() => toggleOpen(exp.id)} className="p-1 text-fg-subtle">
              {openIds.has(exp.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', id: exp.id })}
              className="p-1 text-fg-subtle hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {openIds.has(exp.id) && (
            <div className="px-3 py-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label={t.company}
                  value={exp.company}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', id: exp.id, field: 'company', value: v })
                  }
                  placeholder="Google"
                />
                <FormField
                  label={t.role}
                  value={exp.role}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', id: exp.id, field: 'role', value: v })
                  }
                  placeholder={t.ph.role}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-fg-muted mb-1">
                    {t.employmentType}
                  </label>
                  <select
                    value={exp.employmentType}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        id: exp.id,
                        field: 'employmentType',
                        value: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-surface border border-stroke rounded-lg text-sm text-fg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {EMPLOYMENT_TYPES.map((et) => (
                      <option key={et.value} value={et.value}>
                        {et.label}
                      </option>
                    ))}
                  </select>
                </div>
                <FormField
                  label={t.location}
                  value={exp.location}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', id: exp.id, field: 'location', value: v })
                  }
                  placeholder={t.ph.location}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label={t.startDate}
                  value={exp.startDate}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', id: exp.id, field: 'startDate', value: v })
                  }
                  placeholder={t.ph.startDate}
                />
                <div>
                  <FormField
                    label={t.endDate}
                    value={exp.isPresent ? t.doc.present : exp.endDate}
                    onChange={(v) =>
                      dispatch({ type: 'UPDATE_EXPERIENCE', id: exp.id, field: 'endDate', value: v })
                    }
                    placeholder={t.ph.endDate}
                  />
                  <label className="flex items-center gap-1.5 mt-1.5">
                    <input
                      type="checkbox"
                      checked={exp.isPresent}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_EXPERIENCE',
                          id: exp.id,
                          field: 'isPresent',
                          value: e.target.checked,
                        })
                      }
                      className="rounded border-stroke text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-fg-muted">{t.currentlyWorkingHere}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-fg-muted mb-1.5">
                  {t.responsibilitiesLabel}
                </label>
                <BulletList
                  items={exp.bullets}
                  onAdd={() =>
                    dispatch({ type: 'ADD_EXPERIENCE_BULLET', experienceId: exp.id, bullet: '' })
                  }
                  onUpdate={(idx, val) =>
                    dispatch({
                      type: 'UPDATE_EXPERIENCE_BULLET',
                      experienceId: exp.id,
                      bulletIndex: idx,
                      value: val,
                    })
                  }
                  onRemove={(idx) =>
                    dispatch({
                      type: 'REMOVE_EXPERIENCE_BULLET',
                      experienceId: exp.id,
                      bulletIndex: idx,
                    })
                  }
                  onReorder={(from, to) =>
                    dispatch({
                      type: 'REORDER_EXPERIENCE_BULLET',
                      experienceId: exp.id,
                      fromIndex: from,
                      toIndex: to,
                    })
                  }
                  placeholder={t.ph.expBullet}
                  addLabel={t.addBullet}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-stroke rounded-lg text-sm text-fg-muted hover:text-blue-600 hover:border-blue-300 transition-colors"
      >
        <Plus size={16} />
        {t.addExperience}
      </button>
    </div>
  );
};
