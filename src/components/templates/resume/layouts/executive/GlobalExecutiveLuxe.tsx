import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const GlobalExecutiveLuxe: React.FC<{ data: ResumeData }> = ({ data }) => {
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

  const accent = data?.metadata?.accentColor || '#2563eb' || '#b45309';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Georgia, serif',
      textAlign: 'center'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{
          fontSize: 30,
          margin: 0,
          letterSpacing: 2
        }}>
          {personal.fullName}
        </h1>

        <div style={{
          marginTop: 6,
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 10
        }}>
          {personal.jobTitle}
        </div>

        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: '11px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }} 
        />

        <div style={{
          width: 80,
          height: 2,
          backgroundColor: accent,
          margin: '15px auto'
        }} />
      </header>

      {summary && (
        <section style={{
          maxWidth: 600,
          margin: '0 auto 30px auto',
          lineHeight: 1.8,
          fontStyle: 'italic'
        }}>
          {summary}
        </section>
      )}

      {experience.length > 0 && (
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ letterSpacing: 2 }}>PROFESSIONAL EXPERIENCE</h3>
        <div style={{
          width: 60,
          height: 1,
          backgroundColor: accent,
          margin: '10px auto 20px'
        }} />

        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 'bold' }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13 }}>
              {exp.company} | {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0', display: 'inline-block', textAlign: 'left' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ marginTop: 6, lineHeight: 1.6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ letterSpacing: 2 }}>PROJECTS</h3>
            <div style={{
                width: 60,
                height: 1,
                backgroundColor: accent,
                margin: '10px auto 20px'
            }} />
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ fontWeight: 'bold' }}>{p.title}</div>
                    <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
                    <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>
                    <ul style={{ paddingLeft: 16, display: 'inline-block', textAlign: 'left' }}>
                        {p.description.map((d, idx) => <li key={idx}>{d}</li>)}
                    </ul>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
          <section style={{ marginBottom: 30 }}>
              <h3 style={{ letterSpacing: 2 }}>SKILLS</h3>
              <div style={{
                width: 60,
                height: 1,
                backgroundColor: accent,
                margin: '10px auto 20px'
              }} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {skills.map((s, i) => <span key={i} style={{ borderBottom: `1px solid ${accent}`}}>{s}</span>)}
              </div>
          </section>
      )}

      <section style={{ marginBottom: 30 }}>
        <h3 style={{ letterSpacing: 2 }}>EDUCATION</h3>
        <div style={{
          width: 60,
          height: 1,
          backgroundColor: accent,
          margin: '10px auto 20px'
        }} />

        <div style={{ display: 'inline-block', width: '100%', textAlign: 'left' }}>
             <IndianEducationTable data={education} />
        </div>
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h3 style={{ letterSpacing: 2 }}>ADDITIONAL</h3>
              <div style={{
                  width: 60,
                  height: 1,
                  backgroundColor: accent,
                  margin: '10px auto 20px'
              }} />
              <ul style={{ display: 'inline-block', textAlign: 'left', paddingLeft: 20 }}>
                  {certifications.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                  {achievements.map((a, i) => <li key={`a-${i}`}>{a.title}: {a.description}</li>)}
              </ul>
          </section>
      )}

    </div>
  );
};

export default GlobalExecutiveLuxe;
