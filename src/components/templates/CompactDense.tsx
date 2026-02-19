import React from 'react';
import type { ResumeData } from '../../types';
import { formatDateRange, filteredSkills } from './shared';
import { ContactLine } from './ContactLine';
import { BulletItems } from './BulletItems';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
}

export const CompactDense: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);

  const sectionStyle: React.CSSProperties = {
    fontSize: '9pt',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#1e293b',
    borderBottom: '0.5pt solid #94a3b8',
    paddingBottom: '1.5pt',
    marginBottom: '4pt',
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#374151', fontSize: '8.5pt', lineHeight: 1.4 }}>
      {data.personal.fullName && (
        <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
          <h1 style={{ fontSize: '16pt', fontWeight: 700, margin: 0, color: '#111827' }}>
            {data.personal.fullName}
          </h1>
          <ContactLine
            personal={data.personal}
            iconColor="#6b7280"
            textColor="#6b7280"
            fontSize="7.5pt"
            iconSize={8}
            justify="center"
          />
        </div>
      )}

      {data.summary && (
        <div style={{ marginBottom: '8pt' }}>
          <h2 style={sectionStyle}>{t.doc.summary}</h2>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{data.summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '8pt' }}>
          <h2 style={sectionStyle}>{t.doc.skills}</h2>
          {skills.map((cat) => (
            <p key={cat.id} style={{ margin: '1pt 0', fontSize: '8pt' }}>
              <strong>{cat.name}:</strong> {cat.skills.join(', ')}
            </p>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: '8pt' }}>
          <h2 style={sectionStyle}>{t.doc.experience}</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '6pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span>
                  <strong style={{ fontSize: '9pt' }}>{exp.role}</strong>
                  {exp.company && <span style={{ color: '#6b7280' }}>, {exp.company}</span>}
                  {exp.location && <span style={{ color: '#9ca3af' }}> - {exp.location}</span>}
                </span>
                <span style={{ fontSize: '7.5pt', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8pt' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                </span>
              </div>
              <BulletItems items={exp.bullets} marginBottom="0.5pt" />
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: '8pt' }}>
          <h2 style={sectionStyle}>{t.doc.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '5pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <strong>{proj.name}</strong>
                  {proj.type && <span style={{ color: '#6b7280' }}> ({proj.type})</span>}
                </span>
                {proj.link && <span style={{ fontSize: '7pt', color: '#9ca3af' }}>{proj.link}</span>}
              </div>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: '7.5pt', color: '#6b7280', margin: '0.5pt 0' }}>
                  {proj.technologies.join(', ')}
                </p>
              )}
              <BulletItems items={proj.bullets} marginBottom="0.5pt" />
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: '8pt' }}>
          <h2 style={sectionStyle}>{t.doc.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} style={{ margin: '1pt 0', fontSize: '8pt' }}>
              <strong>{cert.name}</strong> - {cert.issuer}
              {cert.year && <span style={{ color: '#9ca3af' }}> ({cert.year})</span>}
            </p>
          ))}
        </div>
      )}

      {data.leadership.filter(Boolean).length > 0 && (
        <div>
          <h2 style={sectionStyle}>{t.doc.leadershipShort}</h2>
          <BulletItems items={data.leadership} marginBottom="0.5pt" />
        </div>
      )}
    </div>
  );
};
