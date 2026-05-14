import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CenteredAuthorityLine: React.FC<{ data: ResumeData }> = ({ data }) => {
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

  const accent = data?.metadata?.accentColor || '#2563eb' || '#1e293b';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: '"Georgia", serif',
      textAlign: 'center'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0, fontSize: 30, letterSpacing: 2 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 14, color: accent, marginTop: 6, marginBottom: 10 }}>
          {personal.jobTitle}
        </div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: '11px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }} 
        />
      </header>

      {/* Divider */}
      <div style={{
        width: 2,
        height: 40,
        background: accent,
        margin: '0 auto 40px auto'
      }} />

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 40 }}>
          <p style={{
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
            fontFamily: 'Inter, sans-serif'
          }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>
          EXPERIENCE
        </h2>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 700 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              {exp.company} | {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0', display: 'inline-block', textAlign: 'left' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ marginTop: 6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>PROJECTS</h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                     <div style={{ fontWeight: 700 }}>{p.title}</div>
                     <div style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                     <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>
                     <ul style={{ paddingLeft: 16, margin: '6px 0', display: 'inline-block', textAlign: 'left' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                        ))}
                     </ul>
                </div>
            ))}
          </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: 40 }}>
            <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>SKILLS</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
                {skills.map((s, i) => (
                    <span key={i} style={{ borderBottom: `1px solid ${accent}` }}>{s}</span>
                ))}
            </div>
        </section>
      )}

      {/* Education */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>
          EDUCATION
        </h2>
        <div style={{ textAlign: 'left', display: 'inline-block', width: '100%' }}>
             <IndianEducationTable data={education} />
        </div>
      </section>

      {/* Additional */}
      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>ADDITIONAL</h2>
              <ul style={{ paddingLeft: 16, display: 'inline-block', textAlign: 'left' }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong>: {c.issuer}</li>
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

export default CenteredAuthorityLine;
