import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ProjectItem, ExperienceItem, SkillItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const AuroraCanvasTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description;
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      {/* LEFT RAIL */}
      <aside style={{ width: '28%', paddingRight: 20, borderRight: '1px solid #eee' }}>
        <h1 style={{ fontWeight: 600, fontSize: 24, lineHeight: 1.2 }}>{personal.fullName}</h1>
        <div style={{ color: '#6366f1', marginTop: 5, fontSize: 14 }}>{personal.jobTitle}</div>
        
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 5 }} 
        />

        {skills.length > 0 && (
            <div style={{ marginTop: 40 }}>
                <h3 style={{ fontSize: 14, textTransform: 'uppercase', marginBottom: 10 }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {skills.map((s, i) => (
                        <span key={i} style={{ fontSize: 12, background: '#f3f4f6', padding: '3px 8px', borderRadius: 4 }}>{s}</span>
                    ))}
                </div>
            </div>
        )}
      </aside>

      {/* MAIN FLOW */}
      <main style={{ width: '72%', paddingLeft: 30 }}>
        {summary && (
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: '#6366f1', borderBottom: '2px solid #6366f1', paddingBottom: 5, display: 'inline-block' }}>Profile</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: '#6366f1', borderBottom: '2px solid #6366f1', paddingBottom: 5, display: 'inline-block' }}>Experience</h3>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 14 }}>{e.position}</strong>
                  <span style={{ fontSize: 12, color: '#666' }}>{e.date}</span>
              </div>
              <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{e.company}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginTop: 3 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{e.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: '#6366f1', borderBottom: '2px solid #6366f1', paddingBottom: 5, display: 'inline-block' }}>Selected Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 14 }}>{p.title}</strong>
                  <span style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</span>
              </div>
              {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 2 }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginTop: 3 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: '#6366f1', borderBottom: '2px solid #6366f1', paddingBottom: 5, display: 'inline-block' }}>Education</h3>
          <IndianEducationTable data={education} />
        </section>

        {(achievements.length > 0 || certs.length > 0) && (
             <section>
                 <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: '#6366f1', borderBottom: '2px solid #6366f1', paddingBottom: 5, display: 'inline-block' }}>Additional</h3>
                 <ul style={{ paddingLeft: 16, fontSize: 13, marginTop: 10 }}>
                      {certs.map((c, i) => (
                          <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                      ))}
                      {achievements.map((a, i) => (
                          <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                      ))}
                  </ul>
             </section>
        )}
      </main>
    </div>
  );
};

export default AuroraCanvasTemplate;
