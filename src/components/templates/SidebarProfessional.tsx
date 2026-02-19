import React from 'react';
import type { ResumeData } from '../../types';
import { formatDateRange, filteredSkills } from './shared';
import { ContactLine } from './ContactLine';
import { BulletItems } from './BulletItems';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  data: ResumeData;
}

export const SidebarProfessional: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  const skills = filteredSkills(data);
  const p = data.personal;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111', fontSize: '9.5pt', lineHeight: 1.5, display: 'flex', alignItems: 'stretch', minHeight: '297mm' }}>
      <div style={{ width: '200pt', backgroundColor: '#1a1a2e', color: '#e0e0e0', padding: '24pt 16pt', flexShrink: 0, alignSelf: 'stretch' }}>
        {p.fullName && (
          <h1 style={{ fontSize: '15pt', fontWeight: 700, color: '#fff', margin: '0 0 16pt 0', lineHeight: 1.3 }}>
            {p.fullName}
          </h1>
        )}

        <div style={{ marginBottom: '18pt' }}>
          <h3 style={{ fontSize: '8pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b8bae', marginBottom: '8pt' }}>
            {t.doc.contact}
          </h3>
          <ContactLine
            personal={p}
            iconColor="#8b8bae"
            textColor="#c0c0d8"
            fontSize="8pt"
            iconSize={9}
            direction="column"
          />
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: '18pt' }}>
            <h3 style={{ fontSize: '8pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b8bae', marginBottom: '8pt' }}>
              {t.doc.skills}
            </h3>
            {skills.map((cat) => (
              <div key={cat.id} style={{ marginBottom: '8pt' }}>
                <p style={{ fontWeight: 600, fontSize: '8.5pt', color: '#c0c0d8', margin: '0 0 2pt 0' }}>
                  {cat.name}
                </p>
                <p style={{ margin: 0, fontSize: '8pt', color: '#a0a0b8' }}>
                  {cat.skills.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '8pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b8bae', marginBottom: '8pt' }}>
              {t.doc.certifications}
            </h3>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6pt' }}>
                <p style={{ fontWeight: 600, fontSize: '8.5pt', color: '#e0e0e0', margin: 0 }}>
                  {cert.name}
                </p>
                <p style={{ fontSize: '8pt', color: '#a0a0b8', margin: '1pt 0 0 0' }}>
                  {cert.issuer}{cert.year ? ` (${cert.year})` : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '24pt 20pt' }}>
        {data.summary && (
          <div style={{ marginBottom: '16pt' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1a1a2e', marginBottom: '6pt', borderBottom: '2px solid #1a1a2e', paddingBottom: '3pt' }}>
              {t.doc.summary}
            </h2>
            <p style={{ margin: 0, whiteSpace: 'pre-line', color: '#333' }}>{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div style={{ marginBottom: '16pt' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1a1a2e', marginBottom: '6pt', borderBottom: '2px solid #1a1a2e', paddingBottom: '3pt' }}>
              {t.doc.experience}
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '10pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '10pt' }}>{exp.role}</strong>
                  <span style={{ fontSize: '8.5pt', color: '#666' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.isPresent, t.doc.present)}
                  </span>
                </div>
                <p style={{ margin: '1pt 0', color: '#444' }}>
                  {exp.company}
                  {exp.employmentType && ` · ${exp.employmentType}`}
                  {exp.location && ` · ${exp.location}`}
                </p>
                <BulletItems items={exp.bullets} marginBottom="1pt" color="#333" />
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div style={{ marginBottom: '16pt' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1a1a2e', marginBottom: '6pt', borderBottom: '2px solid #1a1a2e', paddingBottom: '3pt' }}>
              {t.doc.projects}
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: '8pt', color: '#666' }}>{proj.link}</span>}
                </div>
                {proj.technologies.length > 0 && (
                  <p style={{ fontSize: '8.5pt', color: '#666', margin: '1pt 0' }}>
                    {proj.technologies.join(' · ')}
                  </p>
                )}
                <BulletItems items={proj.bullets} marginBottom="1pt" color="#333" />
              </div>
            ))}
          </div>
        )}

        {data.leadership.filter(Boolean).length > 0 && (
          <div>
            <h2 style={{ fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1a1a2e', marginBottom: '6pt', borderBottom: '2px solid #1a1a2e', paddingBottom: '3pt' }}>
              {t.doc.leadershipShort}
            </h2>
            <BulletItems items={data.leadership} marginBottom="1pt" color="#333" />
          </div>
        )}
      </div>
    </div>
  );
};
