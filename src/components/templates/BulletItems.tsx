import React from 'react';

interface Props {
  items: string[];
  color?: string;
  marginBottom?: string;
}

export const BulletItems: React.FC<Props> = ({
  items,
  color = 'inherit',
  marginBottom = '2pt',
}) => {
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) return null;

  return (
    <div style={{ marginTop: '3pt' }}>
      {filtered.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '5pt',
            marginBottom,
            color,
          }}
        >
          <span style={{ flexShrink: 0, lineHeight: 'inherit' }}>•</span>
          <span style={{ flex: 1 }}>{item}</span>
        </div>
      ))}
    </div>
  );
};
