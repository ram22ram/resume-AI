import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SwissGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const styles = {
      sectionTitle: {
          fontWeight: 700,
          marginBottom: 20,
          textTransform: 'uppercase' as const,
          letterSpacing: 1,
          fontSize: 12,
          borderBottom: '1px solid #eee',
          paddingBottom: 5
      },
      itemTitle: { fontWeight: 600, fontSize: 14 },
      itemSub: { fontSize: 13, color: '#666', marginBottom: 6 },
      list: { paddingLeft: 16, margin: '6px 0', fontSize: 14, lineHeight: 1.6 }
  };

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Helvetica, Arial, sans-serif',
      padding: 60,
      fontSize: 14
    }}>

      <div style={{ marginBottom: 50, borderBottom: '2px solid #000', paddingBottom: 20 }}>
        <h1 style={{ fontSize: 36, margin: 0, letterSpacing: -1, textTransform: 'uppercase' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 16, fontWeight: 500, marginTop: 5, color: '#444' }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 13, display: 'flex', flexWrap: 'wrap', gap: '10px 20px', color: '#555' }} 
            />
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: 50, maxWidth: '80%', lineHeight: 1.6 }}>
          {summary}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 1fr', gap: 60 }}>
        
        {/* Left Column */}
        <div>
            {experience.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>Experience</div>
                     {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: 25 }}>
                          <div style={styles.itemTitle}>{exp.position}</div>
                          <div style={styles.itemSub}>{exp.company} | {exp.date}</div>
                          <ul style={styles.list}>
                              {Array.isArray(exp.description) ? exp.description.map((d, idx) => (
                                <li key={idx}>{d}</li>
                              )) : <li>{exp.description}</li>}
                          </ul>
                        </div>
                      ))}
                </div>
            )}

            {projects.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>Projects</div>
                    {projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                            <div style={styles.itemTitle}>{p.title}</div>
                            <div style={styles.itemSub}>{p.startDate} - {p.endDate}</div>
                            {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{p.technologies}</div>}
                             <ul style={styles.list}>
                              {Array.isArray(p.description) ? p.description.map((d, idx) => (
                                <li key={idx}>{d}</li>
                              )) : <li>{p.description}</li>}
                          </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Right Column */}
        <div>
            {education.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>Education</div>
                     <IndianEducationTable data={education} />
                </div>
            )}

            {skills.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                     <div style={styles.sectionTitle}>Skills</div>
                     <div style={{ lineHeight: 1.8 }}>
                         {skills.map((s, i) => (
                             <span key={i} style={{ display: 'inline-block', background: '#f0f0f0', padding: '2px 8px', borderRadius: 4, marginRight: 6, marginBottom: 6, fontSize: 12 }}>
                                 {s}
                             </span>
                         ))}
                     </div>
                </div>
            )}

             {achievements.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                     <div style={styles.sectionTitle}>Achievements</div>
                     {achievements.map((a, i) => (
                         <div key={i} style={{ marginBottom: 10 }}>
                             <div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                             <div style={{ fontSize: 13, color: '#555' }}>{a.description}</div>
                         </div>
                     ))}
                </div>
            )}

             {certifications.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                     <div style={styles.sectionTitle}>Certifications</div>
                     {certifications.map((c, i) => (
                         <div key={i} style={{ marginBottom: 10 }}>
                             <div style={{ fontWeight: 600, fontSize: 13 }}>{c.title}</div>
                             <div style={{ fontSize: 13, color: '#555' }}>{c.issuer} {c.date && `| ${c.date}`}</div>
                         </div>
                     ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default SwissGridTemplate;
