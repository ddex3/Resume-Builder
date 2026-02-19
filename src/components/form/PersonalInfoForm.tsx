import React from 'react';
import type { PersonalInfo, ResumeAction } from '../../types';
import { FormField } from '../ui/FormField';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: PersonalInfo;
  dispatch: React.Dispatch<ResumeAction>;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, dispatch }) => {
  const { t } = useLanguage();
  const set = (field: keyof PersonalInfo, value: string) =>
    dispatch({ type: 'SET_PERSONAL', field, value });

  return (
    <div className="space-y-3">
      <FormField
        label={t.fullName}
        value={data.fullName}
        onChange={(v) => set('fullName', v)}
        placeholder={t.ph.fullName}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label={t.city}
          value={data.city}
          onChange={(v) => set('city', v)}
          placeholder={t.ph.city}
        />
        <FormField
          label={t.country}
          value={data.country}
          onChange={(v) => set('country', v)}
          placeholder={t.ph.country}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label={t.email}
          type="email"
          value={data.email}
          onChange={(v) => set('email', v)}
          placeholder="john@example.com"
        />
        <FormField
          label={t.phone}
          type="tel"
          value={data.phone}
          onChange={(v) => set('phone', v)}
          placeholder={t.ph.phone}
        />
      </div>
      <FormField
        label={t.github}
        value={data.github}
        onChange={(v) => set('github', v)}
        placeholder="github.com/johndoe"
      />
      <FormField
        label={t.linkedin}
        value={data.linkedin}
        onChange={(v) => set('linkedin', v)}
        placeholder="linkedin.com/in/johndoe"
        optional
        optionalLabel={t.optional}
      />
      <FormField
        label={t.portfolio}
        value={data.portfolio}
        onChange={(v) => set('portfolio', v)}
        placeholder="johndoe.dev"
        optional
        optionalLabel={t.optional}
      />
    </div>
  );
};
