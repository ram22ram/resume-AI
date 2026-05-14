import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, EducationItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const FloatingCardsTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#2563eb';

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    marginBottom: 25
  };

  return (
    <div style={{ ...standardStyles.page, background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={cardStyle}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600, fontSize: 16 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, marginTop: 10, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
        />
      </div>

      {summary && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>PROFILE</h3>
          <p style={{ lineHeight: 1.6, fontSize: 13 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block', marginBottom: 20 }}>EXPERIENCE</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600 }}>{exp.position}</div>
                  <div style={{ fontSize: 12 }}>{exp.date}</div>
              </div>
              <div style={{ fontSize: 13, color: '#555', marginBottom: 5 }}>
                {exp.company}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </div>
      )}

        {projects.length > 0 && (
            <div style={cardStyle}>
                 <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block', marginBottom: 20 }}>PROJECTS</h3>
                 {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 600 }}>{p.title}</div>
                            <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
                        </div>
                        {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>}
                         <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                            {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                 ))}
            </div>
        )}

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block', marginBottom: 20 }}>EDUCATION</h3>
        <IndianEducationTable data={education} />
      </div>

      {skills.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block', marginBottom: 20 }}>SKILLS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                background: accent,
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 20,
                fontSize: 12
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {(achievements.length > 0 || certs.length > 0) && (
          <div style={cardStyle}>
              <h3 style={{ marginTop: 0, fontSize: 16, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block', marginBottom: 20 }}>ADDITIONAL</h3>
               <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                  {certs.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                  ))}
              </ul>
          </div>
      )}

    </div>
  );
};

export default FloatingCardsTemplate;
