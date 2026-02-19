import React from 'react';
import type { ResumeData } from '../../types';
import { formatDateRange, filteredSkills } from './shared';
import { ContactLine } from './ContactLine';
import { BulletItems } from './BulletItems';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '12pt' }}>
    <div style={{ backgroundColor: '#f8fafc', borderRadius: '4pt', padding: '10pt 12pt' }}>
      <h2 style={{ fontSize: '10.5pt', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6pt 0' }}>
        {title}
      </h2>
      {children}
    </div>
  </div>
);

export const SoftGray: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#334155', fontSize: '9.5pt', lineHeight: 1.5 }}>
      {data.personal.fullName && (
        <div style={{ textAlign: 'center', marginBottom: '14pt' }}>
          <h1 style={{ fontSize: '22pt', fontWeight: 700, margin: 0, color: '#1e293b' }}>
            {data.personal.fullName}
          </h1>
          <ContactLine
            personal={data.personal}
            iconColor="#94a3b8"
            textColor="#94a3b8"
            fontSize="8.5pt"
            iconSize={9}
            justify="center"
          />
        </div>
      )}

      {data.summary && (
        <Section title={t.doc.summary}>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{data.summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title={t.doc.technicalSkills}>
          {skills.map((cat) => (
            <p key={cat.id} style={{ margin: '2pt 0' }}>
              <strong>{cat.name}:</strong> {cat.skills.join(', ')}
            </p>
          ))}
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title={t.doc.experience}>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '10pt', color: '#1e293b' }}>{exp.role}</span>
                <span style={{ fontSize: '8pt', color: '#94a3b8' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                </span>
              </div>
              <p style={{ margin: '1pt 0', color: '#64748b', fontSize: '9pt' }}>
                {exp.company}
                {exp.location && ` · ${exp.location}`}
                {exp.employmentType && ` · ${exp.employmentType}`}
              </p>
              <BulletItems items={exp.bullets} marginBottom="1pt" />
            </div>
          ))}
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={t.doc.projects}>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#1e293b' }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: '8pt', color: '#94a3b8' }}>{proj.link}</span>}
              </div>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: '8.5pt', color: '#64748b', margin: '1pt 0' }}>
                  {proj.technologies.join(', ')}
                </p>
              )}
              <BulletItems items={proj.bullets} marginBottom="1pt" />
            </div>
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={t.doc.certifications}>
          {data.certifications.map((cert) => (
            <p key={cert.id} style={{ margin: '2pt 0' }}>
              <strong>{cert.name}</strong> - {cert.issuer}
              {cert.year && <span style={{ color: '#94a3b8' }}> ({cert.year})</span>}
            </p>
          ))}
        </Section>
      )}

      {data.leadership.filter(Boolean).length > 0 && (
        <Section title={t.doc.leadershipFull}>
          <BulletItems items={data.leadership} marginBottom="1pt" />
        </Section>
      )}
    </div>
  );
};
