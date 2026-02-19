import React from 'react';
import type { ResumeData } from '../../types';
import { formatDateRange, filteredSkills } from './shared';
import { ContactLine } from './ContactLine';
import { BulletItems } from './BulletItems';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: '10.5pt', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '3pt', marginBottom: '6pt' }}>
    {children}
  </h2>
);

export const ElegantTwoColumn: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);
  const p = data.personal;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#334155', fontSize: '9.5pt', lineHeight: 1.5 }}>
      {p.fullName && (
        <div style={{ textAlign: 'center', marginBottom: '14pt', paddingBottom: '10pt', borderBottom: '1px solid #cbd5e1' }}>
          <h1 style={{ fontSize: '22pt', fontWeight: 300, margin: 0, color: '#0f172a', letterSpacing: '0.04em' }}>
            {p.fullName}
          </h1>
          <ContactLine
            personal={p}
            iconColor="#94a3b8"
            textColor="#64748b"
            fontSize="8.5pt"
            iconSize={9}
            justify="center"
          />
        </div>
      )}

      {data.summary && (
        <div style={{ marginBottom: '14pt' }}>
          <p style={{ margin: 0, whiteSpace: 'pre-line', color: '#475569', fontStyle: 'italic' }}>{data.summary}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20pt' }}>
        <div style={{ flex: 3 }}>
          {data.experience.length > 0 && (
            <div style={{ marginBottom: '14pt' }}>
              <SectionTitle>{t.doc.experience}</SectionTitle>
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10pt' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 600, fontSize: '10pt', color: '#1e293b' }}>{exp.role}</span>
                    <span style={{ fontSize: '8pt', color: '#94a3b8' }}>
                      {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                    </span>
                  </div>
                  <p style={{ margin: '1pt 0', color: '#64748b', fontSize: '9pt' }}>
                    {exp.company}{exp.location && `, ${exp.location}`}
                  </p>
                  <BulletItems items={exp.bullets} marginBottom="1pt" />
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div style={{ marginBottom: '14pt' }}>
              <SectionTitle>{t.doc.projects}</SectionTitle>
              {data.projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8pt' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: '#1e293b' }}>{proj.name}</strong>
                    {proj.link && <span style={{ fontSize: '8pt', color: '#94a3b8' }}>{proj.link}</span>}
                  </div>
                  {proj.technologies.length > 0 && (
                    <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '1pt 0' }}>
                      {proj.technologies.join(' · ')}
                    </p>
                  )}
                  <BulletItems items={proj.bullets} marginBottom="1pt" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1.2, minWidth: '140pt' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '14pt' }}>
              <SectionTitle>{t.doc.skills}</SectionTitle>
              {skills.map((cat) => (
                <div key={cat.id} style={{ marginBottom: '6pt' }}>
                  <p style={{ fontWeight: 600, fontSize: '8.5pt', color: '#475569', margin: '0 0 1pt 0' }}>
                    {cat.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '8.5pt', color: '#64748b' }}>
                    {cat.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div style={{ marginBottom: '14pt' }}>
              <SectionTitle>{t.doc.certifications}</SectionTitle>
              {data.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '4pt' }}>
                  <p style={{ fontWeight: 600, fontSize: '8.5pt', color: '#334155', margin: 0 }}>{cert.name}</p>
                  <p style={{ fontSize: '8pt', color: '#94a3b8', margin: '1pt 0 0 0' }}>
                    {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data.leadership.filter(Boolean).length > 0 && (
            <div>
              <SectionTitle>{t.doc.leadership}</SectionTitle>
              <BulletItems items={data.leadership} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
