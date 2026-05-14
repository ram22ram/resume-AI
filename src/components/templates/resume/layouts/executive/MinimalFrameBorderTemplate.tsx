import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, SkillItem, EducationItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const MinimalFrameBorderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111';

  return (
    <div style={{
      ...standardStyles.page,
      padding: 70,
      fontFamily: 'Georgia, serif',
      border: `3px solid ${accent}`
    }}>
      
      <header style={{ textAlign: 'center', marginBottom: 50 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, marginBottom: 10 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails data={personal} layout="list" style={{ fontSize: 12, display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }} />
      </header>

      {summary && (
        <section style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
      <section>
        <h3 style={{ marginBottom: 20, borderBottom: `1px solid ${accent}`, paddingBottom: 5 }}>EXPERIENCE</h3>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontWeight: 600 }}>{exp.position}</div>
            <div style={{ fontSize: 12 }}>
              {exp.company} • {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ marginTop: 6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 30 }}>
              <h3 style={{ marginBottom: 20, borderBottom: `1px solid ${accent}`, paddingBottom: 5 }}>PROJECTS</h3>
               {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                     <div style={{ fontWeight: 700 }}>{p.title}</div>
                     <div style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                     <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>
                     <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                        ))}
                     </ul>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
          <section style={{ marginBottom: 30 }}>
              <h3 style={{ marginBottom: 20, borderBottom: `1px solid ${accent}`, paddingBottom: 5 }}>SKILLS</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {skills.map((s, i) => <span key={i} style={{ padding: '2px 8px', border: '1px solid #ccc' }}>{s}</span>)}
              </div>
          </section>
      )}

      <section style={{ marginBottom: 30 }}>
          <h3 style={{ marginBottom: 20, borderBottom: `1px solid ${accent}`, paddingBottom: 5 }}>EDUCATION</h3>
          <IndianEducationTable data={education} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h3 style={{ marginBottom: 20, borderBottom: `1px solid ${accent}`, paddingBottom: 5 }}>ADDITIONAL</h3>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}>{a.title}: {a.description}</li>
                  ))}
              </ul>
          </section>
      )}

    </div>
  );
};

export default MinimalFrameBorderTemplate;
