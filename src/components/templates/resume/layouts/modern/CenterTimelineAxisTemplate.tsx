import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CenterTimelineAxisTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: 'Poppins, sans-serif',
        padding: 50,
        position: 'relative'
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 50 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, color: accent, marginBottom: 10 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }} 
        />
      </header>

      {/* Vertical Line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 180,
        bottom: 50,
        width: 2,
        backgroundColor: accent,
        opacity: 0.2
      }} />

      {/* Experience Blocks */}
      {experience.length > 0 && (
          <section>
             <h2 style={{ textAlign: 'center', fontSize: 18, marginBottom: 30, background: '#fff', position: 'relative', zIndex: 1, display: 'inline-block', padding: '0 10px', left: '50%', transform: 'translateX(-50%)' }}>EXPERIENCE</h2>
            {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
                <div
                key={i}
                style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: 40
                }}
                >
                <div style={{
                    width: '45%',
                    textAlign: isLeft ? 'right' : 'left',
                    paddingRight: isLeft ? 30 : 0,
                    paddingLeft: isLeft ? 0 : 30
                }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                    {exp.company} • {exp.date}
                    </div>
                    <ul style={{ 
                        paddingLeft: isLeft ? 0 : 16, 
                        paddingRight: isLeft ? 16 : 0,
                        margin: '8px 0', 
                        listStylePosition: isLeft ? 'inside' : 'outside',
                        textAlign: isLeft ? 'right' : 'left'
                    }}>
                        {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                            <li key={idx} style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5 }}>{desc}</li>
                        )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
                    </ul>
                </div>
                </div>
            );
            })}
        </section>
      )}

      {/* Projects Blocks */}
       {projects.length > 0 && (
          <section style={{ marginTop: 20 }}>
             <h2 style={{ textAlign: 'center', fontSize: 18, marginBottom: 30, background: '#fff', position: 'relative', zIndex: 1, display: 'inline-block', padding: '0 10px', left: '50%', transform: 'translateX(-50%)' }}>PROJECTS</h2>
            {projects.map((p, i) => {
            const isLeft = i % 2 !== 0; // Alternate starting from opposite side of experience
            return (
                <div
                key={i}
                style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: 40
                }}
                >
                <div style={{
                    width: '45%',
                    textAlign: isLeft ? 'right' : 'left',
                     paddingRight: isLeft ? 30 : 0,
                    paddingLeft: isLeft ? 0 : 30
                }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                     {p.startDate} - {p.endDate}
                    </div>
                    {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{p.technologies}</div>}
                     <ul style={{ 
                        paddingLeft: isLeft ? 0 : 16, 
                        paddingRight: isLeft ? 16 : 0,
                        margin: '8px 0', 
                        listStylePosition: isLeft ? 'inside' : 'outside',
                        textAlign: isLeft ? 'right' : 'left'
                    }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5 }}>{desc}</li>
                        ))}
                    </ul>
                </div>
                </div>
            );
            })}
        </section>
      )}

      {/* Other Sections (Full Width) */}
      <div style={{ position: 'relative', zIndex: 1, background: '#fff', padding: 20 }}>
          
          <h2 style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>EDUCATION</h2>
          <IndianEducationTable data={education} />

          {skills.length > 0 && (
            <div style={{ marginTop: 40, textAlign: 'center' }}>
                <h2 style={{ fontSize: 18, marginBottom: 15 }}>SKILLS</h2>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                    {skills.map((s, i) => (
                        <span key={i} style={{ border: `1px solid ${accent}`, padding: '5px 10px', borderRadius: 20, fontSize: 13 }}>{s}</span>
                    ))}
                </div>
            </div>
          )}
          
          {(achievements.length > 0 || certs.length > 0) && (
             <div style={{ marginTop: 40, textAlign: 'center' }}>
                 <h2 style={{ fontSize: 18, marginBottom: 15 }}>ADDITIONAL</h2>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, lineHeight: 1.6 }}>
                      {certs.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                      {achievements.map((a, i) => <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>)}
                  </ul>
             </div>
          )}

      </div>

    </div>
  );
};

export default CenterTimelineAxisTemplate;
