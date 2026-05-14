import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, SummaryItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const StartupImpactGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || personal.objective || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ borderBottom: '3px solid #000', paddingBottom: 12, marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
            {[personal.email, personal.phone].filter(Boolean).join(' | ')}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* LEFT COLUMN (Main Content) */}
        <div style={{ flex: 2 }}>
            {summary && (
                <div style={{ marginBottom: 20 }}>
                    <h3>Profile</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.5 }}>{summary}</p>
                </div>
            )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 20 }}>
                <h3>Professional Experience</h3>
                {experience.map((e, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{e.position}</strong>
                        <span style={{ fontSize: 12, color: '#666' }}>{e.date}</span>
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: 13 }}>{e.company}</div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {e.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: 20 }}>
                <h3>Projects</h3>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{p.title}</strong>
                        <span style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</span>
                    </div>
                    <div style={{ fontSize: 12, fontStyle: 'italic', color: '#555' }}>{p.technologies}</div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
          )}
          
           <IndianEducationTable data={education} />
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: 20 }}>
          
          <IndianPersonalDetails data={personal} layout="list" style={{ marginBottom: 20 }} />

          {skills.length > 0 && (
            <div style={{ marginBottom: 20 }}>
                <h3>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {skills.map((s, i) => (
                    <span key={i} style={{ background: '#f5f5f5', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>
                        {s}
                    </span>
                    ))}
                </div>
            </div>
          )}

          {(certifications.length > 0 || achievements.length > 0) && (
              <div>
                  <h3>Additional</h3>
                  <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                      {certifications.map((c, i) => (
                          <li key={`c-${i}`}>
                              <strong>{c.title}</strong><br/>{c.issuer}
                          </li>
                      ))}
                      {achievements.map((a, i) => (
                          <li key={`a-${i}`} style={{ marginTop: 8 }}>
                              {a.title}: {a.description}
                          </li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupImpactGridTemplate;
