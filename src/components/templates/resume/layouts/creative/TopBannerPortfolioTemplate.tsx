import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ProjectItem, ExperienceItem, SkillItem, EducationItem, CertificationItem, AchievementItem, SummaryItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const TopBannerPortfolioTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';

  const accent = data?.metadata?.accentColor || '#2563eb' || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Hero Banner */}
      <div style={{
        backgroundColor: accent,
        color: '#fff',
        padding: '50px 60px'
      }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 18, marginTop: 6, opacity: 0.9 }}>{personal.jobTitle}</div>
        <div style={{ marginTop: 15 }}>
              <IndianPersonalDetails 
                  data={personal} 
                  layout="list" 
                  style={{ fontSize: 13, display: 'flex', gap: 15, flexWrap: 'wrap', color: 'rgba(255,255,255,0.9)' }} 
              />
          </div>
      </div>

      <div style={{ padding: 60 }}>
        {summary && (
            <div style={{ marginBottom: 40, fontSize: 14, lineHeight: 1.6 }}>
                {summary}
            </div>
        )}

        <div style={{ display: 'flex', gap: 50 }}>
          
          {/* Left Column */}
          <div style={{ flex: 2 }}>
            {projects.length > 0 && (
            <section style={{ marginBottom: 40 }}>
                <h3 style={{ marginBottom: 20, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>PROJECTS</h3>
                {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 25 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 600 }}>{proj.title}</div>
                         <span style={{ fontSize: 12 }}>{proj.startDate} - {proj.endDate}</span>
                    </div>
                     {proj.technologies && <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 5 }}>{proj.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {proj.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                        ))}
                    </ul>
                </div>
                ))}
            </section>
            )}

            {experience.length > 0 && (
            <section style={{ marginBottom: 40 }}>
                <h3 style={{ marginBottom: 20, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>EXPERIENCE</h3>
                {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <div style={{ fontWeight: 600 }}>{exp.position}</div>
                         <span style={{ fontSize: 12 }}>{exp.date}</span>
                    </div>
                    <div style={{ fontSize: 13, marginBottom: 5, fontStyle: 'italic' }}>
                    {exp.company}
                    </div>
                    <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                        ))}
                    </ul>
                </div>
                ))}
            </section>
            )}

            <section>
                <h3 style={{ marginBottom: 20, borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>EDUCATION</h3>
                <IndianEducationTable data={education} />
            </section>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
                <section style={{ marginBottom: 40 }}>
                    <h3 style={{ borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>SKILLS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 15 }}>
                    {skills.map((skill, i) => (
                        <div key={i} style={{
                        padding: '8px 12px',
                        background: '#f3f4f6',
                        borderRadius: 4,
                        fontSize: 13
                        }}>
                        {skill}
                        </div>
                    ))}
                    </div>
                </section>
            )}

            {(achievements.length > 0 || certs.length > 0) && (
                <section>
                     <h3 style={{ borderBottom: `2px solid ${accent}`, paddingBottom: 5, display: 'inline-block' }}>ADDITIONAL</h3>
                     <ul style={{ paddingLeft: 16, fontSize: 13, marginTop: 15 }}>
                      {certs.map((c, i) => (
                          <li key={`c-${i}`} style={{ marginBottom: 5 }}><strong>{c.title}</strong><br/>{c.issuer}</li>
                      ))}
                      {achievements.map((a, i) => (
                          <li key={`a-${i}`} style={{ marginBottom: 5 }}><strong>{a.title}</strong><br/>{a.description}</li>
                      ))}
                  </ul>
                </section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBannerPortfolioTemplate;
