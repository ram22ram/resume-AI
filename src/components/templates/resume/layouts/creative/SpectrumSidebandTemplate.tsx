import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, ExperienceItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SpectrumSidebandTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#7c3aed';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', padding: 0, fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 140, backgroundColor: accent, color: '#fff', padding: 20, fontSize: 13 }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 15, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 5 }}>CONTACT</div>
        <div style={{ fontSize: 12, wordBreak: 'break-word' }}>
          <div style={{ marginBottom: 5 }}>{personal.email}</div>
          <div>{personal.phone}</div>
          {personal.linkedin && <div style={{ marginTop: 5 }}>{personal.linkedin}</div>}
          {personal.location && <div style={{ marginTop: 5 }}>{personal.location}</div>}
        </div>

        {skills.length > 0 && (
            <>
                <div style={{ fontSize: 14, fontWeight: 'bold', marginTop: 30, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 5 }}>SKILLS</div>
                <div style={{ fontSize: 12 }}>
                {skills.map((s, i) => (
                    <div key={i} style={{ marginBottom: 4 }}>• {s}</div>
                ))}
                </div>
            </>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 40 }}>
        <header style={{ marginBottom: 30 }}>
            <h1 style={{ margin: 0, fontSize: 32, color: accent }}>{personal.fullName}</h1>
            <div style={{ fontSize: 16, marginTop: 5, fontWeight: 600 }}>{personal.jobTitle}</div>
             <div style={{ marginTop: 15 }}>
              <IndianPersonalDetails 
                  data={personal} 
                  layout="list" 
                  style={{ fontSize: 13, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
              />
          </div>
        </header>

        {experience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5 }}>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong>{exp.position}</strong>
                  <span style={{ fontSize: 12 }}>{exp.date}</span>
              </div>
              <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 4 }}>
                {exp.company}
              </div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5 }}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.title}</strong>
                  <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
              </div>
              {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5 }}>Education</h3>
          <IndianEducationTable data={education} />
        </section>

        {(achievements.length > 0 || certs.length > 0) && (
            <section>
                <h3 style={{ fontSize: 16, textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 5 }}>Additional</h3>
                <ul style={{ paddingLeft: 16, fontSize: 13 }}>
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

export default SpectrumSidebandTemplate;
