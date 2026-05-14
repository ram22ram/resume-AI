import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const StrategyClassicEliteTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif', color: '#111' }}>
      
      <header style={{ textAlign: 'center', marginBottom: 25 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, marginTop: 5 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, marginTop: 6, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }} 
        />
      </header>

      {summary && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>PROFILE</h2>
          <p style={{ fontSize: 12 }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
      <section style={{ marginBottom: 20 }}>
        <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>EXPERIENCE</h2>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{exp.position}</strong> — {exp.company}</span>
                <span style={{ fontSize: 11 }}>{exp.date}</span>
            </div>
            <ul style={{ fontSize: 12, paddingLeft: 16, margin: '4px 0' }}>
              {exp.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>PROJECTS</h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{p.title}</strong>
                        <span style={{ fontSize: 11 }}>{p.startDate} - {p.endDate}</span>
                    </div>
                    {p.technologies && <div style={{ fontSize: 11, fontStyle: 'italic' }}>{p.technologies}</div>}
                    <ul style={{ fontSize: 12, paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((d, idx) => (
                            <li key={idx}>{d}</li>
                        ))}
                    </ul>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
          <section style={{ marginBottom: 20 }}>
              <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>SKILLS</h2>
              <div style={{ fontSize: 12 }}>{skills.join(', ')}</div>
          </section>
      )}

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>EDUCATION</h2>
        <IndianEducationTable data={education} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>ADDITIONAL</h2>
              <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                  {certifications.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                  {achievements.map((a, i) => <li key={`a-${i}`}>{a.title}: {a.description}</li>)}
              </ul>
          </section>
      )}
    </div>
  );
};

export default StrategyClassicEliteTemplate;
