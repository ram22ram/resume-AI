import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, EducationItem, ProjectItem, ExperienceItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const StepOneGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'grid', gridTemplateColumns: '30% 70%', gap: 30, padding: 0 }}>
      {/* LEFT */}
      <aside style={{ background: '#f8f8f8', padding: 25, borderRight: '1px solid #e0e0e0' }}>
        <h1 style={{ fontSize: 24, lineHeight: 1.2, marginBottom: 5 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13, color: '#555', fontWeight: 600, marginBottom: 20 }}>{personal.jobTitle}</div>
        
        <div style={{ fontSize: 12, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
             {personal.email && <div>✉️ {personal.email}</div>}
             {personal.phone && <div>📱 {personal.phone}</div>}
             {personal.linkedin && <div>🔗 {personal.linkedin}</div>}
             {personal.address && <div>📍 {personal.address}</div>}
        </div>

        <h3 style={{ fontSize: 14, textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 10 }}>Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {skills.map((s, i) => (
            <span key={i} style={{ fontSize: 11, background: '#fff', border: '1px solid #ccc', padding: '2px 5px', borderRadius: 3 }}>{s}</span>
            ))}
        </div>

        <div style={{ marginTop: 30 }}>
            <IndianPersonalDetails data={personal} layout="list" />
        </div>
      </aside>

      {/* RIGHT */}
      <main style={{ padding: '25px 30px 25px 0' }}>
        
        {personal.objective && (
            <section style={{ marginBottom: 25 }}>
                <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10 }}>Profile</h2>
                <p style={{ fontSize: 13, lineHeight: 1.5 }}>{personal.objective}</p>
            </section>
        )}

        <IndianEducationTable data={education} style={{ marginBottom: 25 }} />

        {projects.length > 0 && (
            <section style={{ marginBottom: 25 }}>
            <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10 }}>Projects</h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{p.title}</strong>
                    <span style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</span>
                </div>
                {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', color: '#666' }}>{p.technologies}</div>}
                <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                    {p.description.map((desc, idx) => (
                        <li key={idx} style={{ marginBottom: 3 }}>{desc}</li>
                    ))}
                </ul>
                </div>
            ))}
            </section>
        )}

        {experience.length > 0 && (
             <section style={{ marginBottom: 25 }}>
              <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10 }}>Experience</h2>
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: 14 }}>{e.position}</strong>
                        <span style={{ fontSize: 12, color: '#666' }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{e.company}</div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                        {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                            <li key={idx} style={{ marginBottom: 3 }}>{desc}</li>
                        )) : <li>{e.description}</li>}
                    </ul>
                </div>
              ))}
            </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
             <section>
                 <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10 }}>Achievements</h2>
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

export default StepOneGridTemplate;
