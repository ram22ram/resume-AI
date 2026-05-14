import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, ExperienceItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

interface Props {
  data: ResumeData;
}

const NeoSplitTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = (getItems('personal')[0] || {}) as PersonalItem;
  const skills = (getItems('skills') as SkillItem[]).map(s => s.name);
  const experience = getItems('experience') as ExperienceItem[];
  const projects = getItems('projects') as ProjectItem[];
  const education = getItems('education') as EducationItem[];
  const certs = getItems('certifications') as CertificationItem[];
  const achievements = getItems('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: standardStyles.fonts.sans }}>
      {/* SIDEBAR */}
      <aside style={{ width: '32%', paddingRight: 20, borderRight: `3px solid ${accent}` }}>
        <h1 style={{ fontSize: 28, lineHeight: 1.2, marginBottom: 5 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13, color: accent, fontWeight: 700, marginBottom: 20 }}>{personal.jobTitle}</div>

        <div style={{ fontSize: 12, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
             {personal.email && <div>✉️ {personal.email}</div>}
             {personal.phone && <div>📱 {personal.phone}</div>}
             {personal.linkedin && <div>🔗 {personal.linkedin}</div>}
             {personal.address && <div>📍 {personal.address}</div>}
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 4 }}>Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
             <span key={i} style={{ fontSize: 11, background: '#f5f5f5', padding: '2px 6px', borderRadius: 4 }}>{s}</span>
            ))}
        </div>

        <IndianPersonalDetails data={personal} layout="list" style={{ marginTop: 30 }} />

      </aside>

      {/* MAIN */}
      <main style={{ width: '68%', paddingLeft: 24 }}>
        
        {personal.objective && (
            <section style={{ marginBottom: 20 }}>
                 <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: `2px solid ${accent}`, paddingBottom: 4, marginBottom: 10 }}>Profile</h2>
                 <p style={{ fontSize: 13, lineHeight: 1.5 }}>{personal.objective}</p>
            </section>
        )}

        <section>
          <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: `2px solid ${accent}`, paddingBottom: 4, marginBottom: 10 }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 14 }}>{e.position}</strong>
                  <span style={{ fontSize: 12 }}>{e.date}</span>
               </div>
               <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 4 }}>{e.company}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{e.description}</li>}
              </ul>
            </div>
          ))}
        </section>

        {projects.length > 0 && (
            <section>
                <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: `2px solid ${accent}`, paddingBottom: 4, marginBottom: 10 }}>Projects</h2>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: 14 }}>{p.title}</strong>
                        <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
                     </div>
                     {p.technologies && <div style={{ fontSize: 12, color: '#555', fontStyle: 'italic' }}>{p.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                ))}
            </section>
        )}

        <IndianEducationTable data={education} />

        {(achievements.length > 0 || certs.length > 0) && (
             <section style={{ marginTop: 20 }}>
                 <h2 style={{ fontSize: 16, fontWeight: 700, borderBottom: `2px solid ${accent}`, paddingBottom: 4, marginBottom: 10 }}>Achievements</h2>
                 <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                     {achievements.map((a, i) => (
                         <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                     ))}
                     {certs.map((c, i) => (
                         <li key={`c-${i}`}>{c.title} - {c.issuer}</li>
                     ))}
                 </ul>
             </section>
         )}

      </main>
    </div>
  );
};

export default NeoSplitTemplate;
