import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const BlockSectionModern: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#111827';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Poppins, sans-serif',
      background: '#f8fafc',
      padding: 50
    }}>

      {/* Header */}
      <div style={{ marginBottom: 50 }}>
        <h1 style={{ margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ color: accent, fontSize: 18, fontWeight: 500 }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 15 }}>
             <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 13, display: 'flex', gap: 20, flexWrap: 'wrap' }} 
            />
        </div>
      </div>

      {/* Summary Block */}
      {summary && (
        <div style={{
          background: 'white',
          padding: 25,
          marginBottom: 30,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          borderRadius: 8
        }}>
          <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 10, fontWeight: 700, color: accent }}>
            SUMMARY
          </div>
          <div style={{ lineHeight: 1.7, fontSize: 13 }}>
            {summary}
          </div>
        </div>
      )}

      {/* Experience Block */}
      {experience.length > 0 && (
      <div style={{
        background: 'white',
        padding: 25,
        marginBottom: 30,
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        borderRadius: 8
      }}>
        <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 20, fontWeight: 700, color: accent }}>
          EXPERIENCE
        </div>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 25 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>
                {exp.position}
                </div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{exp.date}</div>
            </div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 5 }}>
              {exp.company}
            </div>
            <ul style={{ paddingLeft: 16, margin: '8px 0' }}>
                {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6 }}>{desc}</li>
                )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
            </ul>
          </div>
        ))}
      </div>
      )}

      {/* Projects Block */}
      {projects.length > 0 && (
          <div style={{
            background: 'white',
            padding: 25,
            marginBottom: 30,
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 20, fontWeight: 700, color: accent }}>
              PROJECTS
            </div>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                        <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
                     </div>
                     {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', color: '#555', marginBottom: 5 }}>{p.technologies}</div>}
                     <ul style={{ paddingLeft: 16, margin: '8px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6 }}>{desc}</li>
                        ))}
                     </ul>
                </div>
            ))}
          </div>
      )}

      <div style={{
          background: 'white',
          padding: 25,
          marginBottom: 30,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          borderRadius: 8
        }}>
            <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 15, fontWeight: 700, color: accent }}>
              EDUCATION
            </div>
          <IndianEducationTable data={education} />
      </div>

       {skills.length > 0 && (
          <div style={{
            background: 'white',
            padding: 25,
            marginBottom: 30,
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 15, fontWeight: 700, color: accent }}>
              SKILLS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map((s, i) => (
                    <span key={i} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 4, fontSize: 12, color: '#334155' }}>
                        {s}
                    </span>
                ))}
            </div>
          </div>
       )}

       {(achievements.length > 0 || certs.length > 0) && (
           <div style={{
            background: 'white',
            padding: 25,
            marginBottom: 30,
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            borderRadius: 8
          }}>
              <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 15, fontWeight: 700, color: accent }}>
                 ADDITIONAL
              </div>
              <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                  ))}
                  {certs.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
              </ul>
          </div>
       )}

    </div>
  );
};

export default BlockSectionModern;
