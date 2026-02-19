import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import type { ResumeAction, Project } from '../../types';
import { generateId } from '../../utils/defaults';
import { FormField } from '../ui/FormField';
import { BulletList } from '../ui/BulletList';
import { TagInput } from '../ui/TagInput';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  projects: Project[];
  dispatch: React.Dispatch<ResumeAction>;
}

export const ProjectsForm: React.FC<Props> = ({ projects, dispatch }) => {
  const { t } = useLanguage();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addProject = () => {
    const id = generateId();
    dispatch({
      type: 'ADD_PROJECT',
      project: { id, name: '', type: '', bullets: [], technologies: [], link: '' },
    });
    setOpenIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-3">
      {projects.map((proj, index) => (
        <div key={proj.id} className="border border-stroke-faint rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-canvas">
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() =>
                  index > 0 &&
                  dispatch({ type: 'REORDER_PROJECT', fromIndex: index, toIndex: index - 1 })
                }
                disabled={index === 0}
                className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
              >
                <ArrowUp size={12} />
              </button>
              <button
                onClick={() =>
                  index < projects.length - 1 &&
                  dispatch({ type: 'REORDER_PROJECT', fromIndex: index, toIndex: index + 1 })
                }
                disabled={index === projects.length - 1}
                className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
              >
                <ArrowDown size={12} />
              </button>
            </div>
            <button onClick={() => toggleOpen(proj.id)} className="flex-1 text-left">
              <span className="text-sm font-medium text-fg">
                {proj.name || t.newProject}
              </span>
              {proj.type && <span className="text-xs text-fg-muted ml-2">({proj.type})</span>}
            </button>
            <button onClick={() => toggleOpen(proj.id)} className="p-1 text-fg-subtle">
              {openIds.has(proj.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={() => dispatch({ type: 'REMOVE_PROJECT', id: proj.id })}
              className="p-1 text-fg-subtle hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {openIds.has(proj.id) && (
            <div className="px-3 py-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label={t.projectName}
                  value={proj.name}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_PROJECT', id: proj.id, field: 'name', value: v })
                  }
                  placeholder={t.ph.projectName}
                />
                <FormField
                  label={t.projectType}
                  value={proj.type}
                  onChange={(v) =>
                    dispatch({ type: 'UPDATE_PROJECT', id: proj.id, field: 'type', value: v })
                  }
                  placeholder={t.projectTypePlaceholder}
                />
              </div>

              <FormField
                label={t.projectLink}
                value={proj.link}
                onChange={(v) =>
                  dispatch({ type: 'UPDATE_PROJECT', id: proj.id, field: 'link', value: v })
                }
                placeholder="https://github.com/user/project"
                optional
                optionalLabel={t.optional}
              />

              <div>
                <label className="block text-xs font-medium text-fg-muted mb-1.5">
                  {t.technologies}
                </label>
                <TagInput
                  tags={proj.technologies}
                  onAdd={(tech) =>
                    dispatch({ type: 'ADD_PROJECT_TECH', projectId: proj.id, tech })
                  }
                  onRemove={(idx) =>
                    dispatch({ type: 'REMOVE_PROJECT_TECH', projectId: proj.id, techIndex: idx })
                  }
                  placeholder={t.addTechPlaceholder}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-fg-muted mb-1.5">
                  {t.description}
                </label>
                <BulletList
                  items={proj.bullets}
                  onAdd={() =>
                    dispatch({ type: 'ADD_PROJECT_BULLET', projectId: proj.id, bullet: '' })
                  }
                  onUpdate={(idx, val) =>
                    dispatch({
                      type: 'UPDATE_PROJECT_BULLET',
                      projectId: proj.id,
                      bulletIndex: idx,
                      value: val,
                    })
                  }
                  onRemove={(idx) =>
                    dispatch({
                      type: 'REMOVE_PROJECT_BULLET',
                      projectId: proj.id,
                      bulletIndex: idx,
                    })
                  }
                  onReorder={(from, to) =>
                    dispatch({
                      type: 'REORDER_PROJECT_BULLET',
                      projectId: proj.id,
                      fromIndex: from,
                      toIndex: to,
                    })
                  }
                  placeholder={t.descriptionPlaceholder}
                  addLabel={t.addProjectBullet}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-stroke rounded-lg text-sm text-fg-muted hover:text-blue-600 hover:border-blue-300 transition-colors"
      >
        <Plus size={16} />
        {t.addProject}
      </button>
    </div>
  );
};
