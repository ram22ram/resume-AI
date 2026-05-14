import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const TwoBandModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: 40 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, marginTop: 5, color: '#555', fontWeight: 500 }}>{personal.jobTitle}</div>
        <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
            />
        </div>
      </header>

      {/* Accent Band */}
      <div style={{ height: 15, backgroundColor: accent }} />

      <div style={{ padding: 50 }}>
        
        {experience.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h3 style={{ color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20 }}>WORK EXPERIENCE</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 25 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                  {exp.company} • {exp.date}
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
                <h3 style={{ color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20 }}>PROJECTS</h3>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                        <div style={{ fontSize: 13, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                        {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{p.technologies}</div>}
                        <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                            {p.description.map((desc, idx) => (
                                <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h3 style={{ color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20 }}>EDUCATION</h3>
            <IndianEducationTable data={education} />
          </section>
        )}

        {skills.length > 0 && (
             <section style={{ marginBottom: 40 }}>
                 <h3 style={{ color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20 }}>SKILLS</h3>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                     {skills.map((s, i) => (
                         <span key={i} style={{ border: '1px solid #ccc', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{s}</span>
                     ))}
                 </div>
             </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
            <section>
                 <h3 style={{ color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20 }}>ADDITIONAL</h3>
                 <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
                     {certs.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                     {achievements.map((a, i) => <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>)}
                 </ul>
            </section>
        )}

      </div>

    </div>
  );
};

export default TwoBandModernTemplate;
