import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CanvasFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Poppins, sans-serif', padding: 60 }}>

      <header style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1 style={{ fontSize: 34, margin: 0, fontWeight: 600 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 16, marginTop: 6, color: '#555' }}>{personal.jobTitle}</div>
        
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, marginTop: 10, display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }} 
        />
      </header>

      {summary && (
        <div style={{
          padding: 20,
          marginBottom: 30,
          backgroundColor: '#f8fafc',
          borderRadius: 8,
          borderLeft: '4px solid #3b82f6'
        }}>
          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 20 }}>Experience</h2>
        {experience.map((exp, i) => (
          <div key={i} style={{
            marginBottom: 20,
            padding: 20,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderRadius: 10,
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <strong style={{ fontSize: 15 }}>{exp.position}</strong>
                <span style={{ fontSize: 12, color: '#666' }}>{exp.date}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#444', marginBottom: 5 }}>
              {exp.company}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 20 }}>Projects</h2>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 20, padding: 20, background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.03)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{p.title}</strong>
                    <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
                </div>
                {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginTop: 2 }}>{p.technologies}</div>}
                 <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                    {p.description.map((desc, idx) => (
                      <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
      )}

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 20 }}>Education</h2>
        <IndianEducationTable data={education} />
      </section>

      {skills.length > 0 && (
          <section style={{ marginBottom: 40 }}>
             <h2 style={{ fontSize: 18, borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 20 }}>Skills</h2>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                 {skills.map((s, i) => (
                     <span key={i} style={{ background: '#f1f5f9', padding: '5px 10px', borderRadius: 20, fontSize: 12, color: '#334155' }}>
                         {s}
                     </span>
                 ))}
             </div>
          </section>
      )}

      {(achievements.length > 0 || certs.length > 0) && (
          <section>
              <h2 style={{ fontSize: 18, borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 20 }}>Additional</h2>
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
  );
};

export default CanvasFlowTemplate;
