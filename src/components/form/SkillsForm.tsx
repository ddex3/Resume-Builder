import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, ArrowUp, ArrowDown, X } from 'lucide-react';
import type { SkillCategory, ResumeAction } from '../../types';
import { generateId } from '../../utils/defaults';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  skills: SkillCategory[];
  dispatch: React.Dispatch<ResumeAction>;
}

export const SkillsForm: React.FC<Props> = ({ skills, dispatch }) => {
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const getCategoryDisplayName = (cat: SkillCategory): string => {
    if (cat.defaultKey) {
      const key = cat.defaultKey as keyof typeof t.skillCategories;
      return t.skillCategories[key] ?? cat.name;
    }
    return cat.name;
  };

  const startRename = (cat: SkillCategory) => {
    setEditingId(cat.id);
    setEditName(getCategoryDisplayName(cat));
  };

  const confirmRename = (categoryId: string) => {
    if (editName.trim()) {
      dispatch({ type: 'RENAME_SKILL_CATEGORY', categoryId, name: editName.trim() });
    }
    setEditingId(null);
  };

  const addSkill = (categoryId: string) => {
    const skill = (newSkills[categoryId] || '').trim();
    if (skill) {
      dispatch({ type: 'ADD_SKILL', categoryId, skill });
      setNewSkills((prev) => ({ ...prev, [categoryId]: '' }));
    }
  };

  const addCategory = () => {
    const name = newCategoryName.trim();
    if (name) {
      dispatch({
        type: 'ADD_SKILL_CATEGORY',
        category: { id: generateId(), name, skills: [] },
      });
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  return (
    <div className="space-y-4">
      {skills.map((cat) => (
        <div key={cat.id} className="border border-stroke-faint rounded-lg p-3 bg-surface">
          <div className="flex items-center justify-between mb-2">
            {editingId === cat.id ? (
              <div className="flex items-center gap-1.5 flex-1">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && confirmRename(cat.id)}
                  className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => confirmRename(cat.id)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-fg-subtle hover:text-fg-muted"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-fg">{getCategoryDisplayName(cat)}</span>
                <button
                  onClick={() => startRename(cat)}
                  className="p-0.5 text-fg-subtle hover:text-blue-500"
                  title="Rename"
                >
                  <Edit3 size={12} />
                </button>
              </div>
            )}
            <button
              onClick={() =>
                dispatch({ type: 'REMOVE_SKILL_CATEGORY', categoryId: cat.id })
              }
              className="p-1 text-fg-subtle hover:text-red-500 transition-colors"
              title="Remove category"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {cat.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-canvas text-fg text-xs rounded-md border border-stroke group"
              >
                {idx > 0 && (
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'REORDER_SKILL',
                        categoryId: cat.id,
                        fromIndex: idx,
                        toIndex: idx - 1,
                      })
                    }
                    className="opacity-0 group-hover:opacity-100 text-fg-subtle hover:text-fg-muted"
                    title="Move left"
                  >
                    <ArrowUp size={10} className="rotate-[-90deg]" />
                  </button>
                )}
                {skill}
                {idx < cat.skills.length - 1 && (
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'REORDER_SKILL',
                        categoryId: cat.id,
                        fromIndex: idx,
                        toIndex: idx + 1,
                      })
                    }
                    className="opacity-0 group-hover:opacity-100 text-fg-subtle hover:text-fg-muted"
                    title="Move right"
                  >
                    <ArrowDown size={10} className="rotate-[-90deg]" />
                  </button>
                )}
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_SKILL', categoryId: cat.id, skillIndex: idx })
                  }
                  className="text-fg-subtle hover:text-red-500"
                  title="Remove"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            <input
              value={newSkills[cat.id] || ''}
              onChange={(e) =>
                setNewSkills((prev) => ({ ...prev, [cat.id]: e.target.value }))
              }
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(cat.id))}
              placeholder={t.addSkillPlaceholder}
              className="flex-1 px-2 py-1 border border-stroke rounded text-xs text-fg placeholder-fg-subtle focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => addSkill(cat.id)}
              className="px-2 py-1 bg-blue-wash text-blue-on-wash rounded text-xs hover:bg-blue-wash-hover transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      ))}

      {showAddCategory ? (
        <div className="flex gap-1.5">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            placeholder={t.categoryNamePlaceholder}
            className="flex-1 px-2.5 py-1.5 border border-stroke rounded text-sm text-fg placeholder-fg-subtle focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={addCategory}
            className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
          >
            {t.add}
          </button>
          <button
            onClick={() => setShowAddCategory(false)}
            className="px-3 py-1.5 bg-tinted text-fg-muted rounded text-xs hover:bg-stroke"
          >
            {t.cancel}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddCategory(true)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={14} />
          {t.addCategory}
        </button>
      )}
    </div>
  );
};
