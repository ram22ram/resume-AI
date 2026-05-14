import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, EducationItem, SummaryItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const VerticalTimelinePro: React.FC<{ data: ResumeData }> = ({ data }) => {
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
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#7c3aed';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails data={personal} layout="list" style={{ marginTop: 10, fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} />
      </header>

      {summary && (
        <section style={{ marginBottom: 30 }}>
            <h3 style={{ textTransform: 'uppercase', color: accent, fontSize: 14, marginBottom: 10 }}>Summary</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{summary}</p>
        </section>
      )}

      <section>
        <div style={{ 
          borderLeft: `3px solid ${accent}`, 
          paddingLeft: 30,
          marginLeft: 10
        }}>
          {/* EXPERIENCE */}
          {experience.length > 0 && (
          <div style={{ marginBottom: 40 }}>
              <h3 style={{ textTransform: 'uppercase', color: accent, marginTop: 0 }}>Experience</h3>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 35, position: 'relative' }}>
                  
                  {/* Dot */}
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: accent,
                    position: 'absolute',
                    left: -38,
                    top: 5
                  }} />

                  <div style={{ fontSize: 13, color: '#666' }}>
                    {exp.date}
                  </div>

                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {exp.position}
                  </div>

                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    {exp.company}
                  </div>

                  <ul style={{ paddingLeft: 16, margin: '4px 0', lineHeight: 1.6 }}>
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                  </ul>

                </div>
              ))}
          </div>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
             <div style={{ marginBottom: 40 }}>
                <h3 style={{ textTransform: 'uppercase', color: accent }}>Projects</h3>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 25, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: -38, top: 6, width: 10, height: 10, border: `2px solid ${accent}`, borderRadius: '50%', background: 'white' }} />
                        <div style={{ fontWeight: 700 }}>{p.title}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                        <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{p.technologies}</div>
                        <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                            {p.description.map((desc, idx) => (
                                <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
             </div>
          )}

           {/* EDUCATION */}
           <div style={{ marginBottom: 30, marginLeft: -30 }}>
                <IndianEducationTable data={education} />
           </div>

           {(certifications.length > 0 || achievements.length > 0) && (
               <div style={{ marginBottom: 20 }}>
                   <h3 style={{ textTransform: 'uppercase', color: accent }}>Additional</h3>
                   <ul style={{ paddingLeft: 16 }}>
                       {certifications.map((c, i) => (
                           <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                       ))}
                       {achievements.map((a, i) => (
                           <li key={`a-${i}`}>{a.title}: {a.description}</li>
                       ))}
                   </ul>
               </div>
           )}

            {skills.length > 0 && (
               <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid #eee` }}>
                   <h3 style={{ textTransform: 'uppercase', color: accent }}>Skills</h3>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                       {skills.map((s, i) => (
                           <span key={i} style={{ padding: '4px 10px', background: '#f3f4f6', borderRadius: 4, fontSize: 12 }}>{s}</span>
                       ))}
                   </div>
               </div>
           )}
        </div>
      </section>

    </div>
  );
};

export default VerticalTimelinePro;
