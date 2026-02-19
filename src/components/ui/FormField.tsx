import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  optionalLabel?: string;
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  showCounter?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  optional = false,
  optionalLabel = '(optional)',
  textarea = false,
  rows = 4,
  maxLength,
  showCounter = false,
}) => {
  const baseClasses =
    'w-full px-3 py-2 bg-surface border border-stroke rounded-lg text-sm text-fg placeholder-fg-subtle focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

  return (
    <div>
      <label className="block text-xs font-medium text-fg-muted mb-1">
        {label}
        {optional && <span className="text-fg-subtle ml-1">{optionalLabel}</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`${baseClasses} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={baseClasses}
        />
      )}
      {showCounter && maxLength && (
        <div className="text-right text-xs text-fg-subtle mt-1">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};
