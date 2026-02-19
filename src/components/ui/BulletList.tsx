import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface BulletListProps {
  items: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  placeholder?: string;
  addLabel?: string;
}

export const BulletList: React.FC<BulletListProps> = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  placeholder = 'Enter item...',
  addLabel = 'Add Item',
}) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div key={index} className="flex items-start gap-1.5">
        <div className="flex flex-col gap-0.5 pt-1.5">
          <button
            onClick={() => index > 0 && onReorder(index, index - 1)}
            disabled={index === 0}
            className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
            title="Move up"
          >
            <ArrowUp size={12} />
          </button>
          <button
            onClick={() => index < items.length - 1 && onReorder(index, index + 1)}
            disabled={index === items.length - 1}
            className="p-0.5 text-fg-subtle hover:text-fg-muted disabled:opacity-30"
            title="Move down"
          >
            <ArrowDown size={12} />
          </button>
        </div>
        <span className="text-fg-subtle mt-2 text-sm shrink-0">•</span>
        <textarea
          value={item}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder={placeholder}
          rows={1}
          className="flex-1 px-2 py-1.5 bg-surface border border-stroke rounded text-sm text-fg placeholder-fg-subtle focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[32px]"
        />
        <button
          onClick={() => onRemove(index)}
          className="p-1.5 text-fg-subtle hover:text-red-500 transition-colors mt-1"
          title="Remove"
        >
          <Trash2 size={14} />
        </button>
      </div>
    ))}
    <button
      onClick={onAdd}
      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium py-1"
    >
      <Plus size={14} />
      {addLabel}
    </button>
  </div>
);
