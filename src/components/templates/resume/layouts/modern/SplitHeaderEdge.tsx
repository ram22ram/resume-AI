import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SplitHeaderEdge: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div style={{
      ...standardStyles.page,
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      padding: 0
    }}>

      {/* LEFT PANEL */}
      <div style={{
        width: '35%',
        background: accent,
        color: 'white',
        padding: 40,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}>
          {personal.fullName}
        </h1>
        <div style={{ opacity: 0.9, marginBottom: 40, marginTop: 10, fontSize: 16 }}>
          {personal.jobTitle}
        </div>

        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 13, lineHeight: 2, color: 'rgba(255,255,255,0.95)' }} 
        />

        {skills.length > 0 && (
            <div style={{ marginTop: 40 }}>
                <h3 style={{ fontSize: 14, letterSpacing: 1, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 5, marginBottom: 15 }}>SKILLS</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map((s, i) => (
                        <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>{s}</span>
                    ))}
                </div>
            </div>
        )}

      </div>

      {/* RIGHT CONTENT */}
      <div style={{ width: '65%', padding: 50 }}>

        {experience.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 14, letterSpacing: 1, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20, color: accent }}>EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {exp.position}
              </div>
              <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
                {exp.company} • {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 14, letterSpacing: 1, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20, color: accent }}>PROJECTS</h2>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                        <div style={{ fontSize: 13, color: '#555' }}>{p.startDate} - {p.endDate}</div>
                        {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{p.technologies}</div>}
                        <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                            {p.description.map((desc, idx) => (
                                <li key={idx} style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5 }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        )}

        <section style={{ marginBottom: 40 }}>
           <h2 style={{ fontSize: 14, letterSpacing: 1, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20, color: accent }}>EDUCATION</h2>
           <IndianEducationTable data={education} />
        </section>

        {(achievements.length > 0 || certs.length > 0) && (
            <section>
                <h2 style={{ fontSize: 14, letterSpacing: 1, borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 20, color: accent }}>ADDITIONAL</h2>
                <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
                    {certs.map((c, i) => (
                        <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                    ))}
                    {achievements.map((a, i) => (
                        <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                    ))}
                </ul>
            </section>
        )}

      </div>

    </div>
  );
};

export default SplitHeaderEdge;
