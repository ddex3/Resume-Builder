import React from 'react';
import type { ResumeAction } from '../../types';
import { FormField } from '../ui/FormField';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  summary: string;
  dispatch: React.Dispatch<ResumeAction>;
}

export const SummaryForm: React.FC<Props> = ({ summary, dispatch }) => {
  const { t } = useLanguage();
  return (
    <div>
      <FormField
        label={t.professionalSummary}
        value={summary}
        onChange={(v) => dispatch({ type: 'SET_SUMMARY', value: v })}
        placeholder={t.summaryPlaceholder}
        textarea
        rows={5}
        maxLength={2000}
        showCounter
      />
    </div>
  );
};
