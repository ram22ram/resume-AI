import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const NordicEdgeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0ea5e9';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', display: 'flex', padding: 0 }}>
      
      {/* Left Accent Bar */}
      <div style={{ width: 12, backgroundColor: accent }} />

      {/* Main Content */}
      <div style={{ padding: 40, flex: 1 }}>
        
        <header style={{ marginBottom: 35 }}>
          <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, textTransform: 'uppercase' }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 14, marginTop: 6, fontWeight: 500, color: accent, textTransform: 'uppercase' }}>
            {personal.jobTitle}
          </div>
          <div style={{ fontSize: 13, marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: '8px 16px', color: '#555' }}>
             {personal.email && <span>{personal.email}</span>}
             {personal.phone && <span>{personal.phone}</span>}
             {personal.linkedin && <span>{personal.linkedin}</span>}
             {personal.address && <span>{personal.address}</span>}
          </div>
        </header>

        {personal.objective && (
            <div style={{ marginBottom: 30 }}>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>{personal.objective}</p>
            </div>
        )}

        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <strong style={{ fontSize: 14 }}>{exp.position}</strong>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{exp.date}</span>
              </div>
              <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </section>

        {projects.length > 0 && (
             <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>
                  Projects
                </h2>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <strong style={{ fontSize: 14 }}>{p.title}</strong>
                        <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
                     </div>
                     {p.technologies && <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{p.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                ))}
            </section>
        )}

        <IndianEducationTable data={education} style={{ marginBottom: 30 }} />

        <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>
                Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {skills.map((s, i) => (
                    <span key={i} style={{ fontSize: 12, background: '#f3f4f6', padding: '4px 10px', borderRadius: 4, fontWeight: 500 }}>{s}</span>
                ))}
            </div>
        </section>

         {(achievements.length > 0 || certs.length > 0) && (
             <section style={{ marginBottom: 30 }}>
                 <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>
                    Achievements
                 </h2>
                 <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
                     {achievements.map((a, i) => (
                         <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                     ))}
                     {certs.map((c, i) => (
                         <li key={`c-${i}`}>{c.title} - {c.issuer}</li>
                     ))}
                 </ul>
             </section>
         )}

         <IndianPersonalDetails data={personal} style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }} />

      </div>
    </div>
  );
};

export default NordicEdgeTemplate;
