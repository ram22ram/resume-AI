import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, ProjectItem, EducationItem, AchievementItem, ExperienceItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SkillLadderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];
  // const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];
  const exp = get('experience') as ExperienceItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 20, borderBottom: '2px solid #333', paddingBottom: 10 }}>
        <h1 style={{ margin: 0, textTransform: 'uppercase', fontSize: 24 }}>{p.fullName}</h1>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#555', marginBottom: 5 }}>
            {p.jobTitle || 'Aspiring Professional'}
        </div>
        <div style={{ fontSize: 13, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {p.email && <span>📧 {p.email}</span>}
            {p.phone && <span>📱 {p.phone}</span>}
            {p.linkedin && <span>🔗 {p.linkedin}</span>}
            {p.address && <span>📍 {p.address}</span>}
        </div>
      </header>

      {p.objective && (
        <section style={{ marginBottom: 15 }}>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 14, marginBottom: 5 }}>Objective</div>
            <p style={{ margin: 0, textAlign: 'justify' as const, fontSize: 13 }}>{p.objective}</p>
        </section>
      )}

      <IndianEducationTable data={edu} />

      {exp.length > 0 && (
         <section style={{ marginBottom: 15 }}>
            <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase' }}>
                Experience
            </div>
            {exp.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                        <span>{e.position}</span>
                        <span style={{ fontSize: 12 }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 2 }}>{e.company}</div>
                     <ul style={{ paddingLeft: 18, margin: '2px 0', fontSize: 13 }}>
                        {Array.isArray(e.description) ? e.description.map((d, idx) => (
                            <li key={idx}>{d}</li>
                        )) : <li>{e.description}</li>}
                    </ul>
                </div>
            ))}
         </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 15 }}>
          <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase' }}>
            Technical Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#eee', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 15 }}>
            <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase' }}>
                Projects
            </div>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{p.title}</strong>
                    <span style={{ fontSize: 12 }}>{p.startDate} {p.endDate ? `- ${p.endDate}` : ''}</span>
                </div>
                {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', color: '#666' }}>{p.technologies}</div>}
                 <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                    {Array.isArray(p.description) ? p.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    )) : <li>{p.description}</li>}
                </ul>
                <div style={{ fontSize: 12, marginTop: 2 }}>
                    {p.githubLink && <a href={p.githubLink} style={{ color: '#007bff', marginRight: 10 }}>GitHub</a>}
                    {p.liveLink && <a href={p.liveLink} style={{ color: '#007bff' }}>Live Demo</a>}
                </div>
              </div>
            ))}
          </section>
      )}

      {achievements.length > 0 && (
          <section style={{ marginBottom: 15 }}>
             <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase' }}>
                Achievements
            </div>
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13 }}>
                {achievements.map((a, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                        <strong>{a.title}</strong>: {a.description} {a.date && `(${a.date})`}
                    </li>
                ))}
            </ul>
          </section>
      )}

      <IndianPersonalDetails data={p} style={{ marginTop: 20, paddingTop: 10, borderTop: '2px solid #333' }} />

    </div>
  );
};

export default SkillLadderTemplate;
