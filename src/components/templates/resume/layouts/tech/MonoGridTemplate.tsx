import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, SkillItem, EducationItem, SummaryItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const MonoGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '28pt', marginBottom: 4 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '12pt' }}>{personal.jobTitle}</div>
        <IndianPersonalDetails data={personal} layout="list" style={{ marginTop: 10, fontSize: 11, display: 'flex', gap: 15, flexWrap: 'wrap' }} />
      </header>

      {summary && (
        <section style={{ marginBottom: 20 }}>
            <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 4 }}>Summary</h4>
            <p style={{ fontSize: 13, lineHeight: 1.5 }}>{summary}</p>
        </section>
      )}

      <section style={{ marginBottom: 20 }}>
        <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 4 }}>Experience</h4>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.company} - {e.position}</strong>
                <span style={{ fontSize: 12 }}>{e.date}</span>
            </div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {projects.length > 0 && (
        <section style={{ marginBottom: 20 }}>
            <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 4 }}>Projects</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {projects.map((p, i) => (
                <div key={i}>
                    <strong>{p.title}</strong>
                    <div style={{ fontSize: 12, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                    <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                        ))}
                    </ul>
                </div>
                ))}
            </div>
        </section>
      )}

      {skills.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 4 }}>Skills</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, fontSize: 13 }}>
            {skills.map((s, i) => (
                <div key={i}>{s}</div>
            ))}
            </div>
        </section>
      )}

      <IndianEducationTable data={education} />

      {(certifications.length > 0 || achievements.length > 0) && (
          <section style={{ marginTop: 20 }}>
              <h4 style={{ textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 4 }}>Additional</h4>
              <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}>{c.title} - {c.issuer}</li>
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

export default MonoGridTemplate;
