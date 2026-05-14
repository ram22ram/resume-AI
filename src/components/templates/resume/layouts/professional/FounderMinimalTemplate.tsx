import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ProjectItem, ExperienceItem, SkillItem, EducationItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const FounderMinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, color: '#555', marginTop: 4, marginBottom: 8 }}>
          {personal.jobTitle || 'Product Builder | Startup Operator'}
        </div>
        <IndianPersonalDetails data={personal} layout="list" style={{ fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} />
      </header>

      {projects.length > 0 && (
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Selected Projects</h2>
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong>{p.title}</strong>
                <span style={{ fontSize: 11, color: '#555' }}>{p.startDate} - {p.endDate}</span>
            </div>
            {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 2 }}>{p.technologies}</div>}
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {p.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12, color: '#444' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {experience.length > 0 && (
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Experience</h2>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: 12, color: '#555' }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12, color: '#444' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {skills.length > 0 && (
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Core Skills</h2>
        <div>{skills.join(' • ')}</div>
      </section>
      )}

      <section style={{ marginBottom: 24 }}>
           <h2 style={{ fontSize: 18, marginBottom: 10 }}>Education</h2>
           <IndianEducationTable data={education} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ fontSize: 18, marginBottom: 10 }}>Additional</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => <li key={`c-${i}`} style={{ fontSize: 12 }}><strong>{c.title}</strong>: {c.issuer}</li>)}
                  {achievements.map((a, i) => <li key={`a-${i}`} style={{ fontSize: 12 }}>{a.title}: {a.description}</li>)}
              </ul>
          </section>
      )}
    </div>
  );
};

export default FounderMinimalTemplate;
