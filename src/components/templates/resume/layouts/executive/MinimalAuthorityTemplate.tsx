import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, SkillItem, EducationItem, SummaryItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const MinimalAuthorityTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const edu = get('education') as EducationItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif' }}>
      <h1>{p.fullName}</h1>
      <div style={{ fontStyle: 'italic', marginBottom: 10 }}>{p.jobTitle}</div>
      <IndianPersonalDetails data={p} layout="list" style={{ marginBottom: 20, fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} />

      {summary && (
        <section style={{ marginBottom: 20 }}>
            <h2 style={{ borderBottom: '2px solid #000' }}>Summary</h2>
            <p>{summary}</p>
        </section>
      )}

      <section>
        <h2 style={{ borderBottom: '2px solid #000' }}>Experience</h2>
        {exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <strong>{e.position}</strong>, {e.company}
            <div style={{ fontSize: 12 }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {projects.length > 0 && (
      <section>
        <h2 style={{ borderBottom: '2px solid #000' }}>Projects</h2>
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ fontWeight: 'bold' }}>{p.title}</div>
              <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
              <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>
              <ul style={{ paddingLeft: 16 }}>
                  {p.description.map((d, idx) => <li key={idx}>{d}</li>)}
              </ul>
          </div>
        ))}
      </section>
      )}

      {skills.length > 0 && (
          <section>
            <h2 style={{ borderBottom: '2px solid #000' }}>Skills</h2>
            <div>{skills.join(', ')}</div>
          </section>
      )}

      <section>
        <h2 style={{ borderBottom: '2px solid #000' }}>Education</h2>
        <IndianEducationTable data={edu} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ borderBottom: '2px solid #000' }}>Additional</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
                   {achievements.map((a, i) => (
                      <li key={`a-${i}`}>{a.title}: {a.description}</li>
                  ))}
              </ul>
          </section>
      )}
    </div>
  );
};

export default MinimalAuthorityTemplate;
