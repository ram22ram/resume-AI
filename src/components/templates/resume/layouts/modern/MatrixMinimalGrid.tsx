import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, EducationItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const MatrixMinimalGrid: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = get('skills') as SkillItem[];
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111827';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 500, fontSize: 16 }}>{personal.jobTitle}</div>
        <div style={{ marginTop: 10 }}>
             <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', gap: 20, flexWrap: 'wrap' }} 
            />
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 30
      }}>

        {/* Column 1 */}
        <div>
           {experience.length > 0 && (
            <div style={{
            borderTop: `3px solid ${accent}`,
            paddingTop: 15,
            marginBottom: 30
            }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: 14 }}>Experience</h3>
            {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{exp.position}</div>
                <div style={{ fontSize: 13, color: '#555' }}>
                    {exp.company} | {exp.date}
                </div>
                <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                    {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 12, lineHeight: 1.4, marginBottom: 3 }}>{desc}</li>
                    )) : <li style={{ fontSize: 12 }}>{exp.description}</li>}
                </ul>
                </div>
            ))}
            </div>
           )}

           <div style={{
            borderTop: `3px solid ${accent}`,
            paddingTop: 15,
            marginBottom: 30
            }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: 14 }}>Education</h3>
                <IndianEducationTable data={education} />
            </div>

        </div>

        {/* Column 2 */}
        <div>
            {projects.length > 0 && (
                <div style={{
                    borderTop: `3px solid ${accent}`,
                    paddingTop: 15,
                    marginBottom: 30
                }}>
                    <h3 style={{ textTransform: 'uppercase', fontSize: 14 }}>Projects</h3>
                     {projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                            <div style={{ fontSize: 12, color: '#555' }}>{p.startDate} - {p.endDate}</div>
                            {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 2 }}>{p.technologies}</div>}
                            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                                {p.description.map((desc, idx) => (
                                    <li key={idx} style={{ fontSize: 12, lineHeight: 1.4, marginBottom: 3 }}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {skills.length > 0 && (
                <div style={{
                borderTop: `3px solid ${accent}`,
                paddingTop: 15,
                marginBottom: 30
                }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: 14 }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map((s, i) => (
                    <span key={i} style={{
                        border: '1px solid #ddd',
                        padding: '4px 8px',
                        fontSize: 12,
                        borderRadius: 4
                    }}>
                        {s.name}
                    </span>
                    ))}
                </div>
                </div>
            )}

            {(achievements.length > 0 || certs.length > 0) && (
                <div style={{
                    borderTop: `3px solid ${accent}`,
                    paddingTop: 15,
                    marginBottom: 30
                }}>
                    <h3 style={{ textTransform: 'uppercase', fontSize: 14 }}>Additional</h3>
                     {certs.length > 0 && (
                        <div style={{ marginBottom: 15 }}>
                            <h4 style={{ fontSize: 13, marginBottom: 5 }}>Certifications</h4>
                            <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                                {certs.map((c, i) => <li key={i}>{c.title} - {c.issuer}</li>)}
                            </ul>
                        </div>
                     )}
                     {achievements.length > 0 && (
                         <div>
                             <h4 style={{ fontSize: 13, marginBottom: 5 }}>Achievements</h4>
                             <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                                 {achievements.map((a, i) => <li key={i}>{a.title}</li>)}
                             </ul>
                         </div>
                     )}
                </div>
            )}
        </div>

      </div>

    </div>
  );
};

export default MatrixMinimalGrid;
