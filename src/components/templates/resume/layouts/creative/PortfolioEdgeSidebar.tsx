import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const PortfolioEdgeSidebar: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111';

  return (
    <div style={{
      ...standardStyles.page,
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      padding: 0
    }}>

      {/* Accent Sidebar */}
      <div style={{
        width: 25,
        backgroundColor: accent
      }} />

      <div style={{ padding: 40, flex: 1 }}>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 16, marginTop: 5, color: accent, fontWeight: 600 }}>
            {personal.jobTitle}
          </div>
           <div style={{ marginTop: 10 }}>
              <IndianPersonalDetails 
                  data={personal} 
                  layout="list" 
                  style={{ fontSize: 13, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
              />
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: 35 }}>
            <p style={{ lineHeight: 1.7, fontSize: 13 }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
        <section style={{ marginBottom: 35 }}>
          <h3 style={{ textTransform: 'uppercase', color: accent, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong>{exp.position}</strong>
                  <span style={{ fontSize: 12 }}>{exp.date}</span>
              </div>
              <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 4 }}>
                {exp.company}
              </div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4, fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section style={{ marginBottom: 35 }}>
          <h3 style={{ textTransform: 'uppercase', color: accent, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.title}</strong>
                  <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
              </div>
              {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        <section style={{ marginBottom: 35 }}>
          <h3 style={{ textTransform: 'uppercase', color: accent, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Education</h3>
          <IndianEducationTable data={education} />
        </section>

        {skills.length > 0 && (
          <section style={{ marginBottom: 35 }}>
            <h3 style={{ textTransform: 'uppercase', color: accent, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  borderBottom: `2px solid ${accent}`,
                  paddingBottom: 2,
                  fontSize: 13
                }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
            <section>
                <h3 style={{ textTransform: 'uppercase', color: accent, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Additional</h3>
                <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                    {certs.map((c, i) => (
                        <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                    ))}
                    {achievements.map((a, i) => (
                        <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                    ))}
                </ul>
            </section>
        )}

      </div>
    </div>
  );
};

export default PortfolioEdgeSidebar;
