import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, EducationItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const BoldHorizonTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111827';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Helvetica, sans-serif', padding: 0 }}>
      
      {/* Dark Header */}
      <div style={{ backgroundColor: accent, color: '#fff', padding: 35 }}>
        <h1 style={{ margin: 0, fontSize: 30 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, marginTop: 6, fontWeight: 500 }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap', color: 'rgba(255,255,255,0.9)' }} 
            />
        </div>
      </div>

      <div style={{ padding: 30 }}>

        {summary && (
          <section style={{ marginBottom: 25 }}>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
          
          {/* Left Column */}
          <div>
            {experience.length > 0 && (
            <section style={{ marginBottom: 30 }}>
                <h3 style={{ borderBottom: '1px solid #ddd', fontSize: 14, textTransform: 'uppercase', marginBottom: 15 }}>Experience</h3>
                {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <strong style={{ fontSize: 14 }}>{exp.position}</strong>
                        <span style={{ fontSize: 11, fontWeight: 600 }}>{exp.date}</span>
                    </div>
                    <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                    {exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 12, marginBottom: 3 }}>{desc}</li>
                    ))}
                    </ul>
                </div>
                ))}
            </section>
            )}

            {projects.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                    <h3 style={{ borderBottom: '1px solid #ddd', fontSize: 14, textTransform: 'uppercase', marginBottom: 15 }}>Projects</h3>
                    {projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <strong style={{ fontSize: 14 }}>{p.title}</strong>
                                <span style={{ fontSize: 11 }}>{p.startDate} - {p.endDate}</span>
                            </div>
                            {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 5 }}>{p.technologies}</div>}
                            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                                {p.description.map((desc, idx) => (
                                    <li key={idx} style={{ fontSize: 12, marginBottom: 3 }}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}
            
            <section style={{ marginBottom: 30 }}>
                 <h3 style={{ borderBottom: '1px solid #ddd', fontSize: 14, textTransform: 'uppercase', marginBottom: 15 }}>Education</h3>
                 <IndianEducationTable data={education} />
            </section>

          </div>

          {/* Right Column */}
          <div>
            {skills.length > 0 && (
            <div style={{ marginBottom: 30 }}>
              <h3 style={{ borderBottom: '1px solid #ddd', fontSize: 14, textTransform: 'uppercase', marginBottom: 15 }}>Skills</h3>
              <ul style={{ paddingLeft: 16 }}>
                {skills.map((s, i) => (
                  <li key={i} style={{ fontSize: 12, marginBottom: 4 }}>{s}</li>
                ))}
              </ul>
            </div>
            )}

            {(achievements.length > 0 || certs.length > 0) && (
                <div>
                    <h3 style={{ borderBottom: '1px solid #ddd', fontSize: 14, textTransform: 'uppercase', marginBottom: 15 }}>Additional</h3>
                     {certs.length > 0 && (
                         <div style={{ marginBottom: 15 }}>
                             <h4 style={{ fontSize: 13, marginBottom: 5, fontWeight: 600 }}>Certifications</h4>
                             <ul style={{ paddingLeft: 16 }}>
                                 {certs.map((c, i) => <li key={i} style={{ fontSize: 12, marginBottom: 3 }}>{c.title}</li>)}
                             </ul>
                         </div>
                     )}
                     {achievements.length > 0 && (
                         <div>
                             <h4 style={{ fontSize: 13, marginBottom: 5, fontWeight: 600 }}>Achievements</h4>
                             <ul style={{ paddingLeft: 16 }}>
                                 {achievements.map((a, i) => <li key={i} style={{ fontSize: 12, marginBottom: 3 }}>{a.title}</li>)}
                             </ul>
                         </div>
                     )}
                </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default BoldHorizonTemplate;
