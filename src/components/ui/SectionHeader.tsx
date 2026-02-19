import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isOpen,
  onToggle,
  count,
}) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between px-4 py-3 bg-canvas hover:bg-tinted rounded-xl transition-colors group"
  >
    <div className="flex items-center gap-2">
      <h3 className="text-sm font-semibold text-fg">{title}</h3>
      {count !== undefined && count > 0 && (
        <span className="text-xs bg-blue-wash text-blue-on-wash px-2 py-0.5 rounded-full font-medium">
          {count}
        </span>
      )}
    </div>
    {isOpen ? (
      <ChevronUp size={16} className="text-fg-subtle" />
    ) : (
      <ChevronDown size={16} className="text-fg-subtle" />
    )}
  </button>
);
