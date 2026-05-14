import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CenterColumnEditorialTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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

  return (
    <div style={{
      ...standardStyles.page,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif'
    }}>
      
      <div style={{ width: '80%', padding: '60px 0' }}>
        
        <header style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
          <div style={{ fontSize: 16, marginTop: 6, fontStyle: 'italic', color: '#444' }}>{personal.jobTitle}</div>
          <div style={{ marginTop: 10 }}>
              <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }} 
              />
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: 40, textAlign: 'center' }}>
            <p style={{ lineHeight: 1.8, fontSize: 14, maxWidth: '90%', margin: '0 auto' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5, textAlign: 'center', letterSpacing: 2, fontSize: 14 }}>
            PROFESSIONAL EXPERIENCE
          </h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginTop: 25 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 5 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{exp.position}</div>
                  <div style={{ fontSize: 13, fontStyle: 'italic' }}>
                    {exp.company} • {exp.date}
                  </div>
              </div>
              <ul style={{ paddingLeft: 0, margin: '8px 0', listStyle: 'none', textAlign: 'center' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4, fontSize: 14, lineHeight: 1.6 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
            <section style={{ marginBottom: 40 }}>
            <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5, textAlign: 'center', letterSpacing: 2, fontSize: 14 }}>
                PROJECTS
            </h3>
            {projects.map((p, i) => (
                <div key={i} style={{ marginTop: 25 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 5 }}>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{p.title}</div>
                        <div style={{ fontSize: 13, fontStyle: 'italic' }}>{p.startDate} - {p.endDate}</div>
                        {p.technologies && <div style={{ fontSize: 12, color: '#666' }}>{p.technologies}</div>}
                    </div>
                    <ul style={{ paddingLeft: 0, margin: '8px 0', listStyle: 'none', textAlign: 'center' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ marginTop: 4, fontSize: 14, lineHeight: 1.6 }}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}
            </section>
        )}

        <section style={{ marginBottom: 40 }}>
            <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5, textAlign: 'center', letterSpacing: 2, fontSize: 14 }}>
                EDUCATION
            </h3>
            <div style={{ marginTop: 20 }}>
                 <IndianEducationTable data={education} />
            </div>
        </section>

        {skills.length > 0 && (
            <section style={{ marginBottom: 40, textAlign: 'center' }}>
                 <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5, textAlign: 'center', letterSpacing: 2, fontSize: 14 }}>
                    SKILLS
                 </h3>
                 <div style={{ marginTop: 15, fontSize: 14, lineHeight: 1.8 }}>
                     {skills.join(' • ')}
                 </div>
            </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
            <section style={{ marginBottom: 40 }}>
                 <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5, textAlign: 'center', letterSpacing: 2, fontSize: 14 }}>
                   ADDITIONAL
                 </h3>
                 <ul style={{ paddingLeft: 0, margin: '15px 0', listStyle: 'none', textAlign: 'center', fontSize: 14 }}>
                    {certs.map((c, i) => (
                        <li key={i} style={{ marginBottom: 5 }}><strong>{c.title}</strong> - {c.issuer}</li>
                    ))}
                    {achievements.map((a, i) => (
                        <li key={i} style={{ marginBottom: 5 }}><strong>{a.title}</strong>: {a.description}</li>
                    ))}
                 </ul>
            </section>
        )}

      </div>
    </div>
  );
};

export default CenterColumnEditorialTemplate;
