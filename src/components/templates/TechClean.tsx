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
  <h2 style={{ fontSize: '10pt', fontWeight: 600, fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f766e', marginBottom: '6pt', paddingBottom: '3pt', borderBottom: '1px solid #ccfbf1' }}>
    {children}
  </h2>
);

export const TechClean: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#1e293b', fontSize: '9.5pt', lineHeight: 1.5 }}>
      {data.personal.fullName && (
        <div style={{ marginBottom: '14pt' }}>
          <h1 style={{ fontSize: '20pt', fontWeight: 700, margin: 0, color: '#0f172a', fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}>
            {data.personal.fullName}
          </h1>
          <ContactLine
            personal={data.personal}
            iconColor="#0f766e"
            textColor="#64748b"
            fontSize="8.5pt"
            iconSize={9}
          />
        </div>
      )}

      {data.summary && (
        <div style={{ marginBottom: '14pt' }}>
          <SectionTitle>{t.doc.summarySlash}</SectionTitle>
          <p style={{ margin: 0, whiteSpace: 'pre-line', color: '#334155' }}>{data.summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '14pt' }}>
          <SectionTitle>{t.doc.techStack}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4pt 16pt' }}>
            {skills.map((cat) => (
              <p key={cat.id} style={{ margin: '2pt 0' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '8.5pt', color: '#0f766e', fontWeight: 600 }}>{cat.name}:</span>{' '}
                <span style={{ color: '#475569' }}>{cat.skills.join(', ')}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: '14pt' }}>
          <SectionTitle>{t.doc.experienceSlash}</SectionTitle>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '10pt' }}>
                  {exp.role}
                  <span style={{ fontWeight: 400, color: '#64748b' }}> @ {exp.company}</span>
                </span>
                <span style={{ fontSize: '8pt', color: '#94a3b8', fontFamily: 'monospace' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                </span>
              </div>
              {(exp.location || exp.employmentType) && (
                <p style={{ margin: '1pt 0', fontSize: '8.5pt', color: '#94a3b8' }}>
                  {[exp.location, exp.employmentType].filter(Boolean).join(' · ')}
                </p>
              )}
              <BulletItems items={exp.bullets} marginBottom="1pt" color="#334155" />
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: '14pt' }}>
          <SectionTitle>{t.doc.projectsSlash}</SectionTitle>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: '8pt', color: '#64748b', fontFamily: 'monospace' }}>{proj.link}</span>}
              </div>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: '8.5pt', color: '#0f766e', margin: '1pt 0', fontFamily: 'monospace' }}>
                  [{proj.technologies.join(', ')}]
                </p>
              )}
              <BulletItems items={proj.bullets} marginBottom="1pt" color="#334155" />
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: '14pt' }}>
          <SectionTitle>{t.doc.certificationsSlash}</SectionTitle>
          {data.certifications.map((cert) => (
            <p key={cert.id} style={{ margin: '2pt 0' }}>
              <strong>{cert.name}</strong>
              <span style={{ color: '#64748b' }}> - {cert.issuer}</span>
              {cert.year && <span style={{ fontFamily: 'monospace', fontSize: '8pt', color: '#94a3b8' }}> [{cert.year}]</span>}
            </p>
          ))}
        </div>
      )}

      {data.leadership.filter(Boolean).length > 0 && (
        <div>
          <SectionTitle>{t.doc.leadershipMore}</SectionTitle>
          <BulletItems items={data.leadership} marginBottom="1pt" color="#334155" />
        </div>
      )}
    </div>
  );
};
