import React from 'react';
import type { ResumeData } from '../../types';
import { formatDateRange, filteredSkills } from './shared';
import { ContactLine } from './ContactLine';
import { BulletItems } from './BulletItems';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
}

export const PureMinimal: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111', fontSize: '9.5pt', lineHeight: 1.5 }}>
      {data.personal.fullName && (
        <div style={{ textAlign: 'center', marginBottom: '12pt' }}>
          <h1 style={{ fontSize: '20pt', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
            {data.personal.fullName}
          </h1>
          <ContactLine
            personal={data.personal}
            iconColor="#444"
            textColor="#555"
            fontSize="8.5pt"
            iconSize={9}
            justify="center"
          />
        </div>
      )}

      {data.summary && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.summary}
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{data.summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.technicalSkills}
          </h2>
          {skills.map((cat) => (
            <p key={cat.id} style={{ margin: '2pt 0' }}>
              <strong>{cat.name}:</strong> {cat.skills.join(', ')}
            </p>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.workExperience}
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong>{exp.role}</strong>
                  {exp.company && <span> - {exp.company}</span>}
                  {exp.employmentType && <span style={{ color: '#666' }}> ({exp.employmentType})</span>}
                </div>
                <span style={{ fontSize: '8.5pt', color: '#555', whiteSpace: 'nowrap', marginLeft: '12pt' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                </span>
              </div>
              {exp.location && <p style={{ fontSize: '8.5pt', color: '#666', margin: '1pt 0' }}>{exp.location}</p>}
              <BulletItems items={exp.bullets} marginBottom="1pt" />
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.projects}
          </h2>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong>{proj.name}</strong>
                  {proj.type && <span style={{ color: '#666' }}> ({proj.type})</span>}
                </div>
                {proj.link && <span style={{ fontSize: '8pt', color: '#555' }}>{proj.link}</span>}
              </div>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: '8.5pt', color: '#555', margin: '1pt 0' }}>{t.doc.technologiesLabel}: {proj.technologies.join(', ')}</p>
              )}
              <BulletItems items={proj.bullets} marginBottom="1pt" />
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.certifications}
          </h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} style={{ margin: '2pt 0' }}>
              <strong>{cert.name}</strong>
              {cert.issuer && <span> - {cert.issuer}</span>}
              {cert.year && <span style={{ color: '#666' }}> ({cert.year})</span>}
            </p>
          ))}
        </div>
      )}

      {data.leadership.filter(Boolean).length > 0 && (
        <div style={{ marginBottom: '12pt' }}>
          <h2 style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #111', paddingBottom: '2pt', marginBottom: '6pt' }}>
            {t.doc.leadershipFull}
          </h2>
          <BulletItems items={data.leadership} marginBottom="1pt" />
        </div>
      )}
    </div>
  );
};
