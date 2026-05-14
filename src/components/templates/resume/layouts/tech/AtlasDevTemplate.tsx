import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ProjectItem, ExperienceItem, SkillItem, EducationItem, SummaryItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

interface Props {
  data: ResumeData;
}

const AtlasDevTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = (getItems('personal')[0] || {}) as PersonalItem;
  const summary = ((getItems('summary')[0] || {}) as SummaryItem).description || personal.objective || '';
  const projects = getItems('projects') as ProjectItem[];
  const experience = getItems('experience') as ExperienceItem[];
  const skills = (getItems('skills') as SkillItem[]).map(s => s.name);
  const education = getItems('education') as EducationItem[];
  const certifications = getItems('certifications') as CertificationItem[];
  const achievements = getItems('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, fontFamily: standardStyles.fonts.modern }}>
      {/* HEADER */}
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '26pt', margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '12pt', color: accent }}>{personal.jobTitle}</div>
        
        {/* Contact Info using Standard Component */}
        <IndianPersonalDetails 
          data={personal} 
          layout="list" 
          style={{ marginTop: 10, fontSize: '9pt', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }} 
        />
      </header>

      {/* SUMMARY */}
      {summary && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ borderBottom: `2px solid ${accent}`, fontSize: '14pt', marginBottom: 8 }}>Profile</h2>
          <p style={{ fontSize: '10pt', margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ borderBottom: `2px solid ${accent}`, fontSize: '14pt', marginBottom: 10 }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong>{e.position}</strong>
                <span style={{ fontSize: '9pt', color: '#666' }}>{e.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '11pt', marginBottom: 4 }}>{e.company}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                  )) : <li style={{ fontSize: '10pt' }}>{e.description}</li>}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ borderBottom: `2px solid ${accent}`, fontSize: '14pt', marginBottom: 10 }}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                 <strong>{p.title}</strong>
                 <span style={{ fontSize: '9pt', color: '#666' }}>{p.startDate} - {p.endDate}</span>
              </div>
              <div style={{ fontSize: '9pt', color: '#555', fontStyle: 'italic' }}>{p.technologies}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      <IndianEducationTable data={education} />

      {/* SKILLS */}
      {skills.length > 0 && (
        <section style={{ marginTop: 20, marginBottom: 20 }}>
          <h2 style={{ borderBottom: `2px solid ${accent}`, fontSize: '14pt', marginBottom: 10 }}>Skills</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: 6, fontSize: '10pt', background: '#f9fafb' }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS & ACHIEVEMENTS */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <section style={{ marginBottom: 20 }}>
            <h2 style={{ borderBottom: `2px solid ${accent}`, fontSize: '14pt', marginBottom: 10 }}>Additional</h2>
            <ul style={{ paddingLeft: 16 }}>
                {certifications.map((c, i) => (
                    <li key={`c-${i}`} style={{ fontSize: '10pt', marginBottom: 4 }}>
                        <strong>{c.title}</strong> - {c.issuer} ({c.date})
                    </li>
                ))}
                {achievements.map((a, i) => (
                    <li key={`a-${i}`} style={{ fontSize: '10pt', marginBottom: 4 }}>
                        <strong>{a.title}</strong>: {a.description}
                    </li>
                ))}
            </ul>
        </section>
      )}

    </div>
  );
};

export default AtlasDevTemplate;
