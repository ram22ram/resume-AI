import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const DynamicTimelineFlow: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#2563eb';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 40, borderBottom: `2px solid ${accent}`, paddingBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>
          {personal.fullName}
        </h1>
        <div style={{ color: accent, fontWeight: 600, marginTop: 5 }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 13, gap: 15, display: 'flex', flexWrap: 'wrap' }} 
            />
        </div>
      </header>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 40 }}>

        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 0,
          bottom: 0,
          width: 2,
          background: accent
        }} />

        {experience.length > 0 && (
          <div style={{ marginBottom: 40 }}>
             <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 16, marginTop: 0 }}>Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 30, position: 'relative' }}>
                {/* Circle Node */}
                <div style={{
                  position: 'absolute',
                  left: -32,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'white',
                  border: `3px solid ${accent}`
                }} />

                <div style={{ fontWeight: 700, fontSize: 15 }}>
                  {exp.position}
                </div>
                <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
                  {exp.company} • {exp.date}
                </div>
                <div style={{ marginTop: 6 }}>
                  <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                      {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                      )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: 40 }}>
             <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 16 }}>Projects</h3>
             {projects.map((p, i) => (
               <div key={i} style={{ marginBottom: 25, position: 'relative' }}>
                  <div style={{
                      position: 'absolute',
                      left: -29,
                      top: 6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: accent
                  }} />
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: '#555' }}>{p.startDate} - {p.endDate}</div>
                  {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>}
                  <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                      {p.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                      ))}
                  </ul>
               </div>
             ))}
          </div>
        )}

        <div style={{ marginBottom: 40 }}>
             <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 16 }}>Education</h3>
             <div style={{ paddingLeft: 5 }}>
                 <IndianEducationTable data={education} />
             </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: 40 }}>
             <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 16 }}>Skills</h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                 {skills.map((s, i) => (
                     <span key={i} style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: 20, fontSize: 13 }}>{s}</span>
                 ))}
             </div>
          </div>
        )}
        
        {(achievements.length > 0 || certs.length > 0) && (
             <div style={{ paddingLeft: 5 }}>
                 <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 16 }}>Additional</h3>
                 <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                      {certs.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                      {achievements.map((a, i) => <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>)}
                 </ul>
             </div>
        )}

      </div>

    </div>
  );
};

export default DynamicTimelineFlow;
