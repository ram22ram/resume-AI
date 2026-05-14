import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, EducationItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CorporateSplitLineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0f172a';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: 'Helvetica, Arial, sans-serif',
        padding: 0
      }}
    >
      {/* Bold Header Bar */}
      <div style={{
        backgroundColor: accent,
        color: '#fff',
        padding: '30px 40px'
      }}>
        <h1 style={{ margin: 0, fontSize: 28, textTransform: 'uppercase' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 14, marginTop: 6, fontWeight: 500, opacity: 0.9 }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', opacity: 0.9, color: '#fff' }} 
            />
        </div>
      </div>

      <div style={{ padding: '30px 40px' }}>
        
        {personal.objective && (
            <div style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: accent, textTransform: 'uppercase' }}>
                    Profile
                </h2>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: '#333' }}>
                    {personal.objective}
                </p>
            </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
            <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15, color: accent, textTransform: 'uppercase' }}>
                Professional Experience
            </h2>
            {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{exp.position}</div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{exp.date}</div>
                </div>
                <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 6, color: '#555' }}>
                    {exp.company}
                </div>
                <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                    {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>{desc}</li>
                    )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
                </ul>
                </div>
            ))}
            </section>
        )}

         {/* Projects */}
         {projects.length > 0 && (
            <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15, color: accent, textTransform: 'uppercase' }}>
                Projects
            </h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                         <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                         <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
                     </div>
                     {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', color: '#666' }}>{p.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                         {p.description.map((desc, idx) => (
                             <li key={idx} style={{ fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>{desc}</li>
                         ))}
                     </ul>
                </div>
            ))}
            </section>
        )}

        <section style={{ marginBottom: 30 }}>
             <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15, color: accent, textTransform: 'uppercase' }}>
                Education
            </h2>
            <IndianEducationTable data={education} style={{ marginBottom: 30 }} />
        </section>

        {/* Skills Horizontal Layout */}
        {skills.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15, color: accent, textTransform: 'uppercase' }}>
            Core Skills
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10
          }}>
            {skills.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '4px 12px',
                  border: `1px solid ${accent}`,
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: 2
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Achievements & Certifications */}
         {(achievements.length > 0 || certs.length > 0) && (
             <section style={{ marginBottom: 30 }}>
                 <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: accent, textTransform: 'uppercase' }}>
                    Achievements & certifications
                 </h2>
                 <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.5 }}>
                     {achievements.map((a, i) => (
                         <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                     ))}
                     {certs.map((c, i) => (
                         <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                     ))}
                 </ul>
             </section>
         )}

      </div>

    </div>
  );
};

export default CorporateSplitLineTemplate;
