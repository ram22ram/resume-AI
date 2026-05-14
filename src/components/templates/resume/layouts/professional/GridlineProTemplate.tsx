import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem, SkillItem, ProjectItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const GridlineProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', padding: 40 }}>

      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13, marginBottom: 8 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
        />
      </header>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      {experience.length > 0 && (
      <section style={{ marginBottom: 25 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{exp.position}</strong>
              <span style={{ fontSize: 11 }}>{exp.date}</span>
            </div>
            <div style={{ fontSize: 12 }}>{exp.company}</div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 25 }}>
            <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Projects</h3>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{p.title}</strong>
                        <span style={{ fontSize: 11 }}>{p.startDate} - {p.endDate}</span>
                     </div>
                     {p.technologies && <div style={{ fontSize: 11, fontStyle: 'italic', marginBottom: 2 }}>{p.technologies}</div>}
                     <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                        ))}
                     </ul>
                </div>
            ))}
          </section>
      )}

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      <section style={{ marginBottom: 25 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Education</h3>
        <IndianEducationTable data={education} />
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      {skills.length > 0 && (
      <section style={{ marginBottom: 25 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ fontSize: 11, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
              {s}
            </span>
          ))}
        </div>
      </section>
      )}

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Additional</h3>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => <li key={`c-${i}`} style={{ fontSize: 12 }}><strong>{c.title}</strong> - {c.issuer}</li>)}
                  {achievements.map((a, i) => <li key={`a-${i}`} style={{ fontSize: 12 }}>{a.title}: {a.description}</li>)}
              </ul>
          </section>
      )}
    </div>
  );
};

export default GridlineProTemplate;
