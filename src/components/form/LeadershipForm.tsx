import React from 'react';
import type { ResumeAction } from '../../types';
import { BulletList } from '../ui/BulletList';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  leadership: string[];
  dispatch: React.Dispatch<ResumeAction>;
}

export const LeadershipForm: React.FC<Props> = ({ leadership, dispatch }) => {
  const { t } = useLanguage();
  return (
    <BulletList
      items={leadership}
      onAdd={() => dispatch({ type: 'ADD_LEADERSHIP', bullet: '' })}
      onUpdate={(index, value) => dispatch({ type: 'UPDATE_LEADERSHIP', index, value })}
      onRemove={(index) => dispatch({ type: 'REMOVE_LEADERSHIP', index })}
      onReorder={(from, to) =>
        dispatch({ type: 'REORDER_LEADERSHIP', fromIndex: from, toIndex: to })
      }
      placeholder={t.leadershipPlaceholder}
      addLabel={t.addItem}
    />
  );
};
