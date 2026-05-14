import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SplitBannerImpact: React.FC<{ data: ResumeData }> = ({ data }) => {
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
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Inter, sans-serif' }}>

      {/* Banner */}
      <div style={{
        background: accent,
        color: 'white',
        padding: '30px 40px'
      }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ marginTop: 6, opacity: 0.9, fontSize: 16 }}>{personal.jobTitle}</div>
         <div style={{ marginTop: 15 }}>
              <IndianPersonalDetails 
                  data={personal} 
                  layout="list" 
                  style={{ fontSize: 13, display: 'flex', gap: 15, flexWrap: 'wrap', color: 'rgba(255,255,255,0.9)' }} 
              />
          </div>
      </div>

      <div style={{ padding: 30 }}>

        {/* Summary Card */}
        {summary && (
          <div style={{
            background: '#f8fafc',
            padding: 20,
            borderRadius: 8,
            marginBottom: 30,
            borderLeft: `4px solid ${accent}`
          }}>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: 13 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 15, fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{
              padding: 15,
              marginBottom: 15,
              border: '1px solid #e5e7eb',
              borderRadius: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{exp.position}</strong>
                  <span style={{ fontSize: 13 }}>{exp.date}</span>
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
        </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 15, fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Projects</h2>
          {projects.map((p, i) => (
             <div key={i} style={{ marginBottom: 15, padding: 15, background: '#f9f9f9', borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.title}</strong>
                  <span style={{ fontSize: 13 }}>{p.startDate} - {p.endDate}</span>
              </div>
              {p.technologies && <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        {/* Education */}
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 15, fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Education</h2>
          <IndianEducationTable data={education} />
        </section>

        {skills.length > 0 && (
          <section style={{ marginBottom: 30 }}>
             <h2 style={{ marginBottom: 15, fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Skills</h2>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                 {skills.map((s, i) => (
                     <span key={i} style={{ background: accent, color: '#fff', padding: '4px 10px', borderRadius: 15, fontSize: 12 }}>
                         {s}
                     </span>
                 ))}
             </div>
          </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
            <section>
                <h2 style={{ marginBottom: 15, fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Additional</h2>
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

export default SplitBannerImpact;
